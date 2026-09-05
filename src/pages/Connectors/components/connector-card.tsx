import type { VariantProps } from 'class-variance-authority'

import { Badge, badgeVariants } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Connector, ConnectorStatus } from '@/types'

const statusVariant: Record<ConnectorStatus, VariantProps<typeof badgeVariants>['variant']> = {
  Connected: 'success',
  'Action needed': 'warning',
  'Not connected': 'neutral',
}

const actionLabel: Record<ConnectorStatus, string> = {
  Connected: 'Manage',
  'Action needed': 'Reconnect',
  'Not connected': 'Connect',
}

export function ConnectorCard({ connector }: { connector: Connector }) {
  return (
    <Card className="flex flex-col gap-3 px-[18px] py-4">
      <div className="flex items-center gap-3">
        <span
          className="flex size-[38px] shrink-0 items-center justify-center rounded-[10px] text-[15px] font-bold text-white"
          style={{ background: connector.logoBg }}
        >
          {connector.initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold">{connector.name}</div>
          <div className="mt-0.5 text-[11.5px] text-muted-foreground">{connector.category}</div>
        </div>
        <Badge variant={statusVariant[connector.status]}>{connector.status}</Badge>
      </div>
      <div className="text-[12.3px] leading-relaxed text-muted-foreground-2">{connector.description}</div>
      <div className="flex flex-wrap gap-1.5">
        {connector.permissions.map((p) => (
          <span key={p} className="rounded-[6px] border border-border bg-card-soft px-[7px] py-[3px] text-[10.5px] text-muted-foreground">
            {p}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-border-soft pt-[11px]">
        <span className="text-xs text-muted-foreground">
          {connector.status === 'Not connected' ? 'Not set up' : `Synced ${connector.syncedAt}`} · {connector.workflowCount} workflows
        </span>
        <Button size="sm">{actionLabel[connector.status]}</Button>
      </div>
    </Card>
  )
}
