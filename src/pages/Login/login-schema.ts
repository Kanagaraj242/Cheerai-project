import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Enter your email address.').email("That email address doesn't look right."),
  password: z.string().min(6, 'Your password is at least 6 characters.'),
  remember: z.boolean(),
})

export type LoginFormValues = z.infer<typeof loginSchema>
