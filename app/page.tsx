/*import { login, signup, forgotPassword } from '@/app/actions/auth'
import { headers } from 'next/headers'

const EyeIcon = ({ open }: { open: boolean }) => open? (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
) : (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="fill-[var(--color-blue-1)]"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
);

export default async function LoginPage({ searchParams }: { searchParams: { error?: string, success?: string } }) {
  const headersList = await headers()
  const host = headersList.get('host')?? 'localhost:3000'
  const protocol = host.includes('localhost')? 'http' : 'https'
  const origin = `${protocol}://${host}`
  
  const error = searchParams.error
  const success = searchParams.success

  return (
    <main className="min-h-screen bg-[var(--color-white)] text-[var(--color-dark-1)] flex items-center justify-center font-sans">
      {error && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg text-white bg-[var(--color-error)]">
          {decodeURIComponent(error)}
        </div>
      )}
      {success && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg text-white bg-[var(--color-blue-1)]">
          {decodeURIComponent(success)}
        </div>
      )}

      <div className="grid lg:grid-cols-2 w-full max-w-6xl h-screen max-h-[800px] shadow-xl rounded-xl overflow-hidden m-4 lg:m-0">
        <div className="bg-[var(--color-white)] p-8 md:p-16 flex-col justify-between">
          <div className="flex items-center gap-2 font-bold text-lg text-[var(--color-dark-2)]">
            <LogoIcon />
            <span>SIGPAC</span>
          </div>

          <form action={login} className="w-full max-w-sm mx-auto">
            <input type="hidden" name="origin" value={origin} />
            
            <h2 className="text-sm text-gray-600">Bienvenido de vuelta</h2>
            <h1 className="text-3xl font-bold mt-2 mb-8 text-[var(--color-dark-1)]">
              Sistema de Gestión de Prácticas Clínicas
            </h1>

            <div className="relative mb-5">
              <label htmlFor="email" className="absolute -top-2.5 left-3 bg-[var(--color-white)] px-1 text-xs text-[var(--color-blue-1)]">Usuario</label>
              <input id="email" name="email" type="email" required placeholder="example@mail.com"
                className="w-full p-3.5 pr-10 border-gray-300 rounded-lg focus:border-[var(--color-blue-2)] outline-none transition"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16c1.1 0 2.9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
            </div>

            <div className="relative mb-6">
              <label htmlFor="password" className="absolute -top-2.5 left-3 bg-[var(--color-white)] px-1 text-xs text-[var(--color-blue-1)]">Contraseña</label>
              <input id="password" name="password" type="password" required placeholder="********"
                className="w-full p-3.5 pr-10 border-gray-300 rounded-lg focus:border-[var(--color-blue-2)] outline-none transition"
              />
            </div>

            <button type="submit" className="w-full bg-[var(--color-blue-1)] hover:bg-[var(--color-dark-2)] text-white font-semibold py-3.5 rounded-lg transition">
              Iniciar sesión
            </button>
            <button type="submit" formAction={signup} className="w-full bg-gray-200 hover:bg-gray-300 text-[var(--color-dark-1)] font-semibold py-3.5 rounded-lg transition mt-2">
              Regístrate
            </button>

            <div className="flex justify-end mt-4 text-sm">
              <button type="submit" formAction={forgotPassword} className="text-[var(--color-blue-1)] font-semibold hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>
        </div>

        <div
          className="hidden lg:block relative bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop')" }}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-[#00171fb3] text-white text-xs text-center p-3 footer-copyright">
            © - Todos los derechos reservados
          </div>
        </div>
      </div>
    </main>
  );
} ya no vale*/ 

/*
import { headers } from 'next/headers'
import LoginForm from '@/app/components/LoginForm'

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="fill-[var(--color-blue-1)]"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
);

export default async function LoginPage({ searchParams }: { searchParams: { error?: string, success?: string } }) {
  const headersList = await headers()
  const host = headersList.get('host')?? 'localhost:3000'
  const protocol = host.includes('localhost')? 'http' : 'https'
  const origin = `${protocol}://${host}`
  
  const error = searchParams.error
  const success = searchParams.success

  return (
    <main className="min-h-screen bg-[var(--color-white)] text-[var(--color-dark-1)] flex items-center justify-center font-sans">
      {error && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg text-white bg-[var(--color-error)]">
          {decodeURIComponent(error)}
        </div>
      )}
      {success && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg text-white bg-[var(--color-blue-1)]">
          {decodeURIComponent(success)}
        </div>
      )}

      <div className="grid lg:grid-cols-2 w-full max-w-6xl h-screen max-h-[800px] shadow-xl rounded-xl overflow-hidden m-4 lg:m-0">
        <div className="bg-[var(--color-white)] p-8 md:p-16 flex-col justify-between">
          <div className="flex items-center gap-2 font-bold text-lg text-[var(--color-dark-2)] mb-8">
            <LogoIcon />
            <span>SIGPAC</span>
          </div>

          <LoginForm origin={origin} /> { /* Aquí va el Client Component con el ojito */ /*}
        </div>

        <div
          className="hidden lg:block relative bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop')" }}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-[#00171fb3] text-white text-xs text-center p-3 footer-copyright">
            © - Todos los derechos reservados
          </div>
        </div>
      </div>
    </main>
  );
}*/

import { headers } from 'next/headers'
import LoginForm from '@/app/components/LoginForm'

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="fill-[var(--color-blue-1)]"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
);

export default async function LoginPage({ searchParams }: { searchParams: { error?: string, success?: string } }) {
  const headersList = await headers()
  const host = headersList.get('host')?? 'localhost:3000'
  const protocol = host.includes('localhost')? 'http' : 'https'
  const origin = `${protocol}://${host}`
  
  const error = searchParams.error
  const success = searchParams.success

  return (
    <main className="min-h-screen flex items-center justify-center">
      {error && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg text-white bg-[var(--color-error)]">
          {decodeURIComponent(error)}
        </div>
      )}
      {success && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg text-white bg-[var(--color-blue-1)]">
          {decodeURIComponent(success)}
        </div>
      )}

      <div className="grid lg:grid-cols-2 w-full max-w-6xl h-screen max-h-[800px] shadow-xl rounded-xl overflow-hidden m-4 lg:m-0 bg-[var(--color-white)]">
        <div className="p-8 md:p-16 flex-col justify-between">
          <div className="flex items-center gap-2 font-bold text-lg text-[var(--color-dark-2)] mb-8">
            <LogoIcon />
            <span>SIGPAC</span>
          </div>

          <LoginForm origin={origin} />
        </div>

        <div
          className="hidden lg:block relative bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop')" }}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-[#00171fb3] text-white text-xs text-center p-3 footer-copyright">
            © - Todos los derechos reservados
          </div>
        </div>
      </div>
    </main>
  );
}