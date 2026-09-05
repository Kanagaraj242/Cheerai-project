import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { automationNav, primaryNav } from '@/components/navigation/nav-items'
import { cn } from '@/lib/utils'

export function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-[248px] shrink-0 flex-col gap-px overflow-y-auto border-r border-border bg-card px-3.5 pt-[18px] pb-3.5">
      <div className="flex items-center gap-[11px] px-2 pb-5">
        <span className="flex size-8 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#8A6BF5] to-primary text-[19px] leading-none font-bold text-white">
          C
        </span>
        <b className="text-[19px] font-bold tracking-tight text-primary">Cheerio AI</b>
      </div>

      <nav className="flex flex-col gap-px">
        {primaryNav.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>

      <div className="px-2.5 pt-[18px] pb-[7px] text-[10px] font-semibold tracking-[0.1em] text-muted-foreground-3">
        AUTOMATION
      </div>
      <nav className="flex flex-col gap-px">
        {automationNav.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-2 rounded-xl border border-border p-3.5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[12.5px] font-semibold">Automation tasks</span>
          <span className="num text-xs text-muted-foreground">62%</span>
        </div>
        <Progress value={62} />
        <div className="num text-xs text-muted-foreground">31,240 of 50,000 used · resets in 12 days</div>
        <Button size="sm" className="justify-center">
          Upgrade plan
        </Button>
      </div>
    </aside>
  )
}

function NavItem({ to, label, icon: Icon, badge }: (typeof primaryNav)[number]) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex w-full items-center gap-3 rounded-[10px] px-[11px] py-[9.5px] text-left text-[13.5px] leading-none text-muted-foreground-2 transition-colors hover:bg-card-soft',
          isActive && 'bg-primary-soft font-semibold text-primary hover:bg-primary-soft',
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={cn('size-[18px] stroke-[1.7px] text-muted-foreground', isActive && 'text-primary')} />
          <span className="flex-1">{label}</span>
          {badge && (
            <span className="rounded-full bg-primary-soft px-[7px] py-[1.5px] text-[11px] font-semibold text-primary">
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}
