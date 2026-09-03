"use client";

import { upload } from "@vercel/blob/client";

const AUDIO_EXT = /\.(mp3|m4a|aac|ogg|wav)$/i;
const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

/** Faylni brauzerdan to'g'ridan-to'g'ri Vercel Blob'ga yuklaydi, URL qaytaradi */
export async function uploadToBlob(file: File, folder: string): Promise<string> {
  const isAudio = file.type.startsWith("audio/") || AUDIO_EXT.test(file.name);
  const isImage = file.type.startsWith("image/") || IMAGE_EXT.test(file.name);
  if (!isAudio && !isImage) throw new Error("Faqat rasm (jpg/png/webp) yoki audio (mp3/m4a) yuklash mumkin");
  const max = isAudio ? 25 : 10;
  if (file.size > max * 1024 * 1024) throw new Error(`Fayl ${max} MB dan katta`);

  const safe = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(-60);
  const cleanFolder = folder.replace(/[^a-z0-9/_-]/gi, "") || "misc";
  // Ba'zi brauzerlar mp3 uchun type bermaydi — Blob uchun aniq turini beramiz
  const contentType = file.type || (isAudio ? "audio/mpeg" : "image/jpeg");
  const blob = await upload(`${cleanFolder}/${safe}`, file, {
    access: "public",
    handleUploadUrl: "/api/upload",
    contentType,
  });
  return blob.url;
}
