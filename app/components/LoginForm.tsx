/*'use client'

import { useState } from 'react'
import { login, signup, forgotPassword } from '@/app/actions/auth'

const EyeIcon = ({ open }: { open: boolean }) => open? (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
) : (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

export default function LoginForm({ origin }: { origin: string }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
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
        <input id="password" name="password" type={showPassword? 'text' : 'password'} required placeholder="********"
          className="w-full p-3.5 pr-10 border-gray-300 rounded-lg focus:border-[var(--color-blue-2)] outline-none transition"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--color-blue-1)]">
          <EyeIcon open={showPassword} />
        </button>
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
  )
}*/
/*
'use client'
import { useState } from 'react'
import { login, signup, forgotPassword } from '@/app/actions/auth'

const EyeIcon = ({ open }: { open: boolean }) => open? (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
) : (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

export default function LoginForm({ origin }: { origin: string }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={login} className="w-full max-w-sm mx-auto">
      <input type="hidden" name="origin" value={origin} />
      
      <h2 className="text-sm text-gray-600">Bienvenido de vuelta</h2>
      <h1 className="text-3xl font-bold mt-2 mb-8">
        Sistema de Gestión de Prácticas Clínicas
      </h1>

      <div className="relative mb-5">
        <label htmlFor="email" className="absolute -top-2.5 left-3 bg-[var(--color-white)] px-1 text-xs text-[var(--color-blue-1)]">Usuario</label>
        <input id="email" name="email" type="email" required placeholder="example@mail.com"
          className="w-full p-3.5 pr-10 border-gray-300 rounded-lg focus:border-[var(--color-blue-2)] outline-none transition bg-[var(--color-white)]"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16c1.1 0 2.9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        </div>
      </div>

      <div className="relative mb-6">
        <label htmlFor="password" className="absolute -top-2.5 left-3 bg-[var(--color-white)] px-1 text-xs text-[var(--color-blue-1)]">Contraseña</label>
        <input id="password" name="password" type={showPassword? 'text' : 'password'} required placeholder="********"
          className="w-full p-3.5 pr-10 border-gray-300 rounded-lg focus:border-[var(--color-blue-2)] outline-none transition bg-[var(--color-white)]"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--color-blue-1)]">
          <EyeIcon open={showPassword} />
        </button>
      </div>

      <button type="submit" className="w-full bg-[var(--color-blue-1)] hover:bg-[var(--color-dark-2)] text-white font-semibold py-3.5 rounded-lg transition">
        Iniciar sesión
      </button>
      <button type="submit" formAction={signup} className="w-full bg-gray-200 hover:bg-gray-300 font-semibold py-3.5 rounded-lg transition mt-2">
        Regístrate
      </button>

      <div className="flex justify-end mt-4 text-sm">
        <button type="submit" formAction={forgotPassword} className="text-[var(--color-blue-1)] font-semibold hover:underline">
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </form>
  )
}*/

'use client'
import { useState } from 'react'
import { login, signup, forgotPassword } from '@/app/actions/auth'

const EyeIcon = ({ open }: { open: boolean }) => open? (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
) : (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

// Icono Correo = el de tu modelo
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export default function LoginForm({ origin }: { origin: string }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={login} className="w-full max-w-sm mx-auto space-y-5">
      <input type="hidden" name="origin" value={origin} />
      
      <h2 className="text-sm text-gray-600">Bienvenido de vuelta</h2>
      <h1 className="text-3xl font-bold mt-2 mb-8">
        Sistema de Gestión de Prácticas Clínicas
      </h1>

      {/* Campo Usuario - Estilo Outlined */}
      <fieldset className="relative border rounded-lg border-[var(--color-blue-2)] focus-within:border-[var(--color-blue-1)] transition">
        <legend className="px-1 ml-2 text-xs text-[var(--color-blue-1)]">Usuario</legend>
        <div className="flex items-center">
          <input 
            id="email" 
            name="email" 
            type="email" 
            required 
            placeholder="example@mail.com"
            className="w-full p-3 pl-3 bg-transparent outline-none"
          />
          <span className="pr-3 text-gray-400 pointer-events-none">
            <MailIcon /> { /* Cambia por <PersonIcon /> si quieres persona */}
          </span>
        </div>
      </fieldset>

      {/* Campo Contraseña - Estilo Outlined */}
      <fieldset className="relative border rounded-lg border-[var(--color-blue-2)] focus-within:border-[var(--color-blue-1)] transition">
        <legend className="px-1 ml-2 text-xs text-[var(--color-blue-1)]">Contraseña</legend>
        <div className="flex items-center">
          <input 
            id="password" 
            name="password" 
            type={showPassword? 'text' : 'password'} 
            required 
            placeholder="********"
            className="w-full p-3 pl-3 bg-transparent outline-none"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="pr-3 text-gray-400 hover:text-[var(--color-blue-1)]">
            <EyeIcon open={showPassword} />
          </button>
        </div>
      </fieldset>

      <button type="submit" className="w-full bg-[var(--color-blue-1)] hover:bg-[var(--color-dark-2)] text-white font-semibold py-3.5 rounded-lg transition">
        Iniciar sesión
      </button>
      <button type="submit" formAction={signup} className="w-full bg-gray-200 hover:bg-gray-300 font-semibold py-3.5 rounded-lg transition">
        Regístrate
      </button>

      {/* <div className="flex justify-end pt-2 text-sm">
        <button type="submit" formAction={forgotPassword} className="text-[var(--color-blue-1)] font-semibold hover:underline">
          ¿Olvidaste tu contraseña?
        </button>
      </div> */}
    </form>
  )
}