import { SimpleStatCard } from '@/components/charts/simple-stat-card'

import { ContactsTable } from './components/contacts-table'
import { ContactDetailPanel } from './components/contact-detail-panel'

const stats = [
  { label: 'Total contacts', value: '32,680', delta: '+12.5% this month', tone: 'up' as const },
  { label: 'Customers', value: '18,412', delta: '56.3% of database', tone: 'neutral' as const },
  { label: 'Active segments', value: '28', delta: '6 auto-updating', tone: 'neutral' as const },
  { label: 'At risk of churn', value: '4,120', delta: '+18% vs last month', tone: 'down' as const },
]

export function Contacts() {
  return (
    <div className="flex h-full min-h-0">
      <div className="min-w-0 flex-1 overflow-y-auto px-6 py-[22px]">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
              <SimpleStatCard key={s.label} {...s} />
            ))}
          </div>
          <ContactsTable />
        </div>
      </div>
      <ContactDetailPanel />
    </div>
  )
}
