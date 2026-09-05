import { Bot } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import type { AiStatus, Conversation } from '@/types'

const AI_STATUS_CONFIG: Record<AiStatus, { label: string; variant: 'brand' | 'warning' | 'destructive' | 'success' | 'neutral' }> = {
  handling: { label: 'AI handling', variant: 'brand' },
  waiting: { label: 'Needs a human', variant: 'warning' },
  escalated: { label: 'Escalated', variant: 'destructive' },
  resolved: { label: 'Resolved', variant: 'success' },
  blocked: { label: 'Blocked', variant: 'neutral' },
}

export function AiStatusBadge({ status }: { status: AiStatus }) {
  const config = AI_STATUS_CONFIG[status]
  return (
    <Badge variant={config.variant}>
      {status === 'handling' && <Bot />}
      {config.label}
    </Badge>
  )
}

export function SessionBadge({ conversation }: { conversation: Conversation }) {
  if (conversation.session === 'open') return <Badge variant="success">Window open</Badge>
  if (conversation.session === 'closing') return <Badge variant="warning">{conversation.minutesLeft}m left</Badge>
  if (conversation.session === 'closed') return <Badge variant="neutral">Template only</Badge>
  return null
}
