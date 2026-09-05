import type { ReactNode } from 'react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface SimpleStatCardProps {
  label: string
  value: ReactNode
  delta: string
  tone?: 'up' | 'down' | 'neutral'
}

export function SimpleStatCard({ label, value, delta, tone = 'neutral' }: SimpleStatCardProps) {
  return (
    <Card className="px-[18px] py-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="num my-[7px] text-2xl font-semibold tracking-tight">{value}</div>
      <div
        className={cn(
          'text-[11.5px]',
          tone === 'up' && 'text-success',
          tone === 'down' && 'text-destructive',
          tone === 'neutral' && 'text-muted-foreground',
        )}
      >
        {delta}
      </div>
    </Card>
  )
}
