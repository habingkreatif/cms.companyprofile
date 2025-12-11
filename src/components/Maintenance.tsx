"use client";

import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <Construction className="w-16 h-16 text-gray-400 mb-4" />

      <h1 className="text-2xl font-semibold mb-2">
        Halaman Dalam Pengembangan
      </h1>

      <p className="text-gray-600 max-w-md mb-6">
        Fitur ini masih dalam tahap pengerjaan. Kami sedang menyiapkan
        pengalaman terbaik untuk Anda. Silakan kembali lagi nanti.
      </p>

      <Button onClick={() => window.history.back()}>Kembali</Button>
    </div>
  );
}
