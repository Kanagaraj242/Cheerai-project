export type ConnectorStatus = 'Connected' | 'Action needed' | 'Not connected'
export type ConnectorCategory =
  | 'Messaging'
  | 'E-commerce'
  | 'CRM'
  | 'Payments'
  | 'Data'
  | 'Support'
  | 'Internal'

export interface Connector {
  id: number
  name: string
  category: ConnectorCategory
  logoBg: string
  initials: string
  status: ConnectorStatus
  syncedAt: string
  description: string
  permissions: string[]
  workflowCount: number
}

export interface AiAgent {
  id: number
  name: string
  role: string
  gradient: string
  icon: string
  active: boolean
  tasksCompleted: string
  rate: string
  rateLabel: string
  handoff: string
  handoffLabel: string
  skills: string[]
  connectors: string[]
  performance: number[]
}
