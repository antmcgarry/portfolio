import emailjs from "emailjs-com";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail(
  formData: ContactFormData,
  // Making the formElement parameter optional for React 19's Actions
  formElement?: HTMLFormElement
): Promise<boolean> {
  try {
    // If a form element is provided, use EmailJS's sendForm method
    if (formElement) {
      const response = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_id",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_id",
        formElement,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "user_id"
      );
      return response.status === 200;
    }
    // Otherwise use EmailJS's send method (better for Actions)
    else {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_id",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_id",
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "user_id"
      );
      return response.status === 200;
    }
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
}
