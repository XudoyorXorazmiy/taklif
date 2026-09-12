import { requireAdmin } from "@/lib/auth";
import { getAllTracks } from "@/lib/tracks";
import { MusicManager } from "@/components/admin/MusicManager";

export const metadata = { title: "Musiqa" };

export default async function AdminMusic() {
  await requireAdmin();
  const tracks = await getAllTracks();
  return (
    <>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Fon musiqasi</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Bu ro'yxatdan mijoz botda qo'shiq tanlaydi. «Yashirin» qilingani tanlovda chiqmaydi.
          </p>
        </div>
        <p className="text-sm text-neutral-500">{tracks.length} ta</p>
      </div>
      <MusicManager tracks={tracks} />
    </>
  );
}
