import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { ACTIVITY, RECS } from '../data/cheerio.js'
import { useStore } from '../store-context.js'

const STATS = [
  { lb: 'Automation tasks', vl: '31,240', dl: '18,760 remaining · resets in 12 days', up: 0, icon: 'bolt', col: 'var(--br)', bg: 'var(--brS)' },
  { lb: 'Active AI agents', vl: '2 of 3', dl: 'Retention Agent is paused', up: 0, icon: 'robot', col: 'var(--ok)', bg: 'var(--okS)' },
  { lb: 'Connected apps', vl: '8', dl: '1 needs attention', up: -1, icon: 'plug', col: 'var(--info)', bg: 'var(--infoS)' },
  { lb: 'Active workflows', vl: '12', dl: '3 added this month', up: 1, icon: 'flow', col: 'var(--warn)', bg: 'var(--warnS)' },
]

const WEEKS = ['Jul 7', 'Jul 14', 'Jul 21', 'Jul 28', 'Aug 4', 'Aug 11', 'Aug 18', 'Aug 25']
const REACH = [38, 44, 41, 52, 58, 55, 66, 74]
const CONV_SERIES = [9, 12, 10, 15, 18, 16, 21, 26]
const SPARK = [41, 48, 44, 56, 52, 63, 69, 66, 74, 71, 83, 92]

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

const PLACEHOLDER = 'Recover abandoned carts after 2 hours and send a personalised WhatsApp message'

export default function DashboardHome() {
  const navigate = useNavigate()
  const { flash } = useOutletContext()
  const { setGenerated } = useStore()
  const [query, setQuery] = useState('')

  const buildWorkflow = () => {
    setGenerated(true)
    navigate('/workflows')
  }

  return (
    <div className="wrap">
      <div className="aibar">
        <div className="btw">
          <div>
            <div className="row g8">
              <Icon name="spark" className="spark2" />
              <span className="eyebrow" style={{ color: 'var(--br)' }}>CHEERIO AI</span>
            </div>
            <div className="ttl" style={{ marginTop: 7 }}>Tell Cheerio what you want to automate</div>
            <div className="sm mut" style={{ marginTop: 3 }}>Describe it in plain words. Cheerio builds the workflow, you approve it, then it runs.</div>
          </div>
        </div>
        <div className="fld">
          <Icon name="spark" className="spark2" />
          <input
            placeholder={PLACEHOLDER}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') buildWorkflow() }}
          />
          <button className="btn pri sm2" onClick={buildWorkflow}>Build workflow</button>
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

      <div className="grid-155">
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
            <div className="quad">
              <div><div className="xs mut">Reach</div><div className="num qv">4.28L</div></div>
              <div><div className="xs mut">Delivered</div><div className="num qv">97.8%</div></div>
              <div><div className="xs mut">Engaged</div><div className="num qv">61.4%</div></div>
              <div><div className="xs mut">Converted</div><div className="num qv">2,121</div></div>
            </div>
            <div className="bars">
              {WEEKS.map((w, i) => (
                <div className="b" key={w}>
                  <i style={{ height: `${(CONV_SERIES[i] / 80) * 100}%`, background: 'var(--br)' }}></i>
                  <i style={{ height: `${((REACH[i] - CONV_SERIES[i]) / 80) * 100}%`, background: 'var(--brL)' }}></i>
                </div>
              ))}
            </div>
            <div className="axis"><span>{WEEKS[0]}</span><span>{WEEKS[WEEKS.length - 1]}</span></div>
          </div>
        </div>

        <div className="card">
          <div className="hd">
            <span><Icon name="spark" className="spark2" /></span>
            <div><h3>Recommendations</h3><div className="s">Generated from this week&apos;s data</div></div>
          </div>
          {RECS.map((r) => (
            <div className="rec" key={r.t}>
              <span className="ic"><Icon name={r.icon} /></span>
              <div className="bd"><div className="t">{r.t}</div><div className="d">{r.d}</div></div>
              <button className="btn sm2" style={{ alignSelf: 'center', whiteSpace: 'nowrap' }} onClick={() => flash(`“${r.action}” is not wired up yet`)}>
                {r.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-135">
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
              {SPARK.map((h, j) => <i key={j} style={{ height: `${h}%` }} className={j > 8 ? 'hi' : ''}></i>)}
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
            <button className="btn sm2" onClick={() => flash('Full audit log is not part of this build yet')}>Full audit log</button>
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
  )
}
