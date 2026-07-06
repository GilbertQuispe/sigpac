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
  const supabase = await createSupabaseServer()

  const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return redirect(`/?error=${encodeURIComponent(error.message)}`)
  }
  if (!authData.user) {
    return redirect(`/?error=No se pudo iniciar sesión`)
  }

  const { data: userData } = await supabase
    .from('usuario')
    .select('idpersona, persona(idrol)')
    .eq('id', authData.user.id)
    .single()

  const idrol = userData?.persona?.idrol

  if (idrol === 1) {
    redirect('/admin')
  } else {
    redirect('/dashboard')
  }
}

export async function signup(formData: FormData) {
  return redirect('/registro')
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
  const usuario = formData.get('usuario') as string
  
  const headersList = await headers()
  const host = headersList.get('host')?? 'localhost:3000'
  const protocol = host.includes('localhost')? 'http' : 'https'
  const origin = `${protocol}://${host}`
  
  const supabase = await createSupabaseServer()

  const { data: authData, error: authError } = await supabase.auth.signUp({ 
    email, 
    password,
    options: { 
      emailRedirectTo: `${origin}/auth/callback`,
      data: { idpersona, nombres, apellidos, usuario }
    }
  })
  
  if (authError) redirect(`/registro?error=${encodeURIComponent(authError.message)}`)

  redirect('/?success=Para confirmar la creación de usuario, revisa en la bandeja del correo electrónico registrado y confirma su dirección electrónica')
} // <- Esta llave cierra register