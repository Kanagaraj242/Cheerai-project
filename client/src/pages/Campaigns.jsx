import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { CAMPS, CH } from '../data/cheerio.js'
import { useStore } from '../store-context.js'

const STATUS_TAG = { Running: 't-br', Completed: 't-ok', Scheduled: 't-wn', Draft: 't-nt' }
const TABS = ['All', 'Running', 'Scheduled', 'Completed', 'Drafts']

const pct = (a, b) => (b ? `${Math.round((a / b) * 1000) / 10}%` : '—')

export default function Campaigns() {
  const { flash } = useOutletContext()
  const { activeCamp, setActiveCamp } = useStore()
  const [tab, setTab] = useState('All')

  const c = CAMPS[activeCamp]
  const list = CAMPS.filter((k) => {
    if (tab === 'All') return true
    if (tab === 'Drafts') return k.st === 'Draft'
    return k.st === tab
  })

  const funnel = [['Sent', c.sent], ['Delivered', c.del], ['Read', c.read], ['Clicked', c.clk], ['Converted', c.cvr]]
  const base = c.sent || 1

  return (
    <div className="split">
      <div className="gr splitmain">
        <div className="aibar" style={{ padding: '16px 18px' }}>
          <div className="btw">
            <div className="row g10">
              <Icon name="spark" className="spark2" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Generate a campaign with AI</div>
                <div className="xs mut" style={{ marginTop: 2 }}>Describe the goal — Cheerio picks the segment, writes the copy and estimates the spend.</div>
              </div>
            </div>
            <button className="btn pri sm2" onClick={() => flash('Campaign generation is not wired to a model yet')}>
              <Icon name="spark" />Generate campaign
            </button>
          </div>
        </div>

        <div className="stats stats5">
          <div className="stat"><div className="lb">Total reach</div><div className="vl num">4.28L</div><div className="dl up">+16.3%</div></div>
          <div className="stat"><div className="lb">Delivery rate</div><div className="vl num">97.8%</div><div className="dl up">+0.4%</div></div>
          <div className="stat"><div className="lb">Engagement</div><div className="vl num">61.4%</div><div className="dl up">+8.7%</div></div>
          <div className="stat"><div className="lb">Conversions</div><div className="vl num">2,121</div><div className="dl up">+20.6%</div></div>
          <div className="stat"><div className="lb">Spend</div><div className="vl num">₹15,497</div><div className="dl mut">₹7.31 per conversion</div></div>
        </div>

        <div className="card">
          <div className="hd">
            <div className="tabs">
              {TABS.map((t) => (
                <button key={t} className={`tab${tab === t ? ' on' : ''}`} onClick={() => setTab(t)}>{t}</button>
              ))}
            </div>
            <div className="gr"></div>
            <span className="chipf"><Icon name="filter" />Channel</span>
            <button className="btn pri sm2" onClick={() => flash('Campaign builder is not part of this build yet')}>
              <Icon name="plus" />Create campaign
            </button>
          </div>

          <div className="tbwrap">
            <table className="tb">
              <thead>
                <tr>
                  <th>Campaign</th><th>Status</th><th>Audience</th><th>Delivered</th>
                  <th>Read</th><th>Conversions</th><th>Revenue</th><th>Spend</th>
                </tr>
              </thead>
              <tbody>
                {list.map((k) => {
                  const idx = CAMPS.indexOf(k)
                  return (
                    <tr key={k.n} className={idx === activeCamp ? 'on' : ''} onClick={() => setActiveCamp(idx)}>
                      <td>
                        <div className="row g10">
                          <span className="pip" style={{ width: 8, height: 8, background: CH[k.ch] }}></span>
                          <div>
                            <div className="nm">
                              {k.n}
                              {k.ai && <span className="tag t-br" style={{ marginLeft: 4 }}><Icon name="spark" />AI</span>}
                            </div>
                            <div className="s2">{k.ch} · {k.sub}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className={`tag ${STATUS_TAG[k.st]}`}>{k.st}</span></td>
                      <td><div className="sm">{k.aud}</div><div className="s2 num">{k.size.toLocaleString('en-IN')} contacts</div></td>
                      <td className="num">{pct(k.del, k.sent)}</td>
                      <td className="num">{pct(k.read, k.sent)}</td>
                      <td className="num">{k.cvr || '—'}</td>
                      <td className="num" style={{ fontWeight: 550 }}>{k.rev}</td>
                      <td className="num mut">{k.spend}</td>
                    </tr>
                  )
                })}
                {list.length === 0 && (
                  <tr><td colSpan={8} className="mut" style={{ textAlign: 'center', padding: '28px 16px' }}>No campaigns with this status.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <aside className="cpanel">
        <div className="pbody">
          <div>
            <div className="row g8">
              <span className="pip" style={{ width: 9, height: 9, background: CH[c.ch] }}></span>
              <span className={`tag ${STATUS_TAG[c.st]}`}>{c.st}</span>
              {c.ai && <span className="tag t-br"><Icon name="spark" />AI generated</span>}
            </div>
            <div style={{ fontSize: 17, fontWeight: 650, letterSpacing: '-.02em', marginTop: 9 }}>{c.n}</div>
            <div className="sm mut" style={{ marginTop: 2 }}>{c.ch} · {c.sub}</div>
          </div>

          <div>
            <div className="kv"><span className="k">Audience</span><span className="v">{c.aud}</span></div>
            <div className="kv"><span className="k">Recipients</span><span className="v num">{c.size.toLocaleString('en-IN')}</span></div>
            <div className="kv"><span className="k">Schedule</span><span className="v">{c.sched}</span></div>
            <div className="kv"><span className="k">Template</span><span className="v">{c.tpl}</span></div>
          </div>

          <div className="note" style={{ background: 'var(--warnS)', borderColor: '#F2E3C4', color: 'var(--warn)' }}>
            <div className="btw">
              <span className="sm" style={{ fontWeight: 600 }}>Spend</span>
              <span className="num" style={{ fontSize: 17, fontWeight: 650 }}>{c.spend}</span>
            </div>
            <div className="xs" style={{ marginTop: 3 }}>
              {c.cvr ? `${c.cpa} per conversion · ${c.rev} attributed revenue` : 'Estimated at ₹0.72 per conversation'}
            </div>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>FUNNEL</div>
            {funnel.map((f, i) => {
              const ratio = f[1] / base
              return (
                <div key={f[0]} style={{ marginBottom: i < 4 ? 12 : 0 }}>
                  <div className="btw" style={{ marginBottom: 5 }}>
                    <span className="sm" style={{ fontWeight: 550 }}>{f[0]}</span>
                    <span className="xs mut num">{f[1].toLocaleString('en-IN')} · {Math.round(ratio * 1000) / 10}%</span>
                  </div>
                  <div style={{ height: 24, borderRadius: 6, background: 'var(--ln2)', overflow: 'hidden' }}>
                    <i style={{
                      display: 'block', height: '100%',
                      width: `${Math.max(ratio * 100, 0.6)}%`, borderRadius: 6,
                      background: i === 4 ? 'var(--ok)' : 'linear-gradient(90deg,#7C5CF0,#5B34E0)',
                    }}></i>
                  </div>
                  {i < 4 && c.sent > 0 && (
                    <div className="xs mut" style={{ marginTop: 4 }}>
                      ↓ {Math.round((1 - funnel[i + 1][1] / (f[1] || 1)) * 1000) / 10}% drop off
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="row g8">
            <button className="btn sm2" style={{ flex: 1, justifyContent: 'center' }}>Duplicate</button>
            <button className="btn pri sm2" style={{ flex: 1, justifyContent: 'center' }}>View report</button>
          </div>
        </div>
      </aside>
    </div>
  )
}
