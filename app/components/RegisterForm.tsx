'use client'
import { useState, useTransition } from 'react'
import { checkDni, register } from '@/app/actions/auth'
import { useFormStatus } from 'react-dom'

const EyeIcon = ({ open }: { open: boolean }) => open? ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg> ) : ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> );
const MailIcon = () => ( <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2.9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> );

function SubmitButton({ children, formAction }: { children: React.ReactNode, formAction: any }) {
  const { pending } = useFormStatus()
  return <button type="submit" formAction={formAction} disabled={pending} className="w-full bg-[var(--color-blue-1)] hover:bg-[var(--color-dark-2)] text-white font-semibold py-3.5 rounded-lg transition disabled:opacity-50">{pending? 'Cargando...' : children}</button>
}

export default function RegisterForm({ origin }: { origin: string }) {
  const [dni, setDni] = useState('')
  const [personaData, setPersonaData] = useState<any>(null)
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleCheckDni = async (formData: FormData) => {
    setMessage(null)
    startTransition(async () => {
      const result = await checkDni(formData)
      if (result.error) {
        setMessage({ type: 'error', text: result.error })
        setPersonaData(null)
      } else {
        setMessage({ type: 'success', text: `Hola ${result.persona.nombres} ${result.persona.apellidos}` })
        setPersonaData(result.persona)
      }
    })
  }

  const isLocked =!personaData

  return (
    <form className="w-full max-w-sm mx-auto space-y-4">
      <input type="hidden" name="origin" value={origin} />
      <input type="hidden" name="idpersona" value={personaData?.idpersona?? ''} />
      <input type="hidden" name="nombres" value={personaData?.nombres?? ''} />
      <input type="hidden" name="apellidos" value={personaData?.apellidos?? ''} />
      <input type="hidden" name="idrol" value={personaData?.idrol?? ''} />
      <input type="hidden" name="usuario" value={personaData?.usuario?? ''} />

      <h1 className="text-3xl font-bold mb-6">Crear Cuenta</h1>
      
      {/* 1. DNI */}
      <fieldset className="relative border rounded-lg border-[var(--color-blue-2)]">
        <legend className="px-1 ml-2 text-xs text-[var(--color-blue-1)]">DNI</legend>
        <div className="flex items-center">
          <input id="dni" name="dni" type="text" maxLength={8} pattern="\d{8}" required placeholder="8 dígitos" value={dni} onChange={e => setDni(e.target.value.replace(/\D/g, ''))} className="w-full p-3 pl-3 bg-transparent outline-none" />
          <SubmitButton formAction={handleCheckDni}>Validar</SubmitButton>
        </div>
      </fieldset>

      {message && <p className={`text-sm ${message.type === 'error'? 'text-[var(--color-error)]' : 'text-green-600'}`}>{message.text}</p>}

      {/* 2. Campos bloqueados hasta validar DNI */}
      <fieldset className={`relative border rounded-lg transition ${isLocked? 'border-gray-300 bg-gray-50' : 'border-[var(--color-blue-2)]'}`}>
        <legend className={`px-1 ml-2 text-xs ${isLocked? 'text-gray-400' : 'text-[var(--color-blue-1)]'}`}>Usuario</legend>
        <input name="email_display" type="text" value={personaData?.usuario?? ''} disabled className="w-full p-3 pl-3 bg-transparent outline-none disabled:text-gray-500" />
      </fieldset>
      
      <fieldset className={`relative border rounded-lg transition ${isLocked? 'border-gray-300 bg-gray-50' : 'border-[var(--color-blue-2)]'}`}>
        <legend className={`px-1 ml-2 text-xs ${isLocked? 'text-gray-400' : 'text-[var(--color-blue-1)]'}`}>Email</legend>
        <div className="flex items-center">
          <input id="email" name="email" type="email" required disabled={isLocked} className="w-full p-3 pl-3 bg-transparent outline-none disabled:bg-gray-50" />
          <span className="pr-3 text-gray-400"><MailIcon /></span>
        </div>
      </fieldset>

      <fieldset className={`relative border rounded-lg transition ${isLocked? 'border-gray-300 bg-gray-50' : 'border-[var(--color-blue-2)]'}`}>
        <legend className={`px-1 ml-2 text-xs ${isLocked? 'text-gray-400' : 'text-[var(--color-blue-1)]'}`}>Confirmar Email</legend>
        <input id="email2" name="email2" type="email" required disabled={isLocked} className="w-full p-3 pl-3 bg-transparent outline-none disabled:bg-gray-50" />
      </fieldset>

      <fieldset className={`relative border rounded-lg transition ${isLocked? 'border-gray-300 bg-gray-50' : 'border-[var(--color-blue-2)]'}`}>
        <legend className={`px-1 ml-2 text-xs ${isLocked? 'text-gray-400' : 'text-[var(--color-blue-1)]'}`}>Contraseña</legend>
        <div className="flex items-center">
          <input id="password" name="password" type={showPassword? 'text' : 'password'} required disabled={isLocked} className="w-full p-3 pl-3 bg-transparent outline-none disabled:bg-gray-50" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={isLocked} className="pr-3 text-gray-400 hover:text-[var(--color-blue-1)] disabled:opacity-50"><EyeIcon open={showPassword} /></button>
        </div>
      </fieldset>
      
      <fieldset className={`relative border rounded-lg transition ${isLocked? 'border-gray-300 bg-gray-50' : 'border-[var(--color-blue-2)]'}`}>
        <legend className={`px-1 ml-2 text-xs ${isLocked? 'text-gray-400' : 'text-[var(--color-blue-1)]'}`}>Confirmar Contraseña</legend>
        <input id="password2" name="password2" type="password" required disabled={isLocked} className="w-full p-3 pl-3 bg-transparent outline-none disabled:bg-gray-50" />
      </fieldset>

      <SubmitButton formAction={register}>Crear</SubmitButton>
      <button type="reset" onClick={() => { setDni(''); setPersonaData(null); setMessage(null); }} className="w-full bg-gray-200 hover:bg-gray-300 font-semibold py-3.5 rounded-lg transition">Cancelar</button>
    </form>
  )
}