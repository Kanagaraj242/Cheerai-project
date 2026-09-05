import { LayoutDashboard, MessageSquare, Plug, Users, Workflow, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  badge?: string
}

export const primaryNav: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/inbox', label: 'Inbox', icon: MessageSquare, badge: '14' },
  { to: '/contacts', label: 'Contacts', icon: Users },
  { to: '/campaigns', label: 'Campaigns', icon: Zap },
]

export const automationNav: NavItem[] = [
  { to: '/workflows', label: 'Workflows', icon: Workflow },
  { to: '/connectors', label: 'Connectors & Agents', icon: Plug },
]
