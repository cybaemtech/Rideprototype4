import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap, MapPin, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "@assets/generated_images/Hero_cityscape_with_cars_0542f773.png";

gsap.registerPlugin(ScrollTrigger);

export default function AdvancedHeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        mouseX.set(x * 50);
        mouseY.set(y * 50);
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      gsap.set(".hero-particle", {
        opacity: 0,
        scale: 0,
      });

      tl.from(".hero-bg-layer", {
        scale: 1.2,
        duration: 2,
        ease: "power2.out",
      })
        .from(
          titleRef.current,
          {
            y: 100,
            opacity: 0,
            duration: 1.2,
            rotationX: 45,
            transformPerspective: 1000,
          },
          "-=1.5"
        )
        .from(
          ".hero-subtitle",
          {
            y: 50,
            opacity: 0,
            duration: 1,
          },
          "-=0.8"
        )
        .from(
          ".hero-badge",
          {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(2)",
          },
          "-=0.6"
        )
        .from(
          ".hero-button",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-stat",
          {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.5"
        )
        .to(
          ".hero-particle",
          {
            opacity: 0.8,
            scale: 1,
            duration: 0.6,
            stagger: {
              each: 0.05,
              from: "random",
            },
          },
          "-=0.8"
        );

      gsap.to(".floating-element", {
        y: -30,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.3,
        },
      });

      const parallaxElements = gsap.utils.toArray(".parallax-layer");
      parallaxElements.forEach((elem: any, i) => {
        const speed = (i + 1) * 0.1;
        gsap.to(elem, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: (index, target) => -ScrollTrigger.maxScroll(window) * speed,
          ease: "none",
        });
      });

      const morphTl = gsap.timeline({ repeat: -1, yoyo: true });
      morphTl.to(".morph-text", {
        scaleX: 1.05,
        scaleY: 0.95,
        duration: 1.5,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <section
      ref={heroRef}
      className="relative h-[100vh] overflow-hidden"
    >
      <motion.div
        className="hero-bg-layer absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          x: smoothMouseX,
          y: smoothMouseY,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="hero-particle absolute rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              background: `hsl(var(--primary) / ${Math.random() * 0.5 + 0.3})`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.8, 0.3, 0.8],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute top-20 right-10 floating-element parallax-layer"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="relative">
          <Zap className="h-16 w-16 text-primary opacity-20" />
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Zap className="h-16 w-16 text-primary" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-10 floating-element parallax-layer"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <MapPin className="h-12 w-12 text-accent opacity-30" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-full flex items-center">
        <motion.div className="max-w-3xl">
          <motion.div
            className="hero-badge inline-flex items-center gap-2 mb-6 px-5 py-3 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="h-5 w-5 text-primary" />
            </motion.div>
            <span className="text-sm font-semibold text-primary">Trusted by 10M+ riders worldwide</span>
          </motion.div>

          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-extrabold mb-8 leading-none"
          >
            <motion.span
              className="block morph-text"
              style={{
                background: "linear-gradient(to right, hsl(var(--foreground)), hsl(var(--primary)), hsl(var(--foreground)))",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Your Ride,
            </motion.span>
            <motion.span
              className="block mt-2"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Reimagined
            </motion.span>
          </h1>

          <motion.p
            className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Experience the future of transportation with AI-powered matching, real-time tracking, and unparalleled safety. Your journey starts here.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 mb-12">
            <Link href="/book-ride">
              <motion.div
                className="hero-button"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="text-lg px-10 py-7 group relative overflow-hidden"
                  data-testid="button-hero-book-ride"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    Book a Ride
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </span>
                </Button>
              </motion.div>
            </Link>
            <Link href="/auth/driver/signup">
              <motion.div
                className="hero-button"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-7 backdrop-blur-xl bg-background/30 border-2"
                  data-testid="button-hero-become-driver"
                >
                  Become a Driver
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div className="flex flex-wrap gap-12">
            {[
              { value: "10M+", label: "Happy Riders", icon: "👥" },
              { value: "50K+", label: "Active Drivers", icon: "🚗" },
              { value: "4.9★", label: "Average Rating", icon: "⭐" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="hero-stat group"
                data-testid={`stat-${stat.label.toLowerCase().replace(" ", "-")}`}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <motion.p
                  className="text-4xl md:text-5xl font-extrabold mb-1"
                  data-testid={`text-stat-${stat.label.toLowerCase().replace(" ", "-")}`}
                  animate={{
                    textShadow: [
                      "0 0 10px hsl(var(--primary) / 0)",
                      "0 0 20px hsl(var(--primary) / 0.5)",
                      "0 0 10px hsl(var(--primary) / 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="inline-block mr-2 group-hover:scale-125 transition-transform">
                    {stat.icon}
                  </span>
                  {stat.value}
                </motion.p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-medium">Scroll to explore</span>
          <motion.div
            className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full p-1"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full mx-auto"
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
