import { useCallback, useMemo, useState } from 'react'
import { AGENTS } from './data/cheerio.js'
import { CONV } from './data/inbox.js'
import { START_EDGES, START_NODES, makeNode, nextId } from './data/workflow.js'
import { StoreContext } from './store-context.js'

const patchAt = (list, index, patch) =>
  list.map((item, i) => (i === index ? { ...item, ...patch } : item))

export function StoreProvider({ children }) {
  /* ---------------- shared ---------------- */
  const [agents, setAgents] = useState(AGENTS)
  const [activeContact, setActiveContact] = useState(0)
  const [activeCamp, setActiveCamp] = useState(0)
  const [generated, setGenerated] = useState(false)

  /* ---------------- team inbox ---------------- */
  const [conversations, setConversations] = useState(CONV)
  const [activeConv, setActiveConv] = useState(0)

  const sendMessage = useCallback((index, msg) => {
    setConversations((prev) =>
      patchAt(prev, index, {
        msgs: [...prev[index].msgs, msg],
        p: msg.kind === 'image' ? '📷 Photo' : msg.text,
        t: 'now',
        unread: 0,
        status: prev[index].status === 'unresolved' ? 'pending' : prev[index].status,
      }),
    )
  }, [])

  const addNote = useCallback((index, text, by) => {
    setConversations((prev) =>
      patchAt(prev, index, { notes: [{ by, text, at: 'Just now' }, ...prev[index].notes] }),
    )
  }, [])

  const setStatus = useCallback((index, status) => {
    setConversations((prev) => patchAt(prev, index, { status }))
  }, [])

  const setAssignee = useCallback((index, assignee) => {
    setConversations((prev) => patchAt(prev, index, { assignee }))
  }, [])

  const setPriority = useCallback((index, priority) => {
    setConversations((prev) => patchAt(prev, index, { priority }))
  }, [])

  const markRead = useCallback((index) => {
    setConversations((prev) => (prev[index].unread ? patchAt(prev, index, { unread: 0 }) : prev))
  }, [])

  const toggleLabel = useCallback((index, label) => {
    setConversations((prev) => {
      const tags = prev[index].tags
      return patchAt(prev, index, {
        tags: tags.includes(label) ? tags.filter((x) => x !== label) : [...tags, label],
      })
    })
  }, [])

  const addAttribute = useCallback((index, k, v) => {
    setConversations((prev) => patchAt(prev, index, { attrs: [...prev[index].attrs, { k, v }] }))
  }, [])

  const updateAttribute = useCallback((index, ai, v) => {
    setConversations((prev) =>
      patchAt(prev, index, { attrs: prev[index].attrs.map((a, i) => (i === ai ? { ...a, v } : a)) }),
    )
  }, [])

  const removeAttribute = useCallback((index, ai) => {
    setConversations((prev) => patchAt(prev, index, { attrs: prev[index].attrs.filter((_, i) => i !== ai) }))
  }, [])

  /* ---------------- workflow builder ---------------- */
  const [wfNodes, setWfNodes] = useState(START_NODES)
  const [wfEdges, setWfEdges] = useState(START_EDGES)
  const [selectedId, setSelectedId] = useState('n4')
  const [flowName, setFlowName] = useState('Abandoned Cart Recovery')
  const [flowLive, setFlowLive] = useState(false)
  const [savedAt, setSavedAt] = useState(null)

  const addWfNode = useCallback((kind, x, y) => {
    const node = makeNode(kind, x, y)
    setWfNodes((prev) => [...prev, node])
    setSelectedId(node.id)
    return node
  }, [])

  const moveNode = useCallback((id, x, y) => {
    setWfNodes((prev) => prev.map((n) => (n.id === id ? { ...n, x: Math.round(x), y: Math.round(y) } : n)))
  }, [])

  const updateNode = useCallback((id, patch) => {
    setWfNodes((prev) => prev.map((n) => (n.id === id ? { ...n, ...patch } : n)))
  }, [])

  const updateConfig = useCallback((id, key, value) => {
    setWfNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, config: { ...n.config, [key]: value } } : n)),
    )
  }, [])

  const deleteNode = useCallback((id) => {
    setWfNodes((prev) => prev.filter((n) => n.id !== id))
    setWfEdges((prev) => prev.filter((e) => e.from !== id && e.to !== id))
    setSelectedId((prev) => (prev === id ? null : prev))
  }, [])

  const duplicateNode = useCallback((id) => {
    setWfNodes((prev) => {
      const src = prev.find((n) => n.id === id)
      if (!src) return prev
      const copy = { ...src, id: nextId(), x: src.x + 40, y: src.y + 40, config: structuredClone(src.config) }
      setSelectedId(copy.id)
      return [...prev, copy]
    })
  }, [])

  const connect = useCallback((from, port, to) => {
    if (from === to) return
    setWfEdges((prev) => {
      // one edge per output port, and never wire a node straight back into its parent
      const without = prev.filter((e) => !(e.from === from && e.port === port))
      if (without.some((e) => e.from === to && e.to === from)) return prev
      return [...without, { id: nextId('e'), from, port, to }]
    })
  }, [])

  const removeEdge = useCallback((id) => {
    setWfEdges((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const saveFlow = useCallback(() => {
    setSavedAt(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }))
  }, [])

  /* ---------------- agents ---------------- */
  const toggleAgent = useCallback((index) => {
    setAgents((prev) => patchAt(prev, index, { on: !prev[index].on }))
  }, [])

  const value = useMemo(
    () => ({
      agents, toggleAgent,
      activeContact, setActiveContact,
      activeCamp, setActiveCamp,
      generated, setGenerated,

      conversations, activeConv, setActiveConv,
      sendMessage, addNote, setStatus, setAssignee, setPriority, markRead,
      toggleLabel, addAttribute, updateAttribute, removeAttribute,

      wfNodes, wfEdges, selectedId, setSelectedId,
      addWfNode, moveNode, updateNode, updateConfig, deleteNode, duplicateNode,
      connect, removeEdge,
      flowName, setFlowName, flowLive, setFlowLive, savedAt, saveFlow,
    }),
    [
      agents, activeContact, activeCamp, generated, conversations, activeConv,
      wfNodes, wfEdges, selectedId, flowName, flowLive, savedAt,
      toggleAgent, sendMessage, addNote, setStatus, setAssignee, setPriority, markRead,
      toggleLabel, addAttribute, updateAttribute, removeAttribute,
      addWfNode, moveNode, updateNode, updateConfig, deleteNode, duplicateNode,
      connect, removeEdge, saveFlow,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
