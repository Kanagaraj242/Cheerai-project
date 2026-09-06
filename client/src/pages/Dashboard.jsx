import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const ICONS = {
  bolt: <path d="M13 2.5 4.5 13.5H11l-1 8L19.5 10H13z" />,
  robot: <><rect x="3.5" y="8" width="17" height="12" rx="3" /><path d="M12 4.5V8M8.5 13.5h.01M15.5 13.5h.01M9.5 17h5" /></>,
  plug: <path d="M10 3.5h4v3a2 2 0 0 0 2 2h3v4h-3a2 2 0 0 0-2 2v3h-4v-3a2 2 0 0 0-2-2H5v-4h3a2 2 0 0 0 2-2z" />,
  flow: <><rect x="9" y="2.5" width="6" height="5" rx="1.5" /><rect x="2.5" y="16.5" width="6" height="5" rx="1.5" /><rect x="15.5" y="16.5" width="6" height="5" rx="1.5" /><path d="M12 7.5v4.5M5.5 16.5V12h13v4.5" /></>,
  spark: <><path d="m12 3 2 5.4 5.4 2-5.4 2-2 5.4-2-5.4-5.4-2 5.4-2z" /><path d="M18.5 15.5 19.4 18l2.5.9-2.5.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9z" /></>,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>,
  warn: <><path d="M12 3.5 21.5 20H2.5z" /><path d="M12 10v4M12 17h.01" /></>,
  cart: <><path d="M3 4h2.2l2.3 11.5h10.2L20 7.5H6" /><circle cx="9" cy="19.5" r="1.6" /><circle cx="17.5" cy="19.5" r="1.6" /></>,
}

function Icon({ name, className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style}>
      {ICONS[name]}
    </svg>
  )
}

const NAV = [
  { key: 'dash', label: 'Dashboard', icon: <path d="M3 10.2 12 3l9 7.2V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /> },
  { key: 'inbox', label: 'Inbox', count: 14, icon: <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.5-.7L3 21l1.8-5.1A8.3 8.3 0 0 1 3.6 11.5 8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4z" /> },
  { key: 'contacts', label: 'Contacts', icon: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></> },
  { key: 'campaigns', label: 'Campaigns', icon: <><path d="M21.5 2.5 2.5 10l7.6 2.9L13 20.5z" /><path d="m10.1 12.9 4.3-4.3" /></> },
]
const AUTOMATION_NAV = [
  { key: 'builder', label: 'Workflows', icon: <><rect x="9" y="2.5" width="6" height="5" rx="1.5" /><rect x="2.5" y="16.5" width="6" height="5" rx="1.5" /><rect x="15.5" y="16.5" width="6" height="5" rx="1.5" /><path d="M12 7.5v4.5M5.5 16.5V12h13v4.5" /></> },
  { key: 'connect', label: 'Connectors & Agents', icon: <><rect x="3.5" y="8" width="17" height="12" rx="3" /><path d="M12 4.5V8M8.5 13.5h.01M15.5 13.5h.01M9.5 17h5" /></> },
]

const STATS = [
  { lb: 'Automation tasks', vl: '31,240', dl: '18,760 remaining · resets in 12 days', up: 0, icon: 'bolt', col: 'var(--br)', bg: 'var(--brS)' },
  { lb: 'Active AI agents', vl: '2 of 3', dl: 'Retention Agent is paused', up: 0, icon: 'robot', col: 'var(--ok)', bg: 'var(--okS)' },
  { lb: 'Connected apps', vl: '8', dl: '1 needs attention', up: -1, icon: 'plug', col: 'var(--info)', bg: 'var(--infoS)' },
  { lb: 'Active workflows', vl: '12', dl: '3 added this month', up: 1, icon: 'flow', col: 'var(--warn)', bg: 'var(--warnS)' },
]

const WEEKS = ['Jul 7', 'Jul 14', 'Jul 21', 'Jul 28', 'Aug 4', 'Aug 11', 'Aug 18', 'Aug 25']
const REACH = [38, 44, 41, 52, 58, 55, 66, 74]
const CONV = [9, 12, 10, 15, 18, 16, 21, 26]
const SPARK_VALUES = [41, 48, 44, 56, 52, 63, 69, 66, 74, 71, 83, 92]

const RECS = [
  { icon: 'spark', t: 'Move 3 WhatsApp sends into the free session window', d: 'Roughly 1,840 messages a week currently go out as paid templates within 60 minutes of a customer reply. Reordering two workflow steps would make them free.', action: 'Save ~₹1,320/wk' },
  { icon: 'target', t: 'Retention Agent is switched off while churn is rising', d: '412 customers crossed 90 days inactive this month, up 18%. The agent already has a tested win-back flow ready to run.', action: 'Turn on agent' },
  { icon: 'warn', t: 'Instagram connector expires in 4 days', d: 'Three live workflows depend on it. If the token lapses, Instagram DMs will queue but not send.', action: 'Reconnect' },
  { icon: 'cart', t: 'Cart recovery converts best at 90 minutes, not 2 hours', d: 'Across 8,932 runs, the 90-minute cohort converted 4.8% versus 3.1% at two hours.', action: 'Adjust delay' },
]

const ACTIVITY = [
  { c: 'var(--ok)', t: 'Sales Agent qualified <b>Priya Mehta</b> as high intent', m: 'Routed to sales queue · 2 min ago' },
  { c: 'var(--br)', t: 'Workflow <b>Abandoned Cart Recovery</b> ran 214 times', m: '₹1,84,200 recovered today · 11 min ago' },
  { c: 'var(--warn)', t: '<b>Instagram</b> token expires in 4 days', m: 'Reconnect to avoid dropped messages · 26 min ago' },
  { c: 'var(--ok)', t: '<b>Monsoon Refresh Offer</b> passed 8,000 reads', m: '65.1% read rate · 1 hr ago' },
  { c: 'var(--dg)', t: 'Template <b>winback_v4</b> rejected by Meta', m: 'Policy: promotional content in utility category · 2 hrs ago' },
  { c: 'var(--br)', t: 'Support Agent resolved 412 conversations', m: '74% without a human · 3 hrs ago' },
  { c: 'var(--ok)', t: '<b>Razorpay</b> connector synced', m: '1,204 payments reconciled · 4 hrs ago' },
]

const REVENUE_ROWS = [
  ['Total customers', '32,680', '+12.5%'],
  ['New this month', '2,543', '+8.4%'],
  ['Repeat rate', '38.2%', '+3.1%'],
  ['Avg order value', '₹2,412', '−1.8%'],
]

const SUGGESTIONS = [
  'Win back customers inactive for 90 days',
  'Ask for a review 3 days after delivery',
  'Route high-value leads to the sales team',
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [backendStatus, setBackendStatus] = useState('checking...')
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/health`)
      .then((res) => res.json())
      .then((data) => setBackendStatus(data.status))
      .catch(() => setBackendStatus('backend not reachable'))
  }, [])

  const flash = (text) => {
    setToast(text)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2600)
  }

  const goToSection = (key) => {
    if (key === 'dash') return
    flash(`${NAV.concat(AUTOMATION_NAV).find((n) => n.key === key)?.label} is coming soon`)
  }

  return (
    <div id="app">
      <aside className="side">
        <div className="brand"><span className="mk">C</span><b>Cheerio AI</b></div>

        {NAV.map((n) => (
          <button key={n.key} className={`nv${n.key === 'dash' ? ' on' : ''}`} onClick={() => goToSection(n.key)}>
            <Icon name={n.key} />
            <span className="lb">{n.label}</span>
            {n.count != null && <span className="ct">{n.count}</span>}
          </button>
        ))}

        <div className="sec">AUTOMATION</div>
        {AUTOMATION_NAV.map((n) => (
          <button key={n.key} className="nv" onClick={() => goToSection(n.key)}>
            <Icon name={n.key} />
            <span className="lb">{n.label}</span>
          </button>
        ))}

        <div className="plan">
          <div className="btw"><span style={{ fontSize: 12.5, fontWeight: 600 }}>Automation tasks</span><span className="xs mut num">62%</span></div>
          <div className="tk"><i style={{ width: '62%' }}></i></div>
          <div className="xs mut num">31,240 of 50,000 used · resets in 12 days</div>
          <button className="btn sm2" style={{ justifyContent: 'center' }} onClick={() => flash('Billing is coming soon')}>Upgrade plan</button>
        </div>
      </aside>

      <main className="main">
        <header className="top">
          <div>
            <h1>Dashboard</h1>
            <div className="sb">Overview of your automation · backend {backendStatus}</div>
          </div>
          <div className="gr"></div>
          <div className="srch">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <span>Search or ask Cheerio…</span>
          </div>
          <button className="ico" onClick={() => flash('Settings coming soon')}>
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" /><path d="M9.6 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .9-1 1.6v.3M12 17h.01" /></svg>
          </button>
          <button className="ico" onClick={() => flash('No new notifications')}>
            <svg viewBox="0 0 24 24"><path d="M18 8.5a6 6 0 1 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 14.5 18 8.5zM13.7 19.5a2 2 0 0 1-3.4 0" /></svg>
            <span className="dot">12</span>
          </button>
          <button className="me" onClick={() => navigate('/')} title="Sign out">
            <span className="av a32">AK</span>
            <span style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.2 }}>Arjun Kumar</div>
              <div style={{ fontSize: 11, color: 'var(--ink3)' }}>Admin</div>
            </span>
          </button>
        </header>

        <div className="wrap">
          <div className="aibar">
            <div className="btw">
              <div>
                <div className="row g8"><Icon name="spark" className="spark2" /><span className="eyebrow" style={{ color: 'var(--br)' }}>CHEERIO AI</span></div>
                <div className="ttl" style={{ marginTop: 7 }}>Tell Cheerio what you want to automate</div>
                <div className="sm mut" style={{ marginTop: 3 }}>Describe it in plain words. Cheerio builds the workflow, you approve it, then it runs.</div>
              </div>
            </div>
            <div className="fld">
              <Icon name="spark" className="spark2" />
              <input
                placeholder="Recover abandoned carts after 2 hours and send a personalised WhatsApp message"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn pri" onClick={() => flash('Workflow builder is coming soon')}>Build workflow</button>
            </div>
            <div className="sugs">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="sug" onClick={() => setQuery(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="stats">
            {STATS.map((s) => (
              <div className="stat" key={s.lb}>
                <div className="ic" style={{ background: s.bg }}><Icon name={s.icon} style={{ stroke: s.col }} /></div>
                <div className="lb">{s.lb}</div>
                <div className="vl num">{s.vl}</div>
                <div className={`dl ${s.up === 1 ? 'up' : s.up === -1 ? 'dn' : 'mut'}`}>{s.dl}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 16 }}>
            <div className="card">
              <div className="hd">
                <div><h3>Campaign performance</h3><div className="s">Reach and conversions, last 8 weeks</div></div>
                <div className="gr"></div>
                <div className="leg">
                  <span><i className="pip" style={{ background: 'var(--brL)' }}></i>Reach</span>
                  <span><i className="pip" style={{ background: 'var(--br)' }}></i>Converted</span>
                </div>
              </div>
              <div className="pad">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 18 }}>
                  <div><div className="xs mut">Reach</div><div className="num" style={{ fontSize: 19, fontWeight: 650, marginTop: 3 }}>4.28L</div></div>
                  <div><div className="xs mut">Delivered</div><div className="num" style={{ fontSize: 19, fontWeight: 650, marginTop: 3 }}>97.8%</div></div>
                  <div><div className="xs mut">Engaged</div><div className="num" style={{ fontSize: 19, fontWeight: 650, marginTop: 3 }}>61.4%</div></div>
                  <div><div className="xs mut">Converted</div><div className="num" style={{ fontSize: 19, fontWeight: 650, marginTop: 3 }}>2,121</div></div>
                </div>
                <div className="bars">
                  {WEEKS.map((w, i) => (
                    <div className="b" key={w}>
                      <i style={{ height: `${(CONV[i] / 80) * 100}%`, background: 'var(--br)' }}></i>
                      <i style={{ height: `${((REACH[i] - CONV[i]) / 80) * 100}%`, background: 'var(--brL)' }}></i>
                    </div>
                  ))}
                </div>
                <div className="axis"><span>{WEEKS[0]}</span><span>{WEEKS[7]}</span></div>
              </div>
            </div>

            <div className="card">
              <div className="hd"><span><Icon name="spark" className="spark2" /></span><div><h3>Recommendations</h3><div className="s">Generated from this week&apos;s data</div></div></div>
              {RECS.map((r) => (
                <div className="rec" key={r.t}>
                  <span className="ic"><Icon name={r.icon} /></span>
                  <div className="bd"><div className="t">{r.t}</div><div className="d">{r.d}</div></div>
                  <button className="btn sm2" style={{ alignSelf: 'center', whiteSpace: 'nowrap' }} onClick={() => flash(`${r.action} — coming soon`)}>{r.action}</button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: 16 }}>
            <div className="card">
              <div className="hd"><div><h3>Revenue &amp; customers</h3><div className="s">Attributed to Cheerio, last 12 weeks</div></div></div>
              <div className="pad">
                <div className="row g16" style={{ alignItems: 'flex-end' }}>
                  <div>
                    <div className="xs mut">Attributed revenue</div>
                    <div className="num" style={{ fontSize: 28, fontWeight: 650, letterSpacing: '-.03em', marginTop: 4 }}>₹26.9L</div>
                    <div className="xs up row g6" style={{ marginTop: 5 }}><Icon name="check" /> +22.4% vs previous</div>
                  </div>
                </div>
                <div className="spark" style={{ marginTop: 16 }}>
                  {SPARK_VALUES.map((h, j) => (
                    <i key={j} style={{ height: `${h}%` }} className={j > 8 ? 'hi' : ''}></i>
                  ))}
                </div>
                <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {REVENUE_ROWS.map(([label, value, delta]) => (
                    <div className="btw" key={label}>
                      <span className="sm mut">{label}</span>
                      <span className="row g10">
                        <b className="num" style={{ fontSize: 13.5 }}>{value}</b>
                        <span className={`xs ${delta[0] === '+' ? 'up' : 'dn'}`} style={{ width: 46, textAlign: 'right' }}>{delta}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="hd">
                <div><h3>Recent activity</h3><div className="s">Agents, workflows and connectors</div></div>
                <div className="gr"></div>
                <button className="btn sm2" onClick={() => flash('Audit log is coming soon')}>Full audit log</button>
              </div>
              <div className="feed">
                {ACTIVITY.map((a, i) => (
                  <div className="fe" key={i}>
                    <span className="dt" style={{ background: a.c }}></span>
                    <div>
                      <div className="t" dangerouslySetInnerHTML={{ __html: a.t }}></div>
                      <div className="m">{a.m}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
