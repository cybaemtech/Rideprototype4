import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Clock, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GSAPHeroSection() {
  const [, setLocation] = useLocation();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        scale: 0.8,
      })
        .from(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          buttonsRef.current?.children || [],
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
          },
          "-=0.4"
        )
        .from(
          featuresRef.current?.children || [],
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );

      gsap.from(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: Zap, title: "Lightning Fast", description: "Quick pickups in under 3 minutes" },
    { icon: Shield, title: "Safe & Secure", description: "Verified drivers, tracked rides" },
    { icon: Clock, title: "24/7 Available", description: "Anytime, anywhere service" },
    { icon: Award, title: "Best Prices", description: "Competitive fares guaranteed" },
  ];

  return (
    <div ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 lg:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient"
          >
            Your Ride, Your Way
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
          >
            Experience the future of transportation with RideNow. Safe, reliable, and always on time.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 w-full sm:w-auto"
              onClick={() => setLocation("/book-ride")}
            >
              Book a Ride Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 w-full sm:w-auto"
              onClick={() => setLocation("/drive")}
            >
              Become a Driver
            </Button>
          </div>

          <div ref={featuresRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
