import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import {
  BUTTON_ACTIONS, CHANNELS, INITIAL_FLOW, LIBRARY, MESSAGE_TYPES, NODE_COLORS, TEAMS, VARIABLES,
} from '../data/autoflow.js'
import '../styles/autoflow.css'

const MAX_BUTTONS = 3
const CONTENT_LIMIT = 1024

let nextId = 100
const makeId = () => `n${nextId++}`

/* ---------- flow tree helpers ---------- */
const branchesOf = (node) => (node.type === 'condition' ? [...(node.yes ?? []), ...(node.no ?? [])] : [])

function findNode(flow, id) {
  for (const node of flow) {
    if (node.id === id) return node
    const hit = findNode(branchesOf(node), id)
    if (hit) return hit
  }
  return null
}

function mapFlow(flow, id, fn) {
  return flow.reduce((acc, node) => {
    if (node.id === id) {
      const next = fn(node)
      if (next) acc.push(next)
      return acc
    }
    if (node.type === 'condition') {
      acc.push({ ...node, yes: mapFlow(node.yes ?? [], id, fn), no: mapFlow(node.no ?? [], id, fn) })
      return acc
    }
    acc.push(node)
    return acc
  }, [])
}

const updateNode = (flow, id, patch) => mapFlow(flow, id, (n) => ({ ...n, ...patch }))
const removeNode = (flow, id) => mapFlow(flow, id, () => null)

/* ---------- canvas pieces ---------- */
function Connector() {
  return (
    <div className="af-wire" aria-hidden="true">
      <span className="af-wire-line"></span>
      <span className="af-wire-head"></span>
    </div>
  )
}

function NodeCard({ node, selected, onSelect, onMenu }) {
  const color = NODE_COLORS[node.color] ?? NODE_COLORS.purple
  return (
    <div
      className={`af-node${selected ? ' on' : ''}`}
      onClick={() => onSelect(node.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(node.id) } }}
      role="button"
      tabIndex={0}
    >
      <div className="af-node-hd" style={{ background: color }}>
        <Icon name={node.icon} />
        <span className="af-node-title">{node.title}</span>
        <button
          className="af-node-menu"
          onClick={(e) => { e.stopPropagation(); onMenu(node) }}
          aria-label={`Options for ${node.title}`}
        >
          <Icon name="dots" />
        </button>
      </div>
      <div className="af-node-bd">{node.subtitle}</div>
    </div>
  )
}

function ConditionNode({ node, selected, onSelect }) {
  return (
    <div
      className={`af-diamond${selected ? ' on' : ''}`}
      onClick={() => onSelect(node.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(node.id) } }}
      role="button"
      tabIndex={0}
    >
      <div className="af-diamond-in">
        <Icon name="branch" />
        <span className="af-diamond-k">Condition</span>
        <span className="af-diamond-q">{node.subtitle}</span>
      </div>
    </div>
  )
}

function BranchSplit() {
  return (
    <div className="af-split" aria-hidden="true">
      <svg viewBox="0 0 680 66" preserveAspectRatio="none">
        <path d="M340 0 V14 Q340 30 324 30 H176 Q160 30 160 46 V58" />
        <path d="M340 0 V14 Q340 30 356 30 H504 Q520 30 520 46 V58" />
        <path className="af-arrow" d="M160 66 l-5 -9 h10 z" />
        <path className="af-arrow" d="M520 66 l-5 -9 h10 z" />
      </svg>
      <span className="af-pill yes">Yes</span>
      <span className="af-pill no">No</span>
    </div>
  )
}

function BranchMerge() {
  return (
    <div className="af-merge" aria-hidden="true">
      <svg viewBox="0 0 680 66" preserveAspectRatio="none">
        <path d="M160 0 V18 Q160 34 176 34 H324 Q340 34 340 50 V58" />
        <path d="M520 0 V18 Q520 34 504 34 H356 Q340 34 340 50 V58" />
        <path className="af-arrow" d="M340 66 l-5 -9 h10 z" />
      </svg>
    </div>
  )
}

/* ---------- inspector fields ---------- */
function Field({ label, children }) {
  return <div className="af-field"><label>{label}</label>{children}</div>
}

function Select({ value, options, onChange }) {
  return (
    <div className="af-select">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

export default function AutoFlow() {
  const { flash } = useOutletContext()
  const [flow, setFlow] = useState(INITIAL_FLOW)
  const [selectedId, setSelectedId] = useState('n2')
  const [tab, setTab] = useState('event')
  const [search, setSearch] = useState('')
  const [inspectorTab, setInspectorTab] = useState('content')
  const [zoom, setZoom] = useState(1)
  const [showMap, setShowMap] = useState(true)

  const selected = selectedId ? findNode(flow, selectedId) : null

  const selectNode = (id) => {
    setSelectedId(id)
    setInspectorTab('content')
  }

  const groups = useMemo(() => {
    const q = search.trim().toLowerCase()
    return LIBRARY[tab]
      .map((g) => ({ ...g, items: g.items.filter((i) => !q || i.label.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0)
  }, [tab, search])

  const patch = (id, changes) => setFlow((f) => updateNode(f, id, changes))

  const addFromLibrary = (item) => {
    const node = {
      id: makeId(),
      type: tab === 'event' ? 'trigger' : (item.type ?? 'simple'),
      title: item.label,
      subtitle: item.subtitle,
      icon: item.icon,
      color: item.color,
      ...(item.type === 'message' ? {
        channel: 'WhatsApp', messageType: 'Text', content: '', media: null, buttons: [],
      } : {}),
      ...(item.type === 'assign' ? { team: 'Sales Team', priority: 'Normal' } : {}),
      ...(item.type === 'condition' ? { field: 'Lifecycle stage', operator: 'is', value: 'Customer', yes: [], no: [] } : {}),
      ...(tab === 'event' ? { channel: 'WhatsApp', event: item.subtitle } : {}),
    }
    setFlow((f) => {
      const endIdx = f.findIndex((n) => n.type === 'end')
      if (endIdx === -1) return [...f, node]
      return [...f.slice(0, endIdx), node, ...f.slice(endIdx)]
    })
    selectNode(node.id)
  }

  const deleteSelected = () => {
    if (!selected) return
    setFlow((f) => removeNode(f, selected.id))
    setSelectedId(null)
    flash(`“${selected.title}” removed from the flow`)
  }

  const insertAtCursor = (text) => {
    if (!selected) return
    patch(selected.id, { content: `${selected.content ?? ''}${text}` })
  }

  const setButton = (i, changes) => {
    const buttons = selected.buttons.map((b, j) => (j === i ? { ...b, ...changes } : b))
    patch(selected.id, { buttons })
  }

  const renderNodes = (nodes) =>
    nodes.map((node, i) => (
      <div className="af-seq" key={node.id}>
        {i > 0 && <Connector />}
        {node.type === 'condition' ? (
          <>
            <ConditionNode node={node} selected={selectedId === node.id} onSelect={selectNode} />
            <BranchSplit />
            <div className="af-branches">
              <div className="af-branch">{renderNodes(node.yes ?? [])}</div>
              <div className="af-branch">{renderNodes(node.no ?? [])}</div>
            </div>
            <BranchMerge />
          </>
        ) : (
          <NodeCard
            node={node}
            selected={selectedId === node.id}
            onSelect={selectNode}
            onMenu={(n) => flash(`Node menu for “${n.title}” — duplicate/disable coming soon`)}
          />
        )}
      </div>
    ))

  return (
    <div className="af">
      {/* ---------------- node library ---------------- */}
      <aside className="af-lib">
        <div className="af-libtabs">
          <button className={tab === 'event' ? 'on' : ''} onClick={() => setTab('event')}>
            <Icon name="bolt" />
            <span><b>Events</b><em>When this happens</em></span>
          </button>
          <button className={tab === 'action' ? 'on' : ''} onClick={() => setTab('action')}>
            <Icon name="play" />
            <span><b>Actions</b><em>Do this</em></span>
          </button>
        </div>

        <div className="af-libsearch">
          <Icon name="search" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search nodes…" />
        </div>

        <div className="af-libscroll">
          {groups.map((g) => (
            <div className="af-libgroup" key={g.group}>
              <div className="af-libhead">{g.group}</div>
              <div className="af-libgrid">
                {g.items.map((item) => (
                  <button className="af-libitem" key={item.id} onClick={() => addFromLibrary(item)} title={`Add ${item.label}`}>
                    <span className="af-libicon" style={{ background: NODE_COLORS[item.color] }}>
                      <Icon name={item.icon} />
                    </span>
                    <span className="af-liblabel">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
          {groups.length === 0 && <div className="af-libempty">No nodes match “{search}”.</div>}
        </div>
      </aside>

      {/* ---------------- canvas ---------------- */}
      <div className="af-canvas">
        <div className="af-stage">
          <div className="af-flow" style={{ transform: `scale(${zoom})` }}>
            {renderNodes(flow)}
          </div>
        </div>

        {showMap && (
          <div className="af-minimap" aria-hidden="true">
            <span className="mm" style={{ background: NODE_COLORS.wa, width: '56%' }}></span>
            <span className="mm" style={{ background: NODE_COLORS.purple, width: '56%' }}></span>
            <span className="mm dia"></span>
            <span className="mm-row">
              <span className="mm" style={{ background: NODE_COLORS.blue, width: '44%' }}></span>
              <span className="mm" style={{ background: NODE_COLORS.orange, width: '44%' }}></span>
            </span>
            <span className="mm" style={{ background: NODE_COLORS.red, width: '56%' }}></span>
            <span className="mm" style={{ background: NODE_COLORS.slate, width: '56%' }}></span>
          </div>
        )}

        <div className="af-zoom">
          <button onClick={() => setZoom(1)} title="Reset zoom"><Icon name="crosshair" /></button>
          <button className={showMap ? 'on' : ''} onClick={() => setShowMap((v) => !v)} title="Toggle minimap"><Icon name="map" /></button>
          <button onClick={() => setZoom((z) => Math.min(1.6, Math.round((z + 0.1) * 10) / 10))} title="Zoom in"><Icon name="plus" /></button>
          <button onClick={() => setZoom((z) => Math.max(0.5, Math.round((z - 0.1) * 10) / 10))} title="Zoom out"><Icon name="minus" /></button>
        </div>
      </div>

      {/* ---------------- inspector ---------------- */}
      {selected ? (
        <aside className="af-insp">
          <div className="af-insphd">
            <span className="af-inspicon" style={{ background: NODE_COLORS[selected.color] }}><Icon name={selected.icon} /></span>
            <span className="af-inspname">{selected.title}</span>
            <button className="af-inspbtn" onClick={deleteSelected} aria-label="Delete node"><Icon name="trash" /></button>
            <button className="af-inspbtn" onClick={() => setSelectedId(null)} aria-label="Close inspector"><Icon name="close" /></button>
          </div>

          <div className="af-insptabs">
            <button className={inspectorTab === 'content' ? 'on' : ''} onClick={() => setInspectorTab('content')}>Content</button>
            <button className={inspectorTab === 'settings' ? 'on' : ''} onClick={() => setInspectorTab('settings')}>Settings</button>
          </div>

          <div className="af-inspbody">
            {inspectorTab === 'settings' ? (
              <>
                <Field label="Node name">
                  <input className="af-input" value={selected.title} onChange={(e) => patch(selected.id, { title: e.target.value })} />
                </Field>
                <Field label="Description">
                  <input className="af-input" value={selected.subtitle} onChange={(e) => patch(selected.id, { subtitle: e.target.value })} />
                </Field>
                <Field label="Node ID"><div className="af-static num">{selected.id}</div></Field>
                <div className="af-note">Changes here rename the node on the canvas. Nothing is sent to a live channel from this build.</div>
              </>
            ) : selected.type === 'message' ? (
              <>
                <Field label="Channel">
                  <Select value={selected.channel} options={CHANNELS} onChange={(v) => patch(selected.id, { channel: v })} />
                </Field>
                <Field label="Message type">
                  <Select value={selected.messageType} options={MESSAGE_TYPES} onChange={(v) => patch(selected.id, { messageType: v })} />
                </Field>

                <div className="af-field">
                  <div className="af-fieldrow">
                    <label>Message content</label>
                    <div className="af-fieldtools">
                      <button className="af-chip" onClick={() => insertAtCursor(`{{${VARIABLES[0]}}}`)}>
                        <Icon name="braces" />Add variable
                      </button>
                      <button className="af-chip icon" onClick={() => insertAtCursor(' 👋')} aria-label="Insert emoji">
                        <Icon name="emoji" />
                      </button>
                    </div>
                  </div>
                  <textarea
                    className="af-textarea"
                    value={selected.content}
                    maxLength={CONTENT_LIMIT}
                    onChange={(e) => patch(selected.id, { content: e.target.value })}
                  />
                  <div className="af-count num">{selected.content.length}/{CONTENT_LIMIT}</div>
                </div>

                <div className="af-field">
                  <label>Media <span className="af-opt">(optional)</span></label>
                  {selected.media ? (
                    <div className="af-media">
                      <span className="af-thumb"></span>
                      <span className="af-mediainfo">
                        <b>{selected.media.name}</b>
                        <em>{selected.media.size}</em>
                      </span>
                      <button className="af-x" onClick={() => patch(selected.id, { media: null })} aria-label="Remove media">
                        <Icon name="close" />
                      </button>
                    </div>
                  ) : (
                    <button className="af-add" onClick={() => patch(selected.id, { media: { name: 'image.jpg', size: '1200 × 628' } })}>
                      <Icon name="image" />Add media
                    </button>
                  )}
                </div>

                <div className="af-field">
                  <label>Buttons <span className="af-opt">(optional)</span></label>
                  {selected.buttons.map((b, i) => (
                    <div className="af-btnrow" key={i}>
                      <input className="af-input" value={b.label} onChange={(e) => setButton(i, { label: e.target.value })} placeholder="Button label" />
                      <Select value={b.action} options={BUTTON_ACTIONS} onChange={(v) => setButton(i, { action: v })} />
                      <button
                        className="af-x"
                        onClick={() => patch(selected.id, { buttons: selected.buttons.filter((_, j) => j !== i) })}
                        aria-label={`Remove ${b.label || 'button'}`}
                      >
                        <Icon name="close" />
                      </button>
                    </div>
                  ))}
                  {selected.buttons.length < MAX_BUTTONS ? (
                    <button
                      className="af-add"
                      onClick={() => patch(selected.id, { buttons: [...selected.buttons, { label: '', action: 'Open URL' }] })}
                    >
                      <Icon name="plus" />Add button
                    </button>
                  ) : (
                    <div className="af-hint">WhatsApp allows up to {MAX_BUTTONS} buttons.</div>
                  )}
                </div>

                <div className="af-field">
                  <label>Preview ({selected.channel})</label>
                  <div className="af-preview">
                    <div className="af-bubble">
                      {selected.media && <span className="af-prevthumb"></span>}
                      <p>{(selected.content || 'Your message will appear here.').replace(/\{\{(\w+)\}\}/g, 'Priya')}</p>
                      {selected.buttons.filter((b) => b.label).map((b, i) => (
                        <span className="af-prevbtn" key={i}>{b.label}<Icon name="send" /></span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : selected.type === 'condition' ? (
              <>
                <Field label="Field">
                  <Select
                    value={selected.field}
                    options={['Lifecycle stage', 'Tag', 'Orders', 'Lifetime value', 'City']}
                    onChange={(v) => patch(selected.id, { field: v })}
                  />
                </Field>
                <Field label="Operator">
                  <Select value={selected.operator} options={['is', 'is not', 'contains', 'greater than', 'less than']} onChange={(v) => patch(selected.id, { operator: v })} />
                </Field>
                <Field label="Value">
                  <input className="af-input" value={selected.value} onChange={(e) => patch(selected.id, { value: e.target.value })} />
                </Field>
                <div className="af-note">
                  Contacts where <b>{selected.field} {selected.operator} {selected.value}</b> follow the <b>Yes</b> branch.
                  Everyone else follows <b>No</b>.
                </div>
              </>
            ) : selected.type === 'assign' ? (
              <>
                <Field label="Team">
                  <Select value={selected.team} options={TEAMS} onChange={(v) => patch(selected.id, { team: v, subtitle: `Assign to ${v}` })} />
                </Field>
                <Field label="Priority">
                  <Select value={selected.priority} options={['Low', 'Normal', 'High', 'Urgent']} onChange={(v) => patch(selected.id, { priority: v })} />
                </Field>
                <div className="af-note">The conversation leaves the AI queue and lands in {selected.team}&apos;s inbox.</div>
              </>
            ) : selected.type === 'trigger' ? (
              <>
                <Field label="Channel">
                  <Select value={selected.channel ?? 'WhatsApp'} options={CHANNELS} onChange={(v) => patch(selected.id, { channel: v })} />
                </Field>
                <Field label="Event"><div className="af-static">{selected.event ?? selected.subtitle}</div></Field>
                <div className="af-note">This is what starts the flow. A flow can only have one active trigger.</div>
              </>
            ) : (
              <>
                <Field label="Step type"><div className="af-static">{selected.title}</div></Field>
                <Field label="Note">
                  <input
                    className="af-input"
                    value={selected.note ?? ''}
                    placeholder="Add a note for your team"
                    onChange={(e) => patch(selected.id, { note: e.target.value })}
                  />
                </Field>
              </>
            )}
          </div>
        </aside>
      ) : (
        <aside className="af-insp empty">
          <div className="af-inspempty">
            <Icon name="branch" />
            <div className="h2">No step selected</div>
            <p className="sm mut">Pick a node on the canvas to edit it, or add one from the library.</p>
          </div>
        </aside>
      )}
    </div>
  )
}
