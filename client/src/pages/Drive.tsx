import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DollarSign,
  TrendingUp,
  Star,
  Clock,
  MapPin,
  Navigation,
  Users,
  Activity,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const todayEarnings = {
  total: 2450.50,
  rides: 12,
  hours: 6.5,
  rating: 4.8,
};

const weeklyStats = [
  { day: "Mon", earnings: 1850 },
  { day: "Tue", earnings: 2100 },
  { day: "Wed", earnings: 1950 },
  { day: "Thu", earnings: 2200 },
  { day: "Fri", earnings: 2450 },
  { day: "Sat", earnings: 2800 },
  { day: "Sun", earnings: 2600 },
];

const recentRides = [
  {
    id: "1",
    pickup: "Connaught Place",
    drop: "IGI Airport",
    fare: 280,
    distance: 18.5,
    time: "2h ago",
    rating: 5,
  },
  {
    id: "2",
    pickup: "Saket",
    drop: "Cyber Hub",
    fare: 320,
    distance: 22.3,
    time: "3h ago",
    rating: 5,
  },
  {
    id: "3",
    pickup: "India Gate",
    drop: "Noida Sector 18",
    fare: 250,
    distance: 16.8,
    time: "4h ago",
    rating: 4,
  },
];

export default function Drive() {
  const [, setLocation] = useLocation();
  const [isOnline, setIsOnline] = useState(false);
  const [showNewRide, setShowNewRide] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isOnline && !showNewRide) {
      // Simulate receiving a ride request after going online
      timer = setTimeout(() => setShowNewRide(true), 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOnline, showNewRide]);

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      setShowNewRide(false);
    } else {
      setShowNewRide(false);
    }
  };

  const handleAcceptRide = () => {
    setShowNewRide(false);
    setLocation("/ride/tracking");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 space-y-6">
          {/* Online/Offline Toggle Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-16 w-16 rounded-full flex items-center justify-center ${
                        isOnline
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Activity className={`h-8 w-8 ${isOnline ? "animate-pulse" : ""}`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        {isOnline ? "You're Online" : "Go Online to Accept Rides"}
                      </h2>
                      <p className="text-muted-foreground">
                        {isOnline
                          ? "Ready to accept ride requests"
                          : "Toggle on to start earning"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">
                      {isOnline ? "Online" : "Offline"}
                    </span>
                    <Switch
                      checked={isOnline}
                      onCheckedChange={handleToggleOnline}
                      className="data-[state=checked]:bg-primary"
                      data-testid="switch-driver-status"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* New Ride Request Modal */}
          <AnimatePresence>
            {showNewRide && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-2 border-accent bg-accent/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="h-3 w-3 bg-accent rounded-full animate-pulse" />
                      New Ride Request
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Pickup</p>
                          <p className="font-medium">Connaught Place, Delhi</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Navigation className="h-5 w-5 text-accent" />
                        <div>
                          <p className="text-sm text-muted-foreground">Drop</p>
                          <p className="font-medium">IGI Airport, Delhi</p>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated Fare</p>
                        <p className="text-2xl font-bold">₹280</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Distance</p>
                        <p className="text-lg font-semibold">18.5 km</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setShowNewRide(false)}
                        data-testid="button-decline-ride"
                      >
                        Decline
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={handleAcceptRide}
                        data-testid="button-accept-ride"
                      >
                        Accept Ride
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Today's Earnings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold mb-4">Today's Earnings</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="hover-elevate" data-testid="card-total-earned">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Total Earned</p>
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold" data-testid="text-total-earnings">₹{todayEarnings.total}</p>
                  <p className="text-xs text-primary flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +12% from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="card-total-rides">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Rides</p>
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold" data-testid="text-total-rides">{todayEarnings.rides}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ₹{(todayEarnings.total / todayEarnings.rides).toFixed(0)} avg per ride
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="card-hours-online">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Hours Online</p>
                    <Clock className="h-5 w-5 text-chart-3" />
                  </div>
                  <p className="text-3xl font-bold" data-testid="text-hours-online">{todayEarnings.hours}h</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ₹{(todayEarnings.total / todayEarnings.hours).toFixed(0)}/hour
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="card-rating">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  </div>
                  <p className="text-3xl font-bold" data-testid="text-driver-rating">{todayEarnings.rating}</p>
                  <p className="text-xs text-muted-foreground mt-1">Excellent performance</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Weekly Earnings Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Weekly Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-48 gap-4">
                  {weeklyStats.map((stat, index) => (
                    <motion.div
                      key={stat.day}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                      className="flex flex-col items-center flex-1 gap-2"
                    >
                      <div className="relative w-full">
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                          className="bg-primary rounded-t-md origin-bottom hover-elevate cursor-pointer"
                          style={{
                            height: `${(stat.earnings / 3000) * 150}px`,
                            minHeight: "20px",
                          }}
                        />
                      </div>
                      <p className="text-xs font-medium text-muted-foreground">{stat.day}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Weekly Total: <span className="font-bold text-foreground">₹15,950</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Rides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Rides</h2>
              <Button variant="ghost" size="sm" data-testid="button-view-all-rides">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {recentRides.map((ride, index) => (
                <motion.div
                  key={ride.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                >
                  <Card className="hover-elevate cursor-pointer" data-testid={`card-recent-ride-${index}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" data-testid={`badge-ride-time-${index}`}>{ride.time}</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                              <span className="text-sm font-medium" data-testid={`text-ride-rating-${index}`}>{ride.rating}.0</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span className="text-muted-foreground" data-testid={`text-ride-pickup-${index}`}>{ride.pickup}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Navigation className="h-4 w-4 text-accent" />
                              <span className="text-muted-foreground" data-testid={`text-ride-drop-${index}`}>{ride.drop}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold" data-testid={`text-ride-fare-${index}`}>₹{ride.fare}</p>
                          <p className="text-xs text-muted-foreground" data-testid={`text-ride-distance-${index}`}>{ride.distance} km</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
