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
  image: <><rect x="3" y="4.5" width="18" height="15" rx="3" /><circle cx="8.5" cy="10" r="1.8" /><path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5" /></>,
  smile: <><circle cx="12" cy="12" r="9" /><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01" /></>,
  note: <><path d="M5 3.5h14a1 1 0 0 1 1 1V15l-5 5.5H5a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1z" /><path d="M20 15h-5v5.5" /></>,
  doc: <><path d="M6 2.5h7l5 5v14H6z" /><path d="M13 2.5v5h5M9 13h6M9 17h4" /></>,
  reply: <><path d="M9 7 4 12l5 5" /><path d="M4 12h9a6 6 0 0 1 6 6v1" /></>,
  more: <><circle cx="5.5" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="18.5" cy="12" r="1.4" /></>,
  down: <path d="m6 9.5 6 6 6-6" />,
  up2: <path d="m6 14.5 6-6 6 6" />,
  left: <path d="m14 6-6 6 6 6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  trash: <><path d="M4 6.5h16M9.5 6.5V4h5v2.5" /><path d="M6.5 6.5 7.5 21h9l1-14.5" /><path d="M10 10.5v6.5M14 10.5v6.5" /></>,
  copy: <><rect x="8.5" y="8.5" width="12" height="12" rx="2.5" /><path d="M15.5 5.5A2 2 0 0 0 13.5 3.5H6a2.5 2.5 0 0 0-2.5 2.5v7.5a2 2 0 0 0 2 2" /></>,
  zin: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5M11 8v6M8 11h6" /></>,
  zout: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5M8 11h6" /></>,
  fit: <path d="M3.5 8.5v-4a1 1 0 0 1 1-1h4M15.5 3.5h4a1 1 0 0 1 1 1v4M20.5 15.5v4a1 1 0 0 1-1 1h-4M8.5 20.5h-4a1 1 0 0 1-1-1v-4" />,
  drag: <><circle cx="9" cy="6" r="1.3" /><circle cx="15" cy="6" r="1.3" /><circle cx="9" cy="12" r="1.3" /><circle cx="15" cy="12" r="1.3" /><circle cx="9" cy="18" r="1.3" /><circle cx="15" cy="18" r="1.3" /></>,
  mail: <><rect x="2.5" y="5" width="19" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" /></>,
  phone: <path d="M7 3.5h10a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5z" />,
  history: <><path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" /><path d="M3.5 4.5V10H9" /><path d="M12 7.5V12l3 1.8" /></>,
  save: <><path d="M4.5 5.5A1 1 0 0 1 5.5 4.5h10L19.5 8.5v10a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1z" /><path d="M8 4.5v5h7v-5M8 19.5v-6h8v6" /></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></>,
  pin: <><path d="M12 21v-6" /><path d="M8 3.5h8l-1 5 3 3.5H6l3-3.5z" /></>,
  link: <><path d="M10 14a4 4 0 0 1 0-5.7l2.6-2.6a4 4 0 0 1 5.7 5.7L17 12.7" /><path d="M14 10a4 4 0 0 1 0 5.7l-2.6 2.6a4 4 0 0 1-5.7-5.7L7 11.3" /></>,
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
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
