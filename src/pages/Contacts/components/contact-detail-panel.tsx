import { Sparkles, Tag as TagIcon, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CHANNEL_COLOR } from '@/types'
import { conversations } from '@/data/conversations'
import { contactTimeline } from '@/data/dashboard'
import { useContactsStore } from '@/stores/contacts-store'

export function ContactDetailPanel() {
  const selectedId = useContactsStore((s) => s.selectedId)
  const contact = conversations.find((c) => c.id === selectedId) ?? conversations[0]
  const navigate = useNavigate()

  return (
    <aside className="w-[352px] shrink-0 overflow-y-auto border-l border-border bg-card">
      <div className="flex flex-col gap-4 px-[18px] py-4">
        <div className="flex items-center gap-3">
          <span className="relative shrink-0">
            <Avatar className="size-14 text-lg">
              <AvatarFallback>{contact.initials}</AvatarFallback>
            </Avatar>
            <i
              className="absolute -right-0.5 -bottom-0.5 size-[13px] rounded-full border-2 border-card"
              style={{ background: CHANNEL_COLOR[contact.channel] }}
            />
          </span>
          <div>
            <div className="text-[17px] font-semibold tracking-tight">{contact.name}</div>
            <div className="text-sm text-muted-foreground">{contact.phone}</div>
            <div className="text-xs text-muted-foreground">
              {contact.city} · since {contact.since}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {contact.tags.map((t) => (
            <Badge key={t} variant="brand">
              <TagIcon /> {t}
            </Badge>
          ))}
          <button
            type="button"
            className="rounded-[7px] bg-muted px-2 py-[3px] text-[11px] font-medium text-muted-foreground"
          >
            + Add tag
          </button>
        </div>

        <div className="flex gap-2">
          <Button variant="primary" size="sm" className="flex-1 justify-center" onClick={() => navigate('/inbox')}>
            <MessageSquare /> Message
          </Button>
          <Button size="sm" className="flex-1 justify-center">
            Add to campaign
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <div className="rounded-[10px] border border-border bg-card-soft px-3 py-2.5 text-center">
            <div className="text-xs text-muted-foreground">Lifetime</div>
            <div className="num mt-[3px] text-[15px] font-semibold">{contact.ltv}</div>
          </div>
          <div className="rounded-[10px] border border-border bg-card-soft px-3 py-2.5 text-center">
            <div className="text-xs text-muted-foreground">Orders</div>
            <div className="num mt-[3px] text-[15px] font-semibold">{contact.orders}</div>
          </div>
          <div className="rounded-[10px] border border-border bg-card-soft px-3 py-2.5 text-center">
            <div className="text-xs text-muted-foreground">Stage</div>
            <div className="mt-[5px] text-[13px] font-semibold">{contact.stage}</div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 rounded-xl border border-primary-soft-border bg-gradient-to-br from-[#F4F0FE] to-[#F0F4FE] px-3.5 py-3.5">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 stroke-[1.7px] text-primary" />
            <span className="text-[10.5px] font-semibold tracking-[0.09em] text-primary">AI INSIGHT</span>
          </div>
          <div className="text-[12.8px] leading-relaxed">{contact.insight}</div>
          <Button size="sm" className="w-fit bg-white">
            Act on this
          </Button>
        </div>

        <div>
          <div className="mb-2.5 text-[10.5px] font-semibold tracking-wide text-muted-foreground-3">
            ACTIVITY TIMELINE
          </div>
          <div className="flex flex-col">
            {contactTimeline.map((event, i) => (
              <div key={i} className="flex gap-3 border-t border-border-soft py-3.5 first:border-t-0">
                <span className="flex w-2 shrink-0 flex-col items-center">
                  <i className="mt-1 size-2 shrink-0 rounded-full" style={{ background: event.color }} />
                  {i < contactTimeline.length - 1 && <span className="mt-1 w-px flex-1 bg-border" />}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9.5px] font-bold tracking-wide" style={{ color: event.color }}>
                      {event.kind}
                    </span>
                    <span className="text-[11px] text-muted-foreground-3">{event.time}</span>
                  </div>
                  <div className="mt-[3px] text-[12.7px] leading-relaxed">{event.title}</div>
                  {event.detail && <div className="mt-0.5 text-[11px] text-muted-foreground-3">{event.detail}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
