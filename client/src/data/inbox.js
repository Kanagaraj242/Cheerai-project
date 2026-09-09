/* ------------------------------------------------------------------
   Team Inbox data — statuses, team members, saved replies, templates
   and the seeded conversation list.
   ------------------------------------------------------------------ */

export const STATUSES = [
  { id: 'unresolved', label: 'Unresolved', tone: 't-dg', dot: 'var(--dg)', hint: 'Waiting on us' },
  { id: 'pending', label: 'Pending', tone: 't-wn', dot: 'var(--warn)', hint: 'Waiting on the customer' },
  { id: 'followup', label: 'Follow-up', tone: 't-in', dot: 'var(--info)', hint: 'Revisit later' },
  { id: 'resolved', label: 'Resolved', tone: 't-ok', dot: 'var(--ok)', hint: 'Closed' },
]

export const statusOf = (id) => STATUSES.find((s) => s.id === id) ?? STATUSES[0]

export const TEAM = [
  { id: 'ak', n: 'Arjun Kumar', ini: 'AK', role: 'Admin', bg: 'linear-gradient(135deg,#8A6BF5,#5B34E0)', online: true },
  { id: 'si', n: 'Sneha Iyer', ini: 'SI', role: 'Team lead', bg: 'linear-gradient(135deg,#3BAE8C,#0E9F6E)', online: true },
  { id: 'pn', n: 'Priya Nair', ini: 'PN', role: 'Support agent', bg: 'linear-gradient(135deg,#F0A03C,#D97B12)', online: true },
  { id: 'rd', n: 'Rohit Desai', ini: 'RD', role: 'Support agent', bg: 'linear-gradient(135deg,#4C8DF6,#2563EB)', online: false },
  { id: 'km', n: 'Kavya Menon', ini: 'KM', role: 'Billing', bg: 'linear-gradient(135deg,#E1608C,#D8306B)', online: false },
]

export const ME = TEAM[0]

export const memberOf = (id) => TEAM.find((m) => m.id === id) ?? null

export const LABELS = ['VIP', 'Repeat', 'New lead', 'Refund', 'Follow up', 'High value', 'Shipping', 'Billing']

export const SAVED_REPLY_CATS = ['All', 'Orders', 'Shipping', 'Refunds', 'Greetings', 'Closing']

export const SAVED_REPLIES = [
  {
    id: 'sr1', short: '/order-status', title: 'Order status', cat: 'Orders', used: 412,
    body: 'Hi {{name}}, thanks for waiting. Your order {{order_id}} has shipped and is due to arrive by {{eta}}. You can follow it live here: {{tracking_link}}',
  },
  {
    id: 'sr2', short: '/delay', title: 'Shipping delay apology', cat: 'Shipping', used: 188,
    body: 'Hi {{name}}, apologies — your order is running about 2 days behind because of a courier delay in {{city}}. It is moving again and I will message you the moment it is out for delivery.',
  },
  {
    id: 'sr3', short: '/refund-steps', title: 'Refund process', cat: 'Refunds', used: 265,
    body: 'Happy to help with the refund. Once the item reaches our warehouse the amount is returned to the original payment method within 5-7 working days. I have started the pickup request for {{order_id}}.',
  },
  {
    id: 'sr4', short: '/hi', title: 'Warm greeting', cat: 'Greetings', used: 903,
    body: 'Hi {{name}}! Thanks for reaching out to Cheerio. How can I help you today?',
  },
  {
    id: 'sr5', short: '/hold', title: 'Asking for a minute', cat: 'Greetings', used: 621,
    body: 'Thanks for that, give me a minute while I pull up your account details.',
  },
  {
    id: 'sr6', short: '/close', title: 'Closing the chat', cat: 'Closing', used: 774,
    body: 'Glad that is sorted, {{name}}! I will close this chat for now — just reply here any time and it reopens straight to me.',
  },
  {
    id: 'sr7', short: '/address', title: 'Confirm delivery address', cat: 'Shipping', used: 156,
    body: 'Could you confirm the delivery address and pin code so I can update the courier before the next scan?',
  },
  {
    id: 'sr8', short: '/exchange', title: 'Size exchange', cat: 'Refunds', used: 97,
    body: 'We can exchange the size free of charge within 14 days. Tell me which size you would like and I will book the reverse pickup for {{order_id}}.',
  },
]

export const TEMPLATES = [
  {
    id: 'order_update_v3', name: 'Order update', cat: 'Utility', status: 'Approved', lang: 'en',
    body: 'Hi {{1}}, your order {{2}} is out for delivery and should reach you today. Tap below to track it live.',
    buttons: ['Track order'],
  },
  {
    id: 'invoice_resend_v1', name: 'Invoice resend', cat: 'Utility', status: 'Approved', lang: 'en',
    body: 'Hi {{1}}, here is the invoice for order {{2}}. Let us know if anything looks off and we will correct it.',
    buttons: ['Download invoice'],
  },
  {
    id: 'reopen_chat_v2', name: 'Re-open conversation', cat: 'Utility', status: 'Approved', lang: 'en',
    body: 'Hi {{1}}, we could not reach you earlier about your query. Reply here and our team will pick it straight up.',
    buttons: ['Reply now'],
  },
  {
    id: 'monsoon_offer_v2', name: 'Monsoon offer', cat: 'Marketing', status: 'Approved', lang: 'en',
    body: 'Hi {{1}}, the monsoon sale is live — 25% off everything until Sunday. Your cart is still saved.',
    buttons: ['Shop now', 'Stop promotions'],
  },
  {
    id: 'winback_v4', name: 'Win-back 90 days', cat: 'Marketing', status: 'In review', lang: 'en',
    body: 'Hi {{1}}, it has been a while! Here is 15% off your next order with code WELCOME15.',
    buttons: ['Use code'],
  },
]

/* Message kinds: text | image | template | system */
const t = (from, text, at, extra = {}) => ({ from, kind: 'text', text, at, ...extra })

export const CONV = [
  {
    id: 'c1', n: 'Rahul Sharma', ini: 'RS', ch: 'WhatsApp', t: '10:32', unread: 2, ai: 'handling', sess: 'open', mins: 1274,
    p: 'Perfect, thanks! That was quick.', tags: ['VIP', 'Repeat'], phone: '+91 98765 43210', city: 'Bengaluru',
    stage: 'Customer', ltv: '₹18,760', orders: 7, since: 'Jan 2024', email: 'rahul.sharma@gmail.com',
    status: 'pending', assignee: 'pn', priority: 'Medium', firstSeen: '12 Jan 2024', lastOrder: '#12345 · 14 May',
    attrs: [
      { k: 'Preferred language', v: 'English' }, { k: 'Loyalty tier', v: 'Gold' },
      { k: 'Company', v: 'Zeta Retail' }, { k: 'Opt-in', v: 'Marketing + Utility' },
    ],
    msgs: [
      t('them', 'Hi, I want to check the status of my order', '10:30'),
      t('us', 'Hi Rahul — happy to help. Could you share the order ID?', '10:30', { author: 'Priya Nair', by: 'pn', state: 'read' }),
      t('them', 'My order ID is #12345', '10:31'),
      { from: 'us', kind: 'template', tpl: 'order_update_v3', at: '10:31', author: 'Priya Nair', by: 'pn', state: 'read',
        text: 'Hi Rahul, your order #12345 is out for delivery and should reach you today. Tap below to track it live.', buttons: ['Track order'] },
      t('them', 'Perfect, thanks! That was quick.', '10:32'),
    ],
    notes: [
      { by: 'si', text: 'Prefers WhatsApp over email for everything — do not switch channels on him.', at: 'Today 09:12' },
      { by: 'pn', text: 'Asked about bulk pricing last month. Worth a nudge from sales once this closes.', at: 'Yesterday 16:40' },
    ],
    history: [
      { title: 'Damaged packaging on #11902', at: '2 Apr', outcome: 'Resolved', agent: 'si', ch: 'WhatsApp', msgs: 14 },
      { title: 'Asked about bulk pricing', at: '18 Feb', outcome: 'Resolved', agent: 'pn', ch: 'WhatsApp', msgs: 9 },
      { title: 'Failed payment on checkout', at: '11 Jan', outcome: 'Resolved', agent: 'rd', ch: 'Email', msgs: 6 },
    ],
    sum: 'Order-status query on #12345. Priya confirmed shipment and shared tracking. Customer satisfied; no action needed.',
    sug: "Glad that helped, Rahul! I'll ping you again once it's out for delivery. Anything else I can check?",
    src: ['Shopify · Order #12345', 'Delhivery tracking', 'Shipping policy'],
    acts: [['Looked up order', 'Shopify · #12345 · 10:31'], ['Fetched tracking', 'Delhivery AWB 4471223 · 10:31'], ['Resolved without escalation', 'confidence 0.94']],
    insight: 'Buys every 6-8 weeks. Last order was 9 weeks ago — good candidate for the replenishment flow.',
  },
  {
    id: 'c2', n: 'Priya Mehta', ini: 'PM', ch: 'WhatsApp', t: '10:28', unread: 1, ai: 'waiting', sess: 'open', mins: 1420,
    p: 'Do you have this product in black?', tags: ['New lead'], phone: '+91 90045 11220', city: 'Mumbai',
    stage: 'Lead', ltv: '—', orders: 0, since: 'Apr 2025', email: 'priya.mehta@outlook.com',
    status: 'unresolved', assignee: null, priority: 'High', firstSeen: '2 Apr 2025', lastOrder: 'No orders yet',
    attrs: [
      { k: 'Source', v: 'Instagram ad · Reel 42' }, { k: 'Interested in', v: 'Yoga Mat Pro' },
      { k: 'Opt-in', v: 'Utility only' },
    ],
    msgs: [
      { from: 'them', kind: 'image', at: '10:27', text: 'Is this the one on your reel?', img: 'mat' },
      t('them', 'Saw your reel — do you have this product in black?', '10:28'),
    ],
    notes: [],
    history: [],
    sum: 'Product availability question that came in from a paid reel. Stock check needed before replying.',
    sug: 'Hi Priya! Yes — the black colourway is back in stock. Want me to send you the link?',
    src: ['Shopify · Catalog'],
    acts: [['Matched product', 'Yoga Mat Pro · 2 variants · 10:28'], ['Paused for a human', 'holding stock needs approval']],
    insight: 'First contact, arrived from a paid Meta ad. High intent language — route to sales.',
  },
  {
    id: 'c3', n: 'Amit Verma', ini: 'AV', ch: 'WhatsApp', t: '10:22', unread: 3, ai: 'escalated', sess: 'open', mins: 980,
    p: 'I need help with the refund process', tags: ['Refund', 'Billing'], phone: '+91 98111 20304', city: 'New Delhi',
    stage: 'Customer', ltv: '₹9,240', orders: 3, since: 'Nov 2024', email: 'amit.verma@gmail.com',
    status: 'unresolved', assignee: 'km', priority: 'High', firstSeen: '8 Nov 2024', lastOrder: '#12088 · 2 May',
    attrs: [
      { k: 'Refunds this quarter', v: '2' }, { k: 'Payment method', v: 'Razorpay · UPI' },
      { k: 'Churn risk', v: 'Elevated' },
    ],
    msgs: [
      t('them', 'I need help with the refund process for my last order.', '10:20'),
      t('us', 'I can help with that. Could you confirm the order number?', '10:22', { author: 'Kavya Menon', by: 'km', state: 'read' }),
      t('them', "It's #12088, ordered 2 May. The amount was ₹6,400.", '10:22'),
      { from: 'them', kind: 'image', at: '10:22', text: 'Here is the invoice', img: 'doc' },
    ],
    notes: [
      { by: 'km', text: '₹6,400 is over my approval limit — needs Sneha to sign off before I promise anything.', at: 'Today 10:24' },
    ],
    history: [
      { title: 'Refund on #11740', at: '6 Mar', outcome: 'Refunded', agent: 'km', ch: 'Email', msgs: 11 },
      { title: 'Wrong item delivered', at: '14 Jan', outcome: 'Replaced', agent: 'rd', ch: 'WhatsApp', msgs: 21 },
    ],
    sum: 'Refund request on order #12088 for ₹6,400. Above the ₹5,000 auto-approval threshold, so escalated to a human.',
    sug: "Thanks Amit. ₹6,400 is above what I can approve automatically, so I've passed this to Sneha — she'll confirm within the hour.",
    src: ['Refund policy', 'Shopify · Order #12088'],
    acts: [['Read refund policy', '14-day window · order qualifies'], ['Escalated to human', 'amount over ₹5,000 · 10:22']],
    insight: 'Second refund in 90 days. Retention flags churn risk — consider a goodwill credit.',
  },
  {
    id: 'c4', n: 'Sneha Kulkarni', ini: 'SK', ch: 'WhatsApp', t: '10:15', unread: 1, ai: 'handling', sess: 'closing', mins: 41,
    p: 'Can I reschedule my appointment?', tags: ['VIP', 'High value'], phone: '+91 99887 76655', city: 'Chennai',
    stage: 'Customer', ltv: '₹42,110', orders: 14, since: 'Jan 2023', email: 'sneha.k@fastmail.com',
    status: 'pending', assignee: 'si', priority: 'High', firstSeen: '4 Jan 2023', lastOrder: '#12301 · 9 May',
    attrs: [
      { k: 'Loyalty tier', v: 'Platinum' }, { k: 'Preferred slot', v: 'Weekday evenings' },
      { k: 'Account manager', v: 'Sneha Iyer' },
    ],
    msgs: [
      t('them', 'Can I reschedule my appointment?', '10:14'),
      t('us', 'Of course. I have Thursday 4pm or Friday 11am open — which suits you?', '10:15', { author: 'Sneha Iyer', by: 'si', state: 'delivered' }),
    ],
    notes: [
      { by: 'si', text: 'Highest LTV contact in my queue. Never let this thread hit the 24-hour window.', at: 'Today 10:16' },
    ],
    history: [
      { title: 'Appointment booked', at: '2 May', outcome: 'Resolved', agent: 'si', ch: 'WhatsApp', msgs: 8 },
      { title: 'Gift wrapping request', at: '19 Apr', outcome: 'Resolved', agent: 'pn', ch: 'WhatsApp', msgs: 5 },
      { title: 'Annual plan renewal', at: '3 Jan', outcome: 'Renewed', agent: 'si', ch: 'Email', msgs: 17 },
    ],
    sum: 'Reschedule request. Two slots offered from the booking calendar. Session window closes in 41 minutes.',
    sug: 'No rush, Sneha — Thursday 4pm and Friday 11am are both still free. Just reply with either one.',
    src: ['Calendly · Booking calendar'],
    acts: [['Checked calendar', '3 slots open this week · 10:15'], ['Session warning', '41 min left before a template is required']],
    insight: 'Highest-LTV contact in this view. Protect the response time.',
  },
  {
    id: 'c5', n: 'Vikram Singh', ini: 'VS', ch: 'WhatsApp', t: '09:58', unread: 0, ai: 'resolved', sess: 'open', mins: 300,
    p: 'Thanks! It worked.', tags: [], phone: '+91 88990 11223', city: 'Pune',
    stage: 'Customer', ltv: '₹3,120', orders: 1, since: 'Mar 2025', email: 'vikram.singh@gmail.com',
    status: 'resolved', assignee: 'rd', priority: 'Low', firstSeen: '21 Mar 2025', lastOrder: '#12277 · 21 Mar',
    attrs: [{ k: 'Device', v: 'Android 14' }, { k: 'App version', v: '4.2.1' }],
    msgs: [
      t('them', 'App keeps logging me out', '09:52'),
      t('us', 'Try clearing the app cache — Settings › Storage › Clear cache, then sign in again.', '09:54', { author: 'Rohit Desai', by: 'rd', state: 'read' }),
      t('them', 'Thanks! It worked.', '09:58'),
    ],
    notes: [],
    history: [{ title: 'First order support', at: '21 Mar', outcome: 'Resolved', agent: 'pn', ch: 'WhatsApp', msgs: 4 }],
    sum: 'Login issue resolved with a cache-clear step from the help centre. Closed.',
    sug: "Great to hear! I'll leave this closed — reopen any time if it comes back.",
    src: ['Help centre · Login issues'],
    acts: [['Matched help article', 'Login issues · confidence 0.88'], ['Resolved without escalation', '']],
    insight: 'First purchase 3 weeks ago. Good candidate for the onboarding nurture sequence.',
  },
  {
    id: 'c6', n: 'Ananya Pillai', ini: 'AP', ch: 'WhatsApp', t: '09:50', unread: 2, ai: 'handling', sess: 'open', mins: 380,
    p: 'Where is my shipment?', tags: ['Repeat', 'Shipping'], phone: '+91 77665 44332', city: 'Kochi',
    stage: 'Customer', ltv: '₹14,890', orders: 5, since: 'Aug 2024', email: 'ananya.pillai@gmail.com',
    status: 'followup', assignee: 'pn', priority: 'Medium', firstSeen: '30 Aug 2024', lastOrder: '#12294 · 6 May',
    attrs: [{ k: 'Courier', v: 'Delhivery' }, { k: 'AWB', v: '8890114' }, { k: 'Opt-in', v: 'Marketing + Utility' }],
    msgs: [
      t('them', 'Where is my shipment?', '09:49'),
      t('us', 'It left the Pune warehouse this morning and is due Thursday.', '09:50', { author: 'Priya Nair', by: 'pn', state: 'read' }),
    ],
    notes: [
      { by: 'pn', text: 'Set a follow-up for Thursday morning to confirm delivery landed.', at: 'Today 09:51' },
    ],
    history: [
      { title: 'Late delivery on #12102', at: '12 Apr', outcome: 'Compensated', agent: 'pn', ch: 'WhatsApp', msgs: 19 },
      { title: 'Address change', at: '2 Feb', outcome: 'Resolved', agent: 'rd', ch: 'WhatsApp', msgs: 7 },
    ],
    sum: 'Shipment tracking question answered from courier data. Awaiting acknowledgement.',
    sug: "You're all set — I'll message you the moment it's out for delivery.",
    src: ['Delhivery tracking'],
    acts: [['Looked up tracking', 'AWB 8890114 · in transit · 09:50']],
    insight: 'Opens every WhatsApp message within 5 minutes. Strong channel fit.',
  },
  {
    id: 'c7', n: 'Raj Patel', ini: 'RP', ch: 'WhatsApp', t: 'Yesterday', unread: 1, ai: 'blocked', sess: 'closed',
    p: "I haven't received my invoice", tags: ['Follow up', 'Billing'], phone: '+91 77331 22345', city: 'Ahmedabad',
    stage: 'Lead', ltv: '—', orders: 0, since: 'Apr 2025', email: 'raj.patel@zohomail.in',
    status: 'followup', assignee: 'km', priority: 'Medium', firstSeen: '9 Apr 2025', lastOrder: 'No orders yet',
    attrs: [{ k: 'Opt-in', v: 'Utility only' }, { k: 'Window', v: 'Closed 3 hours ago' }],
    msgs: [t('them', "I haven't received my invoice", 'Yesterday 09:10')],
    notes: [
      { by: 'km', text: 'Window closed. Send invoice_resend_v1 or wait for him to message first.', at: 'Today 07:05' },
    ],
    history: [],
    sum: 'Invoice request. The 24-hour window has closed, so only an approved template can be sent.',
    sug: 'Hi Raj — sending your invoice for order #12088 across now. Let me know if anything looks off.',
    src: ['Billing · Invoice #12088'],
    acts: [['Found invoice', 'order #12088'], ['Blocked', 'window closed · needs template invoice_resend_v1']],
    insight: 'Window closed 3 hours ago. A paid template costs ₹0.72 — approve or let it lapse.',
  },
  {
    id: 'c8', n: 'Meera Joshi', ini: 'MJ', ch: 'Instagram', t: 'Yesterday', unread: 0, ai: 'resolved', sess: 'na',
    p: 'Great, I will place the order tonight', tags: ['New lead'], phone: '@meera.joshi', city: 'Jaipur',
    stage: 'Lead', ltv: '—', orders: 0, since: 'Aug 2025', email: '—',
    status: 'resolved', assignee: 'pn', priority: 'Low', firstSeen: '28 Aug 2025', lastOrder: 'No orders yet',
    attrs: [{ k: 'Source', v: 'Instagram DM' }, { k: 'Interested in', v: 'Gift sets' }],
    msgs: [
      t('them', 'Do you ship gift sets to Jaipur?', 'Yesterday 14:02'),
      t('us', 'We do — free delivery over ₹999 and gift wrapping is included.', 'Yesterday 14:06', { author: 'Priya Nair', by: 'pn', state: 'read' }),
      t('them', 'Great, I will place the order tonight', 'Yesterday 14:09'),
    ],
    notes: [],
    history: [],
    sum: 'Shipping and gifting question from Instagram. Answered, lead warm.',
    sug: 'Anytime! Ping me here once you order and I will make sure it is wrapped.',
    src: ['Shipping policy'],
    acts: [['Answered from policy', 'confidence 0.91']],
    insight: 'Said she would order tonight — worth a nudge tomorrow if nothing lands.',
  },
  {
    id: 'c9', n: 'Farhan Qureshi', ini: 'FQ', ch: 'WhatsApp', t: 'Monday', unread: 0, ai: 'waiting', sess: 'closed',
    p: 'Can someone call me about the bulk order?', tags: ['High value'], phone: '+91 96500 77881', city: 'Hyderabad',
    stage: 'Lead', ltv: '—', orders: 0, since: 'Jul 2025', email: 'farhan@quresi-traders.in',
    status: 'unresolved', assignee: null, priority: 'High', firstSeen: '14 Jul 2025', lastOrder: 'No orders yet',
    attrs: [{ k: 'Company', v: 'Qureshi Traders' }, { k: 'Estimated volume', v: '400 units / month' }],
    msgs: [
      t('them', 'We are looking at 400 units a month for our stores.', 'Monday 11:20'),
      t('them', 'Can someone call me about the bulk order?', 'Monday 11:21'),
    ],
    notes: [
      { by: 'ak', text: 'Unassigned for two days — this is the biggest lead in the queue. Someone pick it up.', at: 'Today 08:30' },
    ],
    history: [],
    sum: 'Bulk-order enquiry with a call-back request. No owner yet.',
    sug: 'Hi Farhan — happy to arrange that call. Would 4pm today or 11am tomorrow work better?',
    src: ['Pricing · Wholesale tiers'],
    acts: [['Detected bulk intent', 'volume over 100 units'], ['Paused for a human', 'pricing needs approval']],
    insight: 'Highest potential deal open right now, sitting unassigned for 2 days.',
  },
]

export const QUICK_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'mine', label: 'Assigned to me' },
  { id: 'unassigned', label: 'Unassigned' },
  { id: 'unread', label: 'Unread' },
]
