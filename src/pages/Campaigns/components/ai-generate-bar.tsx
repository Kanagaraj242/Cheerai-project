import { Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function AiGenerateBar() {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-primary-soft-border bg-gradient-to-br from-[#F4F0FE] via-[#EFEBFD] to-[#F3F6FE] px-[18px] py-4">
      <div className="flex items-center gap-2.5">
        <Sparkles className="size-4 shrink-0 stroke-[1.7px] text-primary" />
        <div>
          <div className="text-sm font-semibold">Generate a campaign with AI</div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            Describe the goal — Cheerio picks the segment, writes the copy and estimates the spend.
          </div>
        </div>
      </div>
      <Button variant="primary" size="sm">
        <Sparkles /> Generate campaign
      </Button>
    </div>
  )
}
