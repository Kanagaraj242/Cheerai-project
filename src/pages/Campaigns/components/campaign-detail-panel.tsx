import type { VariantProps } from 'class-variance-authority'
import { Sparkles } from 'lucide-react'

import { Badge, badgeVariants } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { campaigns } from '@/data/campaigns'
import { CHANNEL_COLOR } from '@/types'
import type { CampaignStatus } from '@/types'
import { useCampaignsStore } from '@/stores/campaigns-store'

const statusVariant: Record<CampaignStatus, VariantProps<typeof badgeVariants>['variant']> = {
  Running: 'brand',
  Completed: 'success',
  Scheduled: 'warning',
  Draft: 'neutral',
}

export function CampaignDetailPanel() {
  const selectedId = useCampaignsStore((s) => s.selectedId)
  const campaign = campaigns.find((c) => c.id === selectedId) ?? campaigns[0]

  const funnel = [
    { label: 'Sent', value: campaign.sent },
    { label: 'Delivered', value: campaign.delivered },
    { label: 'Read', value: campaign.read },
    { label: 'Clicked', value: campaign.clicked },
    { label: 'Converted', value: campaign.converted },
  ]
  const base = campaign.sent || 1

  return (
    <aside className="w-[352px] shrink-0 overflow-y-auto border-l border-border bg-card">
      <div className="flex flex-col gap-4 px-[18px] py-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-[9px] shrink-0 rounded-full" style={{ background: CHANNEL_COLOR[campaign.channel] }} />
            <Badge variant={statusVariant[campaign.status]}>{campaign.status}</Badge>
            {campaign.aiGenerated && (
              <Badge variant="brand">
                <Sparkles /> AI generated
              </Badge>
            )}
          </div>
          <div className="mt-2.5 text-[17px] font-semibold tracking-tight">{campaign.name}</div>
          <div className="mt-0.5 text-sm text-muted-foreground">
            {campaign.channel} · {campaign.type}
          </div>
        </div>

        <div>
          <KvRow label="Audience" value={campaign.audience} />
          <KvRow label="Recipients" value={campaign.size.toLocaleString('en-IN')} num />
          <KvRow label="Schedule" value={campaign.schedule} />
          <KvRow label="Template" value={campaign.template} />
        </div>

        <div className="flex flex-col gap-1 rounded-[10px] border border-[#F2E3C4] bg-warning-soft px-3.5 py-2.5 text-warning">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Spend</span>
            <span className="num text-[17px] font-semibold">{campaign.spend}</span>
          </div>
          <div className="text-xs">
            {campaign.converted
              ? `${campaign.cpa} per conversion · ${campaign.revenue} attributed revenue`
              : 'Estimated at ₹0.72 per conversation'}
          </div>
        </div>

        <div>
          <div className="mb-2.5 text-[10.5px] font-semibold tracking-wide text-muted-foreground-3">FUNNEL</div>
          <div className="flex flex-col gap-3">
            {funnel.map((f, i) => {
              const pct = f.value / base
              const dropOff =
                i < funnel.length - 1 && campaign.sent
                  ? Math.round((1 - funnel[i + 1].value / (f.value || 1)) * 1000) / 10
                  : null
              return (
                <div key={f.label}>
                  <div className="mb-[5px] flex items-center justify-between">
                    <span className="text-sm font-semibold">{f.label}</span>
                    <span className="num text-xs text-muted-foreground">
                      {f.value.toLocaleString('en-IN')} · {Math.round(pct * 1000) / 10}%
                    </span>
                  </div>
                  <div className="h-6 overflow-hidden rounded-md bg-muted">
                    <div
                      className="h-full rounded-md"
                      style={{
                        width: `${Math.max(pct * 100, 0.6)}%`,
                        background: i === 4 ? 'var(--color-success)' : 'linear-gradient(90deg,#7C5CF0,#5B34E0)',
                      }}
                    />
                  </div>
                  {dropOff !== null && <div className="mt-1 text-xs text-muted-foreground">↓ {dropOff}% drop off</div>}
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1 justify-center">
            Duplicate
          </Button>
          <Button variant="primary" size="sm" className="flex-1 justify-center">
            View report
          </Button>
        </div>
      </div>
    </aside>
  )
}

function KvRow({ label, value, num }: { label: string; value: string; num?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 text-[12.5px]">
      <span className="text-muted-foreground">{label}</span>
      <span className={num ? 'num text-right font-medium' : 'text-right font-medium'}>{value}</span>
    </div>
  )
}
