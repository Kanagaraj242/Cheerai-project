import { useEffect, useMemo, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Dropdown from '../components/Dropdown.jsx'
import { CH } from '../data/cheerio.js'
import {
  LABELS, ME, QUICK_FILTERS, SAVED_REPLIES, SAVED_REPLY_CATS, STATUSES, TEAM, TEMPLATES,
  memberOf, statusOf,
} from '../data/inbox.js'
import { useStore } from '../store-context.js'
import '../styles/inbox.css'

const EMOJI = ['👍', '🙏', '😊', '🎉', '❤️', '😅', '👋', '✅', '🔥', '😍', '🙌', '💯', '📦', '🚚', '💳', '⏰', '📸', '🤝']
const PRIORITIES = ['High', 'Medium', 'Low']
const SORTS = [
  { id: 'recent', label: 'Newest first' },
  { id: 'unread', label: 'Unread first' },
  { id: 'priority', label: 'Priority first' },
]

const nowTime = () =>
  new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })

const firstName = (n) => n.split(' ')[0]

const fillVars = (body, c) =>
  body
    .replace(/\{\{name\}\}/g, firstName(c.n))
    .replace(/\{\{first_name\}\}/g, firstName(c.n))
    .replace(/\{\{order_id\}\}/g, c.lastOrder?.split(' · ')[0] ?? '#12345')
    .replace(/\{\{city\}\}/g, c.city)
    .replace(/\{\{eta\}\}/g, 'Thursday')
    .replace(/\{\{tracking_link\}\}/g, 'chr.io/t/8890114')
    .replace(/\{\{1\}\}/g, firstName(c.n))
    .replace(/\{\{2\}\}/g, c.lastOrder?.split(' · ')[0] ?? '#12345')

function Avatar({ member, size = 'a32' }) {
  if (!member) return <span className={`av ${size}`} style={{ background: 'var(--ln)', color: 'var(--ink3)' }}>?</span>
  return <span className={`av ${size}`} style={{ background: member.bg }}>{member.ini}</span>
}

function Highlight({ text, term }) {
  if (!term) return text
  const i = text.toLowerCase().indexOf(term.toLowerCase())
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <b>{text.slice(i, i + term.length)}</b>
      {text.slice(i + term.length)}
    </>
  )
}

/* ------------------------------------------------------------------ */

export default function Inbox() {
  const { flash } = useOutletContext()
  const {
    conversations, activeConv, setActiveConv,
    sendMessage, addNote, setStatus, setAssignee, setPriority, markRead,
    toggleLabel, addAttribute, updateAttribute, removeAttribute,
  } = useStore()

  /* list controls */
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [quick, setQuick] = useState('all')
  const [channel, setChannel] = useState('All')
  const [owner, setOwner] = useState('all')
  const [sort, setSort] = useState('recent')

  /* composer */
  const [mode, setMode] = useState('reply')
  const [draft, setDraft] = useState('')
  const [attachment, setAttachment] = useState(null)
  const [pop, setPop] = useState(null) /* 'replies' | 'templates' | 'emoji' */
  const [replyQuery, setReplyQuery] = useState('')
  const [replyCat, setReplyCat] = useState('All')

  /* right panel */
  const [tab, setTab] = useState('details')
  const [noteDraft, setNoteDraft] = useState('')
  const [newAttr, setNewAttr] = useState({ k: '', v: '' })

  const msgsRef = useRef(null)
  const draftRef = useRef(null)

  const c = conversations[activeConv]

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
  }, [c.msgs.length, c.notes.length, activeConv])

  useEffect(() => { markRead(activeConv) }, [activeConv, markRead])

  /* ---------------- filtering ---------------- */
  const counts = useMemo(() => {
    const base = { all: conversations.length }
    STATUSES.forEach((s) => { base[s.id] = conversations.filter((k) => k.status === s.id).length })
    return base
  }, [conversations])

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = conversations
      .map((k, i) => ({ k, i }))
      .filter(({ k }) => {
        if (statusFilter !== 'all' && k.status !== statusFilter) return false
        if (quick === 'mine' && k.assignee !== ME.id) return false
        if (quick === 'unassigned' && k.assignee) return false
        if (quick === 'unread' && !k.unread) return false
        if (channel !== 'All' && k.ch !== channel) return false
        if (owner !== 'all' && k.assignee !== (owner === 'none' ? null : owner)) return false
        if (!q) return true
        const hay = [k.n, k.phone, k.email, k.p, k.city, ...k.tags, ...k.msgs.map((m) => m.text ?? '')]
          .join(' ')
          .toLowerCase()
        return hay.includes(q)
      })

    if (sort === 'unread') return [...list].sort((a, b) => b.k.unread - a.k.unread)
    if (sort === 'priority') {
      const rank = { High: 0, Medium: 1, Low: 2 }
      return [...list].sort((a, b) => rank[a.k.priority] - rank[b.k.priority])
    }
    return list
  }, [conversations, query, statusFilter, quick, channel, owner, sort])

  /* ---------------- composer actions ---------------- */
  const closePop = () => setPop(null)

  const insertText = (text) => {
    setDraft(text)
    closePop()
    draftRef.current?.focus()
  }

  const applySavedReply = (r) => insertText(fillVars(r.body, c))

  const sendTemplate = (tpl) => {
    sendMessage(activeConv, {
      from: 'us', kind: 'template', tpl: tpl.id, at: nowTime(),
      author: ME.n, by: ME.id, state: 'sent',
      text: fillVars(tpl.body, c), buttons: tpl.buttons,
    })
    closePop()
    flash(`Template ${tpl.id} sent to ${firstName(c.n)}`)
  }

  const send = () => {
    const text = draft.trim()
    if (mode === 'note') {
      if (!text) return draftRef.current?.focus()
      addNote(activeConv, text, ME.id)
      setDraft('')
      flash('Internal note added — customers never see this')
      return
    }
    if (!text && !attachment) return draftRef.current?.focus()
    sendMessage(activeConv, {
      from: 'us',
      kind: attachment ? 'image' : 'text',
      img: attachment ?? undefined,
      text: text || 'Photo',
      at: nowTime(), author: ME.n, by: ME.id, state: 'sent',
    })
    setDraft('')
    setAttachment(null)
  }

  const onDraftChange = (v) => {
    setDraft(v)
    if (v === '/') { setPop('replies'); setReplyQuery('') }
  }

  /* ---------------- panel actions ---------------- */
  const saveNote = () => {
    const text = noteDraft.trim()
    if (!text) return
    addNote(activeConv, text, ME.id)
    setNoteDraft('')
    flash('Internal note added')
  }

  const saveAttr = () => {
    if (!newAttr.k.trim()) return
    addAttribute(activeConv, newAttr.k.trim(), newAttr.v.trim() || '—')
    setNewAttr({ k: '', v: '' })
  }

  const status = statusOf(c.status)
  const assignee = memberOf(c.assignee)

  const filteredReplies = SAVED_REPLIES.filter(
    (r) =>
      (replyCat === 'All' || r.cat === replyCat) &&
      (r.title + r.short + r.body).toLowerCase().includes(replyQuery.replace(/^\//, '').toLowerCase()),
  )

  const sessionBar =
    c.sess === 'open' ? (
      <div className="ti-sysbar" style={{ background: 'var(--okS)', color: 'var(--ok)' }}>
        <span>Session open — free replies for {Math.floor(c.mins / 60)}h {c.mins % 60}m</span>
        <span>A paid template is needed after that</span>
      </div>
    ) : c.sess === 'closing' ? (
      <div className="ti-sysbar" style={{ background: 'var(--warnS)', color: 'var(--warn)' }}>
        <span>Session closing in {c.mins} minutes</span>
        <span>Reply now to stay free</span>
      </div>
    ) : c.sess === 'closed' ? (
      <div className="ti-sysbar" style={{ background: 'var(--dgS)', color: 'var(--dg)' }}>
        <span>24-hour window closed — free replies are blocked</span>
        <span>Send an approved template instead</span>
      </div>
    ) : null

  return (
    <div className="ti">
      {/* ---------------- chat list ---------------- */}
      <section className="ti-list" aria-label="Conversations">
        <div className="ti-lhd">
          <div className="btw">
            <span className="h2">Team inbox</span>
            <span className="xs mut num">{rows.length} of {conversations.length}</span>
          </div>

          <div className="ti-search">
            <Icon name="search" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, number or message…"
              aria-label="Search conversations"
            />
            {query && <button className="clr" onClick={() => setQuery('')} aria-label="Clear search">×</button>}
          </div>

          <div className="ti-stabs" role="tablist">
            <button className={`ti-stab${statusFilter === 'all' ? ' on' : ''}`} onClick={() => setStatusFilter('all')}>
              All <span className="cnt num">{counts.all}</span>
            </button>
            {STATUSES.map((s) => (
              <button
                key={s.id}
                className={`ti-stab${statusFilter === s.id ? ' on' : ''}`}
                onClick={() => setStatusFilter(s.id)}
                title={s.hint}
              >
                <i className="st-dot" style={{ background: s.dot }}></i>
                {s.label} <span className="cnt num">{counts[s.id]}</span>
              </button>
            ))}
          </div>

          <div className="ti-filters">
            <span className="selchip">
              <select value={quick} onChange={(e) => setQuick(e.target.value)} aria-label="Quick filter">
                {QUICK_FILTERS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
              </select>
            </span>
            <span className="selchip">
              <select value={channel} onChange={(e) => setChannel(e.target.value)} aria-label="Channel filter">
                {['All', 'WhatsApp', 'Instagram', 'Email', 'SMS'].map((x) => (
                  <option key={x} value={x}>{x === 'All' ? 'All channels' : x}</option>
                ))}
              </select>
            </span>
            <span className="selchip">
              <select value={owner} onChange={(e) => setOwner(e.target.value)} aria-label="Assignee filter">
                <option value="all">Any agent</option>
                <option value="none">Unassigned</option>
                {TEAM.map((m) => <option key={m.id} value={m.id}>{m.n}</option>)}
              </select>
            </span>
            <span className="selchip">
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
                {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </span>
          </div>
        </div>

        <div className="ti-scroll">
          {rows.length === 0 && (
            <div className="ti-empty">
              No conversations match those filters.<br />
              Try clearing the search or switching back to <b>All</b>.
            </div>
          )}
          {rows.map(({ k, i }) => {
            const st = statusOf(k.status)
            const ag = memberOf(k.assignee)
            return (
              <button
                key={k.id}
                className={`ti-cv${i === activeConv ? ' on' : ''}${k.unread ? ' unread' : ''}`}
                onClick={() => { setActiveConv(i); setDraft(''); setAttachment(null); setPop(null); setMode('reply') }}
              >
                <div className="row g10">
                  <span className="avw">
                    <span className="av a36">{k.ini}</span>
                    <i className="ch" style={{ background: CH[k.ch] }}></i>
                  </span>
                  <span className="gr" style={{ minWidth: 0 }}>
                    <span className="nm"><Highlight text={k.n} term={query} /></span>
                    <div className="pv"><Highlight text={k.p} term={query} /></div>
                  </span>
                  <span className="xs mut" style={{ alignSelf: 'flex-start' }}>{k.t}</span>
                </div>
                <div className="foot">
                  <span className={`tag ${st.tone}`}><i className="st-dot" style={{ background: st.dot }}></i>{st.label}</span>
                  {ag ? (
                    <span className="ti-asgn"><Avatar member={ag} size="a32" />{ag.ini}</span>
                  ) : (
                    <span className="ti-asgn none">Unassigned</span>
                  )}
                  {k.tags[0] && <span className="tag t-nt">{k.tags[0]}</span>}
                  <span className="gr"></span>
                  {k.unread > 0 && <span className="tag t-br num">{k.unread}</span>}
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* ---------------- thread ---------------- */}
      <section className="ti-thread" aria-label="Conversation">
        <header className="ti-thd">
          <span className="avw">
            <span className="av a36">{c.ini}</span>
            <i className="ch" style={{ background: CH[c.ch] }}></i>
          </span>
          <div className="who">
            <div className="n">{c.n}</div>
            <div className="s">{c.ch} · {c.phone} · {c.city}</div>
          </div>
          <div className="gr"></div>

          <Dropdown
            caption="Status"
            title="Change conversation status"
            label={<><i className="st-dot" style={{ background: status.dot }}></i>{status.label}</>}
          >
            {(close) => (
              <>
                <div className="hdl">SET STATUS</div>
                {STATUSES.map((s) => (
                  <button
                    key={s.id}
                    className={`dd-item${s.id === c.status ? ' on' : ''}`}
                    onClick={() => { setStatus(activeConv, s.id); close(); flash(`Marked ${s.label.toLowerCase()}`) }}
                  >
                    <i className="st-dot" style={{ background: s.dot }}></i>
                    <span className="gr">{s.label}<div className="sub">{s.hint}</div></span>
                    {s.id === c.status && <Icon name="check" style={{ width: 13, height: 13, fill: 'none', stroke: 'currentColor', strokeWidth: 2.4 }} />}
                  </button>
                ))}
              </>
            )}
          </Dropdown>

          <Dropdown
            caption="Owner"
            title="Assign this conversation"
            label={assignee ? assignee.n.split(' ')[0] : 'Unassigned'}
          >
            {(close) => (
              <>
                <div className="hdl">ASSIGN TO</div>
                <button
                  className={`dd-item${!c.assignee ? ' on' : ''}`}
                  onClick={() => { setAssignee(activeConv, null); close(); flash('Moved back to the unassigned queue') }}
                >
                  <span className="av a32" style={{ width: 22, height: 22, fontSize: 9, background: 'var(--ln)', color: 'var(--ink3)' }}>—</span>
                  Unassigned
                </button>
                {TEAM.map((m) => (
                  <button
                    key={m.id}
                    className={`dd-item${m.id === c.assignee ? ' on' : ''}`}
                    onClick={() => { setAssignee(activeConv, m.id); close(); flash(`Assigned to ${m.n}`) }}
                  >
                    <Avatar member={m} />
                    <span className="gr">
                      {m.n}{m.id === ME.id ? ' (you)' : ''}
                      <div className="sub">{m.role} · {m.online ? 'online' : 'away'}</div>
                    </span>
                  </button>
                ))}
              </>
            )}
          </Dropdown>

          <Dropdown caption="Priority" label={c.priority} title="Change priority">
            {(close) => (
              <>
                <div className="hdl">PRIORITY</div>
                {PRIORITIES.map((p) => (
                  <button key={p} className={`dd-item${p === c.priority ? ' on' : ''}`} onClick={() => { setPriority(activeConv, p); close() }}>
                    {p}
                  </button>
                ))}
              </>
            )}
          </Dropdown>

          {c.status !== 'resolved' ? (
            <button className="btn pri sm2" onClick={() => { setStatus(activeConv, 'resolved'); flash('Conversation resolved') }}>
              <Icon name="check" />Resolve
            </button>
          ) : (
            <button className="btn sm2" onClick={() => { setStatus(activeConv, 'unresolved'); flash('Conversation reopened') }}>
              <Icon name="refresh" />Reopen
            </button>
          )}
        </header>

        <div className="ti-msgs" ref={msgsRef}>
          <div className="ti-day">Today</div>

          {c.msgs.map((m, i) => (
            <div key={i} className={`ti-bub ${m.from === 'us' ? 'us' : 'them'}`}>
              {m.author && (
                <span className="sender">
                  <Avatar member={memberOf(m.by)} size="a32" />{m.author}
                </span>
              )}
              {m.kind === 'template' && (
                <div className="ti-tplhdr"><Icon name="doc" />TEMPLATE · {m.tpl}</div>
              )}
              {m.kind === 'image' && (
                <div className="ti-img" style={{ background: m.img === 'doc' ? 'linear-gradient(135deg,#8494B0,#5C6B87)' : 'linear-gradient(135deg,#7C5CF0,#4C8DF6)' }}>
                  <Icon name={m.img === 'doc' ? 'doc' : 'image'} />
                </div>
              )}
              {m.text}
              {m.buttons?.length > 0 && (
                <div className="ti-btns">{m.buttons.map((b) => <span key={b}>{b}</span>)}</div>
              )}
              <div className="meta">
                {m.at}
                {m.from === 'us' && <span className={m.state === 'read' ? 'rd' : ''}>{m.state === 'sent' ? '✓' : '✓✓'}</span>}
              </div>
            </div>
          ))}

          {[...c.notes].reverse().map((n, i) => {
            const by = memberOf(n.by)
            return (
              <div className="ti-note" key={i}>
                <div className="nhd">
                  <Icon name="note" />
                  <Avatar member={by} size="a32" />
                  {by?.n ?? 'Someone'} left an internal note
                  <span className="when">{n.at}</span>
                </div>
                {n.text}
              </div>
            )
          })}
        </div>

        {sessionBar}

        <div className={`ti-comp${mode === 'note' ? ' note' : ''}`}>
          {pop === 'replies' && (
            <div className="pop">
              <div className="phd">
                <Icon name="reply" style={{ width: 15, height: 15, fill: 'none', stroke: 'var(--br)', strokeWidth: 1.9 }} />
                <span className="t">Saved replies</span>
                <input
                  className="psearch"
                  autoFocus
                  value={replyQuery}
                  onChange={(e) => setReplyQuery(e.target.value)}
                  placeholder="Search saved replies…"
                />
                <button className="clr" onClick={closePop} aria-label="Close">×</button>
              </div>
              <div className="pop-cats">
                {SAVED_REPLY_CATS.map((cat) => (
                  <button key={cat} className={`ti-stab${replyCat === cat ? ' on' : ''}`} onClick={() => setReplyCat(cat)}>{cat}</button>
                ))}
              </div>
              <div className="plist">
                {filteredReplies.length === 0 && <div className="ti-empty">Nothing saved under that search.</div>}
                {filteredReplies.map((r) => (
                  <button key={r.id} className="pop-item" onClick={() => applySavedReply(r)}>
                    <div className="t">{r.title}<span className="sc">{r.short}</span><span className="gr"></span><span className="xs mut num">used {r.used}×</span></div>
                    <div className="b">{fillVars(r.body, c)}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {pop === 'templates' && (
            <div className="pop">
              <div className="phd">
                <Icon name="doc" style={{ width: 15, height: 15, fill: 'none', stroke: 'var(--br)', strokeWidth: 1.9 }} />
                <span className="t">Approved templates</span>
                <span className="gr"></span>
                <span className="xs mut">₹0.72 per conversation</span>
                <button className="clr" onClick={closePop} aria-label="Close">×</button>
              </div>
              <div className="plist">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    className="pop-item"
                    disabled={t.status !== 'Approved'}
                    style={t.status !== 'Approved' ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
                    onClick={() => t.status === 'Approved' && sendTemplate(t)}
                  >
                    <div className="t">
                      {t.name}
                      <span className={`tag ${t.status === 'Approved' ? 't-ok' : 't-wn'}`}>{t.status}</span>
                      <span className="gr"></span>
                      <span className="xs mut">{t.cat}</span>
                    </div>
                    <div className="b">{fillVars(t.body, c)}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {pop === 'emoji' && (
            <div className="pop" style={{ left: 'auto', right: 'auto', width: 300, maxHeight: 'none' }}>
              <div className="phd"><span className="t">Emoji</span><span className="gr"></span><button className="clr" onClick={closePop} aria-label="Close">×</button></div>
              <div className="emoji-grid">
                {EMOJI.map((e) => (
                  <button key={e} onClick={() => { setDraft((d) => d + e); closePop(); draftRef.current?.focus() }}>{e}</button>
                ))}
              </div>
            </div>
          )}

          <div className="ti-modes">
            <button className={`ti-mode${mode === 'reply' ? ' on' : ''}`} onClick={() => setMode('reply')}>
              <Icon name="reply" />Reply
            </button>
            <button className={`ti-mode${mode === 'note' ? ' on' : ''}`} onClick={() => setMode('note')}>
              <Icon name="note" />Internal note
            </button>
            <span className="gr"></span>
            <span className="ti-hint" style={{ alignSelf: 'center' }}>
              {mode === 'note' ? 'Only your team sees notes' : `Replying on ${c.ch} as ${ME.n}`}
            </span>
          </div>

          {attachment && (
            <div className="ti-attach">
              <Icon name="image" style={{ width: 13, height: 13, fill: 'none', stroke: 'currentColor', strokeWidth: 1.9 }} />
              product-photo.jpg
              <button onClick={() => setAttachment(null)} aria-label="Remove attachment">×</button>
            </div>
          )}

          <div className="ti-ta">
            <textarea
              ref={draftRef}
              value={draft}
              onChange={(e) => onDraftChange(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder={mode === 'note' ? 'Write a note for your teammates…' : 'Type a message, or press / for a saved reply…'}
            />
          </div>

          <div className="ti-tools">
            {mode === 'reply' && (
              <>
                <button className={`ti-tool${pop === 'replies' ? ' on' : ''}`} title="Saved replies (/)" onClick={() => setPop(pop === 'replies' ? null : 'replies')}>
                  <Icon name="reply" />
                </button>
                <button className={`ti-tool${pop === 'templates' ? ' on' : ''}`} title="Approved templates" onClick={() => setPop(pop === 'templates' ? null : 'templates')}>
                  <Icon name="doc" />
                </button>
                <button className="ti-tool" title="Attach an image" onClick={() => { setAttachment('mat'); flash('product-photo.jpg attached') }}>
                  <Icon name="image" />
                </button>
                <button className={`ti-tool${pop === 'emoji' ? ' on' : ''}`} title="Emoji" onClick={() => setPop(pop === 'emoji' ? null : 'emoji')}>
                  <Icon name="smile" />
                </button>
                <span className="ti-hint">Enter to send · Shift + Enter for a new line</span>
              </>
            )}
            <span className="gr"></span>
            <button className="btn pri sm2" onClick={send}>
              <Icon name={mode === 'note' ? 'note' : 'send'} />{mode === 'note' ? 'Add note' : 'Send'}
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- customer panel ---------------- */}
      <aside className="ti-panel" aria-label="Customer details">
        <div className="ti-ptabs">
          <button className={tab === 'details' ? 'on' : ''} onClick={() => setTab('details')}>Details</button>
          <button className={tab === 'history' ? 'on' : ''} onClick={() => setTab('history')}>History</button>
          <button className={tab === 'notes' ? 'on' : ''} onClick={() => setTab('notes')}>Notes {c.notes.length > 0 && <span className="num">({c.notes.length})</span>}</button>
        </div>

        {tab === 'details' && (
          <div className="ti-pbody">
            <div className="ti-prof">
              <span className="avw">
                <span className="av a56">{c.ini}</span>
                <i className="ch" style={{ background: CH[c.ch], width: 16, height: 16 }}></i>
              </span>
              <div>
                <div className="nm">{c.n}</div>
                <div className="sub">{c.stage} · customer since {c.since}</div>
              </div>
            </div>

            <div className="ti-quick">
              <button onClick={() => flash(`Calling ${c.phone}`)}><Icon name="phone" />Call</button>
              <button onClick={() => flash(`Composing to ${c.email}`)}><Icon name="mail" />Email</button>
              <button onClick={() => flash('Number copied to clipboard')}><Icon name="copy" />Copy</button>
              <button onClick={() => flash('Opening the full contact profile')}><Icon name="user" />Profile</button>
            </div>

            <div className="sect">
              <div className="sh"><span className="lbl">CONVERSATION</span></div>
              <div className="kv"><span className="k">Status</span><span className="v"><span className={`tag ${status.tone}`}><i className="st-dot" style={{ background: status.dot }}></i>{status.label}</span></span></div>
              <div className="kv"><span className="k">Assigned to</span><span className="v">{assignee ? assignee.n : 'Unassigned'}</span></div>
              <div className="kv"><span className="k">Priority</span><span className="v">{c.priority}</span></div>
              <div className="kv"><span className="k">Channel</span><span className="v">{c.ch}</span></div>
              <div className="kv"><span className="k">Messages</span><span className="v num">{c.msgs.length}</span></div>
            </div>

            <div className="sect">
              <div className="sh"><span className="lbl">LABELS</span></div>
              <div className="lbl-pick">
                {LABELS.map((l) => (
                  <button key={l} className={c.tags.includes(l) ? 'on' : ''} onClick={() => toggleLabel(activeConv, l)}>
                    {c.tags.includes(l) ? '✓ ' : '+ '}{l}
                  </button>
                ))}
              </div>
            </div>

            <div className="sect">
              <div className="sh"><span className="lbl">CONTACT</span></div>
              <div className="kv"><span className="k">Phone</span><span className="v num">{c.phone}</span></div>
              <div className="kv"><span className="k">Email</span><span className="v" style={{ fontSize: 11.5 }}>{c.email}</span></div>
              <div className="kv"><span className="k">City</span><span className="v">{c.city}</span></div>
              <div className="kv"><span className="k">Lifetime value</span><span className="v num">{c.ltv}</span></div>
              <div className="kv"><span className="k">Orders</span><span className="v num">{c.orders}</span></div>
              <div className="kv"><span className="k">Last order</span><span className="v">{c.lastOrder}</span></div>
            </div>

            <div className="sect">
              <div className="sh">
                <span className="lbl">CUSTOM ATTRIBUTES</span>
                <span className="xs mut num">{c.attrs.length}</span>
              </div>
              {c.attrs.map((a, i) => (
                <div className="attr" key={`${a.k}-${i}`}>
                  <span className="k">{a.k}</span>
                  <input
                    value={a.v}
                    onChange={(e) => updateAttribute(activeConv, i, e.target.value)}
                    aria-label={a.k}
                  />
                  <button className="x" onClick={() => removeAttribute(activeConv, i)} aria-label={`Remove ${a.k}`}>×</button>
                </div>
              ))}
              <div className="attr-new">
                <input
                  value={newAttr.k}
                  onChange={(e) => setNewAttr({ ...newAttr, k: e.target.value })}
                  placeholder="Attribute"
                  aria-label="New attribute name"
                />
                <input
                  value={newAttr.v}
                  onChange={(e) => setNewAttr({ ...newAttr, v: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') saveAttr() }}
                  placeholder="Value"
                  aria-label="New attribute value"
                />
                <button className="btn sm2" onClick={saveAttr}><Icon name="plus" /></button>
              </div>
            </div>
          </div>
        )}

        {tab === 'history' && (
          <div className="ti-pbody">
            <div className="sect">
              <div className="sh"><span className="lbl">PREVIOUS CONVERSATIONS</span><span className="xs mut num">{c.history.length}</span></div>
              {c.history.length === 0 && (
                <div className="note">This is {firstName(c.n)}&rsquo;s first conversation with your team.</div>
              )}
              <div className="hist">
                {c.history.map((h, i) => (
                  <button className="hist-i" key={i} style={{ textAlign: 'left', width: '100%' }} onClick={() => flash('Opening the archived thread')}>
                    <div className="t">{h.title}</div>
                    <div className="m">
                      <span className={`tag ${h.outcome === 'Resolved' ? 't-ok' : 't-in'}`}>{h.outcome}</span>
                      <span>{h.at}</span>·<span>{h.ch}</span>·<span>{h.msgs} messages</span>
                    </div>
                    <div className="m">
                      <Avatar member={memberOf(h.agent)} size="a32" />
                      handled by {memberOf(h.agent)?.n}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="sect">
              <div className="sh"><span className="lbl">CONTEXT</span></div>
              <div className="note">{c.insight}</div>
            </div>

            <div className="sect">
              <div className="sh"><span className="lbl">AT A GLANCE</span></div>
              <div className="kv"><span className="k">First seen</span><span className="v">{c.firstSeen}</span></div>
              <div className="kv"><span className="k">Total conversations</span><span className="v num">{c.history.length + 1}</span></div>
              <div className="kv"><span className="k">Total orders</span><span className="v num">{c.orders}</span></div>
              <div className="kv"><span className="k">Lifetime value</span><span className="v num">{c.ltv}</span></div>
            </div>
          </div>
        )}

        {tab === 'notes' && (
          <div className="ti-pbody">
            <div className="note-add">
              <textarea
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="Leave context for whoever picks this up next…"
                aria-label="New internal note"
              />
              <div className="row g8">
                <span className="xs" style={{ color: '#A98C33' }}>Never sent to the customer</span>
                <span className="gr"></span>
                <button className="btn sm2" onClick={saveNote}><Icon name="note" />Add note</button>
              </div>
            </div>

            <div className="note-list">
              {c.notes.length === 0 && <div className="ti-empty">No notes on this conversation yet.</div>}
              {c.notes.map((n, i) => {
                const by = memberOf(n.by)
                return (
                  <div className="note-c" key={i}>
                    <div className="h">
                      <Avatar member={by} size="a32" />
                      {by?.n}
                      <span className="w">{n.at}</span>
                    </div>
                    {n.text}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}
