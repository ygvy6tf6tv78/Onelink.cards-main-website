"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SplashLoader } from "@/components/ui/splash-loader";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Hide main navbar and footer on booking, payment, and legal routes
  const isExcluded = 
    pathname?.startsWith("/book") || 
    pathname?.startsWith("/payment") || 
    pathname?.startsWith("/terms") || 
    pathname?.startsWith("/privacy") || 
    pathname?.startsWith("/refund") || 
    pathname?.startsWith("/shipping");

  if (isExcluded) {
    return (
      <>
        <main className="flex-grow">{children}</main>
      </>
    );
  }

  return (
    <>
      {pathname === "/" ? <SplashLoader /> : null}
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
