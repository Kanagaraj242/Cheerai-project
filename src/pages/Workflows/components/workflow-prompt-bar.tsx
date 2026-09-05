import { Play, Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useWorkflowStore } from '@/stores/workflow-store'

export function WorkflowPromptBar() {
  const generated = useWorkflowStore((s) => s.generated)
  const nlPrompt = useWorkflowStore((s) => s.nlPrompt)
  const setNlPrompt = useWorkflowStore((s) => s.setNlPrompt)
  const applyNlChange = useWorkflowStore((s) => s.applyNlChange)
  const publish = useWorkflowStore((s) => s.publish)

  return (
    <div className="flex flex-col gap-[11px] border-b border-border bg-card px-6 py-3.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Sparkles className="size-4 shrink-0 stroke-[1.7px] text-primary" />
          <div>
            <div className="text-sm font-semibold">Abandoned Cart Recovery</div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              {generated
                ? 'Generated from your description — review each step before publishing'
                : 'Draft · 7 steps · last edited 2 hours ago'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {generated ? (
            <Badge variant="brand">
              <Sparkles /> AI generated
            </Badge>
          ) : (
            <Badge variant="warning">Draft</Badge>
          )}
          <Button size="sm">
            <Play /> Test run
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              publish()
              window.alert('Workflow published. It will run on the next abandoned cart.')
            }}
          >
            Publish
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2.5 rounded-[11px] border border-border bg-card-soft py-1.5 pr-1.5 pl-3.5">
        <Sparkles className="size-4 shrink-0 stroke-[1.7px] text-primary" />
        <input
          value={nlPrompt}
          onChange={(e) => setNlPrompt(e.target.value)}
          placeholder="Describe a change — “also send an SMS if they don't reply in 2 hours”"
          className="flex-1 bg-transparent py-2.5 text-[13px] outline-none placeholder:text-muted-foreground-3"
        />
        <Button variant="primary" size="sm" onClick={applyNlChange}>
          Apply
        </Button>
      </div>
    </div>
  )
}
