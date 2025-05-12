import React, { useEffect } from "react";
import { FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import "./Contact.css";

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Message Sent Successfully!");
    reset();
  };

  return (
    <section className="contact">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        Get in Touch
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1, delay: 0.5 }}
      >
        Feel free to reach out to me for collaboration or inquiries.
      </motion.p>

      {/* Contact Info with Hover Effects */}
      <motion.div 
        className="contact-info"
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <a href="mailto:d.praful1021@gmail.com" className="contact-item">
          <FaEnvelope /> d.praful@outlook.com
        </a>
        <a href="https://linkedin.com/in/prafuldasmm" target="_blank" rel="noopener noreferrer" className="contact-item">
          <FaLinkedin /> LinkedIn
        </a>
        <a href="https://github.com/dpraful" target="_blank" rel="noopener noreferrer" className="contact-item">
          <FaGithub /> GitHub
        </a>
      </motion.div>

      {/* Contact Form with Animated Input Labels */}
      <motion.form 
        className="contact-form"
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="input-group">
          <input type="text" {...register("name", { required: "Name is required" })} required />
          <label>Your Name</label>
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>
        <div className="input-group">
          <input type="email" {...register("email", { required: "Email is required" })} required />
          <label>Your Email</label>
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>
        <div className="input-group">
          <textarea {...register("message", { required: "Message is required" })} required />
          <label>Your Message</label>
          {errors.message && <span className="error">{errors.message.message}</span>}
        </div>
        <motion.button 
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
        </motion.button>
      </motion.form>
    </section>
  );
};

export default Contact;
