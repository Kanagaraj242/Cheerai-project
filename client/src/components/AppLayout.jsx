import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'
import { SECTIONS } from '../data/cheerio.js'
import { useStore } from '../store-context.js'
import '../styles/app.css'

const NAV_ICONS = {
  dashboard: 'home',
  inbox: 'chat',
  contacts: 'contacts',
  campaigns: 'send',
  workflows: 'flow',
  connectors: 'robot',
}

export default function AppLayout() {
  const navigate = useNavigate()
  const { conversations } = useStore()
  const unread = conversations.filter((c) => c.unread > 0).length
  const location = useLocation()
  const [backendStatus, setBackendStatus] = useState('checking…')
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/health`)
      .then((res) => res.json())
      .then((data) => setBackendStatus(data.status))
      .catch(() => setBackendStatus('unreachable'))
  }, [])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const flash = (text) => {
    setToast(text)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2600)
  }

  const section = SECTIONS.find((s) => s.path === location.pathname) ?? SECTIONS[0]
  const primary = SECTIONS.filter((s) => !s.group)
  const automation = SECTIONS.filter((s) => s.group === 'AUTOMATION')

  const navButton = (s) => (
    <NavLink key={s.key} to={s.path} className={({ isActive }) => `nv${isActive ? ' on' : ''}`}>
      <Icon name={NAV_ICONS[s.key]} />
      <span className="lb">{s.label}</span>
      {s.key === 'inbox' && unread > 0 && <span className="ct num">{unread}</span>}
    </NavLink>
  )

  return (
    <div id="app">
      <aside className="side">
        <div className="brand"><span className="mk">C</span><b>Cheerio AI</b></div>
        {primary.map(navButton)}
        <div className="sec">AUTOMATION</div>
        {automation.map(navButton)}

        <div className="plan">
          <div className="btw">
            <span style={{ fontSize: 12.5, fontWeight: 600 }}>Automation tasks</span>
            <span className="xs mut num">62%</span>
          </div>
          <div className="tk"><i style={{ width: '62%' }}></i></div>
          <div className="xs mut num">31,240 of 50,000 used · resets in 12 days</div>
          <button className="btn sm2" style={{ justifyContent: 'center' }} onClick={() => flash('Billing is not part of this build yet')}>
            Upgrade plan
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="top">
          <div>
            <h1>{section.title[0]}</h1>
            <div className="sb">{section.title[1]} · backend {backendStatus}</div>
          </div>
          <div className="gr"></div>
          <div className="srch"><Icon name="search" /><span>Search or ask Cheerio…</span></div>
          <button className="ico" onClick={() => flash('Help centre is not wired up yet')}><Icon name="help" /></button>
          <button className="ico" onClick={() => flash('12 notifications — panel not built yet')}>
            <Icon name="bell" /><span className="dot">12</span>
          </button>
          <button className="me" onClick={() => navigate('/')} title="Sign out">
            <span className="av a32">AK</span>
            <span style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.2 }}>Arjun Kumar</div>
              <div style={{ fontSize: 11, color: 'var(--ink3)' }}>Admin</div>
            </span>
          </button>
        </header>

        <Outlet context={{ flash }} />
      </main>

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
