import type { Channel } from './channel'

export type CampaignStatus = 'Running' | 'Completed' | 'Scheduled' | 'Draft'
export type CampaignType = 'Promotional' | 'Transactional' | 'Retention'

export interface Campaign {
  id: number
  name: string
  type: CampaignType
  channel: Channel
  status: CampaignStatus
  audience: string
  size: number
  sent: number
  delivered: number
  read: number
  clicked: number
  converted: number
  revenue: string
  spend: string
  cpa: string
  schedule: string
  template: string
  aiGenerated: boolean
}
