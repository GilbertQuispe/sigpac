'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const EyeIcon = ({ open }: { open: boolean }) => open? (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
) : (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="fill-[var(--color-blue-1)]"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'error' | 'success' } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const showToast = (msg: string, type: 'error' | 'success' = 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = isLogin
    ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${location.origin}/dashboard` } });

    if (error) showToast(error.message, 'error');
    else {
      if (isLogin) {
        showToast('¡Login exitoso!', 'success');
        router.push('/dashboard');
      } else {
        showToast('Revisa tu correo para confirmar tu cuenta', 'success');
      }
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) return showToast('Ingresa tu correo primero');
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}` });
    if (error) showToast(error.message);
    else showToast('Revisa tu correo para restablecer', 'success');
  };

  const handleCancel = () => {
    setEmail('');
    setPassword('');
    showToast('Formulario limpiado', 'success');
  };

  return (
    <main className="min-h-screen bg-[var(--color-white)] text-[var(--color-dark-1)] flex items-center justify-center font-sans">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg text-white transition-all duration-300 ${toast.type === 'success'? 'bg-[var(--color-blue-1)]' : 'bg-[var(--color-error)]'}`}>
          {toast.msg}
        </div>
      )}

      <div className="grid lg:grid-cols-2 w-full max-w-6xl h-screen max-h-[800px] shadow-xl rounded-xl overflow-hidden m-4 lg:m-0">
        <div className="bg-[var(--color-white)] p-8 md:p-16 flex-col justify-between">
          <div className="flex items-center gap-2 font-bold text-lg text-[var(--color-dark-2)]">
            <LogoIcon />
            <span>SIGPAC</span>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
            <h2 className="text-sm text-gray-600">Bienvenido de vuelta</h2>
            <h1 className="text-3xl font-bold mt-2 mb-8 text-[var(--color-dark-1)]">
              {isLogin? 'Sistema de Gestión de Prácticas Clínicas' : 'Crear cuenta en SIGPAC'}
            </h1>

            <div className="relative mb-5">
              <label htmlFor="email" className="absolute -top-2.5 left-3 bg-[var(--color-white)] px-1 text-xs text-[var(--color-blue-1)]">Usuario</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="example@mail.com"
                className="w-full p-3.5 pr-10 border-gray-300 rounded-lg focus:border-[var(--color-blue-2)] outline-none transition"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16c1.1 0 2.9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
            </div>

            <div className="relative mb-6">
              <label htmlFor="password" className="absolute -top-2.5 left-3 bg-[var(--color-white)] px-1 text-xs text-[var(--color-blue-1)]">Contraseña</label>
              <input id="password" type={showPassword? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="********"
                className="w-full p-3.5 pr-10 border-gray-300 rounded-lg focus:border-[var(--color-blue-2)] outline-none transition"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--color-blue-1)]">
                <EyeIcon open={showPassword} />
              </button>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[var(--color-blue-1)] hover:bg-[var(--color-dark-2)] disabled:bg-gray-400 text-white font-semibold py-3.5 rounded-lg transition">
              {loading? 'Cargando...' : (isLogin? 'Iniciar sesión' : 'Regístrate')}
            </button>
            <button type="button" onClick={handleCancel} className="w-full bg-gray-200 hover:bg-gray-300 text-[var(--color-dark-1)] font-semibold py-3.5 rounded-lg transition mt-2">
              Cancelar
            </button>

            <div className="flex justify-between mt-4 text-sm">
              <span>
                {isLogin? '¿No eres usuario?' : '¿Ya tienes cuenta?'}
                <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }} className="text-[var(--color-blue-1)] font-semibold ml-1 hover:underline">
                  {isLogin? 'Regístrate' : 'Iniciar sesión'}
                </a>
              </span>
              <a href="#" onClick={(e) => { e.preventDefault(); handleForgotPassword(); }} className="text-[var(--color-blue-1)] font-semibold hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
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
}