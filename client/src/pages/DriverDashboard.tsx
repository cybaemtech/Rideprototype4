import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DriverDashboardCard from "@/components/DriverDashboardCard";
import RideRequestCard from "@/components/RideRequestCard";
import RideHistoryCard from "@/components/RideHistoryCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DollarSign, Car, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function DriverDashboard() {
  const { toast } = useToast();
  const [activeRides] = useState([
    {
      id: "1",
      pickupLocation: "Connaught Place, Delhi",
      dropLocation: "IGI Airport, Delhi",
      estimatedFare: 182,
      estimatedDistance: "15.2 km",
      estimatedTime: "25 min",
    },
  ]);

  const [rideHistory] = useState([
    {
      id: "1",
      from: "India Gate, Delhi",
      to: "Qutub Minar, Delhi",
      date: new Date("2025-10-05T14:30:00"),
      fare: 165,
      driverName: "You",
      rating: 5.0,
      status: "completed" as const,
    },
    {
      id: "2",
      from: "Red Fort, Delhi",
      to: "Connaught Place, Delhi",
      date: new Date("2025-10-05T11:15:00"),
      fare: 82,
      driverName: "You",
      rating: 4.8,
      status: "completed" as const,
    },
  ]);

  const handleAcceptRide = (id: string) => {
    console.log("Accepted ride:", id);
    toast({
      title: "Ride Accepted",
      description: "Navigate to pickup location to start the ride.",
    });
  };

  const handleRejectRide = (id: string) => {
    console.log("Rejected ride:", id);
    toast({
      title: "Ride Rejected",
      description: "Looking for more opportunities...",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                J
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, John!</h1>
              <p className="text-muted-foreground">Ready to earn today?</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <DriverDashboardCard
              title="Total Earnings"
              value="₹24,580"
              subtitle="This month"
              icon={DollarSign}
              trend={{ value: 12.5, isPositive: true }}
            />
            <DriverDashboardCard
              title="Rides Completed"
              value="47"
              subtitle="This month"
              icon={Car}
              trend={{ value: 8.2, isPositive: true }}
            />
            <DriverDashboardCard
              title="Average Rating"
              value="4.9"
              subtitle="Based on 120 reviews"
              icon={Star}
            />
            <DriverDashboardCard
              title="Acceptance Rate"
              value="95%"
              subtitle="Last 30 days"
              icon={TrendingUp}
              trend={{ value: 3.1, isPositive: true }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="active" data-testid="tab-active-rides">
                  Active Rides
                </TabsTrigger>
                <TabsTrigger value="earnings" data-testid="tab-earnings">
                  Earnings
                </TabsTrigger>
                <TabsTrigger value="history" data-testid="tab-history">
                  Ride History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4 mt-6">
                {activeRides.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No active ride requests at the moment</p>
                    <p className="text-sm">New requests will appear here</p>
                  </div>
                ) : (
                  activeRides.map((ride) => (
                    <RideRequestCard
                      key={ride.id}
                      {...ride}
                      onAccept={() => handleAcceptRide(ride.id)}
                      onReject={() => handleRejectRide(ride.id)}
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="earnings" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DriverDashboardCard
                    title="Today's Earnings"
                    value="₹1,850"
                    subtitle="6 rides completed"
                    icon={DollarSign}
                  />
                  <DriverDashboardCard
                    title="This Week"
                    value="₹8,940"
                    subtitle="28 rides completed"
                    icon={DollarSign}
                    trend={{ value: 15.3, isPositive: true }}
                  />
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4 mt-6">
                {rideHistory.map((ride) => (
                  <RideHistoryCard key={ride.id} {...ride} />
                ))}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
