import { useState } from 'react'
import Icon from './Icon.jsx'

export default function Dropdown({ label, caption, align = 'right', width, className = '', title, children }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div className="dd">
      <button
        type="button"
        title={title}
        className={`dd-btn ${className}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {caption && <span className="cap">{caption}</span>}
        {label}
        <Icon name="down" />
      </button>
      {open && (
        <>
          <button type="button" className="dd-scrim" aria-label="Close menu" onClick={close} />
          <div className={`dd-menu${align === 'left' ? ' left' : ''}`} style={width ? { minWidth: width } : undefined} role="menu">
            {children(close)}
          </div>
        </>
      )}
    </div>
  )
}
