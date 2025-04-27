"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

    return (
        
        <header
            className={`
                sticky top-0 z-50
                transition-colors duration-500 ease-in-out
                ${scrolled
                  ? "bg-white/90 backdrop-blur-sm shadow-sm"
                  : "bg-transparent"}
              `}
            >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                    <Link href="/Home" className="flex items-center">
                        <Image
                            src="/sheltrlogo.png"
                            alt="Sheltr"
                            width={100}
                            height={100}
                        />
                        </Link>
                    </div>

                    <nav className="flex space-x-8">
                        <Link
                            href="/Home"
                            className={`px-3 py-2 text-base font-bold transition`}>
                            Home
                        </Link>
                        <Link
                            href="/Contribute"
                            className={`px-3 py-2 text-base font-bold transition`}>
                            Contribute
                        </Link>
                        <Link
                            href="/AboutUs"
                            className={`px-3 py-2 text-base font-bold transition`}>
                            About Us
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
