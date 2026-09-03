import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  invitationId: z.string().min(1),
  name: z.string().trim().min(1).max(100),
  attending: z.enum(["YES", "NO", "MAYBE"]),
  guests: z.number().int().min(1).max(20).default(1),
  note: z.string().trim().max(500).optional().nullable(),
  invitedAs: z.string().trim().max(100).optional().nullable(),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Noto'g'ri ma'lumot" }, { status: 400 });

  const inv = await prisma.invitation.findUnique({
    where: { id: parsed.data.invitationId },
    select: { status: true },
  });
  if (!inv || inv.status !== "PUBLISHED") return NextResponse.json({ error: "Topilmadi" }, { status: 404 });

  const { note, invitedAs, ...rest } = parsed.data;
  await prisma.rsvp.create({ data: { ...rest, note: note || null, invitedAs: invitedAs || null } });
  return NextResponse.json({ ok: true });
}
