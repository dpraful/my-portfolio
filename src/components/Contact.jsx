import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import "./styles/Contact.css";
import { APIURL } from "../Common//apiConstants";
import { networkServiceCall } from "../Common/NetworkServiceCall";
import Footer from "../components/Footer";

const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    networkServiceCall(`${APIURL}json/Contact.json`)
      .then(setContactData)
      .catch(err => {
        console.error("Contact fetch error:", err);
        setError(true);
      });
  }, []);


  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Message Sent Successfully!");
    reset();
  };

  if (error || !contactData) return null;

  const { title, subtitle, form } = contactData;

  return (
    <section className="contact">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {subtitle}
      </motion.p>

      {/* Contact Form */}
      <motion.form
        className="contact-form"
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="input-group">
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            required
          />
          <label>{form.nameLabel}</label>
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="input-group">
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            required
          />
          <label>{form.emailLabel}</label>
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>

        <div className="input-group">
          <textarea
            {...register("message", { required: "Message is required" })}
            required
          />
          <label>{form.messageLabel}</label>
          {errors.message && (
            <span className="error">{errors.message.message}</span>
          )}
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {form.submitText}
        </motion.button>
      </motion.form>
      <Footer />
    </section>
  );
};

export default Contact;
