import { Plug, Workflow, Zap } from 'lucide-react'
import { Bot } from 'lucide-react'

import { StatCard } from './components/stat-card'
import { AiCommandBar } from './components/ai-command-bar'
import { CampaignPerformanceCard } from './components/campaign-performance-card'
import { RecommendationsCard } from './components/recommendations-card'
import { RevenueCard } from './components/revenue-card'
import { ActivityFeedCard } from './components/activity-feed-card'

export function Dashboard() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[18px] px-7 pt-6 pb-10">
      <AiCommandBar />

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Automation tasks"
          value="31,240"
          delta="18,760 remaining · resets in 12 days"
          icon={Zap}
          iconColor="var(--color-primary)"
          iconBg="var(--color-primary-soft)"
        />
        <StatCard
          label="Active AI agents"
          value={
            <>
              2 <span className="text-[15px] font-medium text-muted-foreground">of 3</span>
            </>
          }
          delta="Retention Agent is paused"
          icon={Bot}
          iconColor="var(--color-success)"
          iconBg="var(--color-success-soft)"
        />
        <StatCard
          label="Connected apps"
          value="8"
          delta="1 needs attention"
          trend="down"
          icon={Plug}
          iconColor="var(--color-info)"
          iconBg="var(--color-info-soft)"
        />
        <StatCard
          label="Active workflows"
          value="12"
          delta="3 added this month"
          trend="up"
          icon={Workflow}
          iconColor="var(--color-warning)"
          iconBg="var(--color-warning-soft)"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.55fr_1fr]">
        <CampaignPerformanceCard />
        <RecommendationsCard />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1.35fr]">
        <RevenueCard />
        <ActivityFeedCard />
      </div>
    </div>
  )
}
