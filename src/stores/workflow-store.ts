import { create } from 'zustand'

import { initialWorkflowNodes } from '@/data/workflow-nodes'
import type { WorkflowNodeData } from '@/types'
import type { NodeLibraryItem } from '@/workflow/node-library/node-library-data'

function renumber(nodes: WorkflowNodeData[]): WorkflowNodeData[] {
  return nodes.map((node, i) => ({ ...node, order: i + 1 }))
}

interface WorkflowState {
  nodes: WorkflowNodeData[]
  selectedIndex: number
  generated: boolean
  nlPrompt: string
  selectNode: (index: number) => void
  setNlPrompt: (value: string) => void
  applyNlChange: () => boolean
  addStep: () => void
  addLibraryNode: (item: NodeLibraryItem) => void
  removeStep: (index: number) => void
  publish: () => void
  seedFromPrompt: (prompt: string) => void
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: initialWorkflowNodes,
  selectedIndex: 2,
  generated: false,
  nlPrompt: '',
  selectNode: (selectedIndex) => set({ selectedIndex }),
  setNlPrompt: (nlPrompt) => set({ nlPrompt }),
  applyNlChange: () => {
    const { nlPrompt, nodes } = get()
    if (!nlPrompt.trim()) return false
    const nextNodes = renumber([
      ...nodes,
      {
        kind: 'FOLLOW-UP',
        title: 'Send SMS follow-up',
        subtitle: 'Added from your description — review it',
        tone: 'warning',
        icon: 'refresh',
        order: nodes.length + 1,
        config: [
          ['Channel', 'SMS'],
          ['Condition', 'No reply in 2 hours'],
          ['Cost', '₹0.20 per message'],
        ],
      },
    ])
    set({ nodes: nextNodes, selectedIndex: nextNodes.length - 1, generated: true, nlPrompt: '' })
    return true
  },
  addStep: () => {
    const { nodes } = get()
    const nextNodes = renumber([
      ...nodes,
      {
        kind: 'ACTION',
        title: 'New step',
        subtitle: 'Choose what this step should do',
        tone: 'neutral',
        icon: 'plus',
        order: nodes.length + 1,
        config: [
          ['Type', 'Not set'],
          ['Channel', 'Not set'],
        ],
      },
    ])
    set({ nodes: nextNodes, selectedIndex: nextNodes.length - 1 })
  },
  // Events start a flow, so they go in at the top; actions continue it and append at the end.
  addLibraryNode: (item) => {
    const { nodes } = get()
    const node: WorkflowNodeData = {
      kind: item.kind,
      title: item.label,
      subtitle: item.subtitle,
      tone: item.tone,
      icon: item.icon,
      order: 0,
      config: item.config,
    }
    const isEvent = item.kind === 'TRIGGER'
    const nextNodes = renumber(isEvent ? [node, ...nodes] : [...nodes, node])
    set({ nodes: nextNodes, selectedIndex: isEvent ? 0 : nextNodes.length - 1 })
  },
  removeStep: (index) => {
    const { nodes, selectedIndex } = get()
    if (nodes.length <= 1) return
    const nextNodes = renumber(nodes.filter((_, i) => i !== index))
    const shifted = selectedIndex >= index ? selectedIndex - 1 : selectedIndex
    set({
      nodes: nextNodes,
      selectedIndex: Math.max(0, Math.min(shifted, nextNodes.length - 1)),
    })
  },
  publish: () => set({ generated: false }),
  seedFromPrompt: () => set({ generated: true, selectedIndex: 2 }),
}))
