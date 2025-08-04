const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password
  },
});

const sendContactEmail = async (contact) => {
  const sendAdminEmail = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: contact.email,
    subject: `New Contact Form Submission: ${contact.subject}`,
    html: `
  <h2>New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${contact.name}</p>
  <p><strong>Email:</strong> ${contact.email}</p>
  <p><strong>Mobile:</strong> ${contact.mobile}</p>
  <p><strong>Subject:</strong> ${contact.subject}</p>
  <p><strong>Message:</strong><br/> ${contact.message}</p>
`,
  };

  const sendUserEmail = {
    from: process.env.EMAIL_USER,
    to: contact.email,
    subject: "Thank you for contacting us",
    html: `
            Hi ${contact.name},

            Thank you for reaching out to SnapMart! We have received your message and will get back to you shortly.

            Best regards,
            The SnapMart Team
        `,
  };
  try {
    // Send email to admin
    await transporter.sendMail(sendAdminEmail);
    console.log("Admin contact email sent successfully");

    // Send confirmation email to user
    await transporter.sendMail(sendUserEmail);
    console.log("User confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending emails:", error);
  }
};
module.exports = sendContactEmail;
