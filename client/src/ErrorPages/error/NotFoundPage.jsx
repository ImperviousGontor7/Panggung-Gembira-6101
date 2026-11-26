import SystemPage from "../components/SystemPage";

export default function NotFoundPage() {
  return (
    <SystemPage
      marker="404"
      eyebrow="PAGE NOT FOUND"
      title="Halaman Tidak Ditemukan"
      description="Halaman yang kamu cari tidak tersedia pada alamat ini. Mungkin tautannya berubah, sudah dihapus, atau alamatnya salah."
      detail="Periksa kembali URL atau kembali ke beranda untuk melanjutkan penjelajahan."
      variant="error"
      primaryAction={{ label: "Kembali ke Beranda", type: "home" }}
      secondaryAction={{ label: "Halaman Sebelumnya", type: "back" }}
    />
  );
}
