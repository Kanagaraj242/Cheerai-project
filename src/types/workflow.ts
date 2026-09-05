export type WorkflowNodeKind =
  | 'TRIGGER'
  | 'CONDITION'
  | 'AI AGENT'
  | 'CONNECTOR'
  | 'ACTION'
  | 'DELAY'
  | 'FOLLOW-UP'

export type WorkflowNodeTone = 'brand' | 'success' | 'warning' | 'neutral' | 'destructive'

export interface WorkflowNodeData {
  kind: WorkflowNodeKind
  title: string
  subtitle: string
  tone: WorkflowNodeTone
  icon: string
  order: number
  config: [string, string][]
  isNew?: boolean
  branchLabel?: string
}
