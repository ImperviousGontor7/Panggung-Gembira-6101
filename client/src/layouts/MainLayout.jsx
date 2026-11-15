import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen w-full">
      <Header />

      <main className="mt-[clamp(35px,5vw,90px)]">
        <Navbar />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}