import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.DIGITIZER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "DIGITIZER_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const pdf = formData.get("pdf");

    if (!(pdf instanceof Blob)) {
      return NextResponse.json({ error: "PDF file is required." }, { status: 400 });
    }

    const promptsRaw = formData.get("prompts");
    const scriptPath = (formData.get("scriptPath") as string) ?? "";
    const notes = (formData.get("notes") as string) ?? "";

    let prompts: Record<string, string> = {};
    if (typeof promptsRaw === "string" && promptsRaw.trim().length > 0) {
      try {
        prompts = JSON.parse(promptsRaw);
      } catch {
        return NextResponse.json(
          { error: "Unable to parse prompt configuration." },
          { status: 400 }
        );
      }
    }

    const uploadDir = path.join(process.cwd(), "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const file = pdf as File;
    const originalName = sanitizeFileName(file.name || "upload.pdf");
    const timestamp = Date.now();
    const storedName = `${timestamp}_${originalName}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const storedPath = path.join(uploadDir, storedName);
    await fs.writeFile(storedPath, fileBuffer);

    const jobId = `job_${timestamp}`;

    return NextResponse.json({
      message:
        "Upload captured. Connect this endpoint to your processing worker to launch rendering/OCR/translation.",
      jobId,
      originalName,
      storedPath: storedPath.replace(process.cwd(), ""),
      scriptPath,
      notes,
      prompts,
    });
  } catch (error) {
    console.error("Digitizer API error", error);
    return NextResponse.json(
      { error: "Failed to start digitization job. Check server logs." },
      { status: 500 }
    );
  }
}
