import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("Send Message");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await axios.post("http://localhost:8000/sendMail", formData);
      if (res.data.success) {
        toast.success("✅ Mail sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.log(error);
      toast.error("⚠️ Something went wrong!");
    }
    setStatus("Send Message");
  };

  return (
    <section
      id="contact"
      className="py-20 bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6"
        >
          Get in Touch
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-600 dark:text-gray-300 mb-10"
        >
          Have a project or just want to say hi? I’d love to hear from you.
        </motion.p>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 md:p-10 max-w-2xl mx-auto"
        >
          <form
            className="grid gap-6 text-left text-white"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 
                         dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         transition-all"
            />
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 
                         dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         transition-all"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 
                         dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         transition-all resize-none"
            ></textarea>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg 
                         hover:bg-indigo-700 hover:shadow-lg transition-all duration-300"
            >
              {status}
            </motion.button>
          </form>
          <ToastContainer position="top-right" autoClose={2000} />
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center gap-8 mt-12 text-2xl"
        >
          <a
            href="mailto:dilip7065kumar@gmail.com"
            // target="_blank"
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/DilipWebPandit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition"
          >
            <FaGithub />
          </a>
          <a
            href="www.linkedin.com/in/dilip-kumar-6533a424b"
            target="_blank"
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition"
          >
            <FaLinkedin />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
