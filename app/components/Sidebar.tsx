'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, ChevronRight, Shield, Users, Hospital, GraduationCap, ClipboardList, BarChart3, ScrollText, Settings, FileText } from 'lucide-react'

const MENU = [
  { label: '1. Administración y Seguridad', icon: <Shield size={18} />, children: [
    { label: '1.1 Roles', href: '/admin/roles' }, { label: '1.2 Permisos', href: '/admin/permisos' },
    { label: '1.3 Usuarios', href: '/admin/usuarios' }, { label: '1.4 Asignación de Roles', href: '/admin/asignacion' },
    { label: '1.5 Gestión de Personas', href: '/admin/personas' },
  ]},
  { label: '2. Personas', icon: <Users size={18} />, children: [
    { label: '2.1 Personas', href: '/personas' }, { label: '2.2 Estudiantes', href: '/personas/estudiantes' },
    { label: '2.3 Docentes', href: '/personas/docentes' }, { label: '2.4 Supervisores', href: '/personas/supervisores' },
  ]},
  { label: '3. Gestión de Instituciones de Salud', icon: <Hospital size={18} />, children: [
    { label: '3.1 Ubigeo', href: '/salud/ubigeo' }, { label: '3.5 Campos Clínicos', href: '/salud/campos' },
    { label: '3.8 Horarios Docencia', href: '/salud/horarios' },
  ]},
  { label: '4. Gestión Académica', icon: <GraduationCap size={18} />, children: [
    { label: '4.1 Matrículas', href: '/academico/matriculas' }, { label: '4.2 Carga Académica', href: '/academico/carga' },
  ]},
  { label: '5. Supervisión Clínica', icon: <ClipboardList size={18} />, children: [
    { label: '5.1 Asignación Supervisores', href: '/supervision/asignacion' }, { label: '5.3 Registro', href: '/supervision/registro' },
  ]},
  { label: '6. Instrumentos de Evaluación', icon: <FileText size={18} />, children: [
    { label: '6.1 Fichas de Supervisión', href: '/instrumentos/fichas' },
  ]},
  { label: '7. Configuración Académica', icon: <Settings size={18} />, children: [
    { label: '7.1 Períodos Académicos', href: '/config/periodos' }, { label: '7.5 Carreras', href: '/config/carreras' },
  ]},
  { label: '8. Reportes e Inteligencia', icon: <BarChart3 size={18} />, children: [
    { label: '8.1 Dashboard Ejecutivo', href: '/dashboard' },
    { label: '8.2 Reportes', children: [
      { label: '8.2.1 Académicos', href: '/reportes/academicos' },
      { label: '8.2.2 Supervisión', href: '/reportes/supervision' },
    ]},
  ]},
  { label: '9. Auditoría', icon: <ScrollText size={18} />, children: [
    { label: '9.1 Bitácora', href: '/auditoria/bitacora' },
  ]},
]

export default function Sidebar() {
  const pathname = usePathname()
  // Abre todos por defecto para que veas que sí están
  //const [open, setOpen] = useState(MENU.map(m => m.label)) 
  const [open, setOpen] = useState<string[]>([]) 

  const renderChildren = (children: any[], level = 1) => children.map(c => (
    <div key={c.href || c.label}>
      {c.href ? (
        <Link href={c.href} className={`block px-3 py-2 rounded-lg ${pathname===c.href ? 'bg-accent text-white' : 'hover:bg-accent/10 text-dark-1'}`} style={{marginLeft: `${level*12}px`}}>
          {c.label}
        </Link>
      ) : (
        <p className="px-3 py-1 text-xs font-semibold text-dark-1/60" style={{marginLeft: `${level*12}px`}}>{c.label}</p>
      )}
      {c.children && renderChildren(c.children, level+1)}
    </div>
  ))

  return (
    <nav className="p-3 space-y-1 bg-white h-full border-r border-dark-1/10 text-sm overflow-y-auto">
      {MENU.map(m => (
        <div key={m.label}>
          <button onClick={() => setOpen(o => o.includes(m.label) ? o.filter(x=>x!==m.label) : [...o,m.label])}
            className="w-full flex items-center justify-between px-3 py-2.5 font-semibold text-primary hover:bg-accent/10 rounded-lg">
            <span className="flex items-center gap-3">{m.icon} {m.label}</span>
            {open.includes(m.label) ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
          </button>
          {open.includes(m.label) && m.children && renderChildren(m.children)}
        </div>
      ))}
    </nav>
  )
}