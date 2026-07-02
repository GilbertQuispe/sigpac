import Sidebar from '@/app/components/Sidebar'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies() // <- OJO: await es clave

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { 
      cookies: { 
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      } 
    }
  )

  const { data:  user } = await supabase.auth.getUser()
  if (!user) redirect('/') // <- Si no hay sesión te bota

  // Aquí va tu lógica de permisos normal
  // const { data: perfil } = await supabase.from('usuario')...
  // const { data: permisos } = ...

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="w-72 shrink-0"><Sidebar permissions={[]} /></aside> { /* Mete tus permisos reales aquí después */}
      <main className="flex-1 overflow-y-auto bg-background">{children}</main>
    </div>
  )
}