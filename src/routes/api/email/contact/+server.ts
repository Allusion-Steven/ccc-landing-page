// Commented out for now because svelte-email is not working due to the way the email is being rendered with svelte 5
// TODO: Fix svelte-email to work with svelte 5 will probably be an update to the library

// // src/routes/emails/hello/+server.ts
// import { render } from "svelte-email";
// // import ContactEmail from "$lib/Emails/ContactEmail.svelte";
// import ContactEmail from "$lib/assets/components/Emails/ContactEmail.svelte";
// import { contactEmailList, DEV_EmailList } from "$lib/utils/NotificationEmailLists.js";
// import nodemailer from "nodemailer";
// import { isLive } from "$lib";
// import { json } from "@sveltejs/kit";

// // if live send to full list of receipients, else send to dev list
// let recipients = isLive ? contactEmailList : DEV_EmailList
// export async function POST({ request }) {
//     try {
//         const data = await request.json(); //get json from request
//         console.log(" new request email data :  ", data);
//         const { email, phone, f_name, l_name, message } = data;



//         if (!email || !phone || !f_name || !l_name || !message) {
//             //return error if missing request data
//             return json({ message: "Missing required fields" }, { status: 400 });
//         }
//         console.log("sending email to:");
//         console.log("email: ", email, "phone: ", phone, "f_name: ", f_name, "l_name: ", l_name, "message: ", message);

//         const emailHtml = render({
//             template: ContactEmail,
//             props: { email, phone, f_name, l_name, message },
//         });

//         const transporter = nodemailer.createTransport({
//             //@ts-ignore
//             host: "smtp.gmail.com",
//             port: 587,
//             secure: false,
//             from: "hello@wrenchtc.com",
//             auth: {
//                 name: "Wrench Totalcare & Wrench TotalCare Plus",
//                 user: "hello@wrenchtc.com",
//                 pass: "hmrwuamyetqymszg",
//             },
//         });
//         const mailOptions = {
//             name: "Wrench Totalcare",
//             from: "hello@wrenchtc.com",
//             to: recipients,
//             subject: `Wrench Totalcare | Contact Form Submission 📨 | ${f_name} ${l_name} ${email} `,
//             html: emailHtml,
//         };
//         await transporter.sendMail(mailOptions); //send
//         return json({ message: `Success! ✅ Thank you for your message, ${f_name}. We'll get back to you as soon as possible with ${email}, or at ${phone}.` }, { status: 200 });
//     } catch (error) {
//         console.error("An error occurred while fetching the data.", error);
//         //@ts-ignore
//         return json({ message: error.message }, { status: 500 });
//     }
// }
