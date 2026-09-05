import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { campaignPerformanceData } from '@/data/dashboard'

const summary = [
  { label: 'Reach', value: '4.28L' },
  { label: 'Delivered', value: '97.8%' },
  { label: 'Engaged', value: '61.4%' },
  { label: 'Converted', value: '2,121' },
]

export function CampaignPerformanceCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div>
          <CardTitle>Campaign performance</CardTitle>
          <CardDescription>Reach and conversions, last 8 weeks</CardDescription>
        </div>
        <div className="flex-1" />
        <div className="flex flex-wrap gap-3.5 text-[11.5px] text-muted-foreground-2">
          <span className="flex items-center gap-1.5">
            <i className="size-1.5 rounded-full bg-primary-soft-border" /> Reach
          </span>
          <span className="flex items-center gap-1.5">
            <i className="size-1.5 rounded-full bg-primary" /> Converted
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-[18px] grid grid-cols-2 gap-4 sm:grid-cols-4">
          {summary.map((s) => (
            <div key={s.label}>
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="num mt-[3px] text-[19px] font-semibold">{s.value}</div>
            </div>
          ))}
        </div>
        <div className="h-[170px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campaignPerformanceData} barGap={4}>
              <XAxis dataKey="week" hide />
              <Tooltip
                cursor={{ fill: 'var(--color-card-soft)' }}
                contentStyle={{
                  borderRadius: 10,
                  border: '1px solid var(--color-border)',
                  fontSize: 12,
                }}
              />
              <Bar dataKey="converted" stackId="a" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="reach" stackId="a" fill="var(--color-primary-soft-border)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2.5 flex justify-between text-[10.5px] text-muted-foreground-3">
          <span>{campaignPerformanceData[0].week}</span>
          <span>{campaignPerformanceData[campaignPerformanceData.length - 1].week}</span>
        </div>
      </CardContent>
    </Card>
  )
}
