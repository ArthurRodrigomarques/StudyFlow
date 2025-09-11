"use client";

import Footer from "./Footer";
import Navbar from "./NavBar";
import Content from "./Content";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0f1115] text-white">
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}
