// Contact form data interface
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Sends a contact form submission through the Next.js API route
 */
export async function sendContactEmail(
  formData: ContactFormData
): Promise<boolean> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error sending email:", data.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
}
