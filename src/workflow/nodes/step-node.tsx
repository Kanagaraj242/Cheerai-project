import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'

import { getIcon } from '@/lib/icon-map'
import { cn } from '@/lib/utils'
import { NODE_TONE_STYLES } from '@/workflow/node-tone'
import type { WorkflowNodeData } from '@/types'

export type StepNode = Node<{ step: WorkflowNodeData; selected: boolean; isNew: boolean }, 'step'>

export function StepNodeComponent({ data }: NodeProps<StepNode>) {
  const { step, selected } = data
  const Icon = getIcon(step.icon)
  const tone = NODE_TONE_STYLES[step.tone]

  return (
    <div
      className={cn(
        'relative flex w-[440px] items-start gap-3 rounded-[14px] border border-border bg-card px-[15px] py-[13px] text-left shadow-card transition-shadow hover:border-primary-soft-border hover:shadow-card-lg',
        selected && 'border-primary shadow-[0_0_0_3px_rgba(91,52,224,0.12)]',
      )}
    >
      <Handle type="target" position={Position.Top} className="!bg-border" />
      <span
        className="flex size-[34px] shrink-0 items-center justify-center rounded-[10px]"
        style={{ background: tone.bg }}
      >
        <Icon className="size-[17px] stroke-[1.8px]" style={{ color: tone.text }} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="text-[9.5px] font-bold tracking-[0.07em]" style={{ color: tone.text }}>
          {step.kind}
        </span>
        <div className="mt-[3px] text-[13.5px] font-semibold tracking-tight">{step.title}</div>
        <div className="mt-[3px] text-xs leading-relaxed text-muted-foreground">{step.subtitle}</div>
      </span>
      <span className="num absolute top-[11px] right-3 text-[10px] font-semibold text-muted-foreground-3">
        {step.order}
      </span>
      <Handle type="source" position={Position.Bottom} className="!bg-border" />
    </div>
  )
}
