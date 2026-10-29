import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export async function GET() {
  const pdf = await readFile(
    path.join(process.cwd(), "public/documents/anthony-mcgarry-cv.pdf")
  );

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Anthony-McGarry-CV.pdf"',
    },
  });
}
