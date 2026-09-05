import { Filter, Plus } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardFooter } from '@/components/ui/card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { conversations } from '@/data/conversations'
import { CHANNEL_COLOR } from '@/types'
import { CONTACT_SEGMENTS, useContactsStore } from '@/stores/contacts-store'
import { cn } from '@/lib/utils'

import { SessionBadge } from '@/pages/Inbox/components/status-badges'

export function ContactsTable() {
  const segment = useContactsStore((s) => s.segment)
  const setSegment = useContactsStore((s) => s.setSegment)
  const selectedId = useContactsStore((s) => s.selectedId)
  const selectContact = useContactsStore((s) => s.selectContact)

  const filtered = conversations.filter((c) => {
    if (segment === 'All') return true
    if (segment === 'Customers') return c.stage === 'Customer'
    if (segment === 'Leads') return c.stage === 'Lead'
    if (segment === 'VIP') return c.tags.includes('VIP')
    if (segment === 'At risk') return c.tags.includes('Refund') || c.tags.includes('Follow up')
    return false
  })

  return (
    <Card>
      <CardHeader className="flex-wrap gap-2.5">
        <Tabs value={segment} onValueChange={(v) => setSegment(v as typeof segment)}>
          <TabsList>
            {CONTACT_SEGMENTS.map((s) => (
              <TabsTrigger key={s} value={s}>
                {s}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex-1" />
        <span className="inline-flex items-center gap-1.5 rounded-[9px] border border-border px-[11px] py-1.5 text-xs text-muted-foreground-2">
          <Filter className="size-3.5 stroke-2" /> Filters
        </span>
        <Button size="sm">Import</Button>
        <Button variant="primary" size="sm">
          <Plus /> Add contact
        </Button>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contact</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Lifetime value</TableHead>
            <TableHead>Session</TableHead>
            <TableHead>Last activity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((c) => (
            <TableRow
              key={c.id}
              onClick={() => selectContact(c.id)}
              className={cn('cursor-pointer', c.id === selectedId && 'bg-primary-soft hover:bg-primary-soft')}
            >
              <TableCell>
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
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="mt-0.5 text-[11.5px] text-muted-foreground">{c.phone}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={c.stage === 'Customer' ? 'success' : 'info'}>{c.stage}</Badge>
              </TableCell>
              <TableCell>
                {c.tags.length ? (
                  <div className="flex flex-wrap gap-1">
                    {c.tags.map((t) => (
                      <Badge key={t} variant="neutral">
                        {t}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell className="num">{c.orders}</TableCell>
              <TableCell className="num font-medium">{c.ltv}</TableCell>
              <TableCell>
                <SessionBadge conversation={c} />
              </TableCell>
              <TableCell className="text-muted-foreground">{c.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CardFooter>
        <span className="text-sm text-muted-foreground">Showing {filtered.length} of 32,680 contacts</span>
        <div className="flex gap-1.5">
          <Button size="sm">Previous</Button>
          <Button size="sm">Next</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
