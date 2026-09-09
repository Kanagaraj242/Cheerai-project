import { Sparkles } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useWorkflowStore } from '@/stores/workflow-store'
import { cn } from '@/lib/utils'

const COSTS_MONEY = new Set(['CONNECTOR', 'ACTION', 'FOLLOW-UP'])

export function WorkflowInspector() {
  const nodes = useWorkflowStore((s) => s.nodes)
  const selectedIndex = useWorkflowStore((s) => s.selectedIndex)
  const removeStep = useWorkflowStore((s) => s.removeStep)
  const node = nodes[selectedIndex] ?? nodes[0]
  const [runWhen, setRunWhen] = useState<'always' | 'business'>('always')

  const costsMoney = COSTS_MONEY.has(node.kind)

  return (
    <aside className="w-[360px] shrink-0 overflow-y-auto border-l border-border bg-card p-[18px]">
      <div className="mb-4 flex items-center gap-2">
        <Badge variant="neutral" className="num">
          Step {selectedIndex + 1}
        </Badge>
        <span className="text-[15px] font-semibold">{node.title}</span>
      </div>

      <div className="flex flex-col gap-3.5">
        {node.config.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-[7px]">
            <label className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              {label}
            </label>
            <div className="rounded-[10px] border border-border bg-card px-3 py-2.5 text-[13px]">{value}</div>
          </div>
        ))}

        <div className="flex flex-col gap-[7px]">
          <label className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
            When this runs
          </label>
          <div className="flex gap-1.5 rounded-[10px] border border-border bg-card-soft p-[3px]">
            <button
              type="button"
              onClick={() => setRunWhen('always')}
              className={cn(
                'flex-1 rounded-[7px] py-1.5 text-xs font-medium text-muted-foreground',
                runWhen === 'always' && 'bg-card font-semibold text-foreground shadow-[0_1px_2px_rgba(15,16,32,0.07)]',
              )}
            >
              Always
            </button>
            <button
              type="button"
              onClick={() => setRunWhen('business')}
              className={cn(
                'flex-1 rounded-[7px] py-1.5 text-xs font-medium text-muted-foreground',
                runWhen === 'business' && 'bg-card font-semibold text-foreground shadow-[0_1px_2px_rgba(15,16,32,0.07)]',
              )}
            >
              Business hours
            </button>
          </div>
        </div>

        {costsMoney ? (
          <div className="flex flex-col gap-1 rounded-[10px] bg-warning-soft px-3.5 py-2.5 text-warning">
            <b className="text-[12.5px] font-semibold">Costs money</b>
            <p className="text-xs leading-relaxed">Roughly 8,900 runs a week at ₹0.72 — about ₹6,400 a week.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-1 rounded-[10px] bg-success-soft px-3.5 py-2.5 text-success">
            <b className="text-[12.5px] font-semibold">Free step</b>
            <p className="text-xs leading-relaxed">Runs on your own data. No message charge.</p>
          </div>
        )}

        <div className="flex flex-col gap-2.5 rounded-xl border border-primary-soft-border bg-gradient-to-br from-[#F4F0FE] to-[#F0F4FE] px-3.5 py-3.5">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 stroke-[1.7px] text-primary" />
            <span className="text-[10.5px] font-semibold tracking-[0.09em] text-primary">WHY THIS STEP</span>
          </div>
          <div className="text-[12.6px] leading-relaxed">
            You asked for a two-hour delay. Across 8,932 past runs, 90 minutes converted better — 4.8% against 3.1%.
            I have kept your two hours, but you can change it here.
          </div>
          <Button size="sm" className="w-fit bg-white">
            Use 90 minutes
          </Button>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1 justify-center">
            Duplicate
          </Button>
          <Button
            size="sm"
            className="flex-1 justify-center text-destructive"
            disabled={nodes.length <= 1}
            onClick={() => removeStep(selectedIndex)}
          >
            Delete step
          </Button>
        </div>
      </div>
    </aside>
  )
}
