import type { VariantProps } from 'class-variance-authority'
import { Filter, Plus, Sparkles } from 'lucide-react'
import { useState } from 'react'

import { Badge, badgeVariants } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { campaigns } from '@/data/campaigns'
import { CHANNEL_COLOR } from '@/types'
import type { CampaignStatus } from '@/types'
import { useCampaignsStore } from '@/stores/campaigns-store'
import { cn } from '@/lib/utils'

const statusVariant: Record<CampaignStatus, VariantProps<typeof badgeVariants>['variant']> = {
  Running: 'brand',
  Completed: 'success',
  Scheduled: 'warning',
  Draft: 'neutral',
}

const filterTabs = ['All', 'Running', 'Scheduled', 'Completed', 'Drafts'] as const

export function CampaignsTable() {
  const selectedId = useCampaignsStore((s) => s.selectedId)
  const selectCampaign = useCampaignsStore((s) => s.selectCampaign)
  const [filter, setFilter] = useState<(typeof filterTabs)[number]>('All')

  const filtered = campaigns.filter((c) => {
    if (filter === 'All') return true
    if (filter === 'Drafts') return c.status === 'Draft'
    return c.status === filter
  })

  return (
    <Card>
      <CardHeader className="flex-wrap gap-2.5">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as (typeof filterTabs)[number])}>
          <TabsList>
            {filterTabs.map((t) => (
              <TabsTrigger key={t} value={t}>
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex-1" />
        <span className="inline-flex items-center gap-1.5 rounded-[9px] border border-border px-[11px] py-1.5 text-xs text-muted-foreground-2">
          <Filter className="size-3.5 stroke-2" /> Channel
        </span>
        <Button variant="primary" size="sm">
          <Plus /> Create campaign
        </Button>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Audience</TableHead>
            <TableHead>Delivered</TableHead>
            <TableHead>Read</TableHead>
            <TableHead>Conversions</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Spend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((c) => {
            const deliveredRate = c.sent ? `${Math.round((c.delivered / c.sent) * 1000) / 10}%` : '—'
            const readRate = c.sent ? `${Math.round((c.read / c.sent) * 1000) / 10}%` : '—'
            return (
              <TableRow
                key={c.id}
                onClick={() => selectCampaign(c.id)}
                className={cn('cursor-pointer', c.id === selectedId && 'bg-primary-soft hover:bg-primary-soft')}
              >
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <span className="size-2 shrink-0 rounded-full" style={{ background: CHANNEL_COLOR[c.channel] }} />
                    <div>
                      <div className="flex items-center gap-1 font-medium">
                        {c.name}
                        {c.aiGenerated && (
                          <Badge variant="brand">
                            <Sparkles /> AI
                          </Badge>
                        )}
                      </div>
                      <div className="mt-0.5 text-[11.5px] text-muted-foreground">
                        {c.channel} · {c.type}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[c.status]}>{c.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{c.audience}</div>
                  <div className="num text-[11.5px] text-muted-foreground">{c.size.toLocaleString('en-IN')} contacts</div>
                </TableCell>
                <TableCell className="num">{deliveredRate}</TableCell>
                <TableCell className="num">{readRate}</TableCell>
                <TableCell className="num">{c.converted || '—'}</TableCell>
                <TableCell className="num font-medium">{c.revenue}</TableCell>
                <TableCell className="num text-muted-foreground">{c.spend}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Card>
  )
}
