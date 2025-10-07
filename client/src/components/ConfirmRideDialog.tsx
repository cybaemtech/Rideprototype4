import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation2, Car, Clock, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";

interface ConfirmRideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  pickup: string;
  drop: string;
  rideName: string;
  rideDescription: string;
  estimatedFare: string;
  estimatedDistance: number;
  eta: string;
}

export default function ConfirmRideDialog({
  open,
  onOpenChange,
  onConfirm,
  pickup,
  drop,
  rideName,
  rideDescription,
  estimatedFare,
  estimatedDistance,
  eta,
}: ConfirmRideDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Confirm Your Ride</DialogTitle>
          <DialogDescription>
            Review your ride details before confirming
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 py-4"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Pickup</p>
                <p className="font-medium">{pickup}</p>
              </div>
            </div>

            <div className="pl-[11px] border-l-2 border-dashed border-muted-foreground/30 h-8" />

            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Drop</p>
                <p className="font-medium">{drop}</p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">{rideName}</p>
                  <p className="text-xs text-muted-foreground">{rideDescription}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{eta}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-sm text-muted-foreground">Distance: {estimatedDistance} km</span>
              <div className="flex items-center gap-1">
                <IndianRupee className="h-5 w-5" />
                <span className="text-2xl font-bold">{estimatedFare}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1"
            >
              Confirm & Book Ride
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
