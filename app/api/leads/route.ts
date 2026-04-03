import { neon } from '@neondatabase/serverless'
import { Resend } from 'resend'
import { leadFormSchema } from '@/lib/validations/lead'

const sql = neon(process.env.DATABASE_URL!)
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate form data
    const validatedData = leadFormSchema.parse(body)

    // Insert into database
    const result = await sql`
      INSERT INTO leads (
        first_name,
        last_name,
        email,
        phone,
        company,
        project_description,
        budget,
        timeline,
        questions,
        additional_info,
        agree_to_terms,
        created_at
      ) VALUES (
        ${validatedData.firstName},
        ${validatedData.lastName},
        ${validatedData.email},
        ${validatedData.phone},
        ${validatedData.company},
        ${validatedData.projectDescription},
        ${validatedData.budget},
        ${validatedData.timeline},
        ${JSON.stringify(validatedData.questions)},
        ${validatedData.additionalInfo || null},
        ${validatedData.agreeToTerms},
        NOW()
      )
      RETURNING id, created_at
    `

    const leadId = result[0].id

    // Send confirmation email to user
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: validatedData.email,
      subject: 'We Received Your Project Inquiry',
      html: `
        <h2>Thank you for your inquiry!</h2>
        <p>Hi ${validatedData.firstName},</p>
        <p>We have received your project submission and will review it shortly. Our team will contact you within 24-48 hours.</p>
        <p><strong>Your Reference ID:</strong> ${leadId}</p>
        <p>Best regards,<br/>Our Team</p>
      `,
    })

    // Send notification email to admin
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.ADMIN_EMAIL || 'admin@example.com',
      subject: `New Project Inquiry: ${validatedData.company}`,
      html: `
        <h2>New Lead Submission</h2>
        <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone}</p>
        <p><strong>Company:</strong> ${validatedData.company}</p>
        <p><strong>Budget:</strong> ${validatedData.budget}</p>
        <p><strong>Timeline:</strong> ${validatedData.timeline}</p>
        <p><strong>Project Description:</strong></p>
        <p>${validatedData.projectDescription}</p>
        <p><strong>Reference ID:</strong> ${leadId}</p>
      `,
    })

    return Response.json(
      {
        success: true,
        message: 'Form submitted successfully',
        leadId,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Form submission error:', error)

    if (error instanceof Error && error.message.includes('Validation')) {
      return Response.json(
        { success: false, error: error.message },
        { status: 400 }
      )
    }

    return Response.json(
      { success: false, error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
