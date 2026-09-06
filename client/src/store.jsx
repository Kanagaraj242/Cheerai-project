import { useMemo, useState } from 'react'
import { AGENTS, CONV, NODES } from './data/cheerio.js'
import { StoreContext } from './store-context.js'

export function StoreProvider({ children }) {
  const [conversations, setConversations] = useState(CONV)
  const [nodes, setNodes] = useState(NODES)
  const [agents, setAgents] = useState(AGENTS)
  const [activeConv, setActiveConv] = useState(0)
  const [activeContact, setActiveContact] = useState(0)
  const [activeCamp, setActiveCamp] = useState(0)
  const [activeNode, setActiveNode] = useState(2)
  const [generated, setGenerated] = useState(false)

  const sendMessage = (index, text) => {
    setConversations((prev) =>
      prev.map((c, i) =>
        i === index ? { ...c, msgs: [...c.msgs, ['us', text, 'now']], p: text, unread: 0 } : c,
      ),
    )
  }

  const takeOver = (index) => {
    setConversations((prev) => prev.map((c, i) => (i === index ? { ...c, ai: 'waiting' } : c)))
  }

  const addNode = (node) => {
    setNodes((prev) => {
      const next = [...prev, node]
      setActiveNode(next.length - 1)
      return next
    })
  }

  const toggleAgent = (index) => {
    setAgents((prev) => prev.map((a, i) => (i === index ? { ...a, on: !a.on } : a)))
  }

  const value = useMemo(
    () => ({
      conversations, nodes, agents,
      activeConv, setActiveConv,
      activeContact, setActiveContact,
      activeCamp, setActiveCamp,
      activeNode, setActiveNode,
      generated, setGenerated,
      sendMessage, takeOver, addNode, toggleAgent,
    }),
    [conversations, nodes, agents, activeConv, activeContact, activeCamp, activeNode, generated],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
