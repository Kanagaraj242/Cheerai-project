export const CH = {
  WhatsApp: 'var(--wa)',
  Instagram: 'var(--ig)',
  Email: 'var(--em)',
  SMS: 'var(--sm)',
  Messenger: 'var(--ms)',
}

export const CAMPS = [
  { n: 'Monsoon Refresh Offer', sub: 'Promotional', ch: 'WhatsApp', st: 'Running', aud: 'VIP + Repeat buyers', size: 12456, sent: 12456, del: 12269, read: 8104, clk: 2531, cvr: 568, rev: '₹8,42,300', spend: '₹8,968', cpa: '₹15.79', sched: 'Started 28 Aug, 10:30', tpl: 'monsoon_offer_v2', ai: true },
  { n: 'Abandoned Cart Recovery', sub: 'Transactional', ch: 'WhatsApp', st: 'Running', aud: 'Cart abandoners · 2h', size: 8932, sent: 8932, del: 8735, read: 4718, clk: 1746, cvr: 412, rev: '₹5,18,400', spend: '₹6,431', cpa: '₹15.61', sched: 'Always on since 1 Jun', tpl: 'cart_recover_v3', ai: true },
  { n: 'Festive Preview — Instagram', sub: 'Promotional', ch: 'Instagram', st: 'Completed', aud: 'All customers', size: 15230, sent: 15230, del: 14804, read: 8807, clk: 2985, cvr: 729, rev: '₹9,91,700', spend: '₹0', cpa: '₹0.00', sched: 'Ended 22 Aug', tpl: '—', ai: false },
  { n: 'New Arrivals Newsletter', sub: 'Promotional', ch: 'Email', st: 'Completed', aud: 'Newsletter list', size: 9856, sent: 9856, del: 9767, read: 6791, clk: 2178, cvr: 412, rev: '₹3,44,900', spend: '₹98', cpa: '₹0.24', sched: 'Ended 18 Aug', tpl: '—', ai: false },
  { n: 'Win-back · Lapsed 90 days', sub: 'Retention', ch: 'WhatsApp', st: 'Scheduled', aud: 'Lapsed 90d · 4,120', size: 4120, sent: 0, del: 0, read: 0, clk: 0, cvr: 0, rev: '—', spend: 'est ₹2,966', cpa: '—', sched: 'Starts 5 Sep, 09:00', tpl: 'winback_v4', ai: true },
  { n: 'Post-purchase Review Request', sub: 'Transactional', ch: 'SMS', st: 'Scheduled', aud: 'Delivered orders', size: 5432, sent: 0, del: 0, read: 0, clk: 0, cvr: 0, rev: '—', spend: 'est ₹1,086', cpa: '—', sched: 'Starts 3 Sep, 18:00', tpl: 'review_req_v1', ai: false },
  { n: 'VIP Early Access', sub: 'Promotional', ch: 'WhatsApp', st: 'Draft', aud: 'VIP tier · 2,345', size: 2345, sent: 0, del: 0, read: 0, clk: 0, cvr: 0, rev: '—', spend: 'est ₹1,688', cpa: '—', sched: 'Not scheduled', tpl: 'vip_early_v1', ai: true },
]

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
  { key: 'inbox', label: 'Team Inbox', path: '/inbox', title: ['Team Inbox', 'Every customer conversation your team owns'] },
  { key: 'contacts', label: 'Contacts', path: '/contacts', title: ['Contacts', '32,680 customers and leads'] },
  { key: 'campaigns', label: 'Campaigns', path: '/campaigns', title: ['Campaigns', 'Reach, engagement and revenue'] },
  { key: 'workflows', label: 'Workflows', path: '/workflows', group: 'AUTOMATION', title: ['Workflow Builder', 'Drag, drop and connect your automation'] },
  { key: 'connectors', label: 'Connectors & Agents', path: '/connectors', group: 'AUTOMATION', title: ['Connectors & AI Agents', 'What Cheerio is plugged into'] },
]
