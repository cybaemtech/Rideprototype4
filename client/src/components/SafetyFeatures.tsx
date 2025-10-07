import { Shield, Phone, Share2, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function SafetyFeatures() {
  const features = [
    {
      icon: Shield,
      title: "SOS Alert",
      description: "Emergency button for instant help",
    },
    {
      icon: Share2,
      title: "Share Trip",
      description: "Share live location with family",
    },
    {
      icon: UserCheck,
      title: "Driver Verified",
      description: "All drivers are background checked",
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Help available anytime you need",
    },
  ];

  return (
    <div className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Your Safety, Our Priority</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've built comprehensive safety features to ensure you have a secure ride every time
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
