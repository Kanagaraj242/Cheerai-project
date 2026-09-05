import type { WorkflowNodeTone } from '@/types'

export const NODE_TONE_STYLES: Record<WorkflowNodeTone, { text: string; bg: string }> = {
  brand: { text: 'var(--color-primary)', bg: 'var(--color-primary-soft)' },
  success: { text: 'var(--color-success)', bg: 'var(--color-success-soft)' },
  warning: { text: 'var(--color-warning)', bg: 'var(--color-warning-soft)' },
  neutral: { text: 'var(--color-muted-foreground)', bg: 'var(--color-muted)' },
  destructive: { text: 'var(--color-destructive)', bg: 'var(--color-destructive-soft)' },
}
