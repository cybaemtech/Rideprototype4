import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RideHistoryCard from "@/components/RideHistoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, History } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function RideHistory() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-header", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".search-filter", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const allRides = [
    {
      id: "1",
      from: "Connaught Place, Delhi",
      to: "IGI Airport, Delhi",
      date: new Date("2025-10-05T14:30:00"),
      fare: 182,
      driverName: "Rajesh Kumar",
      rating: 4.8,
      status: "completed" as const,
    },
    {
      id: "2",
      from: "India Gate, Delhi",
      to: "Red Fort, Delhi",
      date: new Date("2025-10-03T09:15:00"),
      fare: 95,
      driverName: "Amit Singh",
      rating: 5.0,
      status: "completed" as const,
    },
    {
      id: "3",
      from: "Qutub Minar, Delhi",
      to: "Connaught Place, Delhi",
      date: new Date("2025-10-02T16:45:00"),
      fare: 125,
      driverName: "Priya Sharma",
      rating: 4.5,
      status: "completed" as const,
    },
    {
      id: "4",
      from: "Saket, Delhi",
      to: "Vasant Kunj, Delhi",
      date: new Date("2025-10-01T20:30:00"),
      fare: 78,
      driverName: "Vikram Verma",
      rating: 4.9,
      status: "cancelled" as const,
    },
    {
      id: "5",
      from: "Nehru Place, Delhi",
      to: "Cyber City, Gurgaon",
      date: new Date("2025-09-30T10:00:00"),
      fare: 215,
      driverName: "Sanjay Gupta",
      rating: 4.7,
      status: "completed" as const,
    },
  ];

  const filteredRides = allRides.filter((ride) => {
    const matchesSearch =
      ride.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.driverName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || ride.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div ref={pageRef} className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
          <motion.div
            className="page-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <History className="h-8 w-8 text-primary" />
              </motion.div>
              <h1 className="text-2xl sm:text-3xl font-bold">Ride History</h1>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base">
              View and manage your past rides
            </p>
          </motion.div>

          <motion.div
            className="search-filter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search rides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-rides"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48" data-testid="select-filter-status">
                  <SlidersHorizontal className="h-4 w-4 mr-2 flex-shrink-0" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rides</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3 sm:space-y-4"
          >
            {filteredRides.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 text-muted-foreground"
              >
                <History className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>No rides found matching your criteria</p>
              </motion.div>
            ) : (
              filteredRides.map((ride, index) => (
                <motion.div
                  key={ride.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ y: -5 }}
                >
                  <RideHistoryCard {...ride} />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
