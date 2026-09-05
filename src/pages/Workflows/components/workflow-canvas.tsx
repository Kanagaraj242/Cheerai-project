import {
  Background,
  BackgroundVariant,
  ReactFlow,
  useReactFlow,
  type Edge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useEffect, useMemo } from 'react'

import { useWorkflowStore } from '@/stores/workflow-store'
import { AddStepNodeComponent, type AddStepNode } from '@/workflow/nodes/add-step-node'
import { StepNodeComponent, type StepNode } from '@/workflow/nodes/step-node'

const nodeTypes = {
  step: StepNodeComponent,
  addStep: AddStepNodeComponent,
}

const VERTICAL_GAP = 168

export function WorkflowCanvas() {
  const nodes = useWorkflowStore((s) => s.nodes)
  const selectedIndex = useWorkflowStore((s) => s.selectedIndex)
  const selectNode = useWorkflowStore((s) => s.selectNode)
  const addStep = useWorkflowStore((s) => s.addStep)
  const generated = useWorkflowStore((s) => s.generated)

  const flowNodes = useMemo<(StepNode | AddStepNode)[]>(() => {
    const stepNodes: StepNode[] = nodes.map((step, i) => ({
      id: `step-${i}`,
      type: 'step',
      position: { x: 0, y: i * VERTICAL_GAP },
      data: { step, selected: i === selectedIndex, isNew: generated && i === nodes.length - 1 },
      draggable: false,
    }))
    const addNode: AddStepNode = {
      id: 'add-step',
      type: 'addStep',
      position: { x: 0, y: nodes.length * VERTICAL_GAP },
      data: { onAdd: addStep },
      draggable: false,
    }
    return [...stepNodes, addNode]
  }, [nodes, selectedIndex, generated, addStep])

  const flowEdges = useMemo<Edge[]>(() => {
    const edges: Edge[] = []
    for (let i = 1; i < nodes.length; i++) {
      const dashed = nodes[i].kind === 'FOLLOW-UP'
      edges.push({
        id: `e-${i - 1}-${i}`,
        source: `step-${i - 1}`,
        target: `step-${i}`,
        label: nodes[i].branchLabel,
        style: dashed ? { strokeDasharray: '4 4', stroke: 'var(--color-border)' } : { stroke: 'var(--color-border)' },
        labelBgStyle: { fill: 'var(--color-card)' },
        labelBgPadding: [8, 4],
        labelStyle: { fontSize: 11, fontWeight: 500, fill: 'var(--color-muted-foreground-2)' },
      })
    }
    if (nodes.length > 0) {
      edges.push({
        id: 'e-add',
        source: `step-${nodes.length - 1}`,
        target: 'add-step',
        style: { strokeDasharray: '4 4', stroke: 'var(--color-border)' },
      })
    }
    return edges
  }, [nodes])

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => {
          if (node.type === 'step') selectNode(Number(node.id.replace('step-', '')))
        }}
        nodesConnectable={false}
        elementsSelectable
        panOnScroll
        zoomOnScroll={false}
        fitView
        fitViewOptions={{ padding: 0.25, maxZoom: 1 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="#DEDFEC" />
        <FitViewOnChange nodeCount={nodes.length} />
      </ReactFlow>
    </div>
  )
}

function FitViewOnChange({ nodeCount }: { nodeCount: number }) {
  const { fitView } = useReactFlow()
  useEffect(() => {
    fitView({ padding: 0.25, maxZoom: 1, duration: 200 })
  }, [nodeCount, fitView])
  return null
}
