import { CheckCircle2 } from 'lucide-react'
import { Bar, BarChart, Cell, ResponsiveContainer } from 'recharts'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { revenueSpark } from '@/data/dashboard'

const rows = [
  { label: 'Total customers', value: '32,680', delta: '+12.5%', up: true },
  { label: 'New this month', value: '2,543', delta: '+8.4%', up: true },
  { label: 'Repeat rate', value: '38.2%', delta: '+3.1%', up: true },
  { label: 'Avg order value', value: '₹2,412', delta: '−1.8%', up: false },
]

const sparkData = revenueSpark.map((v, i) => ({ i, v }))

export function RevenueCard() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Revenue &amp; customers</CardTitle>
          <CardDescription>Attributed to Cheerio, last 12 weeks</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div className="text-xs text-muted-foreground">Attributed revenue</div>
          <div className="num mt-1 text-[28px] font-semibold tracking-tight">₹26.9L</div>
          <div className="mt-[5px] flex items-center gap-1.5 text-xs text-success">
            <CheckCircle2 className="size-3.5" /> +22.4% vs previous
          </div>
        </div>
        <div className="mt-4 h-14">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sparkData} barCategoryGap={2}>
              <Bar dataKey="v" radius={[3, 3, 0, 0]}>
                {sparkData.map((entry, index) => (
                  <Cell
                    key={entry.i}
                    fill={index > 8 ? 'var(--color-primary)' : 'var(--color-primary-soft-border)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-[18px] flex flex-col gap-[11px]">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{row.label}</span>
              <span className="flex items-center gap-2.5">
                <b className="num text-[13.5px]">{row.value}</b>
                <span
                  className={`num w-[46px] text-right text-xs ${row.up ? 'text-success' : 'text-destructive'}`}
                >
                  {row.delta}
                </span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
