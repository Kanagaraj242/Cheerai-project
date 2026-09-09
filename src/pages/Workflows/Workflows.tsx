import { ReactFlowProvider } from '@xyflow/react'
import { useState } from 'react'

import { NodeLibraryPanel } from '@/workflow/node-library/node-library-panel'

import { WorkflowPromptBar } from './components/workflow-prompt-bar'
import { WorkflowCanvas } from './components/workflow-canvas'
import { WorkflowSummaryBar } from './components/workflow-summary-bar'
import { WorkflowInspector } from './components/workflow-inspector'

export function Workflows() {
  const [libraryOpen, setLibraryOpen] = useState(false)

  return (
    <div className="relative flex h-full min-h-0">
      {/* Static column from xl up, slide-over below it */}
      <div className="hidden w-[320px] shrink-0 xl:block">
        <NodeLibraryPanel />
      </div>
      {libraryOpen && (
        <>
          <button
            type="button"
            aria-label="Close node library"
            onClick={() => setLibraryOpen(false)}
            className="absolute inset-0 z-20 bg-black/20 xl:hidden"
          />
          <div className="absolute inset-y-0 left-0 z-30 w-[320px] shadow-card-lg xl:hidden">
            <NodeLibraryPanel onClose={() => setLibraryOpen(false)} />
          </div>
        </>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <WorkflowPromptBar onOpenLibrary={() => setLibraryOpen(true)} />
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
