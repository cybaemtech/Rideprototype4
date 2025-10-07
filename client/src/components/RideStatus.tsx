import { motion } from "framer-motion";
import { Search, UserCheck, Navigation, CheckCircle } from "lucide-react";

const statuses = [
  { id: "searching", label: "Searching for Driver", icon: Search },
  { id: "found", label: "Driver Found", icon: UserCheck },
  { id: "on-way", label: "Driver on the Way", icon: Navigation },
  { id: "arrived", label: "Driver Arrived", icon: CheckCircle },
];

interface RideStatusProps {
  currentStatus: "searching" | "found" | "on-way" | "arrived";
}

export default function RideStatus({ currentStatus }: RideStatusProps) {
  const currentIndex = statuses.findIndex((s) => s.id === currentStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {statuses.map((status, index) => {
          const Icon = status.icon;
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={status.id} className="flex flex-col items-center flex-1">
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  opacity: isActive ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
                className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
                  isActive ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
                data-testid={`status-${status.id}`}
              >
                <Icon className="h-5 w-5" />
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
              {index < statuses.length - 1 && (
                <div className="hidden md:block absolute w-full h-0.5 bg-border left-1/2 top-6">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: index < currentIndex ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-primary origin-left"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <motion.h3
          key={currentStatus}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold"
          data-testid="text-current-status"
        >
          {statuses[currentIndex].label}
        </motion.h3>
        {currentStatus === "searching" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground mt-2"
          >
            Finding the best driver for you...
          </motion.p>
        )}
      </div>
    </div>
  );
}
