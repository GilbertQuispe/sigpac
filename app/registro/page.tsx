import { headers } from 'next/headers'
import Link from 'next/link'
import RegisterForm from '@/app/components/RegisterForm'

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="fill-[var(--color-blue-1)]"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
);

export default async function RegistroPage({ searchParams }: { searchParams: { error?: string, success?: string } }) {
  const headersList = await headers()
  const host = headersList.get('host')?? 'localhost:3000'
  const protocol = host.includes('localhost')? 'http' : 'https'
  const origin = `${protocol}://${host}`
  
  const error = searchParams.error
  const success = searchParams.success

  return (
    <main className="min-h-screen flex items-center justify-center">
      {error && <div className="fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg text-white bg-[var(--color-error)]">{decodeURIComponent(error)}</div>}
      {success && <div className="fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg text-white bg-[var(--color-blue-1)]">{decodeURIComponent(success)}</div>}

      <div className="grid lg:grid-cols-2 w-full max-w-6xl h-screen max-h-[800px] shadow-xl rounded-xl overflow-hidden m-4 lg:m-0 bg-[var(--color-white)]">
        <div className="p-8 md:p-16 flex-col justify-between">
          <div className="flex items-center gap-2 font-bold text-lg text-[var(--color-dark-2)] mb-8">
            <LogoIcon />
            <span>SIGPAC</span>
          </div>
          <RegisterForm origin={origin} />
          {/* <div className="text-sm mt-6 text-center">
            <span className="text-gray-600">¿Ya eres miembro? </span>
            <Link href="/" className="text-[var(--color-blue-1)] font-semibold hover:underline">Inicia Sesión</Link>
          </div> */}
        </div>

        <div className="hidden lg:block relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop')" }}>
          <div className="absolute bottom-0 left-0 right-0 bg-[#00171fb3] text-white text-xs text-center p-3 footer-copyright">© - Todos los derechos reservados</div>
        </div>
      </div>
    </main>
  );
}