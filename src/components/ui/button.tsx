import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-[10px] text-[13px] font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-[15px] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          'border border-border bg-card text-muted-foreground-2 shadow-card hover:bg-card-soft hover:border-[#DCDDE9]',
        primary:
          'border border-primary bg-primary text-primary-foreground shadow-[0_1px_2px_rgba(91,52,224,0.28)] hover:bg-primary-hover hover:border-primary-hover',
        ghost: 'border border-transparent bg-transparent text-muted-foreground-2 hover:bg-card-soft',
        destructive: 'border border-transparent bg-transparent text-destructive hover:bg-destructive-soft',
        outline: 'border border-border bg-transparent text-foreground hover:bg-card-soft',
      },
      size: {
        default: 'px-3.5 py-2.5',
        sm: 'px-[11px] py-[6.5px] text-xs rounded-[9px]',
        icon: 'size-9 rounded-[10px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
