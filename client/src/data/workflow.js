/* ------------------------------------------------------------------
   Workflow builder — node catalogue, canvas geometry, condition
   vocabulary and the seeded flow.
   ------------------------------------------------------------------ */

export const NODE_W = 268
export const NODE_H = 96

export const CATS = {
  event: { label: 'Events', color: 'var(--br)', soft: 'var(--brS)', line: 'var(--brL)', blurb: 'Something happens that starts the flow' },
  action: { label: 'Actions', color: 'var(--ok)', soft: 'var(--okS)', line: '#BFE6D6', blurb: 'Something the workflow does' },
  condition: { label: 'Conditions', color: 'var(--warn)', soft: 'var(--warnS)', line: '#EFD9AE', blurb: 'Split the flow into branches' },
  timing: { label: 'Timing', color: 'var(--info)', soft: 'var(--infoS)', line: '#C5D8FA', blurb: 'Wait before the next step' },
  data: { label: 'Data & internal', color: 'var(--ink3)', soft: 'var(--ln2)', line: 'var(--ln)', blurb: 'Update records or alert the team' },
}

export const CHANNELS = ['WhatsApp', 'Instagram', 'SMS', 'Email']

/* Attributes available to condition nodes */
export const ATTRIBUTES = [
  { id: 'first_name', label: 'First name', type: 'text' },
  { id: 'city', label: 'City', type: 'text' },
  { id: 'lifecycle', label: 'Lifecycle stage', type: 'select', options: ['Lead', 'Customer', 'Churned'] },
  { id: 'tag', label: 'Tag', type: 'select', options: ['VIP', 'Repeat', 'New lead', 'High value', 'At risk'] },
  { id: 'orders', label: 'Total orders', type: 'number' },
  { id: 'lifetime_value', label: 'Lifetime value (₹)', type: 'number' },
  { id: 'cart_value', label: 'Cart value (₹)', type: 'number' },
  { id: 'days_since_order', label: 'Days since last order', type: 'number' },
  { id: 'opt_in', label: 'Marketing opt-in', type: 'select', options: ['Yes', 'No'] },
  { id: 'source', label: 'Acquisition source', type: 'select', options: ['Instagram ad', 'Google', 'Referral', 'Store walk-in'] },
  { id: 'replied', label: 'Replied to last message', type: 'select', options: ['Yes', 'No'] },
]

export const OPERATORS = {
  text: ['is', 'is not', 'contains', 'does not contain', 'is known', 'is unknown'],
  number: ['is', 'is not', 'is more than', 'is less than', 'is between'],
  select: ['is', 'is not', 'is any of'],
}

export const attributeOf = (id) => ATTRIBUTES.find((a) => a.id === id) ?? ATTRIBUTES[0]
export const operatorsFor = (id) => OPERATORS[attributeOf(id).type]

let seq = 100
export const nextId = (prefix = 'n') => `${prefix}${++seq}`

/* ------------------------------------------------------------------ */
/* Node catalogue — everything draggable from the left palette         */
/* ------------------------------------------------------------------ */

export const CATALOG = [
  /* ---- events ---- */
  {
    kind: 'msg_received', cat: 'event', icon: 'chat', label: 'Message received',
    desc: 'A customer messages you on any connected channel',
    keywords: 'whatsapp instagram inbound reply chat start trigger',
    config: { channel: 'WhatsApp', keyword: 'Any message' },
    fields: [
      { key: 'channel', label: 'Channel', type: 'select', options: CHANNELS },
      { key: 'keyword', label: 'Match', type: 'select', options: ['Any message', 'Contains keyword', 'First message only'] },
      { key: 'keywordValue', label: 'Keyword', type: 'text', when: (c) => c.keyword === 'Contains keyword', placeholder: 'e.g. price, refund' },
    ],
  },
  {
    kind: 'cart_abandoned', cat: 'event', icon: 'cart', label: 'Cart abandoned',
    desc: 'Checkout started but never completed',
    keywords: 'shopify ecommerce checkout abandon cart trigger revenue',
    config: { source: 'Shopify', minValue: '1200' },
    fields: [
      { key: 'source', label: 'Store', type: 'select', options: ['Shopify', 'WooCommerce', 'Custom API'] },
      { key: 'minValue', label: 'Minimum cart value (₹)', type: 'number' },
    ],
  },
  {
    kind: 'order_placed', cat: 'event', icon: 'tag', label: 'Order placed',
    desc: 'A new paid order lands in your store',
    keywords: 'shopify order purchase paid trigger',
    config: { source: 'Shopify', firstOnly: 'No' },
    fields: [
      { key: 'source', label: 'Store', type: 'select', options: ['Shopify', 'WooCommerce', 'Custom API'] },
      { key: 'firstOnly', label: 'First order only', type: 'select', options: ['No', 'Yes'] },
    ],
  },
  {
    kind: 'contact_created', cat: 'event', icon: 'user', label: 'New contact',
    desc: 'Someone new is added to your audience',
    keywords: 'signup subscriber lead new contact trigger',
    config: { list: 'All contacts' },
    fields: [{ key: 'list', label: 'Added to', type: 'select', options: ['All contacts', 'Newsletter', 'VIP tier'] }],
  },
  {
    kind: 'ad_click', cat: 'event', icon: 'target', label: 'Click to WhatsApp ad',
    desc: 'Someone taps a Meta ad that opens a chat',
    keywords: 'meta facebook instagram ads paid click trigger',
    config: { campaign: 'Any campaign' },
    fields: [{ key: 'campaign', label: 'Campaign', type: 'select', options: ['Any campaign', 'Monsoon Refresh', 'Festive Preview'] }],
  },
  {
    kind: 'webhook', cat: 'event', icon: 'plug', label: 'Webhook received',
    desc: 'An external system posts an event to Cheerio',
    keywords: 'api http integration external custom trigger',
    config: { path: '/hooks/cheerio/inbound' },
    fields: [{ key: 'path', label: 'Endpoint path', type: 'text' }],
  },

  /* ---- actions ---- */
  {
    kind: 'send_whatsapp', cat: 'action', icon: 'send', label: 'Send WhatsApp message',
    desc: 'Session message or approved template',
    keywords: 'whatsapp send message template reply text',
    config: {
      channel: 'WhatsApp', mode: 'Template', template: 'cart_recover_v3',
      body: 'Hi {{first_name}}, you left {{cart_items}} in your cart. Complete your order in the next 2 hours and we will hold your 10% off.',
      buttons: 'Complete order, Not now',
    },
    fields: [
      { key: 'mode', label: 'Message type', type: 'select', options: ['Template', 'Session message'] },
      { key: 'template', label: 'Template', type: 'select', options: ['cart_recover_v3', 'order_update_v3', 'winback_v4', 'monsoon_offer_v2'], when: (c) => c.mode === 'Template' },
      { key: 'body', label: 'Message', type: 'textarea', placeholder: 'Write the message…' },
      { key: 'buttons', label: 'Buttons (comma separated)', type: 'text', placeholder: 'Shop now, Stop promotions' },
    ],
  },
  {
    kind: 'send_email', cat: 'action', icon: 'send', label: 'Send email',
    desc: 'Transactional or marketing email',
    keywords: 'email mail send newsletter message',
    config: {
      channel: 'Email', subject: 'Your cart is still waiting',
      body: 'Hi {{first_name}}, your items are still saved. Pick up where you left off and checkout in one tap.',
      buttons: 'Return to cart',
    },
    fields: [
      { key: 'subject', label: 'Subject line', type: 'text' },
      { key: 'body', label: 'Body', type: 'textarea' },
      { key: 'buttons', label: 'Call to action', type: 'text' },
    ],
  },
  {
    kind: 'send_sms', cat: 'action', icon: 'chat', label: 'Send SMS',
    desc: 'Fallback when richer channels fail',
    keywords: 'sms text fallback message send',
    config: { channel: 'SMS', body: 'Cheerio: your cart is still saved. Finish your order here: chr.io/c/{{cart_id}}', buttons: '' },
    fields: [{ key: 'body', label: 'Message (160 characters)', type: 'textarea' }],
  },
  {
    kind: 'send_instagram', cat: 'action', icon: 'chat', label: 'Send Instagram DM',
    desc: 'Reply inside the 24-hour DM window',
    keywords: 'instagram dm social message send',
    config: { channel: 'Instagram', body: 'Hey {{first_name}}! Thanks for the DM — here is the link you asked for.', buttons: 'View product' },
    fields: [
      { key: 'body', label: 'Message', type: 'textarea' },
      { key: 'buttons', label: 'Buttons (comma separated)', type: 'text' },
    ],
  },
  {
    kind: 'assign_agent', cat: 'action', icon: 'head', label: 'Assign to agent',
    desc: 'Hand the conversation to a teammate',
    keywords: 'assign agent team human handover inbox route',
    config: { assignee: 'Round robin', status: 'Unresolved' },
    fields: [
      { key: 'assignee', label: 'Assign to', type: 'select', options: ['Round robin', 'Arjun Kumar', 'Sneha Iyer', 'Priya Nair', 'Rohit Desai'] },
      { key: 'status', label: 'Set status', type: 'select', options: ['Unresolved', 'Pending', 'Follow-up'] },
    ],
  },

  /* ---- conditions ---- */
  {
    kind: 'if_else', cat: 'condition', icon: 'flow', label: 'If / Else',
    desc: 'Branch on contact attributes',
    keywords: 'if else condition branch logic split rule and or',
    ports: ['yes', 'no'],
    config: {
      match: 'AND',
      rules: [{ attr: 'cart_value', op: 'is more than', value: '1200' }],
    },
    fields: [{ key: 'rules', label: 'Conditions', type: 'rules' }],
  },
  {
    kind: 'has_replied', cat: 'condition', icon: 'chat', label: 'Has replied?',
    desc: 'Check whether the customer answered',
    keywords: 'replied answer response condition branch',
    ports: ['yes', 'no'],
    config: { within: '24 hours' },
    fields: [{ key: 'within', label: 'Replied within', type: 'select', options: ['1 hour', '6 hours', '24 hours', '3 days'] }],
  },
  {
    kind: 'split_test', cat: 'condition', icon: 'target', label: 'A/B split',
    desc: 'Send a share of people down each path',
    keywords: 'ab split test experiment percentage branch',
    ports: ['yes', 'no'],
    config: { share: '50' },
    fields: [{ key: 'share', label: 'Percent down path A', type: 'number' }],
  },

  /* ---- timing ---- */
  {
    kind: 'delay', cat: 'timing', icon: 'clock', label: 'Wait',
    desc: 'Pause before the next step',
    keywords: 'wait delay timer pause hours days schedule',
    config: { amount: '2', unit: 'hours', businessHours: 'No' },
    fields: [
      { key: 'amount', label: 'Wait for', type: 'number' },
      { key: 'unit', label: 'Unit', type: 'select', options: ['minutes', 'hours', 'days'] },
      { key: 'businessHours', label: 'Business hours only', type: 'select', options: ['No', 'Yes'] },
    ],
  },
  {
    kind: 'wait_until', cat: 'timing', icon: 'clock', label: 'Wait until a time',
    desc: 'Hold until a specific hour of the day',
    keywords: 'wait until time schedule morning send window',
    config: { time: '10:00', tz: 'Asia/Kolkata' },
    fields: [
      { key: 'time', label: 'Send at', type: 'text', placeholder: '10:00' },
      { key: 'tz', label: 'Timezone', type: 'select', options: ['Asia/Kolkata', 'UTC', 'America/New_York'] },
    ],
  },

  /* ---- data ---- */
  {
    kind: 'add_tag', cat: 'data', icon: 'tag', label: 'Add or remove tag',
    desc: 'Keep segments up to date',
    keywords: 'tag label segment update contact data',
    config: { mode: 'Add', tag: 'Cart recovered' },
    fields: [
      { key: 'mode', label: 'Action', type: 'select', options: ['Add', 'Remove'] },
      { key: 'tag', label: 'Tag', type: 'text' },
    ],
  },
  {
    kind: 'set_attribute', cat: 'data', icon: 'user', label: 'Update attribute',
    desc: 'Write a value onto the contact record',
    keywords: 'attribute field property update contact data custom',
    config: { attr: 'lifecycle', value: 'Customer' },
    fields: [
      { key: 'attr', label: 'Attribute', type: 'select', options: ATTRIBUTES.map((a) => a.id) },
      { key: 'value', label: 'New value', type: 'text' },
    ],
  },
  {
    kind: 'notify_team', cat: 'data', icon: 'bell', label: 'Notify the team',
    desc: 'Post an alert into Slack',
    keywords: 'slack notify alert internal team message',
    config: { channel: '#support-escalations', text: 'High-value cart abandoned by {{first_name}} — ₹{{cart_value}}' },
    fields: [
      { key: 'channel', label: 'Slack channel', type: 'text' },
      { key: 'text', label: 'Alert text', type: 'textarea' },
    ],
  },
]

export const catalogOf = (kind) => CATALOG.find((c) => c.kind === kind) ?? CATALOG[0]

export const makeNode = (kind, x, y) => {
  const spec = catalogOf(kind)
  return {
    id: nextId(),
    kind,
    x: Math.round(x),
    y: Math.round(y),
    title: spec.label,
    config: structuredClone(spec.config),
  }
}

/* ------------------------------------------------------------------ */
/* Seeded flow — abandoned cart recovery                               */
/* ------------------------------------------------------------------ */

export const START_NODES = [
  { id: 'n1', kind: 'cart_abandoned', x: 420, y: 60, title: 'Cart abandoned', config: { source: 'Shopify', minValue: '1200' } },
  { id: 'n2', kind: 'delay', x: 420, y: 216, title: 'Wait 2 hours', config: { amount: '2', unit: 'hours', businessHours: 'No' } },
  {
    id: 'n3', kind: 'if_else', x: 420, y: 372, title: 'High-value cart?',
    config: { match: 'AND', rules: [{ attr: 'cart_value', op: 'is more than', value: '1200' }, { attr: 'opt_in', op: 'is', value: 'Yes' }] },
  },
  {
    id: 'n4', kind: 'send_whatsapp', x: 150, y: 546, title: 'WhatsApp with discount',
    config: {
      channel: 'WhatsApp', mode: 'Template', template: 'cart_recover_v3',
      body: 'Hi {{first_name}}, you left {{cart_items}} in your cart. Complete your order in the next 2 hours and we will hold your 10% off.',
      buttons: 'Complete order, Not now',
    },
  },
  {
    id: 'n5', kind: 'send_email', x: 700, y: 546, title: 'Plain email nudge',
    config: {
      channel: 'Email', subject: 'Your cart is still waiting',
      body: 'Hi {{first_name}}, your items are still saved. Pick up where you left off and checkout in one tap.',
      buttons: 'Return to cart',
    },
  },
  { id: 'n6', kind: 'delay', x: 150, y: 702, title: 'Wait 24 hours', config: { amount: '24', unit: 'hours', businessHours: 'Yes' } },
  { id: 'n7', kind: 'has_replied', x: 150, y: 858, title: 'Bought anything yet?', config: { within: '24 hours' } },
  {
    id: 'n8', kind: 'send_sms', x: 20, y: 1032, title: 'SMS last nudge',
    config: { channel: 'SMS', body: 'Cheerio: your cart is still saved. Finish your order here: chr.io/c/{{cart_id}}', buttons: '' },
  },
  { id: 'n9', kind: 'add_tag', x: 430, y: 1032, title: 'Tag as recovered', config: { mode: 'Add', tag: 'Cart recovered' } },
]

export const START_EDGES = [
  { id: 'e1', from: 'n1', port: 'out', to: 'n2' },
  { id: 'e2', from: 'n2', port: 'out', to: 'n3' },
  { id: 'e3', from: 'n3', port: 'yes', to: 'n4' },
  { id: 'e4', from: 'n3', port: 'no', to: 'n5' },
  { id: 'e5', from: 'n4', port: 'out', to: 'n6' },
  { id: 'e6', from: 'n6', port: 'out', to: 'n7' },
  { id: 'e7', from: 'n7', port: 'no', to: 'n8' },
  { id: 'e8', from: 'n7', port: 'yes', to: 'n9' },
]

export const TOUR = [
  { title: 'Start with an event', body: 'Every workflow begins with something that happens — a message, an abandoned cart, a new contact. Drag one from the Events group.' },
  { title: 'Add what should happen', body: 'Drop action nodes onto the canvas and drag from the dot under a node to the dot above another to connect them.' },
  { title: 'Branch with conditions', body: 'If / Else nodes split the flow. Stack rules with AND / OR to filter on any contact attribute.' },
  { title: 'Preview the experience', body: 'Open the Preview tab to see exactly what the customer receives on WhatsApp, Instagram, SMS or email.' },
  { title: 'Save and activate', body: 'Cheerio validates the flow before it goes live. Fix anything flagged, then hit Activate.' },
]

/* Port geometry ---------------------------------------------------- */
export const portPoint = (node, port) => {
  const spec = catalogOf(node.kind)
  const ports = spec.ports ?? ['out']
  if (ports.length === 2) {
    const x = node.x + NODE_W * (port === 'yes' ? 0.28 : 0.72)
    return { x, y: node.y + NODE_H }
  }
  return { x: node.x + NODE_W / 2, y: node.y + NODE_H }
}

export const inPoint = (node) => ({ x: node.x + NODE_W / 2, y: node.y })

export const edgePath = (a, b) => {
  const dy = Math.max(36, Math.abs(b.y - a.y) * 0.45)
  return `M ${a.x} ${a.y} C ${a.x} ${a.y + dy}, ${b.x} ${b.y - dy}, ${b.x} ${b.y}`
}
