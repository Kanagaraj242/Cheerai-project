import { Bar, BarChart, Cell, ResponsiveContainer } from 'recharts'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { getIcon } from '@/lib/icon-map'
import { useConnectorsStore } from '@/stores/connectors-store'
import type { AiAgent } from '@/types'

export function AgentCard({ agent }: { agent: AiAgent }) {
  const toggleAgent = useConnectorsStore((s) => s.toggleAgent)
  const Icon = getIcon(agent.icon)
  const perfData = agent.performance.map((v, i) => ({ i, v }))

  return (
    <Card className="overflow-hidden">
      <div className="flex items-start gap-3.5 bg-gradient-to-br from-[#FAF8FF] to-white p-5">
        <span
          className="flex size-[46px] shrink-0 items-center justify-center rounded-[13px]"
          style={{ background: agent.gradient }}
        >
          <Icon className="size-[22px] stroke-[1.8px] text-white" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[15.5px] font-semibold tracking-tight">{agent.name}</span>
            <Badge variant={agent.active ? 'success' : 'neutral'}>{agent.active ? 'Active' : 'Paused'}</Badge>
          </div>
          <div className="mt-[3px] text-sm text-muted-foreground">{agent.role}</div>
        </div>
        <Switch checked={agent.active} onCheckedChange={() => toggleAgent(agent.id)} />
      </div>

      <div className="grid grid-cols-3 border-t border-border-soft">
        <Metric label="Tasks completed" value={agent.tasksCompleted} />
        <Metric label={agent.rateLabel} value={agent.rate} bordered />
        <Metric label={agent.handoffLabel} value={agent.handoff} bordered right />
      </div>

      <div className="flex flex-col gap-3.5 border-t border-border-soft p-5">
        <div>
          <div className="mb-1.5 text-[10.5px] font-semibold tracking-wide text-muted-foreground-3">
            PERFORMANCE · 8 WEEKS
          </div>
          <div className="h-11">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perfData} barCategoryGap={2}>
                <Bar dataKey="v" radius={[3, 3, 0, 0]}>
                  {perfData.map((entry, index) => (
                    <Cell
                      key={entry.i}
                      fill={index > 5 ? 'var(--color-primary)' : 'var(--color-primary-soft-border)'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className="mb-1.5 text-[10.5px] font-semibold tracking-wide text-muted-foreground-3">SKILLS</div>
          <div className="flex flex-wrap gap-1.5">
            {agent.skills.map((s) => (
              <span key={s} className="rounded-[6px] border border-border bg-card-soft px-[7px] py-[3px] text-[10.5px] text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-1.5 text-[10.5px] font-semibold tracking-wide text-muted-foreground-3">
            USES CONNECTORS
          </div>
          <div className="flex flex-wrap gap-1.5">
            {agent.connectors.map((c) => (
              <span key={c} className="rounded-[6px] border border-border bg-card-soft px-[7px] py-[3px] text-[10.5px] text-muted-foreground">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1 justify-center">
            View transcripts
          </Button>
          <Button size="sm" className="flex-1 justify-center">
            Configure
          </Button>
        </div>
      </div>
    </Card>
  )
}

function Metric({ label, value, bordered, right }: { label: string; value: string; bordered?: boolean; right?: boolean }) {
  return (
    <div className={bordered ? `border-l border-border-soft px-4 py-[13px] ${right ? '' : ''}` : 'px-4 py-[13px]'}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="num mt-[3px] text-[17px] font-semibold tracking-tight">{value}</div>
    </div>
  )
}
