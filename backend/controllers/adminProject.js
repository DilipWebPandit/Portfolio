import adminProjectModel from "../models/adminUploadDetails.js";
import transporter from "../config/nodemailerConfig.js";

import dotenv from "dotenv";
dotenv.config();

export const uploadProject = async (req, res) => {
  const { title, frontEnd, backend, projDescription } = req.body;

  try {
    console.log("req body:", req.body);

    const imageUrl = req.file?.path;

    const uploadProjectDetails = {
      title,
      webImage: imageUrl,
      frontEnd: [].concat(frontEnd || []),
      backend: [].concat(backend || []),
      projDescription,
    };

    const newProjectDetails = new adminProjectModel(uploadProjectDetails);

    await newProjectDetails.save();

    res.send({ success: true, message: "uploaded successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Failed to upload ${error.message}` });
  }
};

export const sendMail = async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).send({
      success: false,
      message: "Name, email, and message are required",
    });
  }

  try {
    // First email to you
    const receiverMailOptions = {
      from: process.env.SENDER_MAIL, // Changed: must be your verified Brevo email
      to: process.env.ADMIN,
      replyTo: email, // This allows you to reply directly to the user
      subject: "New Portfolio Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // console.log("Sending first email...");
    await transporter.sendMail(receiverMailOptions);

    // Confirmation email to sender
    const senderMailOptions = {
      from: process.env.SENDER_MAIL,
      to: email,
      subject: "Thank you for reaching out!",
      text: `Hi ${name},

Thank you for contacting me through my portfolio website. I appreciate your message and will respond shortly.  
If your request is time-sensitive, please let me know in your reply.

Best regards,  
Dilip Kumar  
Full Stack Developer  
Portfolio: dilipkumar.vercel.app  
LinkedIn: linkedin.com/in/dilipkumar  
GitHub: <a href="www.linkedin.com/in/dilip-kumar-6533a424b">github.com/dilipkumar</a>`,
    };

    await transporter.sendMail(senderMailOptions);

    res.status(200).send({
      success: true,
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.error("❌ Email sending failed:");
    res.status(500).send({
      success: false,
      message: `Email failed: ${error.message}`,
    });
  }
};
