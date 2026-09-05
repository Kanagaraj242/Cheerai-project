import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CHANNEL_COLOR } from '@/types'
import { useInboxStore } from '@/stores/inbox-store'
import { cn } from '@/lib/utils'

export function InspectorPanel() {
  const conversation = useInboxStore((s) => s.conversations.find((c) => c.id === s.selectedId)!)
  const tab = useInboxStore((s) => s.tab)
  const setTab = useInboxStore((s) => s.setTab)
  const insertSuggestedReply = useInboxStore((s) => s.insertSuggestedReply)

  return (
    <aside className="flex w-[340px] shrink-0 flex-col overflow-y-auto border-l border-border bg-card">
      <div className="flex gap-0.5 border-b border-border px-3.5">
        <button
          type="button"
          onClick={() => setTab('copilot')}
          className={cn(
            'border-b-2 border-transparent px-3 py-3.5 pb-[11px] text-[12.5px] font-medium text-muted-foreground',
            tab === 'copilot' && 'border-primary font-semibold text-primary',
          )}
        >
          AI Copilot
        </button>
        <button
          type="button"
          onClick={() => setTab('details')}
          className={cn(
            'border-b-2 border-transparent px-3 py-3.5 pb-[11px] text-[12.5px] font-medium text-muted-foreground',
            tab === 'details' && 'border-primary font-semibold text-primary',
          )}
        >
          Details
        </button>
      </div>

      {tab === 'copilot' ? (
        <div className="flex flex-col gap-4 px-[18px] py-4">
          <div>
            <div className="mb-2 text-[10.5px] font-semibold tracking-wide text-muted-foreground-3">
              CONVERSATION SUMMARY
            </div>
            <div className="rounded-[10px] border border-border bg-card-soft px-3.5 py-2.5 text-[12.5px] leading-relaxed">
              {conversation.summary}
              <div className="mt-2.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>Generated just now</span>
                <span>Helpful? ↑ ↓</span>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 text-[10.5px] font-semibold tracking-wide text-muted-foreground-3">
              SUGGESTED REPLY
            </div>
            <div className="flex flex-col gap-2.5 rounded-xl border border-primary-soft-border bg-gradient-to-br from-[#F4F0FE] to-[#F0F4FE] px-3.5 py-3.5">
              <div className="text-[12.8px] leading-relaxed">{conversation.suggestedReply}</div>
              <div className="flex flex-wrap gap-1.5">
                {conversation.sources.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-primary-soft-border bg-white/90 px-2 py-[3px] text-[10.5px] font-semibold text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="primary" size="sm" onClick={insertSuggestedReply}>
                  Insert into reply
                </Button>
                <Button size="sm" onClick={insertSuggestedReply}>
                  Edit
                </Button>
                <div className="flex-1" />
                <span className="text-xs text-primary">Never auto-sends</span>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 text-[10.5px] font-semibold tracking-wide text-muted-foreground-3">
              WHAT THE AGENT DID
            </div>
            <div className="flex flex-col">
              {conversation.actions.map((a, i) => (
                <div key={i} className="flex gap-3 border-t border-border-soft py-3.5 first:border-t-0">
                  <span className="flex w-2 shrink-0 flex-col items-center">
                    <i className="mt-1 size-2 rounded-full bg-primary" />
                  </span>
                  <div>
                    <div className="text-[12.7px] leading-relaxed">{a.label}</div>
                    {a.detail && <div className="mt-0.5 text-[11px] text-muted-foreground-3">{a.detail}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-[10.5px] font-semibold tracking-wide text-muted-foreground-3">AI INSIGHT</div>
            <div className="rounded-[10px] border border-border bg-card-soft px-3.5 py-2.5 text-[12.5px] leading-relaxed">
              {conversation.insight}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-[18px] py-4">
          <div className="flex items-center gap-3">
            <span className="relative shrink-0">
              <Avatar className="size-11 text-sm">
                <AvatarFallback>{conversation.initials}</AvatarFallback>
              </Avatar>
              <i
                className="absolute -right-0.5 -bottom-0.5 size-[13px] rounded-full border-2 border-card"
                style={{ background: CHANNEL_COLOR[conversation.channel] }}
              />
            </span>
            <div>
              <div className="text-[15px] font-semibold">{conversation.name}</div>
              <div className="text-xs text-muted-foreground">
                {conversation.phone} · {conversation.city}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {conversation.tags.map((t) => (
              <Badge key={t} variant="brand">
                {t}
              </Badge>
            ))}
          </div>

          <KvSection
            title="CONTACT"
            rows={[
              ['Lifecycle stage', conversation.stage],
              ['Lifetime value', conversation.ltv],
              ['Orders', String(conversation.orders)],
              ['Customer since', conversation.since],
            ]}
          />
          <KvSection
            title="CONVERSATION"
            rows={[
              ['Channel', conversation.channel],
              ['Handled by', conversation.aiStatus === 'escalated' ? 'Sneha Iyer' : 'Support Agent'],
              ['Priority', conversation.aiStatus === 'escalated' ? 'High' : 'Medium'],
            ]}
          />

          <Button className="justify-center">View full profile</Button>
        </div>
      )}
    </aside>
  )
}

function KvSection({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <div>
      <div className="mb-1.5 text-[10.5px] font-semibold tracking-wide text-muted-foreground-3">{title}</div>
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-center justify-between gap-3 py-1.5 text-[12.5px]">
          <span className="text-muted-foreground">{k}</span>
          <span className="text-right font-medium">{v}</span>
        </div>
      ))}
    </div>
  )
}
