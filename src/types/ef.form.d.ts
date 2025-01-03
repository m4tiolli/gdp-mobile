import { schema } from '@/schemas/ef.form.schema'
import { z } from 'zod'

export type FormEF = UseFormReturn<z.infer<typeof schema>>

export type Body = z.infer<typeof schema>