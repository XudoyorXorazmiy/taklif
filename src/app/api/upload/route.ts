import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAdmin } from "@/lib/auth";

/**
 * Brauzerdan to'g'ridan-to'g'ri Blob'ga yuklash (client upload).
 * Serverless 4.5 MB chegarasini chetlab o'tadi — musiqa va katta rasmlar uchun.
 * Brauzer avval shu yerdan token oladi (admin cookie tekshiriladi), keyin faylni Blob'ga o'zi yuboradi.
 */
export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 401 });
  const body = (await req.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => ({
        allowedContentTypes: [
          "image/jpeg", "image/png", "image/webp", "image/gif",
          "audio/mpeg", "audio/mp3", "audio/mp4", "audio/aac", "audio/ogg", "audio/x-m4a", "audio/m4a", "audio/wav", "audio/x-wav",
        ],
        maximumSizeInBytes: 25 * 1024 * 1024,
        addRandomSuffix: true,
        tokenPayload: JSON.stringify({ pathname }),
      }),
      onUploadCompleted: async () => {
        /* URL admin formasida saqlanadi */
      },
    });
    return NextResponse.json(json);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
