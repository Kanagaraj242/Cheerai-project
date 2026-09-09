export const NODE_COLORS = {
  wa: '#1FA855',
  purple: '#6D4AEA',
  blue: '#2F6FE4',
  orange: '#F0862A',
  red: '#E5484D',
  slate: '#4B4F5C',
  pink: '#D8306B',
  green: '#2E8B4F',
  amber: '#E0A32E',
  violet: '#8B5CF6',
}

export const LIBRARY = {
  event: [
    {
      group: 'Messaging',
      items: [
        { id: 'ev-wa', label: 'Incoming WhatsApp', icon: 'chat', color: 'wa', subtitle: 'On new incoming message' },
        { id: 'ev-camp', label: 'Campaign Sent', icon: 'send', color: 'blue', subtitle: 'When a campaign goes out' },
        { id: 'ev-ig', label: 'Instagram Event', icon: 'camera', color: 'pink', subtitle: 'DM, comment or mention' },
        { id: 'ev-fb', label: 'Facebook Lead', icon: 'user', color: 'blue', subtitle: 'New lead form submission' },
        { id: 'ev-shop', label: 'Shopify Event', icon: 'cart', color: 'green', subtitle: 'Store activity' },
        { id: 'ev-hook', label: 'Incoming Webhook', icon: 'webhook', color: 'blue', subtitle: 'Payload from an external app' },
      ],
    },
    {
      group: 'Contacts',
      items: [
        { id: 'ev-new', label: 'New Contact', icon: 'user', color: 'purple', subtitle: 'A contact is created' },
        { id: 'ev-form', label: 'Form Submitted', icon: 'form', color: 'violet', subtitle: 'Any connected form' },
        { id: 'ev-tag', label: 'Tag Added', icon: 'tag', color: 'orange', subtitle: 'A tag lands on a contact' },
      ],
    },
    {
      group: 'Commerce',
      items: [
        { id: 'ev-woo', label: 'WooCommerce Event', icon: 'cart', color: 'violet', subtitle: 'Store activity' },
        { id: 'ev-buy', label: 'Shopify Purchase', icon: 'cart', color: 'green', subtitle: 'An order is paid' },
        { id: 'ev-order', label: 'Order Created', icon: 'cart', color: 'amber', subtitle: 'A new order appears' },
      ],
    },
    {
      group: 'Others',
      items: [
        { id: 'ev-date', label: 'Date & Time', icon: 'calendar', color: 'blue', subtitle: 'On a schedule' },
        { id: 'ev-trig', label: 'Webhook Trigger', icon: 'webhook', color: 'red', subtitle: 'Custom trigger URL' },
        { id: 'ev-custom', label: 'Custom Event', icon: 'bolt', color: 'violet', subtitle: 'Fired from your own code' },
      ],
    },
  ],
  action: [
    {
      group: 'Messaging',
      items: [
        { id: 'ac-msg', label: 'Send Message', icon: 'message', color: 'purple', subtitle: 'Send a message', type: 'message' },
        { id: 'ac-tpl', label: 'Send Template', icon: 'form', color: 'blue', subtitle: 'Approved template', type: 'message' },
        { id: 'ac-cat', label: 'Send Product Catalog', icon: 'cart', color: 'orange', subtitle: 'Share your catalog', type: 'message' },
        { id: 'ac-media', label: 'Send Media', icon: 'image', color: 'pink', subtitle: 'Image, video or document', type: 'message' },
      ],
    },
    {
      group: 'Contacts',
      items: [
        { id: 'ac-tag', label: 'Add Tag', icon: 'tag', color: 'orange', subtitle: 'Tag the contact', type: 'simple' },
        { id: 'ac-field', label: 'Update Field', icon: 'form', color: 'violet', subtitle: 'Write a contact property', type: 'simple' },
        { id: 'ac-assign', label: 'Assign to Team', icon: 'team', color: 'red', subtitle: 'Hand over to people', type: 'assign' },
      ],
    },
    {
      group: 'Logic',
      items: [
        { id: 'ac-cond', label: 'Condition', icon: 'branch', color: 'purple', subtitle: 'Split the flow', type: 'condition' },
        { id: 'ac-delay', label: 'Delay', icon: 'clock', color: 'slate', subtitle: 'Wait before continuing', type: 'simple' },
        { id: 'ac-end', label: 'End Flow', icon: 'flag', color: 'slate', subtitle: 'End the conversation', type: 'end' },
      ],
    },
    {
      group: 'AI',
      items: [
        { id: 'ac-agent', label: 'AI Agent Reply', icon: 'robot', color: 'purple', subtitle: 'Let an agent answer', type: 'simple' },
        { id: 'ac-sum', label: 'Summarise Thread', icon: 'spark', color: 'violet', subtitle: 'Condense the conversation', type: 'simple' },
      ],
    },
  ],
}

export const CHANNELS = ['WhatsApp', 'Instagram', 'Messenger', 'SMS', 'Email']
export const MESSAGE_TYPES = ['Text', 'Text + Image', 'Text + Button', 'Text + Image + Button', 'Template']
export const BUTTON_ACTIONS = ['Open URL', 'Send message', 'Call number', 'Copy code']
export const TEAMS = ['Sales Team', 'Support Team', 'Retention Team', 'Billing Team']
export const VARIABLES = ['contact_name', 'first_name', 'order_id', 'cart_total', 'city']

export const INITIAL_FLOW = [
  {
    id: 'n1', type: 'trigger', title: 'Incoming WhatsApp', subtitle: 'On new incoming message',
    icon: 'chat', color: 'wa', channel: 'WhatsApp', event: 'On new incoming message',
  },
  {
    id: 'n2', type: 'message', title: 'Send message', subtitle: 'Send a welcome message',
    icon: 'message', color: 'purple',
    channel: 'WhatsApp', messageType: 'Text + Image + Button',
    content: 'Hi {{contact_name}}! 👋\n\nWelcome to Cheerio AI. We’re happy to have you here.',
    media: { name: 'welcome.jpg', size: '1200 × 628' },
    buttons: [
      { label: 'View Product Catalog', action: 'Open URL' },
      { label: 'Talk to Support', action: 'Send message' },
    ],
  },
  {
    id: 'n3', type: 'condition', title: 'Condition', subtitle: 'Is customer existing?',
    icon: 'branch', color: 'purple', field: 'Lifecycle stage', operator: 'is', value: 'Customer',
    yes: [
      {
        id: 'n4', type: 'message', title: 'Send message', subtitle: 'Thanks for coming back! Here are our latest offers.',
        icon: 'message', color: 'blue',
        channel: 'WhatsApp', messageType: 'Text + Button',
        content: 'Thanks for coming back, {{first_name}}! Here are our latest offers.',
        media: null,
        buttons: [{ label: 'See offers', action: 'Open URL' }],
      },
    ],
    no: [
      {
        id: 'n5', type: 'message', title: 'Send product catalog', subtitle: 'Share our product catalog with top categories.',
        icon: 'cart', color: 'orange',
        channel: 'WhatsApp', messageType: 'Text + Image + Button',
        content: 'Here’s our catalog with the categories people love most.',
        media: { name: 'catalog.jpg', size: '1080 × 1080' },
        buttons: [{ label: 'Browse catalog', action: 'Open URL' }],
      },
    ],
  },
  {
    id: 'n6', type: 'assign', title: 'Assign to team', subtitle: 'Assign to Sales Team',
    icon: 'team', color: 'red', team: 'Sales Team', priority: 'Normal',
  },
  {
    id: 'n7', type: 'end', title: 'End flow', subtitle: 'End the conversation',
    icon: 'flag', color: 'slate', note: 'Nothing runs after this point.',
  },
]
