import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon, { SessTag } from '../components/Icon.jsx'
import { CH, SEGS } from '../data/cheerio.js'
import { useStore } from '../store-context.js'

const TIMELINE = [
  ['AGENT', 'var(--br)', 'Support Agent replied about order status', 'Cited 3 sources · not escalated', 'Today 10:31'],
  ['PERSON', 'var(--ink3)', 'Sneha Iyer added a note', '“Prefers WhatsApp for everything”', 'Today 10:28'],
  ['ORDER', 'var(--ok)', 'Order #12345 placed', '₹2,499 · paid via Razorpay', '14 May'],
  ['WORKFLOW', 'var(--info)', 'Order confirmation sent', 'Template order_conf_v2 · ₹0.72', '14 May'],
  ['AGENT', 'var(--br)', 'Sales Agent scored intent 0.84', 'Routed to the sales queue', '12 May'],
  ['CAMPAIGN', 'var(--warn)', 'Monsoon Refresh Offer delivered', 'Read, not clicked', '8 May'],
  ['PERSON', 'var(--ink3)', 'Tagged VIP by Arjun Kumar', '', '2 May'],
]

const matchesSegment = (k, seg) => {
  if (seg === 'All') return true
  if (seg === 'Customers') return k.stage === 'Customer'
  if (seg === 'Leads') return k.stage === 'Lead'
  if (seg === 'VIP') return k.tags.includes('VIP')
  if (seg === 'At risk') return k.tags.includes('Refund') || k.tags.includes('Follow up')
  return false
}

export default function Contacts() {
  const navigate = useNavigate()
  const { conversations, activeContact, setActiveContact, setActiveConv } = useStore()
  const [segment, setSegment] = useState('All')

  const c = conversations[activeContact]
  const list = conversations.filter((k) => matchesSegment(k, segment))

  const messageContact = () => {
    setActiveConv(activeContact)
    navigate('/inbox')
  }

  return (
    <div className="split">
      <div className="gr splitmain">
        <div className="stats">
          <div className="stat"><div className="lb">Total contacts</div><div className="vl num">32,680</div><div className="dl up">+12.5% this month</div></div>
          <div className="stat"><div className="lb">Customers</div><div className="vl num">18,412</div><div className="dl mut">56.3% of database</div></div>
          <div className="stat"><div className="lb">Active segments</div><div className="vl num">28</div><div className="dl mut">6 auto-updating</div></div>
          <div className="stat"><div className="lb">At risk of churn</div><div className="vl num">4,120</div><div className="dl dn">+18% vs last month</div></div>
        </div>

        <div className="card">
          <div className="hd">
            <div className="tabs">
              {SEGS.map((s) => (
                <button key={s} className={`tab${segment === s ? ' on' : ''}`} onClick={() => setSegment(s)}>{s}</button>
              ))}
            </div>
            <div className="gr"></div>
            <span className="chipf"><Icon name="filter" />Filters</span>
            <button className="btn sm2">Import</button>
            <button className="btn pri sm2"><Icon name="plus" />Add contact</button>
          </div>

          <div className="tbwrap">
            <table className="tb">
              <thead>
                <tr>
                  <th>Contact</th><th>Stage</th><th>Tags</th><th>Orders</th>
                  <th>Lifetime value</th><th>Session</th><th>Last activity</th>
                </tr>
              </thead>
              <tbody>
                {list.map((k) => {
                  const idx = conversations.indexOf(k)
                  return (
                    <tr key={k.n} className={idx === activeContact ? 'on' : ''} onClick={() => setActiveContact(idx)}>
                      <td>
                        <div className="row g10">
                          <span className="avw"><span className="av a32">{k.ini}</span><i className="ch" style={{ background: CH[k.ch] }}></i></span>
                          <div><div className="nm">{k.n}</div><div className="s2">{k.phone}</div></div>
                        </div>
                      </td>
                      <td><span className={`tag ${k.stage === 'Customer' ? 't-ok' : 't-in'}`}>{k.stage}</span></td>
                      <td>
                        {k.tags.length
                          ? k.tags.map((t) => <span className="tag t-nt" style={{ marginRight: 4 }} key={t}>{t}</span>)
                          : <span className="mut">—</span>}
                      </td>
                      <td className="num">{k.orders}</td>
                      <td className="num" style={{ fontWeight: 550 }}>{k.ltv}</td>
                      <td><SessTag conv={k} /></td>
                      <td className="mut">{k.t}</td>
                    </tr>
                  )
                })}
                {list.length === 0 && (
                  <tr><td colSpan={7} className="mut" style={{ textAlign: 'center', padding: '28px 16px' }}>No contacts in this segment.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="btw pad" style={{ borderTop: '1px solid var(--ln2)' }}>
            <span className="sm mut">Showing {list.length} of 32,680 contacts</span>
            <div className="row g6"><button className="btn sm2">Previous</button><button className="btn sm2">Next</button></div>
          </div>
        </div>
      </div>

      <aside className="cpanel">
        <div className="pbody">
          <div className="row g12">
            <span className="avw"><span className="av a56">{c.ini}</span><i className="ch" style={{ background: CH[c.ch] }}></i></span>
            <div>
              <div style={{ fontSize: 17, fontWeight: 650, letterSpacing: '-.02em' }}>{c.n}</div>
              <div className="sm mut">{c.phone}</div>
              <div className="xs mut">{c.city} · since {c.since}</div>
            </div>
          </div>

          <div className="row g6" style={{ flexWrap: 'wrap' }}>
            {c.tags.map((t) => <span className="tag t-br" key={t}><Icon name="tag" />{t}</span>)}
            <button className="tag t-nt">+ Add tag</button>
          </div>

          <div className="row g8">
            <button className="btn pri sm2" style={{ flex: 1, justifyContent: 'center' }} onClick={messageContact}>
              <Icon name="chat" />Message
            </button>
            <button className="btn sm2" style={{ flex: 1, justifyContent: 'center' }}>Add to campaign</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            <div className="note" style={{ textAlign: 'center' }}><div className="xs mut">Lifetime</div><div className="num" style={{ fontSize: 15, fontWeight: 650, marginTop: 3 }}>{c.ltv}</div></div>
            <div className="note" style={{ textAlign: 'center' }}><div className="xs mut">Orders</div><div className="num" style={{ fontSize: 15, fontWeight: 650, marginTop: 3 }}>{c.orders}</div></div>
            <div className="note" style={{ textAlign: 'center' }}><div className="xs mut">Stage</div><div style={{ fontSize: 13, fontWeight: 600, marginTop: 5 }}>{c.stage}</div></div>
          </div>

          <div className="aisug">
            <div className="row g8"><Icon name="spark" className="spark2" /><span className="eyebrow" style={{ color: 'var(--br)' }}>AI INSIGHT</span></div>
            <div style={{ fontSize: 12.8, lineHeight: 1.55 }}>{c.insight}</div>
            <button className="btn sm2" style={{ alignSelf: 'flex-start', background: '#fff' }}>Act on this</button>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>ACTIVITY TIMELINE</div>
            <div className="tline">
              {TIMELINE.map((e, j) => (
                <div className="tli" key={j}>
                  <span className="rail2"><i style={{ background: e[1] }}></i>{j < TIMELINE.length - 1 && <u></u>}</span>
                  <div style={{ flex: 1 }}>
                    <div className="row g8"><span className="k" style={{ color: e[1] }}>{e[0]}</span><span className="m" style={{ margin: 0 }}>{e[4]}</span></div>
                    <div className="t">{e[2]}</div>
                    {e[3] && <div className="m">{e[3]}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
