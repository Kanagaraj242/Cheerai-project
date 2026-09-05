import { create } from 'zustand'

import { initialWorkflowNodes } from '@/data/workflow-nodes'
import type { WorkflowNodeData } from '@/types'

interface WorkflowState {
  nodes: WorkflowNodeData[]
  selectedIndex: number
  generated: boolean
  nlPrompt: string
  selectNode: (index: number) => void
  setNlPrompt: (value: string) => void
  applyNlChange: () => boolean
  addStep: () => void
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
    const nextNodes: WorkflowNodeData[] = [
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
    ]
    set({ nodes: nextNodes, selectedIndex: nextNodes.length - 1, generated: true, nlPrompt: '' })
    return true
  },
  addStep: () => {
    const { nodes } = get()
    const nextNodes: WorkflowNodeData[] = [
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
    ]
    set({ nodes: nextNodes, selectedIndex: nextNodes.length - 1 })
  },
  publish: () => set({ generated: false }),
  seedFromPrompt: () => set({ generated: true, selectedIndex: 2 }),
}))
