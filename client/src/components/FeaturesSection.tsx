import { useEffect, useRef } from "react";
import { DollarSign, Shield, Clock, Star, MapPin, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: DollarSign,
    title: "Affordable Rides",
    description: "Transparent pricing with no hidden fees. Get the best rates in town.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Safe Drivers",
    description: "All drivers are verified and background-checked for your safety.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support whenever you need assistance.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Star,
    title: "Top Rated",
    description: "Join millions of satisfied customers who trust our service.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: MapPin,
    title: "Live Tracking",
    description: "Track your ride in real-time and share your trip with loved ones.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Multiple payment options including wallet, cards, and cash.",
    color: "from-indigo-500 to-purple-500",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 100,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
      }}
    >
      <Card className="h-full hover-elevate transition-all duration-300 relative overflow-hidden group">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          initial={false}
        />
        
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        />

        <CardContent className="p-6 relative z-10">
          <motion.div
            className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 relative"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(var(--primary), 0)",
                  "0 0 40px rgba(var(--primary), 0.3)",
                  "0 0 20px rgba(var(--primary), 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <feature.icon className="h-6 w-6 text-primary" />
            </motion.div>
          </motion.div>

          <motion.h3
            className="text-xl font-semibold mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {feature.title}
          </motion.h3>

          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {feature.description}
          </motion.p>

          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        opacity: 0,
        y: 100,
        scale: 0.9,
      });

      gsap.from(".feature-grid", {
        scrollTrigger: {
          trigger: ".feature-grid",
          start: "top 85%",
          end: "top 60%",
          scrub: 0.5,
        },
        opacity: 0,
        y: 50,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-card/50 relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{
              background: "linear-gradient(to right, hsl(var(--foreground)), hsl(var(--primary)), hsl(var(--foreground)))",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Why Choose RideNow
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Experience the best ride booking service with our premium features designed for your comfort and safety.
          </motion.p>
        </motion.div>

        <div className="feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
