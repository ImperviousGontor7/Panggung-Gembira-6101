import SystemPage from "../components/SystemPage";

export default function LicenseRequiredPage() {
  return (
    <SystemPage
      marker="LICENSE"
      eyebrow="LICENSE PROTECTION"
      title="Lisensi Belum Aktif"
      description="Konten ini dilindungi oleh sistem lisensi Impervious Generation."
      detail="Masuk ke akun yang terdaftar, lalu selesaikan aktivasi lisensi sebelum mengakses konten."
      variant="access"
      primaryAction={{ label: "Masuk untuk Melanjutkan", to: "/login" }}
      secondaryAction={{ label: "Kembali ke Beranda", to: "/" }}
    />
  );
}
