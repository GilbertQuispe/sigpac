'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title } from 'chart.js'
import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title)

type Usuario = { idrol: number; nombres: string; apellidos: string }
type Kpis = Record<string, number>

const COLORS = { c1: '#00171f', c2: '#003459', c3: '#007ea7', c4: '#00a8e8', c5: '#ffffff' }

export default function DashboardPage() {
  const [user, setUser] = useState<Usuario | null>(null)
  const [kpis, setKpis] = useState<Kpis>({})
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [clock, setClock] = useState('')
  const router = useRouter()

  // 1. GUARD OWASP: Protección de Ruta + RBAC
useEffect(() => {
  const guard = async () => {
    const { data: { session } }= await supabase.auth.getSession() // <- 2 } aquí
    if (!session) return router.push('/')

    const { data } = await supabase.from('v_usuario_completo').select('idrol, nombres, apellidos').eq('auth_id', session.user.id).single()
    if (!data || data.idrol!== 1) return router.push('/') // Solo Admin

    setUser(data)
    loadData()
  }
  guard()
}, [router])

  // 2. Reloj en tiempo real
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleString('es-PE'))
    tick(); const i = setInterval(tick, 1000)
    return () => clearInterval(i)
  }, [])

 // const loadData = async () => {
 //   const { data: periodo } = await supabase.from('periodoacademico').select('codigo').order('codigo', {ascending:false}).limit(1).single()
 //   await fetchKPIs(periodo.codigo)
 //   setLoading(false)
 // }
 //3.1 LoadDATA
 const loadData = async () => {
  try {
    // 1. Intenta traer el periodo. Si falla, usa 202610 por defecto
    const { data: periodoData } = await supabase.from('periodoacademico').select('codigo').order('codigo', {ascending:false}).limit(1).single()
    const periodo = periodoData?.codigo || '202610' // <- Fallback
    
    await fetchKPIs(periodo)
  } catch (error) {
    console.error("Error cargando KPIs:", error)
    // Si falla Supabase, pon KPIs falsos para ver el diseño
    setKpis({
      Estudiantes: 120, Docentes: 15, Supervisores: 8,
      'Sup. Programadas': 12, 'Sup. Ejecutadas': 45, Incidencias: 3, Informes: 10
    })
  } finally {
    setLoading(false) // <- Esto es clave. Siempre se ejecuta
  }
}
  // 3. Modularidad: fetchKPIs()
  const fetchKPIs = async (periodo: string) => {
    const [est, doc, sup, prog, exec, inc, inf] = await Promise.all([
      supabase.from('matricula').select('*', {count:'exact', head:true}).eq('periodo', periodo),
      supabase.from('docente').select('*', {count:'exact', head:true}),
      supabase.from('supervisor').select('*', {count:'exact', head:true}),
      supabase.from('supervision').select('*', {count:'exact', head:true}).eq('periodo', periodo).eq('estado','programada'),
      supabase.from('supervision').select('*', {count:'exact', head:true}).eq('periodo', periodo).eq('estado','ejecutada'),
      supabase.from('incidencia').select('*', {count:'exact', head:true}).eq('periodo', periodo),
      supabase.from('informe').select('*', {count:'exact', head:true}).eq('periodo', periodo),
    ])
    setKpis({
      Estudiantes: est.count?? 0, Docentes: doc.count?? 0, Supervisores: sup.count?? 0,
      'Sup. Programadas': prog.count?? 0, 'Sup. Ejecutadas': exec.count?? 0, Incidencias: inc.count?? 0, Informes: inf.count?? 0
    })
  }

  const logout = async () => { await supabase.auth.signOut(); router.push('/') }

  if (!user) return null // Evita parpadeo

  // 4. Modularidad: buildSidebar()
  const menu = [
    {icon:'🛡️', title:'Administración', items:['Roles','Usuarios']},
    {icon:'👥', title:'Personas', items:['Estudiantes','Docentes']},
    {icon:'🏥', title:'Instituciones', items:['Campos Clínicos','EPS']},
    {icon:'📊', title:'Reportes', items:['Dashboard Ejecutivo']}
  ]

  // Data mock para charts. Reemplaza con supabase.from('v_...')
  const chartDataPie = { labels: ['Medicina', 'Cirugía', 'Pediatría'], datasets: [{ data: [12, 19, 3], backgroundColor: [COLORS.c3, COLORS.c4, COLORS.c2] }] }
  const chartDataBar = { labels: ['MINSA', 'ESSALUD', 'OTROS'], datasets: [{ label: 'Campos Activos', data: [5, 3, 2], backgroundColor: COLORS.c3 }] }

  return (
    <div style={styles.layout}>
      <style>{`:root{--copyright-text:"2026 GAQE. Todos los derechos reservados"}`}</style>
      
      <aside style={{...styles.sidebar,...(!sidebarOpen && styles.sidebarCollapsed)}}>
        <h2 style={styles.logo}>SIGPAC</h2>
        <nav>
          {menu.map(m => (
            <div key={m.title}>
              <a style={styles.navLink}><span>{m.icon}</span> {sidebarOpen && m.title}</a>
              {sidebarOpen && m.items.map(i => <a key={i} style={styles.subLink}>{i}</a>)}
            </div>
          ))}
        </nav>
      </aside>

      <div style={styles.main}>
        <header style={styles.header}>
          <div style={{display:'flex', gap:'1rem', alignItems:'center'}}>
            <button onClick={()=>setSidebarOpen(!sidebarOpen)} style={styles.hamburger}>☰</button>
            <h1 style={styles.h1}>Sistema de Gestión de Prácticas Clínicas</h1>
          </div>
          <div style={styles.headerRight}>
            <span style={styles.clock}>{clock}</span>
            <span>{user.nombres} {user.apellidos}</span> {/* textContent = Anti XSS */}
            <button onClick={logout} style={styles.btnLogout}>Salir</button>
          </div>
        </header>

        <main style={styles.content}>
          {loading? <div style={styles.spinner}></div> : (
            <>
              <div style={styles.alerts}>
                <li>⚠ 12 supervisiones pendientes</li>
                <li>⚠ 3 campos clínicos sin docente</li>
              </div>

              <section style={styles.kpiGrid}>
                {Object.entries(kpis).map(([k,v])=>(
                  <div key={k} style={styles.kpi}><h3>{k}</h3><p>{v}</p></div>
                ))}
              </section>

              <section style={styles.chartsGrid}>
                <div style={styles.card}><h4>Supervisiones por Asignatura</h4><Pie data={chartDataPie} /></div>
                <div style={styles.card}><h4>Campos Clínicos por EPS</h4><Bar data={chartDataBar} /></div>
                <div style={styles.card}><h4>Cumplimiento</h4><Doughnut data={{labels:['Ejecutadas','Pendientes'], datasets:[{data:[kpis['Sup. Ejecutadas']||0, kpis['Sup. Programadas']||0]}]}} /></div>
              </section>
            </>
          )}
        </main>
        <footer style={styles.footer}></footer>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  layout:{display:'flex',minHeight:'100vh',background:'#f5f7fa',color:COLORS.c1},
  sidebar:{width:260,background:COLORS.c2,color:COLORS.c5,transition:'width.3s',padding:'1rem 0'},
  sidebarCollapsed:{width:70},
  logo:{padding:'0 1rem',fontSize:'1.2rem',borderBottom:'1px solid #fff2',paddingBottom:'1rem'},
  navLink:{display:'flex',alignItems:'center',gap:'.75rem',padding:'.75rem 1rem',color:COLORS.c5,textDecoration:'none',borderRadius:8,margin:'.25rem.5rem',cursor:'pointer',transition:'background.2s'},
  subLink:{display:'block',padding:'.5rem 1rem.5rem 2.5rem',color:'#ccc',fontSize:'.9rem',cursor:'pointer'},
  main:{flex:1,display:'flex',flexDirection:'column'},
  header:{background:COLORS.c5,borderBottom:'1px solid #ddd',padding:'1rem 1.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0},
  h1:{fontSize:'1.25rem',color:COLORS.c2},
  headerRight:{display:'flex',alignItems:'center',gap:'1rem'},
  clock:{fontFamily:'monospace',fontSize:'.9rem'},
  btnLogout:{background:COLORS.c3,color:'#fff',border:0,padding:'.5rem.75rem',borderRadius:8,cursor:'pointer'},
  hamburger:{display:'none',background:'none',border:0,fontSize:'1.5rem',cursor:'pointer'},
  content:{padding:'1.5rem',flex:1,overflowY:'auto'},
  alerts:{background:'#fff3cd',border:'1px solid #ffeeba',padding:'1rem',borderRadius:12,marginBottom:'1.5rem',listStyle:'none'},
  kpiGrid:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'1rem',marginBottom:'1.5rem'},
  kpi:{background:COLORS.c5,padding:'1rem',borderRadius:12,boxShadow:'0 2px 8px #0001',borderLeft:`4px solid ${COLORS.c4}`},
  chartsGrid:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'1rem'},
  card:{background:COLORS.c5,padding:'1rem',borderRadius:12,boxShadow:'0 2px 8px #0001'},
  footer:{padding:'1rem',textAlign:'center',fontSize:'.85rem',color:'#666'},
  spinner:{border:'3px solid #eee',borderTop:`3px solid ${COLORS.c3}`,borderRadius:'50%',width:24,height:24,animation:'spin 1s linear infinite',margin:'auto'},
  // @media no se puede en inline styles. Usa Tailwind o CSS Modules para mobile.
}
// Añade @keyframes spin en globals.css