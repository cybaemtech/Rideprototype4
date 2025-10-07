import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Car, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-logo", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".footer-column", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".footer-social", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
        opacity: 0,
        scale: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-card border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div className="footer-logo space-y-4">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Car className="h-8 w-8 text-primary" />
              </motion.div>
              <span className="text-xl font-semibold">RideNow</span>
            </motion.div>
            <p className="text-sm text-muted-foreground">
              Premium ride booking service with 24/7 support and professional drivers.
            </p>
          </motion.div>

          <div className="footer-column">
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/careers", label: "Careers" },
                { href: "/press", label: "Press" },
              ].map((link) => (
                <motion.li key={link.href} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href={link.href}>
                    <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {[
                { href: "/support", label: "Help Center" },
                { href: "/safety", label: "Safety" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <motion.li key={link.href} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href={link.href}>
                    <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-2">
              {[
                { href: "https://facebook.com", icon: Facebook, testId: "link-facebook" },
                { href: "https://twitter.com", icon: Twitter, testId: "link-twitter" },
                { href: "https://instagram.com", icon: Instagram, testId: "link-instagram" },
                { href: "https://linkedin.com", icon: Linkedin, testId: "link-linkedin" },
              ].map((social) => (
                <motion.a
                  key={social.testId}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social p-2 rounded-md hover-elevate active-elevate-2"
                  data-testid={social.testId}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground"
        >
          <p>&copy; 2025 RideNow. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
