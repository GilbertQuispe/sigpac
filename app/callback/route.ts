import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (name) => cookieStore.get(name)?.value } }
    )
    
    const { data: { session } } = await supabase.auth.exchangeCodeForSession(code)
    
    if (session?.user) {
      // Aquí recién insertamos en tu tabla usuario
      const meta = session.user.user_metadata
      await supabase.from('usuario').insert({
        id: session.user.id,
        idpersona: Number(meta.idpersona),
        email: session.user.email,
        username: meta.usuario,
        estado: true
      })
    }
  }

  return NextResponse.redirect('http://localhost:3000/?success=Cuenta confirmada. Ya puedes iniciar sesión')
}