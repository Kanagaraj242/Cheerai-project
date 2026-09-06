const ICONS = {
  bolt: <path d="M13 2.5 4.5 13.5H11l-1 8L19.5 10H13z" />,
  robot: <><rect x="3.5" y="8" width="17" height="12" rx="3" /><path d="M12 4.5V8M8.5 13.5h.01M15.5 13.5h.01M9.5 17h5" /></>,
  plug: <path d="M10 3.5h4v3a2 2 0 0 0 2 2h3v4h-3a2 2 0 0 0-2 2v3h-4v-3a2 2 0 0 0-2-2H5v-4h3a2 2 0 0 0 2-2z" />,
  flow: <><rect x="9" y="2.5" width="6" height="5" rx="1.5" /><rect x="2.5" y="16.5" width="6" height="5" rx="1.5" /><rect x="15.5" y="16.5" width="6" height="5" rx="1.5" /><path d="M12 7.5v4.5M5.5 16.5V12h13v4.5" /></>,
  send: <><path d="M21.5 2.5 2.5 10l7.6 2.9L13 20.5z" /><path d="m10.1 12.9 4.3-4.3" /></>,
  chat: <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.5-.7L3 21l1.8-5.1A8.3 8.3 0 0 1 3.6 11.5 8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4z" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5.2l3.2 2" /></>,
  spark: <><path d="m12 3 2 5.4 5.4 2-5.4 2-2 5.4-2-5.4-5.4-2 5.4-2z" /><path d="M18.5 15.5 19.4 18l2.5.9-2.5.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9z" /></>,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  warn: <><path d="M12 3.5 21.5 20H2.5z" /><path d="M12 10v4M12 17h.01" /></>,
  filter: <path d="M3.5 5.5h17l-6.5 8v6l-4 2v-8z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  play: <path d="M7 4.5 19 12 7 19.5z" />,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>,
  cart: <><path d="M3 4h2.2l2.3 11.5h10.2L20 7.5H6" /><circle cx="9" cy="19.5" r="1.6" /><circle cx="17.5" cy="19.5" r="1.6" /></>,
  tag: <><path d="M3.5 11.5V4.5h7l10 10-7 7z" /><circle cx="7.5" cy="8.5" r="1.3" /></>,
  head: <><path d="M4 13a8 8 0 0 1 16 0" /><rect x="2.5" y="13" width="4" height="6" rx="2" /><rect x="17.5" y="13" width="4" height="6" rx="2" /><path d="M20 19v.5a2.5 2.5 0 0 1-2.5 2.5H13" /></>,
  refresh: <><path d="M20 11a8 8 0 0 0-14-4.5L3.5 9M4 13a8 8 0 0 0 14 4.5L20.5 15" /><path d="M3.5 4.5V9H8M20.5 19.5V15H16" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  bell: <path d="M18 8.5a6 6 0 1 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 14.5 18 8.5zM13.7 19.5a2 2 0 0 1-3.4 0" />,
  help: <><circle cx="12" cy="12" r="9.5" /><path d="M9.6 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .9-1 1.6v.3M12 17h.01" /></>,
  home: <path d="M3 10.2 12 3l9 7.2V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  contacts: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></>,
}

export default function Icon({ name, className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style}>
      {ICONS[name] ?? null}
    </svg>
  )
}

export function AiTag({ state }) {
  if (state === 'handling') return <span className="tag t-br"><Icon name="robot" />AI handling</span>
  if (state === 'waiting') return <span className="tag t-wn">Needs a human</span>
  if (state === 'escalated') return <span className="tag t-dg">Escalated</span>
  if (state === 'resolved') return <span className="tag t-ok">Resolved</span>
  if (state === 'blocked') return <span className="tag t-nt">Blocked</span>
  return null
}

export function SessTag({ conv }) {
  if (conv.sess === 'open') return <span className="tag t-ok">Window open</span>
  if (conv.sess === 'closing') return <span className="tag t-wn">{conv.mins}m left</span>
  if (conv.sess === 'closed') return <span className="tag t-nt">Template only</span>
  return null
}
