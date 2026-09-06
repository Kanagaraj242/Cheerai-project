import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { NCOL } from '../data/cheerio.js'
import { useStore } from '../store-context.js'

const SENTENCE = [
  ['When', 0], ['a cart is abandoned', 1], ['wait', 0], ['2 hours', 1], ['then have the', 0], ['Sales Agent', 1],
  ['write a personalised message and send it over', 0], ['WhatsApp', 1], ['. If there is no purchase after', 0],
  ['24 hours', 1], ['follow up by', 0], ['SMS', 1],
]

export default function Workflows() {
  const { flash } = useOutletContext()
  const { nodes, activeNode, setActiveNode, addNode, generated, setGenerated } = useStore()
  const [prompt, setPrompt] = useState('')
  const [promptError, setPromptError] = useState(false)

  const n = nodes[activeNode]

  const applyChange = () => {
    if (!prompt.trim()) {
      setPromptError(true)
      return
    }
    addNode({
      k: 'FOLLOW-UP', t: 'Send SMS follow-up', s: 'Added from your description — review it',
      c: 'wn', ic: 'refresh',
      cfg: [['Channel', 'SMS'], ['Condition', 'No reply in 2 hours'], ['Cost', '₹0.20 per message']],
    })
    setGenerated(true)
    setPrompt('')
    setPromptError(false)
  }

  const addStep = () => {
    addNode({
      k: 'ACTION', t: 'New step', s: 'Choose what this step should do',
      c: 'nt', ic: 'plus', cfg: [['Type', 'Not set'], ['Channel', 'Not set']],
    })
  }

  const publish = () => {
    setGenerated(false)
    flash('Workflow published — it will run on the next abandoned cart')
  }

  const costly = n.k === 'CONNECTOR' || n.k === 'ACTION' || n.k === 'FOLLOW-UP'

  return (
    <div className="bwrap">
      <div className="bcv">
        <div className="bprompt">
          <div className="btw">
            <div className="row g10">
              <Icon name="spark" className="spark2" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Abandoned Cart Recovery</div>
                <div className="xs mut" style={{ marginTop: 2 }}>
                  {generated ? 'Generated from your description — review each step before publishing' : `Draft · ${nodes.length} steps · last edited 2 hours ago`}
                </div>
              </div>
            </div>
            <div className="row g8">
              {generated ? <span className="tag t-br"><Icon name="spark" />AI generated</span> : <span className="tag t-wn">Draft</span>}
              <button className="btn sm2" onClick={() => flash('Test run is not connected to a live channel yet')}><Icon name="play" />Test run</button>
              <button className="btn pri sm2" onClick={publish}>Publish</button>
            </div>
          </div>

          <div className="bfld">
            <Icon name="spark" className="spark2" />
            <input
              value={prompt}
              onChange={(e) => { setPrompt(e.target.value); setPromptError(false) }}
              onKeyDown={(e) => { if (e.key === 'Enter') applyChange() }}
              placeholder="Describe a change — “also send an SMS if they don’t reply in 2 hours”"
              style={promptError ? { outline: '1px solid var(--dg)' } : undefined}
            />
            <button className="btn pri sm2" onClick={applyChange}>Apply</button>
          </div>
        </div>

        <div className="bstage">
          {nodes.map((k, i) => {
            const col = NCOL[k.c]
            const label = k.k === 'CONDITION' ? 'if still in cart' : 'if no purchase after 24h'
            const dashed = k.k === 'FOLLOW-UP'
            return (
              <div key={i} className="ndwrap">
                {i > 0 && (
                  <>
                    <div className={`wire${dashed ? ' dash' : ''}`}></div>
                    {(k.k === 'CONDITION' || k.k === 'FOLLOW-UP') && (
                      <>
                        <span className="blab">{label}</span>
                        <div className={`wire${dashed ? ' dash' : ''}`}></div>
                      </>
                    )}
                  </>
                )}
                <button
                  className={`nd${i === activeNode ? ' on' : ''}${generated ? ' new' : ''}`}
                  onClick={() => setActiveNode(i)}
                >
                  <span className="ni" style={{ background: col[1] }}>
                    <Icon name={k.ic} style={{ stroke: col[0] }} />
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span className="nk" style={{ color: col[0] }}>{k.k}</span>
                    <div className="nt">{k.t}</div>
                    <div className="ns">{k.s}</div>
                  </span>
                  <span className="no num">{i + 1}</span>
                </button>
              </div>
            )
          })}
          <div className="wire dash"></div>
          <button className="addn" onClick={addStep} aria-label="Add step">+</button>
        </div>

        <div className="nlbar">
          <Icon name="spark" className="spark2" />
          {SENTENCE.map(([text, bold], i) => (bold ? <b key={i}>{text}</b> : <span key={i}>{text}</span>))}
        </div>
      </div>

      <aside className="bside">
        <div className="btw" style={{ marginBottom: 16 }}>
          <div className="row g8">
            <span className="tag t-nt num">Step {activeNode + 1}</span>
            <span className="h2">{n.t}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {n.cfg.map((f) => (
            <div className="fldg" key={f[0]}>
              <label>{f[0].toUpperCase()}</label>
              <div className="inp">{f[1]}</div>
            </div>
          ))}

          <div className="fldg">
            <label>WHEN THIS RUNS</label>
            <div className="seg"><button className="on">Always</button><button>Business hours</button></div>
          </div>

          {costly ? (
            <div className="alert" style={{ background: 'var(--warnS)', color: 'var(--warn)' }}>
              <b>Costs money</b>
              <p>Roughly 8,900 runs a week at ₹0.72 — about ₹6,400 a week.</p>
            </div>
          ) : (
            <div className="alert" style={{ background: 'var(--okS)', color: 'var(--ok)' }}>
              <b>Free step</b>
              <p>Runs on your own data. No message charge.</p>
            </div>
          )}

          <div className="aisug">
            <div className="row g8"><Icon name="spark" className="spark2" /><span className="eyebrow" style={{ color: 'var(--br)' }}>WHY THIS STEP</span></div>
            <div style={{ fontSize: 12.6, lineHeight: 1.55 }}>
              You asked for a two-hour delay. Across 8,932 past runs, 90 minutes converted better — 4.8% against 3.1%. I have kept your two hours, but you can change it here.
            </div>
            <button className="btn sm2" style={{ alignSelf: 'flex-start', background: '#fff' }}>Use 90 minutes</button>
          </div>

          <div className="row g8">
            <button className="btn sm2" style={{ flex: 1, justifyContent: 'center' }}>Duplicate</button>
            <button className="btn sm2" style={{ flex: 1, justifyContent: 'center', color: 'var(--dg)' }}>Delete step</button>
          </div>
        </div>
      </aside>
    </div>
  )
}
