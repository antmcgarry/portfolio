"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { sendContactEmail } from "@/lib/email-service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define Zod schema for form validation
const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Message is required"),
});

// Type for the form data based on the schema
type ContactFormValues = z.infer<typeof ContactSchema>;

// Form submission status types
type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactMe() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Form state management
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: ContactFormValues) => {
    setFormStatus("submitting");
    setStatusMessage("Sending your message...");

    try {
      const success = await sendContactEmail(data);

      if (success) {
        setFormStatus("success");
        setStatusMessage(
          "Message sent successfully! I'll get back to you soon."
        );
        reset(); // Reset form fields on success
      } else {
        setFormStatus("error");
        setStatusMessage(
          "Failed to send message. Please try again or contact me directly."
        );
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      setFormStatus("error");
      setStatusMessage(
        "Failed to send message. Please try again or contact me directly."
      );
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8"
        >
          Contact Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-2xl mx-auto mb-12 text-gray-600 dark:text-gray-300"
        >
          Have a project in mind or want to discuss opportunities? Send me a
          message and I&apos;ll get back to you as soon as possible.
        </motion.p>

        <div className="max-w-md mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                {...register("message")}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                placeholder="Your message..."
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.message.message}
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={formStatus === "submitting"}
              className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md 
                     transition-colors font-medium flex items-center justify-center"
            >
              {formStatus === "submitting" ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </motion.button>

            {/* Status message */}
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-md text-center ${
                  formStatus === "success"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                    : formStatus === "error"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                      : formStatus === "submitting"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                        : ""
                }`}
              >
                {statusMessage}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
