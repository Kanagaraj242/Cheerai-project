import { Pencil, Search, Workflow, X } from 'lucide-react'
import { type ReactNode, useMemo, useState } from 'react'

import { getIcon } from '@/lib/icon-map'
import { cn } from '@/lib/utils'
import { useWorkflowStore } from '@/stores/workflow-store'

import {
  filterSections,
  getSections,
  type NodeLibraryItem,
  type NodeLibraryTab,
} from './node-library-data'

interface NodeLibraryPanelProps {
  onClose?: () => void
}

export function NodeLibraryPanel({ onClose }: NodeLibraryPanelProps) {
  const [tab, setTab] = useState<NodeLibraryTab>('events')
  const [query, setQuery] = useState('')
  const addLibraryNode = useWorkflowStore((s) => s.addLibraryNode)

  const sections = useMemo(() => filterSections(getSections(tab), query), [tab, query])

  return (
    <div className="flex h-full min-h-0 w-full flex-col border-r border-border bg-card">
      <div className="flex items-stretch gap-1.5 p-3.5 pb-0">
        <TabCard
          active={tab === 'events'}
          onClick={() => setTab('events')}
          icon={<Workflow className="size-[18px] stroke-[1.7px] text-success" />}
          title="Events"
          subtitle="When this happens"
        />
        <TabCard
          active={tab === 'actions'}
          onClick={() => setTab('actions')}
          icon={<Pencil className="size-[18px] stroke-[1.7px] text-primary" />}
          title="Actions"
          subtitle="Do this"
        />
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close node library"
            className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-card-soft xl:hidden"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="p-3.5">
        <div className="flex items-center gap-2.5 rounded-[10px] border border-border bg-card-soft px-3 py-2.5">
          <Search className="size-4 shrink-0 stroke-[1.9px] text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search nodes…"
            className="w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground-3"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3.5 pb-5">
        {sections.length === 0 ? (
          <p className="px-1 py-6 text-center text-xs text-muted-foreground">
            No nodes match “{query}”.
          </p>
        ) : (
          sections.map((section) => (
            <div key={section.title} className="mb-5">
              <div className="mb-2.5 px-1 text-[12.5px] font-semibold tracking-tight">{section.title}</div>
              <div className="grid grid-cols-3 gap-2.5">
                {section.items.map((item) => (
                  <LibraryCard key={item.id} item={item} onAdd={() => addLibraryNode(item)} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function TabCard({
  active,
  onClick,
  icon,
  title,
  subtitle,
}: {
  active: boolean
  onClick: () => void
  icon: ReactNode
  title: string
  subtitle: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex min-w-0 flex-1 items-center gap-1.5 rounded-[10px] border border-border bg-card px-2 py-2 text-left transition-colors hover:bg-card-soft',
        active && 'border-primary bg-primary-soft hover:bg-primary-soft',
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span className="min-w-0">
        <span className={cn('block truncate text-[13px] font-semibold', active && 'text-primary')}>{title}</span>
        <span className="block truncate text-[10px] leading-tight text-muted-foreground">{subtitle}</span>
      </span>
    </button>
  )
}

function LibraryCard({ item, onAdd }: { item: NodeLibraryItem; onAdd: () => void }) {
  const Icon = getIcon(item.icon)
  return (
    <button
      type="button"
      onClick={onAdd}
      title={`Add “${item.label}” to the workflow`}
      className="flex flex-col items-center gap-1.5 rounded-xl border border-transparent p-1.5 transition-colors hover:border-border hover:bg-card-soft"
    >
      <span
        className="flex size-[52px] items-center justify-center rounded-2xl shadow-[0_1px_2px_rgba(15,16,32,0.12)]"
        style={{ background: item.iconBg }}
      >
        <Icon className="size-6 stroke-[1.8px] text-white" />
      </span>
      <span className="text-center text-[11px] leading-tight text-muted-foreground-2">{item.label}</span>
    </button>
  )
}
