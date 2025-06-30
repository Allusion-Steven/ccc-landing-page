

// export function createContactFormSubmissionEmail(name: string, email: string, message: string) {
//   return `
//       <h2> ✉️ New JXLOGIC Contact Form Submission</h2>
//       <p><strong>From:</strong> ${name} (${email})</p>
//       <p><strong>Message:</strong></p>
//       <p>${message.replace(/\n/g, '<br>')}</p>
//   `;
// }


export function createNewContactFormSubmissionEmail({
  name,
  email,
  phone,
  message,

}: {
  name: string;
  email?: string;
  phone?: string;
  message: string;

}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to MacroExotics™ </title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif; background-color: #f9f9f9; color: #333333;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-spacing: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #282828, #4842b7);">
            <img src="https://www.macroexotics.com/favicon.png" alt="macroexotics Logo" style="width: 180px; height: auto; margin: 0 auto;">
          </td>
        </tr>
        
        <!-- Main Content -->
        <tr>
          <td style="padding: 40px 30px;">
            <h1 style="margin: 0 0 20px; font-size: 28px; font-weight: 700; color: #030267;">New Contact Form Submission</h1>
            <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6;">
              ${message.replace(/\n/g, '<br>')}</p>
            <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6;">
              <strong>Name:</strong> ${name}
            </p>
            <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6;">
              <strong>Email:</strong> ${email}
            </p>
            <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6;">
              <strong>Phone:</strong> ${phone}
          </td>
        </tr>
      
        
        <!-- Footer -->
        <tr>
          <td style="padding: 30px; text-align: center; background-color: #282828; color: #ffffff;">
            <h3 style="margin: 0 0 20px; font-size: 18px; font-weight: 600;">Need Help?</h3>
            
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 400px; margin: 0 auto; border-spacing: 0;">
              
              <tr>
                <td style="padding: 8px 0; text-align: center;">
                  <a href="https://www.macroexotics.com/" style="color: #ffffff; text-decoration: none; font-size: 14px;">
                    macroexotics.com
                  </a>
                </td>
              </tr>
            </table>
            
            <div style="margin: 30px 0 0; padding: 20px 0 0; border-top: 1px solid rgba(255,255,255,0.3); font-size: 12px; color: rgba(255,255,255,0.8);">
              <p style="margin: 0;">
                &copy; ${new Date().getFullYear()} MacroExotics™ <sup>&#174;</sup> All rights reserved
              </p>
              <p style="margin: 10px 0 0;">
                <a href="https://www.macroexotics.com/privacy" style="color: rgba(255,255,255,0.8); text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                <a href="https://www.macroexotics.com/tos" style="color: rgba(255,255,255,0.8); text-decoration: none; margin: 0 10px;">Terms of Service</a>
              </p>
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

