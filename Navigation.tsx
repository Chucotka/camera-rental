import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { COMPANY_PHONE, COMPANY_PHONE_RAW } from "@shared/const";

interface NavigationProps {
  currentPage?: "home" | "rental" | "production" | "ai-lab";
}

export function Navigation({ currentPage = "home" }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const navItems = [
    { label: "ПРОКАТ ТЕХНИКИ", href: "/catalog" },
    { label: "ВИДЕОПРОИЗВОДСТВО", href: "/production" },
    { label: "НЕЙРОСЕТИ", href: "/ai-lab" },
    { label: "ВСЕГДА ЖИВОЙ", href: "/vsegda-zhivoy" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container h-12 md:h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setLocation("/")}
          className="hover:opacity-80 transition-opacity flex-shrink-0"
        >
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663246232073/QszvzsdkHxiDkVeN.png"
            alt="KINORENTA Logo"
            className="h-8 md:h-12 w-auto object-contain"
          />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`transition-colors ${
                currentPage === item.href.slice(1)
                  ? "text-primary"
                  : "hover:text-primary"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Contact Phone - Hidden on Mobile */}
        <a
          href={`tel:${COMPANY_PHONE_RAW}`}
          className="hidden md:flex items-center gap-2 text-sm font-mono hover:text-primary transition-colors flex-shrink-0"
        >
          <Phone className="w-4 h-4" />
          {COMPANY_PHONE}
        </a>

        {/* Innoko Films Logo - Hidden on Mobile */}
        <a
          href="/studio"
          onClick={(e) => {
            e.preventDefault();
            setLocation("/studio");
          }}
          className="hidden md:flex items-center hover:opacity-80 transition-opacity flex-shrink-0 ml-4"
        >
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663246232073/qCOCqQgAoMpCHdHp.jpeg"
            alt="Innoko Films"
            className="h-5 md:h-10 w-auto object-contain"
          />
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-primary/10 rounded transition-colors flex-shrink-0"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-12 z-40 md:hidden bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu - Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-12 left-0 right-0 z-50 border-t border-border bg-background/98 backdrop-blur-md shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 space-y-2">
            {/* Mobile Menu Items */}
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 hover:bg-primary/10 rounded font-mono text-sm transition-colors border border-border/30 hover:border-primary/50"
              >
                {item.label}
              </a>
            ))}

            <div className="border-t border-border/30 pt-3 mt-3">
              <a href={`tel:${COMPANY_PHONE_RAW}`} className="flex items-center gap-2 px-4 py-3 font-mono text-sm hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                {COMPANY_PHONE}
              </a>
            </div>

            <a href="/contacts" className="block no-underline" onClick={() => setMobileMenuOpen(false)}>
              <Button
                className="w-full rounded-none font-mono text-xs bg-primary hover:bg-primary/90 text-primary-foreground mt-2"
              >
                ЗАПРОСИТЬ СМЕТУ
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
