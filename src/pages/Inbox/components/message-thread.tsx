import { Bot, Sparkles, Send, User } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CHANNEL_COLOR } from '@/types'
import { useInboxStore } from '@/stores/inbox-store'
import { cn } from '@/lib/utils'

import { AiStatusBadge } from './status-badges'

export function MessageThread() {
  const conversation = useInboxStore((s) => s.conversations.find((c) => c.id === s.selectedId)!)
  const draft = useInboxStore((s) => s.draft)
  const setDraft = useInboxStore((s) => s.setDraft)
  const setTab = useInboxStore((s) => s.setTab)
  const sendDraft = useInboxStore((s) => s.sendDraft)
  const takeOverFromAi = useInboxStore((s) => s.takeOverFromAi)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [])

  const sessionBar = (() => {
    if (conversation.session === 'open') {
      const hours = Math.floor((conversation.minutesLeft ?? 0) / 60)
      const mins = (conversation.minutesLeft ?? 0) % 60
      return (
        <div className="flex justify-between gap-2.5 bg-success-soft px-5 py-2.5 text-xs font-medium text-success">
          <span>
            Session open — free replies for {hours}h {mins}m
          </span>
          <span>Paid template needed after that</span>
        </div>
      )
    }
    if (conversation.session === 'closing') {
      return (
        <div className="flex justify-between gap-2.5 bg-warning-soft px-5 py-2.5 text-xs font-medium text-warning">
          <span>Session closing in {conversation.minutesLeft} minutes</span>
          <span>Reply now to stay free</span>
        </div>
      )
    }
    if (conversation.session === 'closed') {
      return (
        <div className="flex justify-between gap-2.5 bg-destructive-soft px-5 py-2.5 text-xs font-medium text-destructive">
          <span>Session closed — free replies not allowed</span>
          <span>Send an approved template instead</span>
        </div>
      )
    }
    return null
  })()

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-background">
      <div className="flex items-center gap-[11px] border-b border-border bg-card px-5 py-3">
        <span className="relative shrink-0">
          <Avatar className="size-9 text-xs">
            <AvatarFallback>{conversation.initials}</AvatarFallback>
          </Avatar>
          <i
            className="absolute -right-0.5 -bottom-0.5 size-[13px] rounded-full border-2 border-card"
            style={{ background: CHANNEL_COLOR[conversation.channel] }}
          />
        </span>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[14.5px] font-semibold">{conversation.name}</span>
            <AiStatusBadge status={conversation.aiStatus} />
          </div>
          <div className="text-xs text-muted-foreground">
            {conversation.channel} · {conversation.phone}
          </div>
        </div>
        <div className="flex-1" />
        {conversation.aiStatus === 'handling' ? (
          <Button size="sm" onClick={takeOverFromAi}>
            <User /> Take over from AI
          </Button>
        ) : (
          <span className="inline-flex items-center rounded-[7px] bg-warning-soft px-2 py-[3px] text-[11px] font-medium text-warning">
            You have this thread
          </span>
        )}
        <Button size="sm">Assign</Button>
        <Button size="sm">Resolve</Button>
      </div>

      <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto px-6 py-5">
        <span className="mb-0.5 self-center rounded-full border border-border bg-card px-3 py-[3px] text-[11px] text-muted-foreground">
          Today
        </span>
        {conversation.messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              'relative w-fit max-w-[62%] rounded-[14px] px-3.5 py-[11px] text-[13px] leading-[1.55]',
              m.from === 'them'
                ? 'self-start rounded-bl-[5px] border border-border bg-card'
                : 'self-end rounded-br-[5px] border border-[#CDEEDC] bg-[#E9FBF1]',
            )}
          >
            {m.agent && (
              <span
                className={cn(
                  'absolute -top-[9px] flex items-center gap-1 rounded-full border border-primary-soft-border bg-primary-soft px-[7px] py-[2px] text-[9.5px] font-semibold text-primary',
                  m.from === 'us' ? 'right-3' : 'left-3',
                )}
              >
                <Bot className="size-2.5" /> {m.agent}
              </span>
            )}
            {m.text}
            <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-muted-foreground-3">
              {m.time}
              {m.from === 'us' && ' ✓✓'}
            </div>
          </div>
        ))}
      </div>

      {sessionBar}

      <div className="flex flex-col gap-2.5 border-t border-border bg-card px-5 pt-3 pb-3.5">
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a reply, or insert the AI suggestion…"
        />
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setTab('copilot')}>
            <Sparkles /> Draft with AI
          </Button>
          <Button size="sm">Templates</Button>
          <Button size="sm">Note</Button>
          <div className="flex-1" />
          <span className="inline-flex items-center gap-1.5 rounded-[9px] border border-border px-[11px] py-1.5 text-xs text-muted-foreground-2">
            {conversation.channel} ▾
          </span>
          <Button variant="primary" size="sm" onClick={sendDraft}>
            <Send /> Send
          </Button>
        </div>
      </div>
    </div>
  )
}
