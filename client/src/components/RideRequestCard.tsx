import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Clock } from "lucide-react";

interface RideRequestCardProps {
  id: string;
  pickupLocation: string;
  dropLocation: string;
  estimatedFare: number;
  estimatedDistance: string;
  estimatedTime: string;
  onAccept: () => void;
  onReject: () => void;
}

export default function RideRequestCard({
  id,
  pickupLocation,
  dropLocation,
  estimatedFare,
  estimatedDistance,
  estimatedTime,
  onAccept,
  onReject,
}: RideRequestCardProps) {
  return (
    <Card className="border-primary/50" data-testid={`ride-request-${id}`}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">{pickupLocation}</p>
                <div className="h-4 w-px bg-border ml-2 my-1" />
                <p className="font-medium">{dropLocation}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="font-semibold text-foreground">₹{estimatedFare.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{estimatedTime} • {estimatedDistance}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              className="flex-1"
              onClick={onAccept}
              data-testid={`button-accept-${id}`}
            >
              Accept Ride
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={onReject}
              data-testid={`button-reject-${id}`}
            >
              Reject
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
