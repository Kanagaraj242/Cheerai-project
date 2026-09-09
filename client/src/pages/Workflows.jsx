import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import {
  ATTRIBUTES, CATALOG, CATS, CHANNELS, NODE_H, NODE_W, TOUR,
  attributeOf, catalogOf, edgePath, inPoint, operatorsFor, portPoint,
} from '../data/workflow.js'
import { useStore } from '../store-context.js'
import '../styles/builder.css'

const MIN_Z = 0.35
const MAX_Z = 1.75
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

const SAMPLE = {
  first_name: 'Rahul', name: 'Rahul', cart_items: 'Yoga Mat Pro + 1 more', cart_value: '2,340',
  cart_id: '8f21c', order_id: '#12345', city: 'Bengaluru', tracking_link: 'chr.io/t/8890114',
}
const render = (s = '') => s.replace(/\{\{(\w+)\}\}/g, (_, k) => SAMPLE[k] ?? k.replace(/_/g, ' '))

/* summary line shown on the node itself ---------------------------- */
function summarise(node) {
  const c = node.config
  switch (node.kind) {
    case 'msg_received': return `${c.channel} · ${c.keyword === 'Contains keyword' ? `“${c.keywordValue || '…'}”` : c.keyword.toLowerCase()}`
    case 'cart_abandoned': return `${c.source} · carts over ₹${c.minValue || 0}`
    case 'order_placed': return `${c.source} · ${c.firstOnly === 'Yes' ? 'first order only' : 'every order'}`
    case 'contact_created': return `Added to ${c.list}`
    case 'ad_click': return c.campaign
    case 'webhook': return `POST ${c.path}`
    case 'send_whatsapp': return c.mode === 'Template' ? `Template ${c.template}` : render(c.body)
    case 'send_email': return c.subject
    case 'send_sms': return render(c.body)
    case 'send_instagram': return render(c.body)
    case 'assign_agent': return `${c.assignee} · mark ${c.status.toLowerCase()}`
    case 'if_else': {
      const n = c.rules?.length ?? 0
      return n === 0 ? 'No conditions set yet' : `${n} rule${n > 1 ? 's' : ''} joined with ${c.match}`
    }
    case 'has_replied': return `Replied within ${c.within}`
    case 'split_test': return `${c.share}% down path A`
    case 'delay': return `Wait ${c.amount} ${c.unit}${c.businessHours === 'Yes' ? ' · business hours' : ''}`
    case 'wait_until': return `Hold until ${c.time} ${c.tz}`
    case 'add_tag': return `${c.mode} tag “${c.tag}”`
    case 'set_attribute': return `${attributeOf(c.attr).label} → ${c.value}`
    case 'notify_team': return `Slack ${c.channel}`
    default: return catalogOf(node.kind).desc
  }
}

const MESSAGE_KINDS = ['send_whatsapp', 'send_email', 'send_sms', 'send_instagram']

/* ================================================================== */

export default function Workflows() {
  const { flash } = useOutletContext()
  const {
    wfNodes, wfEdges, selectedId, setSelectedId,
    addWfNode, moveNode, updateNode, updateConfig, deleteNode, duplicateNode,
    connect, removeEdge,
    flowName, setFlowName, flowLive, setFlowLive, savedAt, saveFlow,
    generated, setGenerated,
  } = useStore()

  const canvasRef = useRef(null)
  const [view, setView] = useState({ x: 40, y: 10, z: 0.78 })
  const [palQuery, setPalQuery] = useState('')
  const [drag, setDrag] = useState(null)      /* { id, dx, dy } */
  const [pan, setPan] = useState(null)        /* { sx, sy, vx, vy } */
  const [link, setLink] = useState(null)      /* { from, port, x, y } */
  const [dropping, setDropping] = useState(false)
  const [tab, setTab] = useState('config')
  const [tourStep, setTourStep] = useState(() => {
    try { return localStorage.getItem('cheerio.wf.tour') ? null : 0 } catch { return 0 }
  })

  const selected = wfNodes.find((n) => n.id === selectedId) ?? null

  /* ---------------- coordinate helpers ---------------- */
  const toWorld = useCallback((clientX, clientY) => {
    const r = canvasRef.current.getBoundingClientRect()
    return { x: (clientX - r.left - view.x) / view.z, y: (clientY - r.top - view.y) / view.z }
  }, [view])

  /* ---------------- wheel: zoom / pan ---------------- */
  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      const r = el.getBoundingClientRect()
      if (e.ctrlKey || e.metaKey) {
        const cx = e.clientX - r.left
        const cy = e.clientY - r.top
        setView((v) => {
          const z = clamp(v.z * (e.deltaY < 0 ? 1.1 : 0.9), MIN_Z, MAX_Z)
          const k = z / v.z
          return { z, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k }
        })
      } else {
        setView((v) => ({ ...v, x: v.x - e.deltaX, y: v.y - e.deltaY }))
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  /* ---------------- pointer interactions ---------------- */
  useEffect(() => {
    if (!drag && !pan && !link) return

    const onMove = (e) => {
      if (drag) {
        const p = toWorld(e.clientX, e.clientY)
        moveNode(drag.id, p.x - drag.dx, p.y - drag.dy)
      } else if (pan) {
        setView((v) => ({ ...v, x: pan.vx + (e.clientX - pan.sx), y: pan.vy + (e.clientY - pan.sy) }))
      } else if (link) {
        const p = toWorld(e.clientX, e.clientY)
        setLink((l) => (l ? { ...l, x: p.x, y: p.y } : l))
      }
    }

    const onUp = (e) => {
      if (link) {
        const el = document.elementFromPoint(e.clientX, e.clientY)
        const host = el?.closest('[data-node]')
        const target = host?.getAttribute('data-node')
        if (target && target !== link.from) {
          connect(link.from, link.port, target)
          flash('Steps connected')
        }
      }
      setDrag(null); setPan(null); setLink(null)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [drag, pan, link, toWorld, moveNode, connect, flash])

  const startNodeDrag = (e, node) => {
    if (e.target.closest('.port')) return
    e.preventDefault()
    setSelectedId(node.id)
    const p = toWorld(e.clientX, e.clientY)
    setDrag({ id: node.id, dx: p.x - node.x, dy: p.y - node.y })
  }

  const startPan = (e) => {
    if (e.target !== e.currentTarget && !e.target.classList.contains('wf-world')) return
    setSelectedId(null)
    setPan({ sx: e.clientX, sy: e.clientY, vx: view.x, vy: view.y })
  }

  const startLink = (e, nodeId, port) => {
    e.stopPropagation()
    e.preventDefault()
    const node = wfNodes.find((n) => n.id === nodeId)
    const p = portPoint(node, port)
    setLink({ from: nodeId, port, x: p.x, y: p.y })
  }

  /* ---------------- palette drop ---------------- */
  const onDrop = (e) => {
    e.preventDefault()
    setDropping(false)
    const kind = e.dataTransfer.getData('text/cheerio-node')
    if (!kind) return
    const p = toWorld(e.clientX, e.clientY)
    addWfNode(kind, p.x - NODE_W / 2, p.y - NODE_H / 2)
    setTab('config')
    flash(`${catalogOf(kind).label} added — configure it on the right`)
  }

  const addAtCentre = (kind) => {
    const r = canvasRef.current.getBoundingClientRect()
    const p = toWorld(r.left + r.width / 2, r.top + r.height / 2)
    addWfNode(kind, p.x - NODE_W / 2, p.y - NODE_H / 2)
    setTab('config')
    flash(`${catalogOf(kind).label} added to the canvas`)
  }

  /* ---------------- zoom controls ---------------- */
  const zoomBy = (f) => setView((v) => {
    const el = canvasRef.current
    const cx = (el?.clientWidth ?? 800) / 2
    const cy = (el?.clientHeight ?? 600) / 2
    const z = clamp(v.z * f, MIN_Z, MAX_Z)
    const k = z / v.z
    return { z, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k }
  })

  const fitToView = useCallback(() => {
    const el = canvasRef.current
    if (!el || wfNodes.length === 0) return
    const minX = Math.min(...wfNodes.map((n) => n.x))
    const minY = Math.min(...wfNodes.map((n) => n.y))
    const maxX = Math.max(...wfNodes.map((n) => n.x + NODE_W))
    const maxY = Math.max(...wfNodes.map((n) => n.y + NODE_H))
    const pad = 70
    const z = clamp(Math.min((el.clientWidth - pad * 2) / (maxX - minX), (el.clientHeight - pad * 2) / (maxY - minY)), MIN_Z, 1)
    setView({
      z,
      x: (el.clientWidth - (maxX - minX) * z) / 2 - minX * z,
      y: pad / 2 - minY * z,
    })
  }, [wfNodes])

  const fitted = useRef(false)
  useEffect(() => {
    if (fitted.current || wfNodes.length === 0) return
    fitted.current = true
    fitToView()
  }, [fitToView, wfNodes.length])

  /* ---------------- validation ---------------- */
  const issues = useMemo(() => {
    const out = []
    const triggers = wfNodes.filter((n) => catalogOf(n.kind).cat === 'event')
    if (triggers.length === 0) out.push({ text: 'The flow has no event to start it' })
    if (triggers.length > 1) out.push({ text: `${triggers.length} events start this flow — usually you want one` })

    const incoming = new Set(wfEdges.map((e) => e.to))
    wfNodes.forEach((n) => {
      const spec = catalogOf(n.kind)
      if (spec.cat !== 'event' && !incoming.has(n.id)) out.push({ id: n.id, text: `“${n.title}” is not connected to anything` })
      if (MESSAGE_KINDS.includes(n.kind) && !(n.config.body ?? '').trim()) out.push({ id: n.id, text: `“${n.title}” has an empty message` })
      if (n.kind === 'if_else' && (n.config.rules?.length ?? 0) === 0) out.push({ id: n.id, text: `“${n.title}” has no conditions` })
      const ports = spec.ports ?? ['out']
      if (ports.length === 2) {
        ports.forEach((p) => {
          if (!wfEdges.some((e) => e.from === n.id && e.port === p)) out.push({ id: n.id, text: `“${n.title}” has nothing on its ${p.toUpperCase()} branch` })
        })
      }
    })
    return out
  }, [wfNodes, wfEdges])

  const badNodes = useMemo(() => new Set(issues.filter((i) => i.id).map((i) => i.id)), [issues])

  /* ---------------- palette grouping ---------------- */
  const grouped = useMemo(() => {
    const q = palQuery.trim().toLowerCase()
    const match = (item) =>
      !q || `${item.label} ${item.desc} ${item.keywords}`.toLowerCase().includes(q)
    return Object.entries(CATS)
      .map(([id, cat]) => ({ id, cat, items: CATALOG.filter((i) => i.cat === id && match(i)) }))
      .filter((g) => g.items.length > 0)
  }, [palQuery])

  /* ---------------- preview source ---------------- */
  const previewNode = useMemo(() => {
    if (selected && MESSAGE_KINDS.includes(selected.kind)) return selected
    return wfNodes.find((n) => MESSAGE_KINDS.includes(n.kind)) ?? null
  }, [selected, wfNodes])

  /* ---------------- flow actions ---------------- */
  const onSave = () => {
    saveFlow()
    setGenerated(false)
    flash(`“${flowName}” saved · ${wfNodes.length} steps`)
  }

  const onActivate = () => {
    if (issues.length > 0) {
      flash(`Fix ${issues.length} issue${issues.length > 1 ? 's' : ''} before this can go live`)
      return
    }
    saveFlow()
    setFlowLive(true)
    setGenerated(false)
    flash(`“${flowName}” is live — it will run on the next matching event`)
  }

  const closeTour = () => {
    setTourStep(null)
    try { localStorage.setItem('cheerio.wf.tour', '1') } catch { /* private mode */ }
  }

  /* ================================================================ */
  return (
    <div className="wf">
      {/* ---------------- palette ---------------- */}
      <section className="wf-pal" aria-label="Node library">
        <div className="wf-palhd">
          <div>
            <div className="t">Add a step</div>
            <div className="s">Drag a node onto the canvas, or click to drop it in the middle.</div>
          </div>
          <div className="wf-palsearch">
            <Icon name="search" />
            <input
              value={palQuery}
              onChange={(e) => setPalQuery(e.target.value)}
              placeholder="Search nodes…"
              aria-label="Search nodes"
            />
            {palQuery && <button className="clr" onClick={() => setPalQuery('')} aria-label="Clear">×</button>}
          </div>
        </div>

        <div className="wf-palscroll">
          {grouped.length === 0 && <div className="ti-empty">No nodes match “{palQuery}”.</div>}
          {grouped.map(({ id, cat, items }) => (
            <div className="wf-catgrp" key={id}>
              <div className="wf-cathd" title={cat.blurb}>
                <i className="sw" style={{ background: cat.color }}></i>
                <span className="lb">{cat.label.toUpperCase()}</span>
                <span className="n num">{items.length}</span>
              </div>
              {items.map((item) => (
                <button
                  key={item.kind}
                  className="wf-item"
                  draggable
                  title={item.desc}
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/cheerio-node', item.kind)
                    e.dataTransfer.effectAllowed = 'copy'
                  }}
                  onClick={() => addAtCentre(item.kind)}
                >
                  <span className="ic" style={{ background: cat.soft }}>
                    <Icon name={item.icon} style={{ stroke: cat.color }} />
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span className="t">{item.label}</span>
                    <div className="d">{item.desc}</div>
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- canvas ---------------- */}
      <div className="wf-main">
        <header className="wf-bar">
          <div style={{ minWidth: 0 }}>
            <input
              className="wf-name"
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              aria-label="Workflow name"
              size={Math.max(12, flowName.length)}
            />
            <div className="wf-crumb">
              {wfNodes.length} steps · {wfEdges.length} connections
              {savedAt ? ` · saved ${savedAt}` : ' · not saved yet'}
            </div>
          </div>

          <div className="gr"></div>

          {generated && <span className="tag t-br"><Icon name="spark" />Generated from your description</span>}
          {flowLive ? <span className="tag t-ok"><i className="st-dot" style={{ background: 'var(--ok)' }}></i>Live</span>
            : <span className="tag t-nt">Draft</span>}

          <button className="btn sm2" title="Replay the walkthrough" onClick={() => setTourStep(0)}>
            <Icon name="help" />Guide
          </button>
          <button className="btn sm2" title="Send yourself a test run" onClick={() => flash('Test run queued — check your own WhatsApp in a moment')}>
            <Icon name="play" />Test
          </button>
          <button className="btn sm2" onClick={onSave}><Icon name="save" />Save</button>
          <button className="btn pri sm2" onClick={onActivate}><Icon name="bolt" />{flowLive ? 'Update' : 'Activate'}</button>
        </header>

        {issues.length > 0 && (
          <div className="wf-issues">
            <Icon name="warn" style={{ width: 14, height: 14, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }} />
            <b>{issues.length} thing{issues.length > 1 ? 's' : ''} to fix before this can go live</b>
            {issues.slice(0, 3).map((i, n) => (
              <button
                key={n}
                className="pill"
                onClick={() => { if (i.id) { setSelectedId(i.id); setTab('config') } }}
              >
                {i.text}
              </button>
            ))}
            {issues.length > 3 && <span className="pill">+{issues.length - 3} more</span>}
          </div>
        )}

        <div
          ref={canvasRef}
          className={`wf-canvas${pan ? ' grabbing' : ''}${dropping ? ' dropping' : ''}`}
          onPointerDown={startPan}
          onDragOver={(e) => { e.preventDefault(); setDropping(true) }}
          onDragLeave={() => setDropping(false)}
          onDrop={onDrop}
        >
          <div className="wf-world" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.z})` }}>
            <svg className="wf-edges" width="1" height="1">
              {wfEdges.map((e) => {
                const from = wfNodes.find((n) => n.id === e.from)
                const to = wfNodes.find((n) => n.id === e.to)
                if (!from || !to) return null
                const a = portPoint(from, e.port)
                const b = inPoint(to)
                const colour = e.port === 'yes' ? 'var(--ok)' : e.port === 'no' ? 'var(--dg)' : 'var(--ink4)'
                return (
                  <g key={e.id} onClick={() => { removeEdge(e.id); flash('Connection removed') }}>
                    <path className="hit" d={edgePath(a, b)}>
                      <title>Click to remove this connection</title>
                    </path>
                    <path className="line" d={edgePath(a, b)} stroke={colour} />
                    <circle cx={b.x} cy={b.y - 1} r="3.2" fill={colour} />
                  </g>
                )
              })}
              {link && (
                <path
                  d={edgePath(portPoint(wfNodes.find((n) => n.id === link.from), link.port), { x: link.x, y: link.y })}
                  fill="none" stroke="var(--br)" strokeWidth="2" strokeDasharray="5 4"
                />
              )}
            </svg>

            {wfNodes.map((node) => {
              const spec = catalogOf(node.kind)
              const cat = CATS[spec.cat]
              const ports = spec.ports ?? ['out']
              return (
                <div
                  key={node.id}
                  data-node={node.id}
                  className={`wfn${node.id === selectedId ? ' sel' : ''}${drag?.id === node.id ? ' dragging' : ''}${badNodes.has(node.id) ? ' bad' : ''}`}
                  style={{ left: node.x, top: node.y, borderLeft: `3px solid ${cat.color}` }}
                  onPointerDown={(e) => startNodeDrag(e, node)}
                  onDoubleClick={() => { setSelectedId(node.id); setTab('config') }}
                >
                  <span className="ic" style={{ background: cat.soft }}>
                    <Icon name={spec.icon} style={{ stroke: cat.color }} />
                  </span>
                  <span className="bd">
                    <span className="k" style={{ color: cat.color }}>{spec.label.toUpperCase()}</span>
                    <div className="t">{node.title}</div>
                    <div className="s">{summarise(node)}</div>
                  </span>
                  {badNodes.has(node.id) && <span className="warnpip" title="Needs attention">!</span>}

                  {spec.cat !== 'event' && <span className="port in" title="Input"></span>}
                  {ports.map((p) => (
                    <span
                      key={p}
                      className={`port ${p}${link?.from === node.id && link.port === p ? ' armed' : ''}`}
                      title={p === 'out' ? 'Drag to the next step' : `Drag the ${p.toUpperCase()} branch to the next step`}
                      onPointerDown={(e) => startLink(e, node.id, p)}
                    ></span>
                  ))}
                  {ports.length === 2 && (
                    <>
                      <span className="portlab yes">YES</span>
                      <span className="portlab no">NO</span>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          <div className="wf-help">
            <span><kbd>drag</kbd> to move</span>
            <span><kbd>⌘</kbd>+scroll to zoom</span>
            <span>drag the background to pan</span>
          </div>

          <div className="wf-zoom">
            <button onClick={() => zoomBy(0.85)} title="Zoom out"><Icon name="zout" /></button>
            <span className="pct num">{Math.round(view.z * 100)}%</span>
            <button onClick={() => zoomBy(1.18)} title="Zoom in"><Icon name="zin" /></button>
            <button onClick={fitToView} title="Fit the whole flow"><Icon name="fit" /></button>
          </div>

          <div className="wf-legend">
            {Object.entries(CATS).map(([id, cat]) => (
              <span className="r" key={id}><i className="sw" style={{ background: cat.color }}></i>{cat.label}</span>
            ))}
          </div>

          {tourStep !== null && (
            <div className="wf-tour" role="dialog" aria-label="Workflow builder walkthrough">
              <div className="wf-tourcard">
                <div className="step">STEP {tourStep + 1} OF {TOUR.length}</div>
                <h3>{TOUR[tourStep].title}</h3>
                <p>{TOUR[tourStep].body}</p>
                <div className="btw">
                  <div className="wf-dots">
                    {TOUR.map((_, i) => <i key={i} className={i === tourStep ? 'on' : ''}></i>)}
                  </div>
                  <div className="row g8">
                    <button className="btn sm2" onClick={closeTour}>Skip</button>
                    {tourStep > 0 && <button className="btn sm2" onClick={() => setTourStep(tourStep - 1)}>Back</button>}
                    <button
                      className="btn pri sm2"
                      onClick={() => (tourStep === TOUR.length - 1 ? closeTour() : setTourStep(tourStep + 1))}
                    >
                      {tourStep === TOUR.length - 1 ? 'Start building' : 'Next'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- inspector ---------------- */}
      <aside className="wf-side" aria-label="Step settings">
        <div className="wf-stabs">
          <button className={tab === 'config' ? 'on' : ''} onClick={() => setTab('config')}>
            <Icon name="filter" />Configure
          </button>
          <button className={tab === 'preview' ? 'on' : ''} onClick={() => setTab('preview')}>
            <Icon name="eye" />Preview
          </button>
        </div>

        {tab === 'config'
          ? <Inspector
              node={selected}
              issues={issues}
              onRename={(t) => updateNode(selected.id, { title: t })}
              onChange={(k, v) => updateConfig(selected.id, k, v)}
              onDuplicate={() => duplicateNode(selected.id)}
              onDelete={() => { deleteNode(selected.id); flash('Step deleted') }}
            />
          : <Preview key={previewNode?.id ?? 'none'} node={previewNode} />}
      </aside>
    </div>
  )
}

/* ================================================================== */
/* Inspector                                                          */
/* ================================================================== */

function Inspector({ node, issues, onRename, onChange, onDuplicate, onDelete }) {
  if (!node) {
    return (
      <div className="wf-sbody">
        <div className="note">
          <b>Nothing selected.</b>
          <p style={{ margin: '6px 0 0', color: 'var(--ink3)' }}>
            Click any node on the canvas to configure it, or drag a new one across from the library on the left.
          </p>
        </div>
        {issues.length > 0 && (
          <div className="sect">
            <div className="sh"><span className="lbl">TO FIX BEFORE GOING LIVE</span></div>
            {issues.map((i, n) => (
              <div className="kv" key={n}><span className="k" style={{ flex: 1 }}>{i.text}</span></div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const spec = catalogOf(node.kind)
  const cat = CATS[spec.cat]
  const mine = issues.filter((i) => i.id === node.id)

  return (
    <div className="wf-sbody">
      <div className="wf-nodehd">
        <span className="ic" style={{ background: cat.soft }}>
          <Icon name={spec.icon} style={{ stroke: cat.color }} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span className="k" style={{ color: cat.color }}>{spec.label.toUpperCase()}</span>
          <input value={node.title} onChange={(e) => onRename(e.target.value)} aria-label="Step name" />
          <div className="d">{spec.desc}</div>
        </div>
      </div>

      {mine.length > 0 && (
        <div className="alert" style={{ background: 'var(--warnS)', color: 'var(--warn)' }}>
          <b>Needs attention</b>
          {mine.map((i, n) => <p key={n}>{i.text}</p>)}
        </div>
      )}

      {spec.fields.map((f) => {
        if (f.when && !f.when(node.config)) return null
        const value = node.config[f.key] ?? ''

        if (f.type === 'rules') {
          return (
            <RulesEditor
              key={f.key}
              match={node.config.match ?? 'AND'}
              rules={node.config.rules ?? []}
              onMatch={(m) => onChange('match', m)}
              onRules={(r) => onChange('rules', r)}
            />
          )
        }

        return (
          <div className="fld" key={f.key}>
            <label htmlFor={`f-${node.id}-${f.key}`}>{f.label}</label>
            {f.type === 'select' ? (
              <select id={`f-${node.id}-${f.key}`} value={value} onChange={(e) => onChange(f.key, e.target.value)}>
                {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : f.type === 'textarea' ? (
              <>
                <textarea
                  id={`f-${node.id}-${f.key}`}
                  value={value}
                  placeholder={f.placeholder}
                  onChange={(e) => onChange(f.key, e.target.value)}
                />
                <div className="vars">
                  {['first_name', 'city', 'cart_items', 'cart_value', 'order_id'].map((v) => (
                    <button key={v} onClick={() => onChange(f.key, `${value}{{${v}}}`)}>{`{{${v}}}`}</button>
                  ))}
                </div>
                <div className="hint">{value.length} characters · variables are filled in per contact</div>
              </>
            ) : (
              <input
                id={`f-${node.id}-${f.key}`}
                type={f.type === 'number' ? 'number' : 'text'}
                value={value}
                placeholder={f.placeholder}
                onChange={(e) => onChange(f.key, e.target.value)}
              />
            )}
          </div>
        )
      })}

      <div className="row g8">
        <button className="btn sm2" style={{ flex: 1, justifyContent: 'center' }} onClick={onDuplicate}>
          <Icon name="copy" />Duplicate
        </button>
        <button className="btn sm2" style={{ flex: 1, justifyContent: 'center', color: 'var(--dg)' }} onClick={onDelete}>
          <Icon name="trash" />Delete
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function RulesEditor({ match, rules, onMatch, onRules }) {
  const setRule = (i, patch) => onRules(rules.map((r, n) => (n === i ? { ...r, ...patch } : r)))

  const addRule = () => onRules([...rules, { attr: 'lifecycle', op: 'is', value: 'Customer' }])

  const changeAttr = (i, attr) => setRule(i, { attr, op: operatorsFor(attr)[0], value: '' })

  return (
    <div className="fld">
      <label>Conditions — people who match go down the YES branch</label>
      <div className="rules">
        {rules.length === 0 && <div className="hint">No conditions yet. Everyone will take the NO branch.</div>}
        {rules.map((r, i) => {
          const attr = attributeOf(r.attr)
          return (
            <div key={i}>
              {i > 0 && (
                <div className="joiner" style={{ margin: '0 0 9px' }}>
                  <span className="ln"></span>
                  <span className="andor">
                    <button className={match === 'AND' ? 'on' : ''} onClick={() => onMatch('AND')}>AND</button>
                    <button className={match === 'OR' ? 'on' : ''} onClick={() => onMatch('OR')}>OR</button>
                  </span>
                  <span className="ln"></span>
                </div>
              )}
              <div className="rule">
                <button className="del" onClick={() => onRules(rules.filter((_, n) => n !== i))} aria-label="Remove condition">×</button>
                <select value={r.attr} onChange={(e) => changeAttr(i, e.target.value)} aria-label="Attribute">
                  {ATTRIBUTES.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
                </select>
                <div className="rw">
                  <select value={r.op} onChange={(e) => setRule(i, { op: e.target.value })} aria-label="Operator">
                    {operatorsFor(r.attr).map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {attr.type === 'select' ? (
                    <select value={r.value} onChange={(e) => setRule(i, { value: e.target.value })} aria-label="Value">
                      <option value="">Choose…</option>
                      {attr.options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type={attr.type === 'number' ? 'number' : 'text'}
                      value={r.value}
                      onChange={(e) => setRule(i, { value: e.target.value })}
                      placeholder="Value"
                      aria-label="Value"
                    />
                  )}
                </div>
              </div>
            </div>
          )
        })}
        <button className="btn sm2" style={{ justifyContent: 'center' }} onClick={addRule}>
          <Icon name="plus" />Add condition
        </button>
      </div>
      <div className="hint">
        Rules are joined with <b>{match}</b>. Switch the joiner between any two rules to change it.
      </div>
    </div>
  )
}

/* ================================================================== */
/* Real-time message preview                                          */
/* ================================================================== */

function Preview({ node }) {
  const initial = CHANNELS.includes(node?.config.channel) ? node.config.channel : 'WhatsApp'
  const [channel, setChannel] = useState(initial)

  if (!node) {
    return (
      <div className="wf-sbody">
        <div className="note">
          <b>Nothing to preview yet.</b>
          <p style={{ margin: '6px 0 0', color: 'var(--ink3)' }}>
            Add a message step — WhatsApp, Instagram, SMS or email — and it appears here exactly as the customer sees it.
          </p>
        </div>
      </div>
    )
  }

  const c = node.config
  const body = render(c.body ?? '')
  const buttons = (c.buttons ?? '').split(',').map((b) => b.trim()).filter(Boolean)
  const subject = render(c.subject || node.title)

  const bar = {
    WhatsApp: { bg: '#1FA855', s: 'online' },
    Instagram: { bg: 'linear-gradient(90deg,#D8306B,#F0913C)', s: 'Active now' },
    SMS: { bg: '#5C6B87', s: '+91 90000 00000' },
    Email: { bg: '#2563EB', s: 'hello@cheerio.ai' },
  }[channel]

  return (
    <div className="wf-sbody">
      <div>
        <div className="eyebrow" style={{ marginBottom: 8 }}>PREVIEW CHANNEL</div>
        <div className="pv-tabs">
          {CHANNELS.map((ch) => (
            <button key={ch} className={channel === ch ? 'on' : ''} onClick={() => setChannel(ch)}>{ch}</button>
          ))}
        </div>
      </div>

      <div className={`phone ${channel.toLowerCase()}`}>
        <div className="bar" style={{ background: bar.bg }}>
          <span className="av a32" style={{ background: 'rgba(255,255,255,.25)' }}>R</span>
          <span>
            <div className="nm">Rahul Sharma</div>
            <div className="s">{bar.s}</div>
          </span>
        </div>
        <div className="scr">
          {channel === 'WhatsApp' && (
            <div className="pv-bub">
              {body || <span className="mut">Your message text appears here.</span>}
              {buttons.length > 0 && <div className="btns">{buttons.map((b) => <span key={b}>{b}</span>)}</div>}
              <div className="tm">10:32 ✓✓</div>
            </div>
          )}
          {channel === 'Instagram' && <div className="pv-ig">{body || 'Your message text appears here.'}</div>}
          {channel === 'SMS' && (
            <div className="pv-sms">
              {(body || 'Your message text appears here.').slice(0, 160)}
            </div>
          )}
          {channel === 'Email' && (
            <div className="pv-email">
              <div className="sub">{subject}</div>
              <div className="from">Cheerio AI &lt;hello@cheerio.ai&gt; · to rahul.sharma@gmail.com</div>
              <div className="bd">{body || 'Your message body appears here.'}</div>
              {buttons[0] && <span className="cta">{buttons[0]}</span>}
            </div>
          )}
        </div>
      </div>

      <div className="sect pv-meta">
        <div className="sh"><span className="lbl">DELIVERY</span></div>
        <div className="kv"><span className="k">Step</span><span className="v">{node.title}</span></div>
        <div className="kv"><span className="k">Channel</span><span className="v">{channel}</span></div>
        <div className="kv"><span className="k">Characters</span><span className="v num">{body.length}</span></div>
        {channel === 'SMS' && (
          <div className="kv"><span className="k">SMS parts</span><span className="v num">{Math.max(1, Math.ceil(body.length / 160))}</span></div>
        )}
        <div className="kv">
          <span className="k">Estimated cost</span>
          <span className="v num">{channel === 'WhatsApp' ? '₹0.72' : channel === 'SMS' ? '₹0.20' : '₹0.00'} each</span>
        </div>
      </div>

      <div className="alert" style={{ background: 'var(--brS)', color: 'var(--br)' }}>
        <b>Same copy, every channel</b>
        <p>Switch the tabs above to check the message still reads well where the character limits and buttons differ.</p>
      </div>
    </div>
  )
}
