import { useEffect, useRef, useState } from 'react'
import Icon, { AiTag, SessTag } from '../components/Icon.jsx'
import { CH } from '../data/cheerio.js'
import { useStore } from '../store-context.js'

export default function Inbox() {
  const { conversations, activeConv, setActiveConv, sendMessage, takeOver } = useStore()
  const [tab, setTab] = useState('copilot')
  const [draft, setDraft] = useState('')
  const [draftError, setDraftError] = useState(false)
  const msgsRef = useRef(null)
  const draftRef = useRef(null)

  const c = conversations[activeConv]

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
  }, [c.msgs.length, activeConv])

  const selectConv = (i) => {
    setActiveConv(i)
    setDraft('')
    setDraftError(false)
  }

  const insertReply = () => {
    setDraft(c.sug)
    setDraftError(false)
    draftRef.current?.focus()
  }

  const handleSend = () => {
    const text = draft.trim()
    if (!text) {
      setDraftError(true)
      draftRef.current?.focus()
      return
    }
    sendMessage(activeConv, text)
    setDraft('')
    setDraftError(false)
  }

  const sessionBar =
    c.sess === 'open' ? (
      <div className="sesbar" style={{ background: 'var(--okS)', color: 'var(--ok)' }}>
        <span>Session open — free replies for {Math.floor(c.mins / 60)}h {c.mins % 60}m</span>
        <span>Paid template needed after that</span>
      </div>
    ) : c.sess === 'closing' ? (
      <div className="sesbar" style={{ background: 'var(--warnS)', color: 'var(--warn)' }}>
        <span>Session closing in {c.mins} minutes</span>
        <span>Reply now to stay free</span>
      </div>
    ) : c.sess === 'closed' ? (
      <div className="sesbar" style={{ background: 'var(--dgS)', color: 'var(--dg)' }}>
        <span>Session closed — free replies not allowed</span>
        <span>Send an approved template instead</span>
      </div>
    ) : null

  return (
    <div className="ibx">
      <div className="ilist">
        <div className="ihd">
          <div className="btw"><span className="h2">All conversations</span><span className="xs mut num">14 unread</span></div>
          <div className="tabs">
            <button className="tab on">All</button>
            <button className="tab">AI handled</button>
            <button className="tab">Needs me</button>
          </div>
          <div className="row g6">
            <span className="chipf"><Icon name="filter" />Channel</span>
            <span className="chipf">Agent</span>
            <span className="chipf">Status</span>
          </div>
        </div>
        <div className="iscroll">
          {conversations.map((k, i) => (
            <button key={k.n} className={`cv${i === activeConv ? ' on' : ''}`} onClick={() => selectConv(i)}>
              <div className="row g10">
                <span className="avw"><span className="av a32">{k.ini}</span><i className="ch" style={{ background: CH[k.ch] }}></i></span>
                <span className="gr" style={{ minWidth: 0 }}><span className="n">{k.n}</span></span>
                <span className="xs mut">{k.t}</span>
              </div>
              <div className="p">{k.p}</div>
              <div className="row g6" style={{ flexWrap: 'wrap' }}>
                <AiTag state={k.ai} />
                <SessTag conv={k} />
                {k.unread > 0 && <><span className="gr"></span><span className="tag t-br num">{k.unread}</span></>}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="thr">
        <div className="thd">
          <span className="avw"><span className="av a36">{c.ini}</span><i className="ch" style={{ background: CH[c.ch] }}></i></span>
          <div>
            <div className="row g8"><span style={{ fontSize: 14.5, fontWeight: 600 }}>{c.n}</span><AiTag state={c.ai} /></div>
            <div className="xs mut">{c.ch} · {c.phone}</div>
          </div>
          <div className="gr"></div>
          {c.ai === 'handling' ? (
            <button className="btn sm2" onClick={() => takeOver(activeConv)}><Icon name="user" />Take over from AI</button>
          ) : (
            <span className="tag t-wn">You have this thread</span>
          )}
          <button className="btn sm2">Assign</button>
          <button className="btn sm2">Resolve</button>
        </div>

        <div className="msgs" ref={msgsRef}>
          <div className="day">Today</div>
          {c.msgs.map((m, i) => (
            <div key={i} className={`bub ${m[0] === 'us' ? 'us' : 'them'}`}>
              {m[3] && <span className="who"><Icon name="robot" /> {m[3]}</span>}
              {m[1]}
              <div className="tm">{m[2]}{m[0] === 'us' ? ' ✓✓' : ''}</div>
            </div>
          ))}
        </div>

        {sessionBar}

        <div className="comp">
          <textarea
            ref={draftRef}
            value={draft}
            onChange={(e) => { setDraft(e.target.value); setDraftError(false) }}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
            placeholder="Type a reply, or insert the AI suggestion…"
            style={draftError ? { outline: '1px solid var(--dg)' } : undefined}
          />
          <div className="row g8">
            <button className="btn sm2" onClick={() => setTab('copilot')}><Icon name="spark" />Draft with AI</button>
            <button className="btn sm2">Templates</button>
            <button className="btn sm2">Note</button>
            <span className="gr"></span>
            <span className="chipf">{c.ch} ▾</span>
            <button className="btn pri sm2" onClick={handleSend}><Icon name="send" />Send</button>
          </div>
        </div>
      </div>

      <div className="ipanel">
        <div className="ptab">
          <button className={tab === 'copilot' ? 'on' : ''} onClick={() => setTab('copilot')}>AI Copilot</button>
          <button className={tab === 'details' ? 'on' : ''} onClick={() => setTab('details')}>Details</button>
        </div>

        {tab === 'copilot' ? (
          <div className="pbody">
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>CONVERSATION SUMMARY</div>
              <div className="note">
                {c.sum}
                <div className="btw xs mut" style={{ marginTop: 9 }}><span>Generated just now</span><span>Helpful? ↑ ↓</span></div>
              </div>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>SUGGESTED REPLY</div>
              <div className="aisug">
                <div style={{ fontSize: 12.8, lineHeight: 1.55 }}>{c.sug}</div>
                <div className="srcs">{c.src.map((s) => <span className="s" key={s}>{s}</span>)}</div>
                <div className="row g8">
                  <button className="btn pri sm2" onClick={insertReply}>Insert into reply</button>
                  <button className="btn sm2" onClick={insertReply}>Edit</button>
                  <span className="gr"></span>
                  <span className="xs" style={{ color: 'var(--br)' }}>Never auto-sends</span>
                </div>
              </div>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>WHAT THE AGENT DID</div>
              <div className="tline">
                {c.acts.map((a, i) => (
                  <div className="tli" key={i}>
                    <span className="rail2"><i style={{ background: 'var(--br)' }}></i></span>
                    <div><div className="t">{a[0]}</div><div className="m">{a[1]}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>AI INSIGHT</div>
              <div className="note">{c.insight}</div>
            </div>
          </div>
        ) : (
          <div className="pbody">
            <div className="row g12">
              <span className="avw"><span className="av a44">{c.ini}</span><i className="ch" style={{ background: CH[c.ch] }}></i></span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{c.n}</div>
                <div className="xs mut">{c.phone} · {c.city}</div>
              </div>
            </div>
            <div className="row g6" style={{ flexWrap: 'wrap' }}>
              {c.tags.map((t) => <span className="tag t-br" key={t}>{t}</span>)}
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 6 }}>CONTACT</div>
              <div className="kv"><span className="k">Lifecycle stage</span><span className="v">{c.stage}</span></div>
              <div className="kv"><span className="k">Lifetime value</span><span className="v num">{c.ltv}</span></div>
              <div className="kv"><span className="k">Orders</span><span className="v num">{c.orders}</span></div>
              <div className="kv"><span className="k">Customer since</span><span className="v">{c.since}</span></div>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 6 }}>CONVERSATION</div>
              <div className="kv"><span className="k">Channel</span><span className="v">{c.ch}</span></div>
              <div className="kv"><span className="k">Handled by</span><span className="v">{c.ai === 'escalated' ? 'Sneha Iyer' : 'Support Agent'}</span></div>
              <div className="kv"><span className="k">Priority</span><span className="v">{c.ai === 'escalated' ? 'High' : 'Medium'}</span></div>
            </div>
            <button className="btn" style={{ justifyContent: 'center' }}>View full profile</button>
          </div>
        )}
      </div>
    </div>
  )
}
