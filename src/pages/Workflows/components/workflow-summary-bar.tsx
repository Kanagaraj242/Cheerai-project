import { ChevronRight, Sparkles } from 'lucide-react'

import { useWorkflowStore } from '@/stores/workflow-store'

export function WorkflowSummaryBar() {
  const nodes = useWorkflowStore((s) => s.nodes)

  return (
    <div className="flex flex-wrap items-center gap-1.5 border-t border-border bg-card px-6 py-3.5">
      <Sparkles className="size-4 shrink-0 stroke-[1.7px] text-primary" />
      {nodes.map((node, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="size-3 text-muted-foreground-3" />}
          <b className="rounded-md border border-primary-soft-border bg-primary-soft px-2 py-[3px] text-[12.5px] font-semibold text-primary">
            {node.title}
          </b>
        </span>
      ))}
    </div>
  )
}
