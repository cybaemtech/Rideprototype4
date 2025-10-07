import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RealMapView from "@/components/RealMapView";
import RideTypeCard from "@/components/RideTypeCard";
import LocationAutocomplete from "@/components/LocationAutocomplete";
import ConfirmRideDialog from "@/components/ConfirmRideDialog";
import ScheduleRideDialog from "@/components/ScheduleRideDialog";
import SurgePricingIndicator from "@/components/SurgePricingIndicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CalendarClock, Star, MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { indianLocations, type Location } from "@/data/locations";
import { useToast } from "@/hooks/use-toast";

const rideTypes = [
  { type: "mini" as const, name: "RideNow Mini", description: "Affordable rides", pricePerKm: 12, eta: "3 min", capacity: 4 },
  { type: "prime" as const, name: "RideNow Prime", description: "Premium comfort", pricePerKm: 18, eta: "5 min", capacity: 4 },
  { type: "suv" as const, name: "RideNow SUV", description: "Spacious rides", pricePerKm: 25, eta: "7 min", capacity: 6 },
  { type: "luxury" as const, name: "RideNow Luxury", description: "Ultimate experience", pricePerKm: 35, eta: "10 min", capacity: 4 },
];

export default function BookRide() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const pageRef = useRef<HTMLDivElement>(null);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  const [estimatedDistance] = useState(15.2);
  const [pickupCoords, setPickupCoords] = useState<Location | undefined>(undefined);
  const [dropCoords, setDropCoords] = useState<Location | undefined>(undefined);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [surgeMultiplier, setSurgeMultiplier] = useState(1);
  const [favoriteLocations, setFavoriteLocations] = useState<Location[]>([]);

  useEffect(() => {
    const hour = new Date().getHours();
    if ((hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 20)) {
      setSurgeMultiplier(1.5);
    } else if (hour >= 22 || hour <= 6) {
      setSurgeMultiplier(1.3);
    } else {
      setSurgeMultiplier(1);
    }

    const saved = localStorage.getItem('favoriteLocations');
    if (saved) {
      setFavoriteLocations(JSON.parse(saved));
    }

    const ctx = gsap.context(() => {
      gsap.from(".page-title", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".trip-card", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleShowConfirmDialog = () => {
    if (pickup && drop && pickupCoords && dropCoords && selectedRide) {
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmRide = () => {
    console.log("Booking ride:", { pickup, drop, pickupCoords, dropCoords, rideType: selectedRide });
    setShowConfirmDialog(false);
    toast({
      title: "Ride Booked!",
      description: "Finding you the best driver nearby...",
    });
    setTimeout(() => {
      setLocation("/ride/tracking");
    }, 500);
  };

  const handleScheduleRide = (date: Date, time: string) => {
    console.log("Scheduling ride for:", date, time);
    toast({
      title: "Ride Scheduled!",
      description: `Your ride is scheduled for ${date.toLocaleDateString()} at ${time}`,
    });
  };

  const addToFavorites = (location: Location) => {
    if (!favoriteLocations.find(loc => loc.name === location.name)) {
      const updated = [...favoriteLocations, location];
      setFavoriteLocations(updated);
      localStorage.setItem('favoriteLocations', JSON.stringify(updated));
      toast({
        title: "Added to Favorites",
        description: `${location.name} saved to your favorites`,
      });
    }
  };

  const selectedRideData = rideTypes.find((r) => r.type === selectedRide);
  const baseFare = selectedRideData ? selectedRideData.pricePerKm * estimatedDistance : 0;
  const estimatedFare = (baseFare * surgeMultiplier).toFixed(2);

  return (
    <div ref={pageRef} className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-full"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 page-title">
              <div>
                <motion.h1
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Book Your Ride
                </motion.h1>
                <motion.p
                  className="text-muted-foreground text-sm sm:text-base"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Enter your destination and choose your ride
                </motion.p>
              </div>
              <SurgePricingIndicator surgeMultiplier={surgeMultiplier} />
            </div>

            <Card className="trip-card">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <LocationAutocomplete
                    value={pickup}
                    onChange={(value, coords) => {
                      setPickup(value);
                      if (coords) {
                        setPickupCoords(coords);
                      } else {
                        setPickupCoords(undefined as any);
                      }
                    }}
                    placeholder="Enter pickup location"
                    icon="pickup"
                    locations={indianLocations}
                    testId="input-pickup"
                  />
                  {pickupCoords && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addToFavorites(pickupCoords)}
                        className="text-xs"
                      >
                        <Star className="h-3 w-3 mr-1" />
                        Save to Favorites
                      </Button>
                    </motion.div>
                  )}
                </div>

                <div className="space-y-2">
                  <LocationAutocomplete
                    value={drop}
                    onChange={(value, coords) => {
                      setDrop(value);
                      if (coords) {
                        setDropCoords(coords);
                      } else {
                        setDropCoords(undefined as any);
                      }
                    }}
                    placeholder="Enter drop location"
                    icon="drop"
                    locations={indianLocations}
                    testId="input-drop"
                  />
                  {dropCoords && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addToFavorites(dropCoords)}
                        className="text-xs"
                      >
                        <Star className="h-3 w-3 mr-1" />
                        Save to Favorites
                      </Button>
                    </motion.div>
                  )}
                </div>

                {favoriteLocations.length > 0 && (
                  <motion.div
                    className="pt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-sm text-muted-foreground mb-2">Favorite Locations:</p>
                    <div className="flex flex-wrap gap-2">
                      {favoriteLocations.slice(0, 3).map((loc, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (!pickup) {
                                setPickup(loc.name);
                                setPickupCoords(loc);
                              } else {
                                setDrop(loc.name);
                                setDropCoords(loc);
                              }
                            }}
                            className="text-xs"
                          >
                            <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
                            {loc.name}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {pickup && drop && pickupCoords && dropCoords && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-lg sm:text-xl font-semibold">Choose Your Ride</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowScheduleDialog(true)}
                    className="w-full sm:w-auto"
                  >
                    <CalendarClock className="h-4 w-4 mr-2" />
                    Schedule Later
                  </Button>
                </div>
                {rideTypes.map((ride, index) => (
                  <motion.div
                    key={ride.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <RideTypeCard
                      {...ride}
                      isSelected={selectedRide === ride.type}
                      onSelect={() => setSelectedRide(ride.type)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {pickup && drop && (!pickupCoords || !dropCoords) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-muted/50">
                  <CardContent className="p-4 text-center">
                    <Navigation className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Please select a location from the dropdown to continue
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {selectedRide && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="pb-4"
              >
                <Card className="bg-primary text-primary-foreground border-primary-border">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium">Estimated Fare</span>
                        {surgeMultiplier > 1 && (
                          <span className="text-xs opacity-75">
                            (includes {surgeMultiplier}x surge)
                          </span>
                        )}
                      </div>
                      <span className="text-2xl sm:text-3xl font-bold" data-testid="text-estimated-fare">
                        ₹{estimatedFare}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm opacity-90">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span>Distance: {estimatedDistance} km • {selectedRideData?.capacity} seats</span>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  size="lg"
                  className="w-full mt-4"
                  onClick={handleShowConfirmDialog}
                  data-testid="button-confirm-ride"
                >
                  Confirm Ride
                </Button>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2 h-[300px] sm:h-[400px] lg:h-full"
          >
            <RealMapView
              pickupLocation={pickupCoords}
              dropLocation={dropCoords}
            />
          </motion.div>
        </div>
      </main>
      
      {selectedRideData && (
        <ConfirmRideDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
          onConfirm={handleConfirmRide}
          pickup={pickup}
          drop={drop}
          rideName={selectedRideData.name}
          rideDescription={selectedRideData.description}
          estimatedFare={estimatedFare}
          estimatedDistance={estimatedDistance}
          eta={selectedRideData.eta}
        />
      )}

      <ScheduleRideDialog
        open={showScheduleDialog}
        onOpenChange={setShowScheduleDialog}
        onSchedule={handleScheduleRide}
      />
      
      <Footer />
    </div>
  );
}
