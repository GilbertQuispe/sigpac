'use server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

async function createSupabaseServer() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { 
      cookies: { 
        get(name: string) { return cookieStore.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) { cookieStore.set({ name, value,...options }) },
        remove(name: string, options: CookieOptions) { cookieStore.set({ name, value: '',...options }) },
      } 
    }
  )
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const origin = formData.get('origin') as string
  const supabase = await createSupabaseServer()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return redirect(`/?error=${encodeURIComponent(error.message)}`)
  }
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  return redirect('/registro') // Botón Regístrate te manda al registro
}

export async function checkDni(formData: FormData) {
  const dni = formData.get('dni') as string
  const supabase = await createSupabaseServer()

  if (!/^\d{8}$/.test(dni)) {
    return { error: 'DNI inválido. Debe tener 8 dígitos.' }
  }

  const { data: persona, error } = await supabase
   .from('persona')
   .select('idpersona, nombres, apellidos, idrol')
   .eq('dni', dni)
   .single()

  if (error ||!persona) {
    return { error: 'DNI no registrado, consulte con su Gestora Institucional' }
  }

  const usuario = `${persona.nombres[0].toLowerCase()}${persona.apellidos.replace(/\s/g, '').toLowerCase()}${dni}`
  return { success: true, persona: {...persona, usuario }}
}

export async function register(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const idpersona = formData.get('idpersona') as string
  const nombres = formData.get('nombres') as string
  const apellidos = formData.get('apellidos') as string
  const idrol = formData.get('idrol') as string
  const usuario = formData.get('usuario') as string
  
  const supabase = await createSupabaseServer()

  const { data: authData, error: authError } = await supabase.auth.signUp({ 
    email, 
    password,
    options: { data: { nombres, apellidos, usuario }}
  })
  
  if (authError) redirect(`/registro?error=${encodeURIComponent(authError.message)}`)
  if (!authData.user) redirect(`/registro?error=No se pudo crear el usuario`)

  const { error: dbError } = await supabase.from('usuario').insert({
    auth_id: authData.user.id,
    idpersona: Number(idpersona),
    email,
    usuario
  })

  if (dbError) redirect(`/registro?error=${encodeURIComponent(dbError.message)}`)

  redirect('/?success=Cuenta creada. Revisa tu correo para confirmar')
}