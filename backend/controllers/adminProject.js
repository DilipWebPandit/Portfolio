import adminProjectModel from "../models/adminUploadDetails.js";
import transporter from "../config/nodemailerConfig.js";
import brevoClient from "../config/brevoClient.js";

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
      // from: process.env.SENDER_MAIL,
      sender: { email: process.env.SENDER_MAIL, name: "Portfolio Contact" },
      to: [{ email: process.env.ADMIN, name: "Dilip Kumar" }],
      replyTo: { email },
      subject: "New Portfolio Contact Form Submission",
      textContent: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // console.log("Sending first email...");
    // await transporter.sendMail(receiverMailOptions);

    await brevoClient.sendTransacEmail(receiverMailOptions);

    // Confirmation email to sender
    const senderMailOptions = {
      sender: { email: process.env.SENDER_MAIL, name: "Dilip Kumar" },
      to: [{ email }],
      subject: "Thank you for reaching out!",
      htmlContent: `Hi ${name},

Thank you for contacting me through my portfolio website. I appreciate your message and will respond shortly.  
If your request is time-sensitive, please let me know in your reply.

Best regards,  
Dilip Kumar  
Full Stack Developer  
Portfolio:  <a href="https://portfolio1-ehew.onrender.com">portfolio1-ehew.onrender.com</a>
LinkedIn: <a href="www.linkedin.com/in/dilip-kumar-6533a424b">github.com/dilipkumar</a> 
GitHub: <a href="https://github.com/DilipWebPandit">github.com/DilipWebPandit</a>`,
    };

    // await transporter.sendMail(senderMailOptions);
    await brevoClient.sendTransacEmail(senderMailOptions);

    res.status(200).send({
      success: true,
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    res.status(500).send({
      success: false,
      message: `Email failed: ${error.message}`,
    });
  }
};
