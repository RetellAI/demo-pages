"use client";

import Link from "next/link";
import React from "react";

export function CenteredWithLogo() {
  const pages = [
    {
      title: "Privacy",
      href: "#",
    },
    {
      title: "Terms", 
      href: "#",
    },
    {
      title: "Contact",
      href: "#",
    },
  ];

  return (
    <div className="border-t border-border px-8 py-20 bg-background w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-sm text-foreground justify-between items-start  md:px-8">
        <div className="flex flex-col items-center justify-center w-full relative">
          <div className="mb-4">
            <Logo />
          </div>

          <ul className="transition-colors flex sm:flex-row flex-col text-foreground list-none gap-4">
            {pages.map((page, idx) => (
              <li key={"pages" + idx} className="list-none">
                <Link
                  className="transition-colors hover:text-muted-foreground"
                  href={page.href}
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex sm:flex-row flex-col justify-center mt-8 items-center w-full">
          <p className="text-muted-foreground mb-8 sm:mb-0">
            © 2024 TikCall. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <Link href="/" className="flex items-center text-2xl relative z-20">
      <span className="font-bold text-foreground">
        Tik<span className="text-primary">Call</span>
      </span>
    </Link>
  );
};