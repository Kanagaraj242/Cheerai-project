import type { Channel } from './channel'

export type AiStatus = 'handling' | 'waiting' | 'escalated' | 'resolved' | 'blocked'
export type SessionState = 'open' | 'closing' | 'closed' | 'na'
export type LifecycleStage = 'Customer' | 'Lead'

export interface Message {
  from: 'them' | 'us'
  text: string
  time: string
  agent?: string
}

export interface AgentAction {
  label: string
  detail: string
}

export interface Conversation {
  id: number
  name: string
  initials: string
  channel: Channel
  time: string
  unread: number
  aiStatus: AiStatus
  session: SessionState
  minutesLeft?: number
  preview: string
  tags: string[]
  phone: string
  city: string
  stage: LifecycleStage
  ltv: string
  orders: number
  since: string
  messages: Message[]
  summary: string
  suggestedReply: string
  sources: string[]
  actions: AgentAction[]
  insight: string
}
