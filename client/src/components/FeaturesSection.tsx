import { DollarSign, Shield, Clock, Star, MapPin, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const features = [
  {
    icon: DollarSign,
    title: "Affordable Rides",
    description: "Transparent pricing with no hidden fees. Get the best rates in town.",
  },
  {
    icon: Shield,
    title: "Safe Drivers",
    description: "All drivers are verified and background-checked for your safety.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support whenever you need assistance.",
  },
  {
    icon: Star,
    title: "Top Rated",
    description: "Join millions of satisfied customers who trust our service.",
  },
  {
    icon: MapPin,
    title: "Live Tracking",
    description: "Track your ride in real-time and share your trip with loved ones.",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Multiple payment options including wallet, cards, and cash.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose RideNow</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the best ride booking service with our premium features designed for your comfort and safety.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
