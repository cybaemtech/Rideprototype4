import { useState, useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import RealMapView from "@/components/RealMapView";
import DriverInfo from "@/components/DriverInfo";
import RideStatus from "@/components/RideStatus";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function RideTracking() {
  const { toast } = useToast();
  const [status, setStatus] = useState<"searching" | "found" | "on-way" | "arrived">("searching");

  useEffect(() => {
    const statusFlow: ("searching" | "found" | "on-way" | "arrived")[] = [
      "searching",
      "found",
      "on-way",
      "arrived",
    ];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < statusFlow.length - 1) {
        currentIndex++;
        setStatus(statusFlow[currentIndex]);

        const messages = {
          found: "Driver found! John is on the way.",
          "on-way": "Your driver is 5 minutes away.",
          arrived: "Your driver has arrived!",
        };

        if (statusFlow[currentIndex] !== "searching") {
          toast({
            title: "Ride Update",
            description: messages[statusFlow[currentIndex] as keyof typeof messages],
          });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="grid lg:grid-cols-2 h-[calc(100vh-4rem)]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1 overflow-y-auto p-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Your Ride</h1>
                <p className="text-muted-foreground">Track your ride in real-time</p>
              </div>
              <Link href="/book-ride">
                <Button variant="ghost" size="icon" data-testid="button-close-tracking">
                  <X className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            <Card>
              <CardContent className="p-6">
                <RideStatus currentStatus={status} />
              </CardContent>
            </Card>

            {status !== "searching" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <DriverInfo
                  name="John Doe"
                  rating={4.8}
                  vehicleModel="Toyota Camry"
                  vehicleNumber="ABC-1234"
                />
              </motion.div>
            )}

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Trip Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">From:</span>
                    <span className="font-medium text-right">Connaught Place, Delhi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To:</span>
                    <span className="font-medium text-right">IGI Airport, Delhi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distance:</span>
                    <span className="font-medium">15.2 km</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="text-muted-foreground">Estimated Fare:</span>
                    <span className="text-xl font-bold text-primary">₹182</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {status === "arrived" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Link href="/ride/history">
                  <Button className="w-full" size="lg" data-testid="button-complete-ride">
                    Complete Ride
                  </Button>
                </Link>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2 h-[300px] lg:h-full"
          >
            <RealMapView
              pickupLocation={{ lat: 28.6315, lng: 77.2167, name: "Connaught Place, Delhi" }}
              dropLocation={{ lat: 28.5562, lng: 77.1000, name: "IGI Airport, Delhi" }}
              driverLocation={{ lat: 28.5938, lng: 77.1584 }}
              showDriver={status !== "searching"}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
