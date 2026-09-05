import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: ReactNode
  delta: string
  trend?: 'up' | 'down' | 'neutral'
  icon: LucideIcon
  iconColor: string
  iconBg: string
}

export function StatCard({ label, value, delta, trend = 'neutral', icon: Icon, iconColor, iconBg }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden p-4 px-[18px] py-4">
      <div
        className="absolute top-3.5 right-3.5 flex size-8 items-center justify-center rounded-[9px]"
        style={{ background: iconBg }}
      >
        <Icon className="size-4 stroke-[1.8px]" style={{ color: iconColor }} />
      </div>
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="num my-[7px] text-[26px] font-semibold tracking-tight">{value}</div>
      <div
        className={cn(
          'flex items-center gap-1.5 text-[11.5px]',
          trend === 'up' && 'text-success',
          trend === 'down' && 'text-destructive',
          trend === 'neutral' && 'text-muted-foreground',
        )}
      >
        {delta}
      </div>
    </Card>
  )
}
