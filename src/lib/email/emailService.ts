import nodemailer from 'nodemailer';
import type { SendMailOptions } from 'nodemailer';
import { env } from '$env/dynamic/private';
const EMAIL_USER = env.EMAIL_USER;
const EMAIL_PASSWORD = env.EMAIL_PASSWORD;
console.log(EMAIL_USER, EMAIL_PASSWORD);
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // or your SMTP host
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: env.EMAIL_USER, // your email
    pass: env.EMAIL_PASSWORD, // your email password or app-specific password
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const mailOptions: SendMailOptions = {
    from: env.EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
} 