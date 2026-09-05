import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { activityFeed } from '@/data/dashboard'
import { cn } from '@/lib/utils'

const toneColor: Record<string, string> = {
  success: 'bg-success',
  brand: 'bg-primary',
  warning: 'bg-warning',
  destructive: 'bg-destructive',
}

export function ActivityFeedCard() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Recent activity</CardTitle>
          <CardDescription>Agents, workflows and connectors</CardDescription>
        </div>
        <div className="flex-1" />
        <Button size="sm">Full audit log</Button>
      </CardHeader>
      <div className="flex flex-col">
        {activityFeed.map((item) => (
          <div key={item.id} className="flex gap-3 border-b border-border-soft px-4 py-3 last:border-b-0">
            <span className={cn('mt-1.5 size-2 shrink-0 rounded-full', toneColor[item.tone])} />
            <div>
              {/* eslint-disable-next-line react/no-danger -- static, trusted mock copy */}
              <div className="text-[12.8px] leading-relaxed" dangerouslySetInnerHTML={{ __html: item.html }} />
              <div className="mt-[3px] text-[11px] text-muted-foreground-3">{item.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
