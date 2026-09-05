import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import { Plus } from 'lucide-react'

export type AddStepNode = Node<{ onAdd: () => void }, 'addStep'>

export function AddStepNodeComponent({ data }: NodeProps<AddStepNode>) {
  return (
    <div className="flex w-[440px] justify-center">
      <Handle type="target" position={Position.Top} className="!bg-border" />
      <button
        type="button"
        onClick={data.onAdd}
        className="flex size-7 items-center justify-center rounded-full border border-dashed border-muted-foreground-3 bg-card text-muted-foreground hover:border-primary hover:border-solid hover:text-primary"
      >
        <Plus className="size-4" />
      </button>
    </div>
  )
}
