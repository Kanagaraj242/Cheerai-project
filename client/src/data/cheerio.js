export const CH = {
  WhatsApp: 'var(--wa)',
  Instagram: 'var(--ig)',
  Email: 'var(--em)',
  SMS: 'var(--sm)',
  Messenger: 'var(--ms)',
}

export const CONV = [
  {
    n: 'Rahul Sharma', ini: 'RS', ch: 'WhatsApp', t: '10:32', unread: 2, ai: 'handling', sess: 'open', mins: 1274,
    p: 'Perfect, thanks! That was quick.', tags: ['VIP', 'Repeat'], phone: '+91 98765 43210', city: 'Bengaluru',
    stage: 'Customer', ltv: '₹18,760', orders: 7, since: 'Jan 2024',
    msgs: [
      ['them', 'Hi, I want to check the status of my order', '10:30'],
      ['us', 'Hi Rahul — happy to help. Could you share the order ID?', '10:30', 'Support Agent'],
      ['them', 'My order ID is #12345', '10:31'],
      ['us', "Order #12345 shipped on 14 May and is due to arrive 18 May. Here's your tracking link.", '10:31', 'Support Agent'],
      ['them', 'Perfect, thanks! That was quick.', '10:32'],
    ],
    sum: 'Order-status query on #12345. Support Agent confirmed shipment and shared tracking. Customer satisfied; no action needed.',
    sug: "Glad that helped, Rahul! I'll ping you again once it's out for delivery. Anything else I can check?",
    src: ['Shopify · Order #12345', 'Delhivery tracking', 'Shipping policy'],
    acts: [['Looked up order', 'Shopify · #12345 · 10:31'], ['Fetched tracking', 'Delhivery AWB 4471223 · 10:31'], ['Resolved without escalation', 'confidence 0.94']],
    insight: 'Buys every 6–8 weeks. Last order was 9 weeks ago — good candidate for the replenishment flow.',
  },
  {
    n: 'Priya Mehta', ini: 'PM', ch: 'Instagram', t: '10:28', unread: 1, ai: 'waiting', sess: 'na',
    p: 'Do you have this product in black?', tags: ['New lead'], phone: '@priya.mehta', city: 'Mumbai',
    stage: 'Lead', ltv: '—', orders: 0, since: 'Apr 2025',
    msgs: [['them', 'Saw your reel — do you have this product in black?', '10:28']],
    sum: 'Product availability question from an Instagram reel. Stock check needed before replying.',
    sug: 'Hi Priya! Yes — the black colourway is back in stock. Want me to send you the link?',
    src: ['Shopify · Catalog'],
    acts: [['Matched product', 'Yoga Mat Pro · 2 variants · 10:28'], ['Paused for a human', 'holding stock needs approval']],
    insight: 'First contact, arrived from a paid Meta ad. High intent language — route to Sales Agent.',
  },
  {
    n: 'Amit Verma', ini: 'AV', ch: 'Email', t: '10:22', unread: 3, ai: 'escalated', sess: 'na',
    p: 'I need help with the refund process', tags: ['Refund'], phone: 'amit.verma@gmail.com', city: 'New Delhi',
    stage: 'Customer', ltv: '₹9,240', orders: 3, since: 'Nov 2024',
    msgs: [
      ['them', 'I need help with the refund process for my last order.', '10:20'],
      ['us', 'I can help with that. Could you confirm the order number?', '10:22', 'Support Agent'],
      ['them', "It's #12088, ordered 2 May. The amount was ₹6,400.", '10:22'],
    ],
    sum: 'Refund request on order #12088 for ₹6,400. Above the ₹5,000 auto-approval threshold, so escalated to a human.',
    sug: "Thanks Amit. ₹6,400 is above what I can approve automatically, so I've passed this to Sneha — she'll confirm within the hour.",
    src: ['Refund policy', 'Shopify · Order #12088'],
    acts: [['Read refund policy', '14-day window · order qualifies'], ['Escalated to human', 'amount over ₹5,000 · 10:22']],
    insight: 'Second refund in 90 days. Retention Agent flags churn risk — consider a goodwill credit.',
  },
  {
    n: 'Sneha Iyer', ini: 'SI', ch: 'WhatsApp', t: '10:15', unread: 1, ai: 'handling', sess: 'closing', mins: 41,
    p: 'Can I reschedule my appointment?', tags: ['VIP', 'High value'], phone: '+91 99887 76655', city: 'Chennai',
    stage: 'Customer', ltv: '₹42,110', orders: 14, since: 'Jan 2023',
    msgs: [
      ['them', 'Can I reschedule my appointment?', '10:14'],
      ['us', 'Of course. I have Thursday 4pm or Friday 11am open — which suits you?', '10:15', 'Support Agent'],
    ],
    sum: 'Reschedule request. Agent offered two slots from the booking calendar. Session window closes in 41 minutes.',
    sug: 'No rush, Sneha — Thursday 4pm and Friday 11am are both still free. Just reply with either one.',
    src: ['Calendly · Booking calendar'],
    acts: [['Checked calendar', '3 slots open this week · 10:15'], ['Session warning', '41 min left before a template is required']],
    insight: 'Highest-LTV contact in this view. Never let this thread hit the 24-hour window.',
  },
  {
    n: 'Vikram Singh', ini: 'VS', ch: 'Messenger', t: '09:58', unread: 0, ai: 'resolved', sess: 'na',
    p: 'Thanks! It worked.', tags: [], phone: 'Messenger', city: 'Pune',
    stage: 'Customer', ltv: '₹3,120', orders: 1, since: 'Mar 2025',
    msgs: [
      ['them', 'App keeps logging me out', '09:52'],
      ['us', 'Try clearing the app cache — Settings › Storage › Clear cache, then sign in again.', '09:54', 'Support Agent'],
      ['them', 'Thanks! It worked.', '09:58'],
    ],
    sum: 'Login issue resolved with a cache-clear step from the help centre. Closed.',
    sug: "Great to hear! I'll leave this closed — reopen any time if it comes back.",
    src: ['Help centre · Login issues'],
    acts: [['Matched help article', 'Login issues · confidence 0.88'], ['Resolved without escalation', '']],
    insight: 'First purchase 3 weeks ago. Good candidate for the onboarding nurture sequence.',
  },
  {
    n: 'Ananya Pillai', ini: 'AP', ch: 'WhatsApp', t: '09:50', unread: 2, ai: 'handling', sess: 'open', mins: 380,
    p: 'Where is my shipment?', tags: ['Repeat'], phone: '+91 77665 44332', city: 'Kochi',
    stage: 'Customer', ltv: '₹14,890', orders: 5, since: 'Aug 2024',
    msgs: [
      ['them', 'Where is my shipment?', '09:49'],
      ['us', 'It left the Pune warehouse this morning and is due Thursday.', '09:50', 'Support Agent'],
    ],
    sum: 'Shipment tracking question answered from courier data. Awaiting acknowledgement.',
    sug: "You're all set — I'll message you the moment it's out for delivery.",
    src: ['Delhivery tracking'],
    acts: [['Looked up tracking', 'AWB 8890114 · in transit · 09:50']],
    insight: 'Opens every WhatsApp message within 5 minutes. Strong channel fit.',
  },
  {
    n: 'Raj Patel', ini: 'RP', ch: 'WhatsApp', t: 'Yesterday', unread: 1, ai: 'blocked', sess: 'closed',
    p: "I haven't received my invoice", tags: ['Follow up'], phone: '+91 77331 22345', city: 'Ahmedabad',
    stage: 'Lead', ltv: '—', orders: 0, since: 'Apr 2025',
    msgs: [['them', "I haven't received my invoice", 'Yesterday 09:10']],
    sum: 'Invoice request. The 24-hour window has closed, so only an approved template can be sent.',
    sug: 'Hi Raj — sending your invoice for order #12088 across now. Let me know if anything looks off.',
    src: ['Billing · Invoice #12088'],
    acts: [['Found invoice', 'order #12088'], ['Blocked', 'window closed · needs template invoice_resend_v1']],
    insight: 'Window closed 3 hours ago. A paid template costs ₹0.72 — approve or let it lapse.',
  },
]

export const CAMPS = [
  { n: 'Monsoon Refresh Offer', sub: 'Promotional', ch: 'WhatsApp', st: 'Running', aud: 'VIP + Repeat buyers', size: 12456, sent: 12456, del: 12269, read: 8104, clk: 2531, cvr: 568, rev: '₹8,42,300', spend: '₹8,968', cpa: '₹15.79', sched: 'Started 28 Aug, 10:30', tpl: 'monsoon_offer_v2', ai: true },
  { n: 'Abandoned Cart Recovery', sub: 'Transactional', ch: 'WhatsApp', st: 'Running', aud: 'Cart abandoners · 2h', size: 8932, sent: 8932, del: 8735, read: 4718, clk: 1746, cvr: 412, rev: '₹5,18,400', spend: '₹6,431', cpa: '₹15.61', sched: 'Always on since 1 Jun', tpl: 'cart_recover_v3', ai: true },
  { n: 'Festive Preview — Instagram', sub: 'Promotional', ch: 'Instagram', st: 'Completed', aud: 'All customers', size: 15230, sent: 15230, del: 14804, read: 8807, clk: 2985, cvr: 729, rev: '₹9,91,700', spend: '₹0', cpa: '₹0.00', sched: 'Ended 22 Aug', tpl: '—', ai: false },
  { n: 'New Arrivals Newsletter', sub: 'Promotional', ch: 'Email', st: 'Completed', aud: 'Newsletter list', size: 9856, sent: 9856, del: 9767, read: 6791, clk: 2178, cvr: 412, rev: '₹3,44,900', spend: '₹98', cpa: '₹0.24', sched: 'Ended 18 Aug', tpl: '—', ai: false },
  { n: 'Win-back · Lapsed 90 days', sub: 'Retention', ch: 'WhatsApp', st: 'Scheduled', aud: 'Lapsed 90d · 4,120', size: 4120, sent: 0, del: 0, read: 0, clk: 0, cvr: 0, rev: '—', spend: 'est ₹2,966', cpa: '—', sched: 'Starts 5 Sep, 09:00', tpl: 'winback_v4', ai: true },
  { n: 'Post-purchase Review Request', sub: 'Transactional', ch: 'SMS', st: 'Scheduled', aud: 'Delivered orders', size: 5432, sent: 0, del: 0, read: 0, clk: 0, cvr: 0, rev: '—', spend: 'est ₹1,086', cpa: '—', sched: 'Starts 3 Sep, 18:00', tpl: 'review_req_v1', ai: false },
  { n: 'VIP Early Access', sub: 'Promotional', ch: 'WhatsApp', st: 'Draft', aud: 'VIP tier · 2,345', size: 2345, sent: 0, del: 0, read: 0, clk: 0, cvr: 0, rev: '—', spend: 'est ₹1,688', cpa: '—', sched: 'Not scheduled', tpl: 'vip_early_v1', ai: true },
]

export const NODES = [
  { k: 'TRIGGER', t: 'Cart abandoned', s: 'Shopify · checkout not completed', c: 'br', ic: 'cart', cfg: [['Source', 'Shopify'], ['Event', 'Checkout abandoned'], ['Minimum cart value', '₹1,200']] },
  { k: 'CONDITION', t: 'Wait 2 hours, then check', s: 'Skip if the order completed in the meantime', c: 'wn', ic: 'clock', cfg: [['Delay', '2 hours'], ['Skip if', 'Order placed'], ['Skip if', 'Unsubscribed']] },
  { k: 'AI AGENT', t: 'Sales Agent writes the message', s: 'Personalised from cart contents and past orders', c: 'br', ic: 'robot', cfg: [['Agent', 'Sales Agent'], ['Tone', 'Warm, concise'], ['Must include', 'Cart items, discount if eligible']] },
  { k: 'CONNECTOR', t: 'WhatsApp Business', s: 'Template cart_recover_v3 · approved', c: 'ok', ic: 'plug', cfg: [['Connector', 'WhatsApp Business API'], ['Template', 'cart_recover_v3'], ['Cost', '₹0.72 per conversation']] },
  { k: 'ACTION', t: 'Send the message', s: 'Personalised WhatsApp message with cart link', c: 'ok', ic: 'send', cfg: [['Channel', 'WhatsApp'], ['Attach', 'Cart deep link'], ['Track', 'Click and conversion']] },
  { k: 'DELAY', t: 'Wait 24 hours', s: 'Give them time to come back', c: 'nt', ic: 'clock', cfg: [['Delay', '24 hours'], ['Business hours only', 'No']] },
  { k: 'FOLLOW-UP', t: 'Send SMS if still unpurchased', s: 'Falls back to SMS once the WhatsApp window closes', c: 'wn', ic: 'refresh', cfg: [['Channel', 'SMS'], ['Condition', 'No purchase yet'], ['Cost', '₹0.20 per message']] },
]

export const NCOL = {
  br: ['var(--br)', 'var(--brS)'],
  ok: ['var(--ok)', 'var(--okS)'],
  wn: ['var(--warn)', 'var(--warnS)'],
  nt: ['var(--ink3)', 'var(--ln2)'],
  dg: ['var(--dg)', 'var(--dgS)'],
}

export const CONNECTORS = [
  { n: 'Shopify', cat: 'E-commerce', bg: '#5A8E3E', ini: 'S', st: 'Connected', sync: '2 min ago', d: 'Orders, customers, products and checkout events sync both ways.', perms: ['Read orders', 'Read customers', 'Write tags'], flows: 6 },
  { n: 'WhatsApp Business', cat: 'Messaging', bg: '#1FA855', ini: 'W', st: 'Connected', sync: 'Live', d: 'Official Meta BSP connection. Sends templates and free-form session messages.', perms: ['Send messages', 'Manage templates', 'Read status'], flows: 11 },
  { n: 'Salesforce', cat: 'CRM', bg: '#2A8FD4', ini: 'SF', st: 'Connected', sync: '18 min ago', d: 'Two-way lead and opportunity sync with the Sales Agent.', perms: ['Read leads', 'Write opportunities'], flows: 4 },
  { n: 'HubSpot', cat: 'CRM', bg: '#EA6C3A', ini: 'H', st: 'Connected', sync: '1 hr ago', d: 'Contact properties and lifecycle stages mirror into Cheerio segments.', perms: ['Read contacts', 'Write properties'], flows: 3 },
  { n: 'Slack', cat: 'Internal', bg: '#4A154B', ini: 'SL', st: 'Connected', sync: 'Live', d: 'Escalation alerts and daily digests post into your team channels.', perms: ['Post messages'], flows: 5 },
  { n: 'Google Sheets', cat: 'Data', bg: '#1E8E5A', ini: 'G', st: 'Connected', sync: '6 hrs ago', d: 'Export segments and campaign results to a live sheet.', perms: ['Read sheets', 'Write rows'], flows: 2 },
  { n: 'Instagram', cat: 'Messaging', bg: '#D8306B', ini: 'IG', st: 'Action needed', sync: 'Token expires in 4 days', d: 'Direct messages and comment replies from your business account.', perms: ['Read messages', 'Send messages'], flows: 3 },
  { n: 'Razorpay', cat: 'Payments', bg: '#1E4CC4', ini: 'R', st: 'Connected', sync: '9 min ago', d: 'Payment links, refunds and settlement status inside workflows.', perms: ['Create links', 'Read payments'], flows: 2 },
  { n: 'Zendesk', cat: 'Support', bg: '#0B4B44', ini: 'Z', st: 'Not connected', sync: '—', d: 'Sync tickets so the Support Agent can answer from existing history.', perms: ['Read tickets', 'Write comments'], flows: 0 },
]

export const AGENTS = [
  { n: 'Sales Agent', role: 'Qualifies leads and books demos', bg: 'linear-gradient(135deg,#7C5CF0,#5B34E0)', ic: 'target', on: true, tasks: '8,412', rate: '31.4%', rateL: 'Lead → opportunity', hand: '6.2%', handL: 'Handed to human', skills: ['Lead qualification', 'Product Q&A', 'Demo booking', 'Price objections'], conn: ['Shopify', 'Salesforce', 'WhatsApp Business'], perf: [62, 68, 64, 74, 80, 77, 86, 91] },
  { n: 'Support Agent', role: 'Resolves customer issues across channels', bg: 'linear-gradient(135deg,#3BAE8C,#0E9F6E)', ic: 'head', on: true, tasks: '21,908', rate: '74.1%', rateL: 'Resolved unaided', hand: '25.9%', handL: 'Escalated', skills: ['Order status', 'Returns and refunds', 'Shipping', 'Troubleshooting'], conn: ['Shopify', 'WhatsApp Business', 'Slack'], perf: [58, 63, 69, 66, 72, 75, 74, 78] },
  { n: 'Retention Agent', role: 'Wins back lapsed and at-risk customers', bg: 'linear-gradient(135deg,#F0A03C,#D97B12)', ic: 'refresh', on: false, tasks: '3,146', rate: '18.9%', rateL: 'Win-back rate', hand: '2.1%', handL: 'Handed to human', skills: ['Churn scoring', 'Win-back offers', 'Replenishment nudges'], conn: ['Shopify', 'HubSpot', 'WhatsApp Business'], perf: [40, 44, 42, 49, 52, 48, 55, 58] },
]

export const ACTIVITY = [
  { c: 'var(--ok)', t: 'Sales Agent qualified <b>Priya Mehta</b> as high intent', m: 'Routed to sales queue · 2 min ago' },
  { c: 'var(--br)', t: 'Workflow <b>Abandoned Cart Recovery</b> ran 214 times', m: '₹1,84,200 recovered today · 11 min ago' },
  { c: 'var(--warn)', t: '<b>Instagram</b> token expires in 4 days', m: 'Reconnect to avoid dropped messages · 26 min ago' },
  { c: 'var(--ok)', t: '<b>Monsoon Refresh Offer</b> passed 8,000 reads', m: '65.1% read rate · 1 hr ago' },
  { c: 'var(--dg)', t: 'Template <b>winback_v4</b> rejected by Meta', m: 'Policy: promotional content in utility category · 2 hrs ago' },
  { c: 'var(--br)', t: 'Support Agent resolved 412 conversations', m: '74% without a human · 3 hrs ago' },
  { c: 'var(--ok)', t: '<b>Razorpay</b> connector synced', m: '1,204 payments reconciled · 4 hrs ago' },
]

export const RECS = [
  { icon: 'spark', t: 'Move 3 WhatsApp sends into the free session window', d: 'Roughly 1,840 messages a week currently go out as paid templates within 60 minutes of a customer reply. Reordering two workflow steps would make them free.', action: 'Save ~₹1,320/wk' },
  { icon: 'target', t: 'Retention Agent is switched off while churn is rising', d: '412 customers crossed 90 days inactive this month, up 18%. The agent already has a tested win-back flow ready to run.', action: 'Turn on agent' },
  { icon: 'warn', t: 'Instagram connector expires in 4 days', d: 'Three live workflows depend on it. If the token lapses, Instagram DMs will queue but not send.', action: 'Reconnect' },
  { icon: 'cart', t: 'Cart recovery converts best at 90 minutes, not 2 hours', d: 'Across 8,932 runs, the 90-minute cohort converted 4.8% versus 3.1% at two hours.', action: 'Adjust delay' },
]

export const SEGS = ['All', 'Customers', 'Leads', 'VIP', 'At risk', 'Unsubscribed']
export const CONN_CATS = ['All', 'Messaging', 'E-commerce', 'CRM', 'Payments', 'Data', 'Support', 'Internal']

export const SECTIONS = [
  { key: 'dashboard', label: 'Dashboard', path: '/dashboard', title: ['Dashboard', 'Overview of your automation'] },
  { key: 'inbox', label: 'Inbox', path: '/inbox', count: 14, title: ['Inbox', 'Every channel in one queue'] },
  { key: 'contacts', label: 'Contacts', path: '/contacts', title: ['Contacts', '32,680 customers and leads'] },
  { key: 'campaigns', label: 'Campaigns', path: '/campaigns', title: ['Campaigns', 'Reach, engagement and revenue'] },
  { key: 'workflows', label: 'Workflows', path: '/workflows', group: 'AUTOMATION', title: ['Workflow Builder', 'Describe it — Cheerio builds it'] },
  { key: 'autoflow', label: 'Auto Flow', path: '/auto-flow', group: 'AUTOMATION', title: ['Auto Flow', 'Drag the logic together, step by step'] },
  { key: 'connectors', label: 'Connectors & Agents', path: '/connectors', group: 'AUTOMATION', title: ['Connectors & AI Agents', 'What Cheerio is plugged into'] },
]
