import { Resend } from 'resend';
import type { ReactElement } from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  react: ReactElement;
}

export async function sendEmail({ to, subject, react }: SendEmailOptions) {
  const from = process.env.RESEND_FROM_EMAIL || 'noreply@resend.dev';

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    react,
  });

  if (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }

  return { success: true, data };
}
