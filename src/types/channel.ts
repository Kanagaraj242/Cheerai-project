export type Channel = 'WhatsApp' | 'Instagram' | 'Email' | 'SMS' | 'Messenger'

export const CHANNEL_COLOR: Record<Channel, string> = {
  WhatsApp: 'var(--channel-whatsapp)',
  Instagram: 'var(--channel-instagram)',
  Email: 'var(--channel-email)',
  SMS: 'var(--channel-sms)',
  Messenger: 'var(--channel-messenger)',
}
