import { SimpleStatCard } from '@/components/charts/simple-stat-card'

import { AiGenerateBar } from './components/ai-generate-bar'
import { CampaignsTable } from './components/campaigns-table'
import { CampaignDetailPanel } from './components/campaign-detail-panel'

const stats = [
  { label: 'Total reach', value: '4.28L', delta: '+16.3%', tone: 'up' as const },
  { label: 'Delivery rate', value: '97.8%', delta: '+0.4%', tone: 'up' as const },
  { label: 'Engagement', value: '61.4%', delta: '+8.7%', tone: 'up' as const },
  { label: 'Conversions', value: '2,121', delta: '+20.6%', tone: 'up' as const },
  { label: 'Spend', value: '₹15,497', delta: '₹7.31 per conversion', tone: 'neutral' as const },
]

export function Campaigns() {
  return (
    <div className="flex h-full min-h-0">
      <div className="min-w-0 flex-1 overflow-y-auto px-6 py-[22px]">
        <div className="flex flex-col gap-4">
          <AiGenerateBar />
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 xl:grid-cols-5">
            {stats.map((s) => (
              <SimpleStatCard key={s.label} {...s} />
            ))}
          </div>
          <CampaignsTable />
        </div>
      </div>
      <CampaignDetailPanel />
    </div>
  )
}
