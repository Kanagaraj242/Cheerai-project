import { Bell, HelpCircle, Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'

import { PAGE_TITLES } from '@/components/navigation/page-titles'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/stores/auth-store'

export function Topbar() {
  const location = useLocation()
  const { userName, userRole, signOut } = useAuthStore()
  const [title, subtitle] = PAGE_TITLES[location.pathname] ?? ['Dashboard', 'Overview of your automation']

  return (
    <header className="sticky top-0 z-20 flex h-[68px] shrink-0 items-center gap-3.5 border-b border-border bg-white/86 px-7 backdrop-blur-md">
      <div>
        <h1 className="text-[19px] leading-none font-semibold tracking-tight">{title}</h1>
        <div className="mt-px text-[12.5px] text-muted-foreground">{subtitle}</div>
      </div>
      <div className="flex-1" />
      <div className="flex w-[260px] items-center gap-2.5 rounded-[10px] border border-border bg-card-soft px-3 py-2 text-[12.5px] text-muted-foreground">
        <Search className="size-[15px] stroke-[1.9px]" />
        <span>Search or ask Cheerio…</span>
      </div>
      <button
        type="button"
        className="flex size-9 items-center justify-center rounded-[10px] text-muted-foreground-2 hover:bg-card-soft"
      >
        <HelpCircle className="size-[18px] stroke-[1.7px]" />
      </button>
      <button
        type="button"
        className="relative flex size-9 items-center justify-center rounded-[10px] text-muted-foreground-2 hover:bg-card-soft"
      >
        <Bell className="size-[18px] stroke-[1.7px]" />
        <span className="absolute top-1.5 right-1.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full border-2 border-card bg-destructive px-1 text-[9px] font-bold text-white">
          12
        </span>
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-2.5 rounded-[10px] py-[5px] pr-2 pl-[5px] hover:bg-card-soft"
          >
            <Avatar className="size-8 text-[11.5px]">
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <span className="text-left">
              <div className="text-[12.5px] leading-tight font-semibold">{userName}</div>
              <div className="text-[11px] text-muted-foreground">{userRole}</div>
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
