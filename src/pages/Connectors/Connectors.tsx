import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { SimpleStatCard } from '@/components/charts/simple-stat-card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { connectors } from '@/data/connectors'
import { CONNECTOR_CATEGORIES, useConnectorsStore } from '@/stores/connectors-store'

import { ConnectorCard } from './components/connector-card'
import { AgentCard } from './components/agent-card'

export function Connectors() {
  const categoryFilter = useConnectorsStore((s) => s.categoryFilter)
  const setCategoryFilter = useConnectorsStore((s) => s.setCategoryFilter)
  const agents = useConnectorsStore((s) => s.agents)

  const filteredConnectors = connectors.filter((c) => categoryFilter === 'All' || c.category === categoryFilter)

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[18px] px-7 pt-6 pb-10">
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <SimpleStatCard label="Connected apps" value="8" delta="of 9 available" />
        <SimpleStatCard label="Needs attention" value="1" delta="Instagram token expiring" tone="down" />
        <SimpleStatCard
          label="Active AI agents"
          value={
            <>
              2 <span className="text-[15px] font-medium text-muted-foreground">of 3</span>
            </>
          }
          delta="Retention Agent paused"
        />
        <SimpleStatCard label="Agent tasks this month" value="33,466" delta="+19.2%" tone="up" />
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Connected integrations</CardTitle>
            <CardDescription>Apps Cheerio can read from and write to</CardDescription>
          </div>
          <div className="flex-1" />
          <Button variant="primary" size="sm">
            <Plus /> Add connector
          </Button>
        </CardHeader>
        <div className="px-5 pt-3.5 pb-2">
          <Tabs value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as typeof categoryFilter)}>
            <TabsList className="inline-flex flex-wrap">
              {CONNECTOR_CATEGORIES.map((c) => (
                <TabsTrigger key={c} value={c}>
                  {c}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <CardContent className="pt-2">
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-3">
            {filteredConnectors.map((c) => (
              <ConnectorCard key={c.id} connector={c} />
            ))}
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="mb-3.5 flex items-center justify-between gap-3">
          <div>
            <div className="text-base font-semibold">AI Agents</div>
            <div className="mt-0.5 text-sm text-muted-foreground">
              Workers that handle jobs end to end, using your connectors
            </div>
          </div>
          <Button variant="primary" size="sm">
            <Plus /> Create agent
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-3.5 xl:grid-cols-3">
          {agents.map((a) => (
            <AgentCard key={a.id} agent={a} />
          ))}
        </div>
      </div>
    </div>
  )
}
