import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary to-accent rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of riders and drivers using RideNow every day. Your journey begins here.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/book-ride">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-white text-primary hover:bg-white/90 border-white"
                data-testid="button-cta-book-ride"
              >
                Book Your First Ride
              </Button>
            </Link>
            <Link href="/auth/driver/signup">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent text-white border-white hover:bg-white/10"
                data-testid="button-cta-become-driver"
              >
                Become a Driver
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
