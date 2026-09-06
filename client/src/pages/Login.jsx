import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function EyeIcon({ shown }) {
  return shown ? (
    <svg viewBox="0 0 24 24">
      <path d="M2 12s3.6-7 10-7c2 0 3.7.6 5.2 1.5M22 12s-3.6 7-10 7c-2 0-3.8-.6-5.3-1.6" />
      <path d="M4 4l16 16" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function LeftPanel() {
  return (
    <section className="left">
      <div className="logo">
        <span className="mark">C</span>
        <b>Cheerio</b>
      </div>

      <h1 className="headline">AI-powered customer engagement platform</h1>
      <p className="blurb">Automate conversations. Delight customers. Grow your business on every channel.</p>

      <div className="mock">
        <div className="rail">
          <div className="tl">
            <i style={{ background: '#FF5F57' }}></i>
            <i style={{ background: '#FEBC2E' }}></i>
            <i style={{ background: '#28C840' }}></i>
          </div>
          <span className="ric on">
            <svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z" /></svg>
          </span>
          <span className="ric">
            <svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M17 11a3 3 0 1 0 0-6" /></svg>
          </span>
          <span className="ric">
            <svg viewBox="0 0 24 24"><path d="M5 20V10M12 20V4M19 20v-7" /></svg>
          </span>
          <span className="ric">
            <svg viewBox="0 0 24 24"><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><circle cx="12" cy="6" r="2" /><path d="M12 8v3M6 16v-2h12v2" /></svg>
          </span>
          <span className="ric">
            <svg viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 5v3M9 13h.01M15 13h.01" /></svg>
          </span>
          <span className="ric">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2" /></svg>
          </span>
          <span className="me"></span>
        </div>

        <div className="mlist">
          <h4>Inbox</h4>
          <div className="mrow on">
            <span className="avt" style={{ background: '#7C5CF0' }}>RS<b style={{ background: '#25D366' }}></b></span>
            <span className="tx"><span className="n">Rahul Sharma<em>10:30 AM</em></span><span className="p">Hi, I need help with my order</span></span>
            <span className="unread">2</span>
          </div>
          <div className="mrow">
            <span className="avt" style={{ background: '#D4537E' }}>PP<b style={{ background: '#E1306C' }}></b></span>
            <span className="tx"><span className="n">Priya Patel<em>10:28 AM</em></span><span className="p">When will my order arrive?</span></span>
          </div>
          <div className="mrow">
            <span className="avt" style={{ background: '#378ADD' }}>AV<b style={{ background: '#0084FF' }}></b></span>
            <span className="tx"><span className="n">Amit Verma<em>10:25 AM</em></span><span className="p">Thanks! That helped</span></span>
          </div>
          <div className="mrow">
            <span className="avt" style={{ background: '#1D9E75' }}>NS<b style={{ background: '#8E8EA0' }}></b></span>
            <span className="tx"><span className="n">Neha Singh<em>10:20 AM</em></span><span className="p">I want to return a product</span></span>
          </div>
          <div className="mrow">
            <span className="avt" style={{ background: '#BA7517' }}>KM<b style={{ background: '#8E8EA0' }}></b></span>
            <span className="tx"><span className="n">Karan Mehta<em>10:18 AM</em></span><span className="p">Do you have this in red?</span></span>
          </div>
        </div>

        <div className="mchat">
          <div className="mchead">
            <span className="avt" style={{ background: '#7C5CF0', width: 28, height: 28, fontSize: 10 }}>RS</span>
            <span><span className="nm">Rahul Sharma</span><br /><span className="ch">● WhatsApp</span></span>
            <span className="dots">•••</span>
          </div>
          <div className="mbody">
            <div className="mb them">Hi, I need help with my order<span className="ts">10:30 AM</span></div>
            <div className="mb us">Hello Rahul! 👋 How can I help you today?<span className="ts">10:30 AM ✓✓</span></div>
            <div className="typing"><i></i><i></i><i></i></div>
          </div>
        </div>
      </div>

      <p className="trust">Trusted by 10,000+ businesses worldwide</p>
      <div className="logos">
        <span>boAt</span>
        <span>lenskart</span>
        <span className="l2">ZIVAME</span>
        <span>mCaffeine</span>
        <span className="l3">the moms co.</span>
      </div>
    </section>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState({ text: '', field: null })
  const [signingIn, setSigningIn] = useState(false)
  const [doneMsg, setDoneMsg] = useState('')
  const doneTimer = useRef(null)

  const clearError = () => setError({ text: '', field: null })

  const flash = (text) => {
    setDoneMsg(text)
    clearTimeout(doneTimer.current)
    doneTimer.current = setTimeout(() => setDoneMsg(''), 2600)
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    clearError()
    const trimmedEmail = email.trim()
    if (!trimmedEmail) return setError({ text: 'Enter your email address.', field: 'email' })
    if (!EMAIL_RE.test(trimmedEmail)) return setError({ text: "That email address doesn't look right.", field: 'email' })
    if (!password) return setError({ text: 'Enter your password.', field: 'password' })
    if (password.length < 6) return setError({ text: 'Your password is at least 6 characters.', field: 'password' })

    setSigningIn(true)
    setTimeout(() => {
      setSigningIn(false)
      navigate('/dashboard')
    }, 700)
  }

  const handleSso = () => navigate('/dashboard')

  return (
    <div id="signin">
      <div className="shell">
        <LeftPanel />

        <section className="right">
          <div className="rin">
            <h2 className="wb">Welcome back 👋</h2>
            <p className="sub">Sign in to continue to your account</p>

            <form className="form" onSubmit={handleSignIn}>
              <div>
                <label htmlFor="email">Email address</label>
                <div className={`inp${error.field === 'email' ? ' bad' : ''}`}>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); clearError() }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="pw">Password</label>
                <div className={`inp${error.field === 'password' ? ' bad' : ''}`}>
                  <input
                    id="pw"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); clearError() }}
                  />
                  <button
                    type="button"
                    className="eye"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    <EyeIcon shown={showPassword} />
                  </button>
                </div>
              </div>

              <p className={`msg${error.text ? ' show' : ''}`}>{error.text}</p>

              <div className="opts">
                <button
                  type="button"
                  className="rem"
                  aria-pressed={remember}
                  onClick={() => setRemember((r) => !r)}
                >
                  <span className={`box${remember ? ' on' : ''}`}>
                    <svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5" /></svg>
                  </span>
                  Remember me
                </button>
                <button type="button" className="forgot" onClick={() => flash('Password reset link sent to your email.')}>
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="signin" disabled={signingIn}>
                {signingIn ? 'Signing in…' : 'Sign in'}
              </button>

              <div className="div"><hr /><span>or continue with</span><hr /></div>

              <div className="sso">
                <button type="button" onClick={handleSso}>
                  <svg viewBox="0 0 48 48">
                    <path fill="#4285F4" d="M45 24c0-1.6-.1-2.7-.4-4H24v7.5h12c-.2 2-1.6 5-4.5 7l6.9 5.3C42.5 36 45 30.6 45 24z" />
                    <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.4-5.2l-6.9-5.3c-1.9 1.3-4.4 2.2-7.5 2.2-5.7 0-10.6-3.8-12.3-9.1l-7.1 5.5C8.2 41.2 15.5 46 24 46z" />
                    <path fill="#FBBC05" d="M11.7 28.6c-.5-1.3-.7-2.7-.7-4.1s.3-2.8.7-4.1l-7.1-5.5C3 17.8 2 20.8 2 24s1 6.2 2.6 9.1l7.1-4.5z" />
                    <path fill="#EA4335" d="M24 10.6c3.2 0 5.4 1.4 6.6 2.5l5.9-5.8C32.9 4 27.9 2 24 2 15.5 2 8.2 6.8 4.6 14.9l7.1 5.5c1.7-5.3 6.6-9.8 12.3-9.8z" />
                  </svg>
                  Continue with Google
                </button>
                <button type="button" onClick={handleSso}>
                  <svg viewBox="0 0 24 24">
                    <path fill="#F25022" d="M2 2h9.5v9.5H2z" />
                    <path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" />
                    <path fill="#00A4EF" d="M2 12.5h9.5V22H2z" />
                    <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
                  </svg>
                  Continue with Microsoft
                </button>
              </div>

              <p className={`done${doneMsg ? ' show' : ''}`}>{doneMsg}</p>
            </form>

            <p className="foot">
              Don&apos;t have an account? <b onClick={() => flash('Opening sign up…')}>Sign up</b>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
