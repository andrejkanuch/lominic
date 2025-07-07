import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Resend } from 'resend'

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)
  private resend: Resend

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY')
    if (!apiKey) {
      this.logger.warn('RESEND_API_KEY not found in environment variables')
    } else {
      this.resend = new Resend(apiKey)
    }
  }

  async sendThankYouEmail(email: string, name: string): Promise<void> {
    if (!this.resend) {
      this.logger.error('Resend not initialized - missing API key')
      return
    }

    try {
      await this.resend.emails.send({
        from: 'Lominic <info@lominic.com>',
        to: [email],
        subject: 'Welcome to Lominic! 🎉',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; margin: 0;">Welcome to Lominic!</h1>
            </div>
            
            <div style="background-color: #f8fafc; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1e293b; margin-top: 0;">Hi ${name},</h2>
              
              <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
                Thank you for joining Lominic! We're excited to have you on board and can't wait to help you 
                achieve your fitness goals with our AI-powered training platform.
              </p>
              
              <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
                Here's what you can expect from Lominic:
              </p>
              
              <ul style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
                <li>🤖 AI-powered workout recommendations</li>
                <li>📊 Detailed analytics and progress tracking</li>
                <li>🎯 Personalized training plans</li>
                <li>📱 Seamless integration with your fitness devices</li>
              </ul>
              
              <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
                Ready to get started? Log in to your account and connect your fitness devices to begin your journey!
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://lominic.com/login" 
                 style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Get Started
              </a>
            </div>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 14px;">
              <p>If you have any questions, feel free to reach out to our support team.</p>
              <p>© 2024 Lominic. All rights reserved.</p>
            </div>
          </div>
        `,
      })

      this.logger.log(`Thank you email sent successfully to ${email}`)
    } catch (error) {
      this.logger.error(`Failed to send thank you email to ${email}:`, error)
      // Don't throw the error to avoid breaking the registration flow
    }
  }
}
