"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { sendContactEmail, type ContactFormData } from "@/lib/email-service";
import { useActionState, useOptimistic } from "react";

interface FormState {
  type: "idle" | "submitting" | "success" | "error";
  message: string;
}

// Define the form action using React 19's Actions
async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Extract form data
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // Validation
  if (!name || !email || !message) {
    return {
      type: "error",
      message: "All fields are required",
    };
  }

  try {
    const contactData: ContactFormData = {
      name,
      email,
      message,
    };

    // Form element is no longer needed with React Actions
    const success = await sendContactEmail(contactData);

    if (success) {
      return {
        type: "success",
        message: "Message sent successfully! I&apos;ll get back to you soon.",
      };
    } else {
      return {
        type: "error",
        message:
          "Failed to send message. Please try again or contact me directly.",
      };
    }
  } catch (error) {
    console.error("Email sending failed:", error);
    return {
      type: "error",
      message:
        "Failed to send message. Please try again or contact me directly.",
    };
  }
}

export default function ContactMe() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Use React 19's useActionState hook to manage form submission state
  const [formStatus, formAction] = useActionState(submitContactForm, {
    type: "idle",
    message: "",
  } as FormState);

  // Optimistic UI update while the form is submitting
  const [optimisticFormState, setOptimisticFormState] = useOptimistic<
    FormState,
    FormState
  >(formStatus, (state, optimisticValue) => optimisticValue);

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
            action={formAction}
            onSubmit={() => {
              // Optimistically update UI to show submitting state
              setOptimisticFormState({
                type: "submitting",
                message: "Sending your message...",
              });
            }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                placeholder="your.email@example.com"
              />
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
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                placeholder="Your message..."
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={optimisticFormState.type === "submitting"}
              className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md 
                     transition-colors font-medium flex items-center justify-center"
            >
              {optimisticFormState.type === "submitting" ? (
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
            {optimisticFormState.message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-md text-center ${
                  optimisticFormState.type === "success"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                    : optimisticFormState.type === "error"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                      : optimisticFormState.type === "submitting"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                        : ""
                }`}
              >
                {optimisticFormState.message}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
