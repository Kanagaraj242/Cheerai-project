export interface ActivityItem {
  id: number
  tone: 'success' | 'brand' | 'warning' | 'destructive'
  html: string
  meta: string
}

export interface Recommendation {
  id: number
  icon: string
  title: string
  description: string
  actionLabel: string
}

export interface ContactTimelineEvent {
  kind: 'AGENT' | 'PERSON' | 'ORDER' | 'WORKFLOW' | 'CAMPAIGN'
  color: string
  title: string
  detail?: string
  time: string
}
