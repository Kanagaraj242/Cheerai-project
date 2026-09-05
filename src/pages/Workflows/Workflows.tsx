import { ReactFlowProvider } from '@xyflow/react'

import { WorkflowPromptBar } from './components/workflow-prompt-bar'
import { WorkflowCanvas } from './components/workflow-canvas'
import { WorkflowSummaryBar } from './components/workflow-summary-bar'
import { WorkflowInspector } from './components/workflow-inspector'

export function Workflows() {
  return (
    <div className="flex h-full min-h-0">
      <div className="flex min-w-0 flex-1 flex-col">
        <WorkflowPromptBar />
        <div className="min-h-0 flex-1">
          <ReactFlowProvider>
            <WorkflowCanvas />
          </ReactFlowProvider>
        </div>
        <WorkflowSummaryBar />
      </div>
      <WorkflowInspector />
    </div>
  )
}
