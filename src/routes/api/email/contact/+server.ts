import { env } from '$env/dynamic/private';
import { sendEmail } from '$lib/email/emailService';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { createNewContactFormSubmissionEmail } from '$lib/email/templates';
import { contactFormEmailList_dev, contactFormEmailList_live } from '$lib/email/emailLists';
const emailList = env.NODE_ENV === 'development' ? contactFormEmailList_dev : contactFormEmailList_live;
export const POST: RequestHandler = async ({ request }) => {
  const { name, email, phone, message } = await request.json();
  if (!name || !email || !phone || !message) {
    return json({ success: false, error: 'Missing required fields' }, { status: 400 });
  }
  try {

    const emailHtml = createNewContactFormSubmissionEmail({
      name,
      email,
      phone,
      message,
    });


    const result = await sendEmail({
      to: emailList.join(','), // This will send to your email address
      subject: `✉️ MacroExotics™ New Contact Form Submission`,
      html: emailHtml

    });

    if (result.success) {
      return json({ success: true });
    } else {
      return json({ success: false, error: 'Failed to send message' }, { status: 500 });
    }
  } catch (error) {
    return json({ success: false, error: 'Failed to send message' }, { status: 500 });
  }
}; 