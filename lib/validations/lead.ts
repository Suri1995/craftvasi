import { z } from 'zod'

export const leadFormSchema = z.object({
  // Contact Info
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),

  // Project Details
  projectDescription: z.string().min(10, 'Please describe your project in at least 10 characters'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),

  // Questionnaire
  questions: z.object({
    q1: z.string().min(1, 'Please answer this question'),
    q2: z.string().min(1, 'Please answer this question'),
    q3: z.string().min(1, 'Please answer this question'),
    q4: z.string().min(1, 'Please answer this question'),
    q5: z.string().min(1, 'Please answer this question'),
    q6: z.string().min(1, 'Please answer this question'),
    q7: z.string().min(1, 'Please answer this question'),
    q8: z.string().min(1, 'Please answer this question'),
  }),

  // Additional
  additionalInfo: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms',
  }),
})

export type LeadFormData = z.infer<typeof leadFormSchema>
