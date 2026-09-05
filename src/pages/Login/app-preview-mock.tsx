import { BarChart3, Bell, Grid2x2, MessageCircle, Phone, Settings, Users } from 'lucide-react'

const railIcons = [
  { icon: MessageCircle, active: true },
  { icon: Users, active: false },
  { icon: BarChart3, active: false },
  { icon: Grid2x2, active: false },
  { icon: Phone, active: false },
  { icon: Settings, active: false },
]

const inboxRows = [
  { initials: 'RS', bg: '#7C5CF0', dot: '#25D366', name: 'Rahul Sharma', time: '10:30 AM', preview: 'Hi, I need help with my order', unread: 2, active: true },
  { initials: 'PP', bg: '#D4537E', dot: '#E1306C', name: 'Priya Patel', time: '10:28 AM', preview: 'When will my order arrive?' },
  { initials: 'AV', bg: '#378ADD', dot: '#0084FF', name: 'Amit Verma', time: '10:25 AM', preview: 'Thanks! That helped' },
  { initials: 'NS', bg: '#1D9E75', dot: '#8E8EA0', name: 'Neha Singh', time: '10:20 AM', preview: 'I want to return a product' },
  { initials: 'KM', bg: '#BA7517', dot: '#8E8EA0', name: 'Karan Mehta', time: '10:18 AM', preview: 'Do you have this in red?' },
]

export function AppPreviewMock() {
  return (
    <div className="grid h-[300px] grid-cols-[56px_1fr_1.15fr] overflow-hidden rounded-2xl bg-white shadow-[0_22px_50px_rgba(51,32,120,0.14),0_3px_10px_rgba(51,32,120,0.06)]">
      <div className="flex flex-col items-center gap-3.5 bg-[#26262E] py-3.5">
        <div className="mb-1.5 flex gap-1.5">
          <i className="size-2 rounded-full bg-[#FF5F57]" />
          <i className="size-2 rounded-full bg-[#FEBC2E]" />
          <i className="size-2 rounded-full bg-[#28C840]" />
        </div>
        {railIcons.map(({ icon: Icon, active }, i) => (
          <span
            key={i}
            className={`flex size-7 items-center justify-center rounded-lg ${active ? 'bg-primary' : 'bg-[#3A3A45]'}`}
          >
            <Icon className={`size-3.5 stroke-[1.8px] ${active ? 'text-white' : 'text-[#B9B9C6]'}`} />
          </span>
        ))}
        <span className="mt-auto size-[26px] rounded-full bg-gradient-to-br from-[#F0997B] to-[#D85A30]" />
        <Bell className="hidden size-0" aria-hidden />
      </div>

      <div className="flex flex-col border-r border-[#EFEDF5]">
        <h4 className="px-3.5 pt-3.5 pb-2.5 text-[14px] font-bold">Inbox</h4>
        {inboxRows.map((row) => (
          <div
            key={row.name}
            className={`flex gap-2.5 border-b border-[#F4F2F9] px-3.5 py-2.5 ${row.active ? 'bg-[#F7F5FF]' : ''}`}
          >
            <span
              className="relative flex size-[26px] shrink-0 items-center justify-center rounded-full text-[9px] font-semibold text-white"
              style={{ background: row.bg }}
            >
              {row.initials}
              <b className="absolute -right-0.5 -bottom-0.5 size-[11px] rounded-full border-[1.5px] border-white" style={{ background: row.dot }} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5 text-[10.5px] font-semibold">
                {row.name}
                <em className="ml-auto text-[8.5px] font-normal text-[#9C99AE] not-italic">{row.time}</em>
              </span>
              <span className="mt-0.5 block overflow-hidden text-[9.5px] text-ellipsis whitespace-nowrap text-[#9C99AE]">
                {row.preview}
              </span>
            </span>
            {row.unread && (
              <span className="h-fit shrink-0 rounded-full bg-[#22C55E] px-[5px] text-[8px] font-bold text-white">
                {row.unread}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2.5 border-b border-[#F4F2F9] px-3.5 py-3">
          <span className="flex size-7 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
            RS
          </span>
          <span>
            <span className="block text-[11px] font-bold">Rahul Sharma</span>
            <span className="text-[8.5px] font-semibold text-[#22C55E]">● WhatsApp</span>
          </span>
          <span className="ml-auto text-[13px] tracking-widest text-[#9C99AE]">•••</span>
        </div>
        <div className="flex flex-col gap-2.5 p-3.5">
          <div className="max-w-[74%] rounded-[11px] rounded-bl-[3px] bg-[#F3F2F8] px-2.5 py-2 text-[10.5px] leading-relaxed text-[#2A2A36]">
            Hi, I need help with my order
          </div>
          <div className="ml-auto max-w-[74%] rounded-[11px] rounded-br-[3px] bg-primary px-2.5 py-2 text-[10.5px] leading-relaxed text-white">
            Hello Rahul! 👋 How can I help you today?
          </div>
          <div className="flex w-fit gap-1 rounded-[11px] bg-[#F3F2F8] px-3 py-2">
            <i className="size-1.5 animate-bounce rounded-full bg-[#C3C0D2] [animation-delay:0ms]" />
            <i className="size-1.5 animate-bounce rounded-full bg-[#C3C0D2] [animation-delay:180ms]" />
            <i className="size-1.5 animate-bounce rounded-full bg-[#C3C0D2] [animation-delay:360ms]" />
          </div>
        </div>
      </div>
    </div>
  )
}
