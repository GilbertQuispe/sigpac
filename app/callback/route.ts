/* import { createSupabaseServer } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createSupabaseServer()
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) return NextResponse.redirect(`${origin}/?error=Error al confirmar`)

    const user = data.user
    if (user) {
      const { idpersona, nombres, apellidos, usuario, idrol } = user.user_metadata
      
      // INSERTA EN TU TABLA
      const { error: dbError } = await supabase.from('usuario').insert({
        idusuario: user.id, 
        idpersona: Number(idpersona),
        usuario: usuario,
        email: user.email,
        idrol: Number(idrol),
        estado: 'TRUE'
      })

      if (dbError) {
        console.log(dbError) // Revisa en la consola de next dev
        return NextResponse.redirect(`${origin}/?error=Error al crear en BD: ${dbError.message}`)
      }
    }
  }
  return NextResponse.redirect(`${origin}/?success=Cuenta confirmada. Ya puedes iniciar sesión`)
} */

/* import { createSupabaseServer } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createSupabaseServer()
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error(error)
      return NextResponse.redirect(`${origin}/?error=Error al confirmar`)
    }

    const user = data.user
    if (user) {
      const { idpersona, nombres, apellidos, usuario, idrol } = user.user_metadata
      
      // INSERTA EN TU TABLA
      const { error: dbError } = await supabase.from('usuario').insert({
        idusuario: user.id, 
        idpersona: Number(idpersona),
        usuario: usuario,
        email: user.email,
        idrol: Number(idrol),
        estado: 'A'
      })

      if (dbError) {
        console.error(dbError) // Mira la consola de next dev
        return NextResponse.redirect(`${origin}/?error=${dbError.message}`)
      }
    }
  }
  return NextResponse.redirect(`${origin}/?success=Cuenta confirmada. Ya puedes iniciar sesión`)
} */

  import { createSupabaseServer } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createSupabaseServer()
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) return NextResponse.redirect(`${origin}/?error=Error al confirmar`)

    const user = data.user
    if (user) {
      const { idpersona, nombres, apellidos, usuario } = user.user_metadata
      
      // INSERT ADAPTADO A TU TABLA
      const { error: dbError } = await supabase.from('usuario').insert({
        id: user.id, // tu columna se llama id
        idpersona: Number(idpersona),
        username: usuario, // tu columna se llama username
        email: user.email,
        estado: true, // tu columna es boolean
        password_hash: 'EMPTY' // como ya tienes
      })

      if (dbError) {
        console.error(dbError)
        return NextResponse.redirect(`${origin}/?error=${dbError.message}`)
      }
    }
  }
  return NextResponse.redirect(`${origin}/?success=Cuenta confirmada. Ya puedes iniciar sesión`)
}