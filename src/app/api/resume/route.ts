import { NextResponse } from "next/server";

export async function GET() {
  const googleDocsUrl =
    "https://docs.google.com/document/d/1OTWeloHca8okZahpImsONczlPF6I11eT/export?format=pdf";

  try {
    const response = await fetch(googleDocsUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch resume from Google Docs" },
        { status: response.status }
      );
    }

    const pdfBuffer = await response.arrayBuffer();

    const pdfResponse = new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"',
      },
    });

    return pdfResponse;
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
