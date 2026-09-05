import { Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { recommendations } from '@/data/dashboard'
import { getIcon } from '@/lib/icon-map'

export function RecommendationsCard() {
  return (
    <Card>
      <CardHeader>
        <Sparkles className="size-4 stroke-[1.7px] text-primary" />
        <div>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>Generated from this week&apos;s data</CardDescription>
        </div>
      </CardHeader>
      <div className="flex flex-col">
        {recommendations.map((rec) => {
          const Icon = getIcon(rec.icon)
          return (
            <div key={rec.id} className="flex gap-3 border-b border-border-soft px-4 py-3.5 last:border-b-0">
              <span className="flex size-[30px] shrink-0 items-center justify-center rounded-[9px] bg-primary-soft">
                <Icon className="size-[15px] stroke-[1.8px] text-primary" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold">{rec.title}</div>
                <div className="mt-[3px] text-xs leading-relaxed text-muted-foreground">{rec.description}</div>
              </div>
              <Button size="sm" className="h-fit self-center whitespace-nowrap">
                {rec.actionLabel}
              </Button>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
