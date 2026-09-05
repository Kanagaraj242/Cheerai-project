import { Filter } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CHANNEL_COLOR } from '@/types'
import { useInboxStore } from '@/stores/inbox-store'
import { cn } from '@/lib/utils'

import { AiStatusBadge, SessionBadge } from './status-badges'

export function ConversationList() {
  const conversations = useInboxStore((s) => s.conversations)
  const selectedId = useInboxStore((s) => s.selectedId)
  const selectConversation = useInboxStore((s) => s.selectConversation)
  const unreadTotal = conversations.reduce((sum, c) => sum + c.unread, 0)

  return (
    <div className="flex min-h-0 w-[330px] shrink-0 flex-col border-r border-border">
      <div className="flex flex-col gap-[11px] border-b border-border px-4 py-3.5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[15px] font-semibold">All conversations</span>
          <span className="num text-xs text-muted-foreground">{unreadTotal} unread</span>
        </div>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="ai">AI handled</TabsTrigger>
            <TabsTrigger value="mine">Needs me</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-[9px] border border-border px-[11px] py-1.5 text-xs text-muted-foreground-2">
            <Filter className="size-3.5 stroke-2" /> Channel
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-[9px] border border-border px-[11px] py-1.5 text-xs text-muted-foreground-2">
            Agent
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-[9px] border border-border px-[11px] py-1.5 text-xs text-muted-foreground-2">
            Status
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => selectConversation(c.id)}
            className={cn(
              'relative block w-full border-b border-border-soft px-4 py-3.5 text-left hover:bg-card-soft',
              c.id === selectedId && 'bg-primary-soft',
            )}
          >
            {c.id === selectedId && <span className="absolute inset-y-0 left-0 w-[3px] bg-primary" />}
            <div className="flex items-center gap-2.5">
              <span className="relative shrink-0">
                <Avatar className="size-8 text-[10.5px]">
                  <AvatarFallback>{c.initials}</AvatarFallback>
                </Avatar>
                <i
                  className="absolute -right-0.5 -bottom-0.5 size-[13px] rounded-full border-2 border-card"
                  style={{ background: CHANNEL_COLOR[c.channel] }}
                />
              </span>
              <span className="min-w-0 flex-1 text-[13px] font-semibold">{c.name}</span>
              <span className="text-xs text-muted-foreground">{c.time}</span>
            </div>
            <div className="mt-1 mb-[7px] overflow-hidden text-xs text-ellipsis whitespace-nowrap text-muted-foreground">
              {c.preview}
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <AiStatusBadge status={c.aiStatus} />
              <SessionBadge conversation={c} />
              {c.unread > 0 && (
                <>
                  <span className="flex-1" />
                  <Badge variant="brand" className="num">
                    {c.unread}
                  </Badge>
                </>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
