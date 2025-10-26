import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Environment variables validation
if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}
if (!process.env.RESEND_FROM) {
  throw new Error("Missing RESEND_FROM environment variable");
}
if (!process.env.RESEND_TO) {
  throw new Error("Missing RESEND_TO environment variable");
}

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Contact form schema for validation
const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  message: z.string().min(1, "Message is required"),
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate with Zod schema
    const validationResult = ContactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { name, email, message } = validationResult.data;

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM as string,
      to: process.env.RESEND_TO as string,
      subject: `Portfolio Contact: ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
