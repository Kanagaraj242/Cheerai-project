import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useWorkflowStore } from '@/stores/workflow-store'

const suggestions = [
  'Win back customers inactive for 90 days',
  'Ask for a review 3 days after delivery',
  'Route high-value leads to the sales team',
]

const placeholder = 'Recover abandoned carts after 2 hours and send a personalised WhatsApp message'

export function AiCommandBar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const seedFromPrompt = useWorkflowStore((s) => s.seedFromPrompt)

  function buildWorkflow() {
    seedFromPrompt(query || placeholder)
    navigate('/workflows')
  }

  return (
    <div className="flex flex-col gap-3.5 rounded-2xl border border-primary-soft-border bg-gradient-to-br from-[#F4F0FE] via-[#EFEBFD] to-[#F3F6FE] px-[22px] py-5">
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 stroke-[1.7px] text-primary" />
          <span className="text-[10.5px] font-semibold tracking-[0.09em] text-primary">CHEERIO AI</span>
        </div>
        <div className="mt-[7px] text-[16.5px] font-semibold tracking-tight">
          Tell Cheerio what you want to automate
        </div>
        <div className="mt-[3px] text-sm text-muted-foreground">
          Describe it in plain words. Cheerio builds the workflow, you approve it, then it runs.
        </div>
      </div>

      <div className="flex items-center gap-2.5 rounded-xl border border-primary-soft-border bg-card p-1.5 pl-3.5 shadow-[0_1px_2px_rgba(91,52,224,0.06)]">
        <Sparkles className="size-4 shrink-0 stroke-[1.7px] text-primary" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent py-2.5 text-[13.5px] outline-none placeholder:text-muted-foreground-3"
        />
        <Button variant="primary" onClick={buildWorkflow}>
          Build workflow
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setQuery(s)}
            className="rounded-full border border-primary-soft-border bg-white/82 px-3 py-1.5 text-xs font-medium text-primary hover:bg-white"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
