import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";

interface MapViewProps {
  pickupLocation?: string;
  dropLocation?: string;
  showDriver?: boolean;
  driverLocation?: { lat: number; lng: number };
}

export default function MapView({
  pickupLocation,
  dropLocation,
  showDriver = false,
}: MapViewProps) {
  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5">
        <svg className="w-full h-full opacity-20">
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          {pickupLocation && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full"
            >
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">{pickupLocation}</span>
            </motion.div>
          )}

          {showDriver && (
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full"
            >
              <Navigation className="h-4 w-4" />
              <span className="text-sm font-medium">Driver En Route</span>
            </motion.div>
          )}

          {dropLocation && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-full"
            >
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">{dropLocation}</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
        Live Map View
      </div>
    </div>
  );
}
