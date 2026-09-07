"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Keyboard, Menu, UserRound, X } from "lucide-react";
import { navLinks } from "@/lib/constants";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") closeMenu();
  };

  const handleLinkClick = () => closeMenu();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 text-primary backdrop-blur-md transition-all duration-300" role="navigation" aria-label="Main navigation">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="Typing Test Skill Home">
          <span className="flex h-8 w-8 items-center justify-center text-primary">
            <Keyboard className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="text-xl font-bold tracking-tight text-primary">Typing Test Skill</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2 w-max" role="menubar">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                className={`whitespace-nowrap text-[15px] transition-colors ${isActive ? "font-bold text-primary" : "font-medium text-primary/60 hover:text-primary"
                  }`}
                onClick={handleLinkClick}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center lg:flex">
          <button
            type="button"
            className="rounded-full p-2 text-primary/70 transition-colors hover:bg-white/10 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Profile"
          >
            <UserRound className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="rounded-full p-2 text-primary/70 transition-colors hover:bg-white/10 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Profile"
          >
            <UserRound className="h-5 w-5" />
          </button>
          <button
            onClick={toggleMenu}
            onKeyDown={handleKeyDown}
            className="rounded-lg p-2 text-primary/70 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute left-0 top-full flex w-full flex-col gap-5 border-b border-white/10 bg-black/95 px-6 py-6 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 lg:hidden"
          role="menu"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                onClick={handleLinkClick}
                className={`text-[15px] transition-colors ${isActive ? "font-bold text-primary" : "font-medium text-primary/60 hover:text-primary"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}