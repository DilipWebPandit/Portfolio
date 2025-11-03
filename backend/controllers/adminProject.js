import adminProjectModel from "../models/adminUploadDetails.js";
import transporter from "../config/nodemailerConfig.js";
import brevoClient from "../config/brevoClient.js";
import axios from "axios";

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

  console.log("📧 Received email request:", { name, email });

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).send({
      success: false,
      message: "Name, email, and message are required",
    });
  }

  // Validate environment variables
  if (!process.env.BREVO_API_KEY) {
    console.error("❌ BREVO_API_KEY is missing");
    return res.status(500).send({
      success: false,
      message: "Server configuration error: Missing API key",
    });
  }

  if (!process.env.SENDER_MAIL || !process.env.ADMIN) {
    console.error("❌ SENDER_MAIL or ADMIN is missing");
    return res.status(500).send({
      success: false,
      message: "Server configuration error: Missing email addresses",
    });
  }

  try {
    // First email - notification to you
    console.log("📤 Sending notification email...");
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Portfolio Contact",
          email: process.env.SENDER_MAIL,
        },
        to: [{ email: process.env.ADMIN, name: "Dilip Kumar" }],
        replyTo: { email: email },
        subject: "New Portfolio Contact Form Submission",
        textContent: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );
    console.log("✅ Notification email sent");

    // Second email - confirmation to sender
    console.log("📤 Sending confirmation email...");
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Dilip Kumar",
          email: process.env.SENDER_MAIL,
        },
        to: [{ email: email, name: name }],
        subject: "Thank you for reaching out!",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <p>Hi ${name},</p>
            <p>Thank you for contacting me through my portfolio website. I appreciate your message and will respond shortly.</p>
            <p>If your request is time-sensitive, please let me know in your reply.</p>
            <p>Best regards,<br>
            <strong>Dilip Kumar</strong><br>
            Full Stack Developer</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">
              <a href="https://portfolio1-ehew.onrender.com">Portfolio</a> | 
              <a href="https://www.linkedin.com/in/dilip-kumar-6533a424b">LinkedIn</a> | 
              <a href="https://github.com/DilipWebPandit">GitHub</a>
            </p>
          </div>
        `,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );
    console.log("✅ Confirmation email sent");

    res.status(200).send({
      success: true,
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.error(
      "❌ Email sending failed:",
      error.response?.data || error.message
    );

    res.status(500).send({
      success: false,
      message: `Email failed: ${
        error.response?.data?.message || error.message
      }`,
    });
  }
};
