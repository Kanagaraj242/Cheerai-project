import type { WorkflowNodeKind, WorkflowNodeTone } from '@/types'

export type NodeLibraryTab = 'events' | 'actions'

export interface NodeLibraryItem {
  id: string
  label: string
  icon: string
  iconBg: string
  kind: WorkflowNodeKind
  tone: WorkflowNodeTone
  subtitle: string
  config: [string, string][]
}

export interface NodeLibrarySection {
  title: string
  items: NodeLibraryItem[]
}

export const eventSections: NodeLibrarySection[] = [
  {
    title: 'Messaging',
    items: [
      {
        id: 'incoming-whatsapp',
        label: 'Incoming WhatsApp',
        icon: 'whatsapp',
        iconBg: '#25D366',
        kind: 'TRIGGER',
        tone: 'success',
        subtitle: 'On new incoming message',
        config: [
          ['Source', 'WhatsApp Business'],
          ['Event', 'Message received'],
          ['Match', 'Any message'],
        ],
      },
      {
        id: 'campaign-sent',
        label: 'Campaign Sent',
        icon: 'megaphone',
        iconBg: '#2563EB',
        kind: 'TRIGGER',
        tone: 'brand',
        subtitle: 'When a campaign finishes sending',
        config: [
          ['Source', 'Campaigns'],
          ['Event', 'Campaign sent'],
          ['Campaign', 'Any'],
        ],
      },
      {
        id: 'instagram-event',
        label: 'Instagram Event',
        icon: 'instagram',
        iconBg: 'linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)',
        kind: 'TRIGGER',
        tone: 'brand',
        subtitle: 'DM, comment or story reply',
        config: [
          ['Source', 'Instagram'],
          ['Event', 'Direct message'],
          ['Account', 'Business account'],
        ],
      },
      {
        id: 'facebook-lead',
        label: 'Facebook Lead',
        icon: 'facebook',
        iconBg: '#1877F2',
        kind: 'TRIGGER',
        tone: 'brand',
        subtitle: 'New lead from a Facebook form',
        config: [
          ['Source', 'Facebook'],
          ['Event', 'Lead form submitted'],
          ['Form', 'Any'],
        ],
      },
      {
        id: 'shopify-event',
        label: 'Shopify Event',
        icon: 'shopify',
        iconBg: '#5A8E3E',
        kind: 'TRIGGER',
        tone: 'success',
        subtitle: 'Store event from Shopify',
        config: [
          ['Source', 'Shopify'],
          ['Event', 'Any store event'],
          ['Store', 'Primary store'],
        ],
      },
      {
        id: 'incoming-webhook',
        label: 'Incoming Webhook',
        icon: 'webhook',
        iconBg: '#3B82F6',
        kind: 'TRIGGER',
        tone: 'brand',
        subtitle: 'Inbound call from an external service',
        config: [
          ['Method', 'POST'],
          ['Endpoint', '/hooks/cheerio/inbound'],
          ['Auth', 'Signed secret'],
        ],
      },
    ],
  },
  {
    title: 'Contacts',
    items: [
      {
        id: 'new-contact',
        label: 'New Contact',
        icon: 'userPlus',
        iconBg: '#7C5CF0',
        kind: 'TRIGGER',
        tone: 'brand',
        subtitle: 'When a contact is created',
        config: [
          ['Source', 'Contacts'],
          ['Event', 'Contact created'],
          ['Segment', 'Any'],
        ],
      },
      {
        id: 'form-submitted',
        label: 'Form Submitted',
        icon: 'form',
        iconBg: '#6D5AE6',
        kind: 'TRIGGER',
        tone: 'brand',
        subtitle: 'A form submission arrives',
        config: [
          ['Source', 'Forms'],
          ['Event', 'Submission received'],
          ['Form', 'Any'],
        ],
      },
      {
        id: 'tag-added',
        label: 'Tag Added',
        icon: 'tag',
        iconBg: '#EF5A3C',
        kind: 'TRIGGER',
        tone: 'warning',
        subtitle: 'When a tag is applied to a contact',
        config: [
          ['Source', 'Contacts'],
          ['Event', 'Tag added'],
          ['Tag', 'Any'],
        ],
      },
    ],
  },
  {
    title: 'Commerce',
    items: [
      {
        id: 'woocommerce-event',
        label: 'WooCommerce Event',
        icon: 'woo',
        iconBg: '#7F54B3',
        kind: 'TRIGGER',
        tone: 'brand',
        subtitle: 'Store event from WooCommerce',
        config: [
          ['Source', 'WooCommerce'],
          ['Event', 'Any store event'],
          ['Store', 'Primary store'],
        ],
      },
      {
        id: 'shopify-purchase',
        label: 'Shopify Purchase',
        icon: 'shopify',
        iconBg: '#5A8E3E',
        kind: 'TRIGGER',
        tone: 'success',
        subtitle: 'A Shopify order is paid',
        config: [
          ['Source', 'Shopify'],
          ['Event', 'Order paid'],
          ['Minimum value', '₹0'],
        ],
      },
      {
        id: 'order-created',
        label: 'Order Created',
        icon: 'cart',
        iconBg: '#F5A623',
        kind: 'TRIGGER',
        tone: 'warning',
        subtitle: 'When an order is created',
        config: [
          ['Source', 'Orders'],
          ['Event', 'Order created'],
          ['Channel', 'Any'],
        ],
      },
    ],
  },
  {
    title: 'Others',
    items: [
      {
        id: 'date-time',
        label: 'Date & Time',
        icon: 'calendar',
        iconBg: '#3B82F6',
        kind: 'TRIGGER',
        tone: 'brand',
        subtitle: 'On a date or a repeating schedule',
        config: [
          ['Schedule', 'Every day at 09:00'],
          ['Timezone', 'Asia/Kolkata'],
          ['Repeat', 'Daily'],
        ],
      },
      {
        id: 'webhook-trigger',
        label: 'Webhook Trigger',
        icon: 'webhook',
        iconBg: '#EC4899',
        kind: 'TRIGGER',
        tone: 'brand',
        subtitle: 'Trigger from an external service',
        config: [
          ['Method', 'POST'],
          ['Endpoint', '/hooks/cheerio/custom'],
          ['Auth', 'API key'],
        ],
      },
      {
        id: 'custom-event',
        label: 'Custom Event',
        icon: 'bolt',
        iconBg: '#7C5CF0',
        kind: 'TRIGGER',
        tone: 'brand',
        subtitle: 'Any custom event you define',
        config: [
          ['Event name', 'Not set'],
          ['Payload', 'JSON'],
          ['Source', 'Custom'],
        ],
      },
    ],
  },
]

export const actionSections: NodeLibrarySection[] = [
  {
    title: 'Messaging',
    items: [
      {
        id: 'send-message',
        label: 'Send message',
        icon: 'message',
        iconBg: '#7C5CF0',
        kind: 'ACTION',
        tone: 'brand',
        subtitle: 'Send a message on any channel',
        config: [
          ['Channel', 'WhatsApp'],
          ['Message type', 'Text + Image + Button'],
          ['Track', 'Click and conversion'],
        ],
      },
      {
        id: 'send-catalog',
        label: 'Send product catalog',
        icon: 'cart',
        iconBg: '#F97316',
        kind: 'ACTION',
        tone: 'warning',
        subtitle: 'Share the catalog with top categories',
        config: [
          ['Channel', 'WhatsApp'],
          ['Catalog', 'Top categories'],
          ['Cost', '₹0.72 per conversation'],
        ],
      },
      {
        id: 'send-email',
        label: 'Send email',
        icon: 'mail',
        iconBg: '#2563EB',
        kind: 'ACTION',
        tone: 'brand',
        subtitle: 'Send a templated email',
        config: [
          ['Channel', 'Email'],
          ['Template', 'Not set'],
          ['From', 'hello@cheerio.ai'],
        ],
      },
    ],
  },
  {
    title: 'Contacts',
    items: [
      {
        id: 'add-tag',
        label: 'Add tag',
        icon: 'tag',
        iconBg: '#EF5A3C',
        kind: 'ACTION',
        tone: 'warning',
        subtitle: 'Tag the contact for segmentation',
        config: [
          ['Tag', 'Not set'],
          ['Apply to', 'Contact in this run'],
        ],
      },
      {
        id: 'assign-team',
        label: 'Assign to team',
        icon: 'users',
        iconBg: '#EF4444',
        kind: 'ACTION',
        tone: 'destructive',
        subtitle: 'Route the conversation to a team',
        config: [
          ['Team', 'Sales Team'],
          ['Priority', 'Medium'],
          ['Notify', 'Slack'],
        ],
      },
      {
        id: 'update-contact',
        label: 'Update contact',
        icon: 'userPlus',
        iconBg: '#6D5AE6',
        kind: 'ACTION',
        tone: 'brand',
        subtitle: 'Write properties back to the contact',
        config: [
          ['Property', 'Not set'],
          ['Value', 'Not set'],
        ],
      },
    ],
  },
  {
    title: 'Flow',
    items: [
      {
        id: 'condition',
        label: 'Condition',
        icon: 'split',
        iconBg: '#6366F1',
        kind: 'CONDITION',
        tone: 'warning',
        subtitle: 'Branch the flow on a rule',
        config: [
          ['If', 'Not set'],
          ['Yes branch', 'Continue'],
          ['No branch', 'End flow'],
        ],
      },
      {
        id: 'delay',
        label: 'Delay',
        icon: 'clock',
        iconBg: '#64748B',
        kind: 'DELAY',
        tone: 'neutral',
        subtitle: 'Wait before the next step',
        config: [
          ['Delay', '1 hour'],
          ['Business hours only', 'No'],
        ],
      },
      {
        id: 'ai-agent',
        label: 'AI Agent',
        icon: 'robot',
        iconBg: 'linear-gradient(135deg,#7C5CF0,#5B34E0)',
        kind: 'AI AGENT',
        tone: 'brand',
        subtitle: 'Let an agent handle this step',
        config: [
          ['Agent', 'Support Agent'],
          ['Tone', 'Warm, concise'],
          ['Escalate after', '2 attempts'],
        ],
      },
    ],
  },
  {
    title: 'Others',
    items: [
      {
        id: 'webhook-call',
        label: 'Webhook call',
        icon: 'webhook',
        iconBg: '#3B82F6',
        kind: 'CONNECTOR',
        tone: 'success',
        subtitle: 'Call an external URL with the payload',
        config: [
          ['Method', 'POST'],
          ['URL', 'Not set'],
          ['Retries', '3'],
        ],
      },
      {
        id: 'add-note',
        label: 'Add note',
        icon: 'note',
        iconBg: '#F59E0B',
        kind: 'ACTION',
        tone: 'warning',
        subtitle: 'Leave an internal note on the thread',
        config: [
          ['Note', 'Not set'],
          ['Visible to', 'Team only'],
        ],
      },
      {
        id: 'end-flow',
        label: 'End flow',
        icon: 'flag',
        iconBg: '#475569',
        kind: 'ACTION',
        tone: 'neutral',
        subtitle: 'End the conversation',
        config: [
          ['Outcome', 'Completed'],
          ['Close conversation', 'Yes'],
        ],
      },
    ],
  },
]

export function getSections(tab: NodeLibraryTab): NodeLibrarySection[] {
  return tab === 'events' ? eventSections : actionSections
}

export function filterSections(sections: NodeLibrarySection[], query: string): NodeLibrarySection[] {
  const q = query.trim().toLowerCase()
  if (!q) return sections
  return sections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) => item.label.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q),
      ),
    }))
    .filter((section) => section.items.length > 0)
}
