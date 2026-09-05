import type { ActivityItem, ContactTimelineEvent, Recommendation } from '@/types'

export const activityFeed: ActivityItem[] = [
  {
    id: 0,
    tone: 'success',
    html: 'Sales Agent qualified <b>Priya Mehta</b> as high intent',
    meta: 'Routed to sales queue · 2 min ago',
  },
  {
    id: 1,
    tone: 'brand',
    html: 'Workflow <b>Abandoned Cart Recovery</b> ran 214 times',
    meta: '₹1,84,200 recovered today · 11 min ago',
  },
  {
    id: 2,
    tone: 'warning',
    html: '<b>Instagram</b> token expires in 4 days',
    meta: 'Reconnect to avoid dropped messages · 26 min ago',
  },
  {
    id: 3,
    tone: 'success',
    html: '<b>Monsoon Refresh Offer</b> passed 8,000 reads',
    meta: '65.1% read rate · 1 hr ago',
  },
  {
    id: 4,
    tone: 'destructive',
    html: 'Template <b>winback_v4</b> rejected by Meta',
    meta: 'Policy: promotional content in utility category · 2 hrs ago',
  },
  {
    id: 5,
    tone: 'brand',
    html: 'Support Agent resolved 412 conversations',
    meta: '74% without a human · 3 hrs ago',
  },
  {
    id: 6,
    tone: 'success',
    html: '<b>Razorpay</b> connector synced',
    meta: '1,204 payments reconciled · 4 hrs ago',
  },
]

export const recommendations: Recommendation[] = [
  {
    id: 0,
    icon: 'spark',
    title: 'Move 3 WhatsApp sends into the free session window',
    description:
      'Roughly 1,840 messages a week currently go out as paid templates within 60 minutes of a customer reply. Reordering two workflow steps would make them free.',
    actionLabel: 'Save ~₹1,320/wk',
  },
  {
    id: 1,
    icon: 'target',
    title: 'Retention Agent is switched off while churn is rising',
    description:
      '412 customers crossed 90 days inactive this month, up 18%. The agent already has a tested win-back flow ready to run.',
    actionLabel: 'Turn on agent',
  },
  {
    id: 2,
    icon: 'warn',
    title: 'Instagram connector expires in 4 days',
    description: 'Three live workflows depend on it. If the token lapses, Instagram DMs will queue but not send.',
    actionLabel: 'Reconnect',
  },
  {
    id: 3,
    icon: 'cart',
    title: 'Cart recovery converts best at 90 minutes, not 2 hours',
    description: 'Across 8,932 runs, the 90-minute cohort converted 4.8% versus 3.1% at two hours.',
    actionLabel: 'Adjust delay',
  },
]

export const campaignPerformanceWeeks = ['Jul 7', 'Jul 14', 'Jul 21', 'Jul 28', 'Aug 4', 'Aug 11', 'Aug 18', 'Aug 25']
const reach = [38, 44, 41, 52, 58, 55, 66, 74]
const converted = [9, 12, 10, 15, 18, 16, 21, 26]
export const campaignPerformanceData = campaignPerformanceWeeks.map((week, i) => ({
  week,
  reach: reach[i] - converted[i],
  converted: converted[i],
}))

export const revenueSpark = [41, 48, 44, 56, 52, 63, 69, 66, 74, 71, 83, 92]

export const contactTimeline: ContactTimelineEvent[] = [
  {
    kind: 'AGENT',
    color: 'var(--primary)',
    title: 'Support Agent replied about order status',
    detail: 'Cited 3 sources · not escalated',
    time: 'Today 10:31',
  },
  {
    kind: 'PERSON',
    color: 'var(--muted-foreground)',
    title: 'Sneha Iyer added a note',
    detail: '"Prefers WhatsApp for everything"',
    time: 'Today 10:28',
  },
  {
    kind: 'ORDER',
    color: 'var(--success)',
    title: 'Order #12345 placed',
    detail: '₹2,499 · paid via Razorpay',
    time: '14 May',
  },
  {
    kind: 'WORKFLOW',
    color: 'var(--info)',
    title: 'Order confirmation sent',
    detail: 'Template order_conf_v2 · ₹0.72',
    time: '14 May',
  },
  {
    kind: 'AGENT',
    color: 'var(--primary)',
    title: 'Sales Agent scored intent 0.84',
    detail: 'Routed to the sales queue',
    time: '12 May',
  },
  {
    kind: 'CAMPAIGN',
    color: 'var(--warning)',
    title: 'Monsoon Refresh Offer delivered',
    detail: 'Read, not clicked',
    time: '8 May',
  },
  {
    kind: 'PERSON',
    color: 'var(--muted-foreground)',
    title: 'Tagged VIP by Arjun Kumar',
    time: '2 May',
  },
]
