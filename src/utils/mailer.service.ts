import nodemailer, { Transporter } from 'nodemailer';
import { envConfig } from '../config/env.config';

export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envConfig.email.host,
      port: envConfig.email.port,
      secure: false,
      auth: {
        user: envConfig.email.user,
        pass: envConfig.email.pass,
      },
    })
  }

  async sendMail(
    to: string | string[],
    subject: string,
    message: {
      text?: string;
      html?: string;
      cc?: string[];
      attachments?: Array<{ filename: string; content: Buffer | string }>;
    },
    senderName = 'Your App'
  ): Promise<void> {
    if (!to) return;

    const from = `${senderName} <${envConfig.email.from}>`;

    const mailOptions = {
      from,
      to,
      subject,
      text: message.text,
      html: message.html,
      cc: message.cc,
      attachments: message.attachments || [],
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`📨 Email sent: ${info.response}`);
    } catch (err: any) {
      console.error(`❌ Failed to send email: ${err.message}`);
      throw new Error('Unexpected error while sending email.');
    }
  }
}
