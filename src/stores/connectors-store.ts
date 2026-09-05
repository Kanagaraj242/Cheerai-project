import { create } from 'zustand'

import { aiAgents as initialAgents } from '@/data/connectors'
import type { AiAgent, ConnectorCategory } from '@/types'

export const CONNECTOR_CATEGORIES: (ConnectorCategory | 'All')[] = [
  'All',
  'Messaging',
  'E-commerce',
  'CRM',
  'Payments',
  'Data',
  'Support',
  'Internal',
]

interface ConnectorsState {
  categoryFilter: ConnectorCategory | 'All'
  agents: AiAgent[]
  setCategoryFilter: (category: ConnectorCategory | 'All') => void
  toggleAgent: (id: number) => void
}

export const useConnectorsStore = create<ConnectorsState>((set) => ({
  categoryFilter: 'All',
  agents: initialAgents,
  setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
  toggleAgent: (id) =>
    set((state) => ({
      agents: state.agents.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
    })),
}))
