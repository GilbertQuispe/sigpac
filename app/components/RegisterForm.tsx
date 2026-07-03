'use client'
import { useState } from 'react'
import Link from 'next/link'
import { checkDni, register } from '@/app/actions/auth'

const SearchIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> );
const EyeIcon = ({ open }: { open: boolean }) => open? ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg> ) : ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> );
const MailIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> );

type PersonaData = { idpersona: number; nombres: string; apellidos: string; idrol: number; }

export default function RegisterForm({ origin }: { origin: string }) {
  const [dni, setDni] = useState('')
  const [persona, setPersona] = useState<PersonaData | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isLocked = !persona // Si no hay persona, todo está bloqueado

  const handleValidateDni = async () => {
    if (dni.length !== 8) return setError('DNI debe tener 8 dígitos')
    setLoading(true)
    setError('')
    const formData = new FormData()
    formData.append('dni', dni)
    const result = await checkDni(formData)
    setLoading(false)
    if (result.error) { setError(result.error); setPersona(null) } 
    else { setPersona(result.persona) }
  }

  return (
    <form action={register} className="w-full max-w-sm mx-auto space-y-6">
      <input type="hidden" name="origin" value={origin} />
      <input type="hidden" name="idpersona" value={persona?.idpersona ?? ''} />
      <input type="hidden" name="nombres" value={persona?.nombres ?? ''} />
      <input type="hidden" name="apellidos" value={persona?.apellidos ?? ''} />
      <input type="hidden" name="idrol" value={persona?.idrol ?? ''} />

      <div>
        <p className="text-sm text-gray-500 mb-2">Crear Cuenta</p>
        {/* 2. Nombres al costado si está validado */}
          {persona && (
            <p className="text-center text-sm font-semibold text-green-600">Bienvenido:&nbsp; 
              {persona.nombres}&nbsp;{persona.apellidos}
            </p>
          )}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[var(--color-dark-1)] leading-tight">
            Sistema de Gestión de<br />Prácticas Clínicas
          </h1>
          
        </div>
      </div>

      {/* DNI con lupa */}
      <fieldset className="relative border rounded-lg border-[var(--color-blue-2)] focus-within:border-[var(--color-blue-1)] transition">
        <legend className="px-1 ml-3 text-xs text-[var(--color-blue-1)]">DNI</legend>
        <div className="flex items-center h-12">
          <input 
            name="dni" 
            type="text" 
            inputMode="numeric" 
            maxLength={8} 
            pattern="\d{8}" 
            required 
            autoComplete="off"
            placeholder="Ingresa tu DNI (8 dígitos)"
            value={dni}
            onChange={e => { setDni(e.target.value.replace(/\D/g, '')); setPersona(null); setError(''); }} // Si cambia DNI, resetea
            className="w-full p-3 pl-4 bg-transparent outline-none placeholder:text-gray-400"
          />
          <button type="button" onClick={handleValidateDni} disabled={loading} className="pr-3 text-gray-500 hover:text-[var(--color-blue-1)] disabled:opacity-50">
            <SearchIcon />
          </button>
        </div>
      </fieldset>

      {/* 1. El error va aquí abajo, no tapa el input */}
      {error && <p className="text-[var(--color-error)] text-sm -mt-4 text-center" >{error}</p>}

      {/* 3. Todo esto está deshabilitado por defecto */}
      <fieldset className={`relative border rounded-lg transition ${isLocked ? 'border-gray-300 bg-gray-50' : 'border-[var(--color-blue-2)] focus-within:border-[var(--color-blue-1)]'}`}>
        <legend className={`px-1 ml-3 text-xs ${isLocked ? 'text-gray-400' : 'text-[var(--color-blue-1)]'}`}>Email</legend>
        <div className="flex items-center">
          <input name="email" type="email" required disabled={isLocked} placeholder="example@mail.com" className="w-full p-3 pl-4 bg-transparent outline-none placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-500" />
          <span className={`pr-3 ${isLocked ? 'text-gray-300' : 'text-gray-400'}`}><MailIcon /></span>
        </div>
      </fieldset>

      <fieldset className={`relative border rounded-lg transition ${isLocked ? 'border-gray-300 bg-gray-50' : 'border-[var(--color-blue-2)] focus-within:border-[var(--color-blue-1)]'}`}>
        <legend className={`px-1 ml-3 text-xs ${isLocked ? 'text-gray-400' : 'text-[var(--color-blue-1)]'}`}>Contraseña</legend>
        <div className="flex items-center h-12">
          <input name="password" type={showPassword ? 'text' : 'password'} required disabled={isLocked} minLength={6} placeholder="********" className="w-full p-3 pl-4 bg-transparent outline-none placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-500" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={isLocked} className="pr-3 text-gray-400 hover:text-[var(--color-blue-1)] disabled:opacity-50"><EyeIcon open={showPassword} /></button>
        </div>
      </fieldset>

      <fieldset className={`relative border rounded-lg transition ${isLocked ? 'border-gray-300 bg-gray-50' : 'border-[var(--color-blue-2)] focus-within:border-[var(--color-blue-1)]'}`}>
        <legend className={`px-1 ml-3 text-xs ${isLocked ? 'text-gray-400' : 'text-[var(--color-blue-1)]'}`}>Confirmar contraseña</legend>
        <div className="flex items-center">
          <input name="password2" type={showPassword2 ? 'text' : 'password'} required disabled={isLocked} minLength={6} placeholder="********" className="w-full p-3 pl-4 bg-transparent outline-none placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-500" />
          <button type="button" onClick={() => setShowPassword2(!showPassword2)} disabled={isLocked} className="pr-3 text-gray-400 hover:text-[var(--color-blue-1)] disabled:opacity-50"><EyeIcon open={showPassword2} /></button>
        </div>
      </fieldset>

      {/* Botones */}
      <div className="flex gap-4 pt-2">
        {/* 1. Agregué border al cancelar */}
        <button type="reset" onClick={() => { setDni(''); setPersona(null); setError(''); }} className="w-full bg-white !border !border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3.5 rounded-lg transition">
          Cancelar
        </button>
        {/* 3. Botón Crear deshabilitado hasta validar */}
        <button type="submit" disabled={isLocked} className="w-full bg-[var(--color-blue-1)] hover:bg-[var(--color-dark-2)] text-white font-semibold py-3.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
          Crear
        </button>
      </div>
{/* Link Login */}
      <div className="text-center text-sm mt-6">
        <span className="text-gray-600">¿Ya eres miembro? </span>
        <Link href="/" className="font-semibold text-[var(--color-blue-1)] hover:underline">
          Inicia Sesión
        </Link>
      </div>

    </form>
  )
}