import { useEffect, useRef } from "react";
import { Shield, Phone, Share2, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SafetyFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shieldRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Shield,
      title: "SOS Alert",
      description: "Emergency button for instant help",
      gradient: "from-red-500 to-orange-500",
    },
    {
      icon: Share2,
      title: "Share Trip",
      description: "Share live location with family",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: UserCheck,
      title: "Driver Verified",
      description: "All drivers are background checked",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Help available anytime you need",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(shieldRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
        rotation: 360,
        scale: 1.2,
        ease: "none",
      });

      gsap.from(".safety-card", {
        scrollTrigger: {
          trigger: ".safety-grid",
          start: "top 80%",
          end: "top 50%",
          scrub: 0.5,
        },
        opacity: 0,
        y: 100,
        stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-16 bg-muted/30 relative overflow-hidden">
      <motion.div
        ref={shieldRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-5 pointer-events-none"
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Shield className="w-full h-full text-primary" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Safety First</span>
            </div>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your Safety, Our{" "}
            <motion.span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Priority
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            We've built comprehensive safety features to ensure you have a secure ride every time
          </motion.p>
        </motion.div>

        <div className="safety-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="safety-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 },
              }}
            >
              <Card className="h-full hover-elevate transition-all duration-300 relative overflow-hidden group">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                />

                <CardContent className="p-6 text-center relative z-10">
                  <motion.div
                    className={`inline-block p-4 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 mb-4 relative`}
                    whileHover={{
                      scale: 1.2,
                      opacity: 0.2,
                      rotate: 360,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(var(--primary), 0)",
                          "0 0 30px rgba(var(--primary), 0.5)",
                          "0 0 0px rgba(var(--primary), 0)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <feature.icon className="h-8 w-8 text-primary relative z-10" />
                  </motion.div>

                  <motion.h3
                    className="font-semibold mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {feature.title}
                  </motion.h3>

                  <motion.p
                    className="text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {feature.description}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
