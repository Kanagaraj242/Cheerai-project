import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { CONNECTORS, CONN_CATS } from '../data/cheerio.js'
import { useStore } from '../store-context.js'

const statusTag = (st) => (st === 'Connected' ? 't-ok' : st === 'Action needed' ? 't-wn' : 't-nt')
const actionLabel = (st) => (st === 'Connected' ? 'Manage' : st === 'Action needed' ? 'Reconnect' : 'Connect')

export default function Connectors() {
  const { flash } = useOutletContext()
  const { agents, toggleAgent } = useStore()
  const [category, setCategory] = useState('All')

  const list = CONNECTORS.filter((c) => category === 'All' || c.cat === category)
  const activeAgents = agents.filter((a) => a.on).length

  return (
    <div className="wrap">
      <div className="stats">
        <div className="stat"><div className="lb">Connected apps</div><div className="vl num">8</div><div className="dl mut">of 9 available</div></div>
        <div className="stat"><div className="lb">Needs attention</div><div className="vl num">1</div><div className="dl dn">Instagram token expiring</div></div>
        <div className="stat">
          <div className="lb">Active AI agents</div>
          <div className="vl num">{activeAgents} <span style={{ fontSize: 15, color: 'var(--ink3)', fontWeight: 500 }}>of {agents.length}</span></div>
          <div className="dl mut">{agents.filter((a) => !a.on).map((a) => a.n).join(', ') || 'All agents running'}</div>
        </div>
        <div className="stat"><div className="lb">Agent tasks this month</div><div className="vl num">33,466</div><div className="dl up">+19.2%</div></div>
      </div>

      <div className="card">
        <div className="hd">
          <div><h3>Connected integrations</h3><div className="s">Apps Cheerio can read from and write to</div></div>
          <div className="gr"></div>
          <button className="btn pri sm2" onClick={() => flash('Connector marketplace is not part of this build yet')}>
            <Icon name="plus" />Add connector
          </button>
        </div>

        <div className="pad" style={{ paddingBottom: 8 }}>
          <div className="tabs" style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
            {CONN_CATS.map((c) => (
              <button key={c} className={`tab${category === c ? ' on' : ''}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
        </div>

        <div className="pad" style={{ paddingTop: 8 }}>
          <div className="grid3">
            {list.map((c) => (
              <div className="cn" key={c.n}>
                <div className="row g12">
                  <span className="lg" style={{ background: c.bg }}>{c.ini}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="nm">{c.n}</div>
                    <div className="ct">{c.cat}</div>
                  </div>
                  <span className={`tag ${statusTag(c.st)}`}>{c.st}</span>
                </div>
                <div className="ds">{c.d}</div>
                <div className="perm">{c.perms.map((p) => <span key={p}>{p}</span>)}</div>
                <div className="btw" style={{ borderTop: '1px solid var(--ln2)', paddingTop: 11 }}>
                  <span className="xs mut">
                    {c.st === 'Not connected' ? 'Not set up' : `Synced ${c.sync}`} · {c.flows} workflows
                  </span>
                  <button className="btn sm2" onClick={() => flash(`${actionLabel(c.st)} ${c.n} — not wired to a live account`)}>
                    {actionLabel(c.st)}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {list.length === 0 && <div className="mut sm" style={{ padding: '18px 0' }}>No connectors in this category.</div>}
        </div>
      </div>

      <div style={{ marginTop: 4 }}>
        <div className="btw" style={{ marginBottom: 14 }}>
          <div>
            <div className="h2" style={{ fontSize: 16 }}>AI Agents</div>
            <div className="sm mut" style={{ marginTop: 2 }}>Workers that handle jobs end to end, using your connectors</div>
          </div>
          <button className="btn pri sm2" onClick={() => flash('Agent creation is not part of this build yet')}>
            <Icon name="plus" />Create agent
          </button>
        </div>

        <div className="grid3">
          {agents.map((a, i) => (
            <div className="agent" key={a.n}>
              <div className="top2">
                <span className="fig" style={{ background: a.bg }}><Icon name={a.ic} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="row g8">
                    <span style={{ fontSize: 15.5, fontWeight: 650, letterSpacing: '-.02em' }}>{a.n}</span>
                    <span className={`tag ${a.on ? 't-ok' : 't-nt'}`}>{a.on ? 'Active' : 'Paused'}</span>
                  </div>
                  <div className="sm mut" style={{ marginTop: 3 }}>{a.role}</div>
                </div>
                <button
                  className={`tog${a.on ? ' on' : ''}`}
                  onClick={() => toggleAgent(i)}
                  aria-label={`${a.on ? 'Pause' : 'Activate'} ${a.n}`}
                  aria-pressed={a.on}
                >
                  <i></i>
                </button>
              </div>

              <div className="met">
                <div><div className="xs mut">Tasks completed</div><div className="v num">{a.tasks}</div></div>
                <div><div className="xs mut">{a.rateL}</div><div className="v num">{a.rate}</div></div>
                <div><div className="xs mut">{a.handL}</div><div className="v num">{a.hand}</div></div>
              </div>

              <div className="pad" style={{ borderTop: '1px solid var(--ln2)', display: 'flex', flexDirection: 'column', gap: 13 }}>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 7 }}>PERFORMANCE · 8 WEEKS</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 44 }}>
                    {a.perf.map((h, j) => (
                      <i key={j} style={{ flex: 1, borderRadius: '3px 3px 0 0', background: j > 5 ? 'var(--br)' : 'var(--brL)', height: `${h}%` }}></i>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 7 }}>SKILLS</div>
                  <div className="perm">{a.skills.map((s) => <span key={s}>{s}</span>)}</div>
                </div>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 7 }}>USES CONNECTORS</div>
                  <div className="perm">{a.conn.map((s) => <span key={s}>{s}</span>)}</div>
                </div>
                <div className="row g8">
                  <button className="btn sm2" style={{ flex: 1, justifyContent: 'center' }}>View transcripts</button>
                  <button className="btn sm2" style={{ flex: 1, justifyContent: 'center' }}>Configure</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
