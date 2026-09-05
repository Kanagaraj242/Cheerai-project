import { create } from 'zustand'

import { conversations as initialConversations } from '@/data/conversations'
import type { Conversation } from '@/types'

type InspectorTab = 'copilot' | 'details'

interface InboxState {
  conversations: Conversation[]
  selectedId: number
  tab: InspectorTab
  draft: string
  selectConversation: (id: number) => void
  setTab: (tab: InspectorTab) => void
  setDraft: (draft: string) => void
  insertSuggestedReply: () => void
  sendDraft: () => void
  takeOverFromAi: () => void
}

export const useInboxStore = create<InboxState>((set, get) => ({
  conversations: initialConversations,
  selectedId: 0,
  tab: 'copilot',
  draft: '',
  selectConversation: (id) => set({ selectedId: id, draft: '' }),
  setTab: (tab) => set({ tab }),
  setDraft: (draft) => set({ draft }),
  insertSuggestedReply: () => {
    const current = get().conversations.find((c) => c.id === get().selectedId)
    if (current) set({ draft: current.suggestedReply })
  },
  sendDraft: () => {
    const { draft, selectedId, conversations } = get()
    const text = draft.trim()
    if (!text) return
    set({
      conversations: conversations.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              messages: [...c.messages, { from: 'us', text, time: 'now' }],
              preview: text,
              unread: 0,
            }
          : c,
      ),
      draft: '',
    })
  },
  takeOverFromAi: () => {
    const { selectedId, conversations } = get()
    set({
      conversations: conversations.map((c) => (c.id === selectedId ? { ...c, aiStatus: 'waiting' } : c)),
    })
  },
}))
