import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/lib/utils'

import { AppPreviewMock } from './app-preview-mock'
import { type LoginFormValues, loginSchema } from './login-schema'

const brandLogos = ['boAt', 'lenskart', 'ZIVAME', 'mCaffeine', 'the moms co.']

export function Login() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const signIn = useAuthStore((s) => s.signIn)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [toast, setToast] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: true },
  })

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  const remember = watch('remember')

  function flashToast(text: string) {
    setToast(text)
    window.setTimeout(() => setToast(''), 2600)
  }

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 700))
    signIn()
    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-0">
      <div className="grid min-h-screen w-full grid-cols-1 overflow-hidden lg:grid-cols-[53fr_47fr]">
        {/* Left */}
        <section className="hidden flex-col gap-[30px] bg-gradient-to-b from-[#F4F0FE] to-[#EAF1FE] px-14 py-[52px] lg:flex">
          <div className="flex items-center gap-[13px]">
            <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CF0] to-primary text-2xl leading-none font-bold text-white">
              C
            </span>
            <b className="text-[29px] font-bold tracking-tight">Cheerio</b>
          </div>

          <h1 className="max-w-[13ch] text-[41px] leading-[1.24] font-semibold tracking-tight">
            AI-powered customer engagement platform
          </h1>
          <p className="max-w-[44ch] text-[17px] leading-relaxed text-muted-foreground">
            Automate conversations. Delight customers. Grow your business on every channel.
          </p>

          <AppPreviewMock />

          <p className="mt-auto text-[13.5px] text-muted-foreground">Trusted by 10,000+ businesses worldwide</p>
          <div className="flex flex-wrap items-center gap-8 text-[#9C99AE]">
            {brandLogos.map((logo) => (
              <span key={logo} className="text-[19px] font-semibold tracking-tight whitespace-nowrap">
                {logo}
              </span>
            ))}
          </div>
        </section>

        {/* Right */}
        <section className="flex flex-col justify-center px-6 py-10 sm:px-16 lg:px-[92px]">
          <div className="mx-auto w-full max-w-[500px]">
            <h2 className="text-center text-[37px] font-bold tracking-tight">Welcome back 👋</h2>
            <p className="mt-2 text-center text-base text-muted-foreground">Sign in to continue to your account</p>

            <form className="mt-9 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div>
                <label htmlFor="email" className="mb-2 block text-[14.5px] font-semibold">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={cn(
                    'w-full rounded-[11px] border-[1.5px] border-border bg-card px-[18px] py-4 text-[15px] transition-colors placeholder:text-[#A9A7BA] focus:border-primary focus:outline-none',
                    errors.email && 'border-[#E24B4A]',
                  )}
                  {...register('email')}
                />
              </div>

              <div>
                <label htmlFor="pw" className="mb-2 block text-[14.5px] font-semibold">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="pw"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className={cn(
                      'w-full rounded-[11px] border-[1.5px] border-border bg-card px-[18px] py-4 text-[15px] transition-colors placeholder:text-[#A9A7BA] focus:border-primary focus:outline-none',
                      errors.password && 'border-[#E24B4A]',
                    )}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute top-1/2 right-4 flex -translate-y-1/2 p-1 text-[#9C99AE]"
                  >
                    {showPassword ? <EyeOff className="size-[19px] stroke-[1.7px]" /> : <Eye className="size-[19px] stroke-[1.7px]" />}
                  </button>
                </div>
              </div>

              {(errors.email || errors.password) && (
                <p className="text-[13px] text-[#D93A39]">{errors.email?.message ?? errors.password?.message}</p>
              )}

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  aria-pressed={remember}
                  onClick={() => setValue('remember', !remember)}
                  className="flex items-center gap-2.5 text-[14.5px]"
                >
                  <span
                    className={cn(
                      'flex size-[21px] shrink-0 items-center justify-center rounded-md border-[1.5px] border-[#C9C6D8] bg-card',
                      remember && 'border-primary bg-primary',
                    )}
                  >
                    <CheckIcon className={cn('size-3 stroke-[2.6px] text-white', !remember && 'opacity-0')} />
                  </span>
                  Remember me
                </button>
                <button
                  type="button"
                  className="text-[14.5px] font-semibold text-primary"
                  onClick={() => flashToast('Password reset link sent to your email.')}
                >
                  Forgot password?
                </button>
              </div>

              <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full justify-center py-[18px] text-[16.5px] font-bold">
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </Button>

              <div className="flex items-center gap-4">
                <hr className="flex-1 border-border" />
                <span className="text-sm text-muted-foreground">or continue with</span>
                <hr className="flex-1 border-border" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={onSubmit}
                  className="flex items-center justify-center gap-[11px] rounded-[11px] border-[1.5px] border-border py-[15px] text-[14.5px] font-semibold hover:border-[#CFCBE2] hover:bg-[#FBFAFE]"
                >
                  <GoogleIcon /> Continue with Google
                </button>
                <button
                  type="button"
                  onClick={onSubmit}
                  className="flex items-center justify-center gap-[11px] rounded-[11px] border-[1.5px] border-border py-[15px] text-[14.5px] font-semibold hover:border-[#CFCBE2] hover:bg-[#FBFAFE]"
                >
                  <MicrosoftIcon /> Continue with Microsoft
                </button>
              </div>

              {toast && (
                <p className="mt-1 rounded-[11px] bg-[#E9F7EE] px-4 py-3.5 text-center text-sm font-medium text-[#127C3C]">
                  {toast}
                </p>
              )}
            </form>

            <p className="mt-8 text-center text-[15px] text-muted-foreground">
              Don&apos;t have an account?{' '}
              <button type="button" className="font-bold text-primary" onClick={() => flashToast('Opening sign up…')}>
                Sign up
              </button>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-[19px] shrink-0">
      <path fill="#4285F4" d="M45 24c0-1.6-.1-2.7-.4-4H24v7.5h12c-.2 2-1.6 5-4.5 7l6.9 5.3C42.5 36 45 30.6 45 24z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.4-5.2l-6.9-5.3c-1.9 1.3-4.4 2.2-7.5 2.2-5.7 0-10.6-3.8-12.3-9.1l-7.1 5.5C8.2 41.2 15.5 46 24 46z" />
      <path fill="#FBBC05" d="M11.7 28.6c-.5-1.3-.7-2.7-.7-4.1s.3-2.8.7-4.1l-7.1-5.5C3 17.8 2 20.8 2 24s1 6.2 2.6 9.1l7.1-4.5z" />
      <path fill="#EA4335" d="M24 10.6c3.2 0 5.4 1.4 6.6 2.5l5.9-5.8C32.9 4 27.9 2 24 2 15.5 2 8.2 6.8 4.6 14.9l7.1 5.5c1.7-5.3 6.6-9.8 12.3-9.8z" />
    </svg>
  )
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[19px] shrink-0">
      <path fill="#F25022" d="M2 2h9.5v9.5H2z" />
      <path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" />
      <path fill="#00A4EF" d="M2 12.5h9.5V22H2z" />
      <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
    </svg>
  )
}
