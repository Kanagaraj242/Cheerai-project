import * as LabelPrimitive from '@radix-ui/react-label'
import type * as React from 'react'

import { cn } from '@/lib/utils'

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'text-[11px] font-semibold tracking-wide text-muted-foreground uppercase select-none',
        className,
      )}
      {...props}
    />
  )
}

export { Label }
