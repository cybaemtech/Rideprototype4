import { useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Car, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".nav-link", {
        opacity: 0,
        y: -10,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out",
      });

      gsap.from(".nav-action", {
        opacity: 0,
        x: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/book-ride", label: "Book Ride" },
    { href: "/drive", label: "Drive" },
    { href: "/support", label: "Support" },
  ];

  return (
    <nav ref={navRef} className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <motion.div
              ref={logoRef}
              className="flex items-center gap-2 hover-elevate active-elevate-2 px-2 py-1 rounded-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Car className="h-8 w-8 text-primary" />
              </motion.div>
              <span className="text-xl font-semibold">RideNow</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                className="nav-link"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={link.href}>
                  <Button
                    variant="ghost"
                    className={location === link.href ? "bg-muted" : ""}
                    data-testid={`link-nav-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <motion.div className="nav-action" whileHover={{ scale: 1.05 }}>
              <ThemeToggle />
            </motion.div>
            <motion.div className="nav-action" whileHover={{ y: -2 }}>
              <Link href="/auth/login">
                <Button variant="ghost" data-testid="button-login">
                  Sign In
                </Button>
              </Link>
            </motion.div>
            <motion.div className="nav-action" whileHover={{ y: -2, scale: 1.05 }}>
              <Link href="/book-ride">
                <Button data-testid="button-book-ride" className="relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative z-10">Book a Ride</span>
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t overflow-hidden"
          >
            <motion.div className="px-4 py-4 space-y-2 bg-background">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={link.href}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${location === link.href ? "bg-muted" : ""}`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-${link.label.toLowerCase().replace(' ', '-')}`}
                    >
                      {link.label}
                    </Button>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="button-mobile-login"
                  >
                    Sign In
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.1 }}
              >
                <Link href="/book-ride">
                  <Button
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid="button-mobile-book-ride"
                  >
                    Book a Ride
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
