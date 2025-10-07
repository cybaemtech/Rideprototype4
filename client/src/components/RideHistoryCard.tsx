import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, DollarSign, Star } from "lucide-react";
import { format } from "date-fns";

interface RideHistoryCardProps {
  id: string;
  from: string;
  to: string;
  date: Date;
  fare: number;
  driverName: string;
  rating: number;
  status: "completed" | "cancelled";
}

export default function RideHistoryCard({
  id,
  from,
  to,
  date,
  fare,
  driverName,
  rating,
  status,
}: RideHistoryCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`ride-history-${id}`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium" data-testid={`from-${id}`}>{from}</p>
                <div className="h-4 w-px bg-border ml-2 my-1" />
                <p className="font-medium" data-testid={`to-${id}`}>{to}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{format(date, "MMM dd, yyyy • hh:mm a")}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Driver: {driverName}</span>
              </div>
            </div>
          </div>

          <div className="flex md:flex-col items-center md:items-end gap-2 md:gap-3">
            <div className="text-right">
              <div className="flex items-center gap-1 text-2xl font-bold">
                <span>₹</span>
                <span data-testid={`fare-${id}`}>{fare.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span data-testid={`rating-${id}`}>{rating.toFixed(1)}</span>
              </div>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                status === "completed"
                  ? "bg-primary/10 text-primary"
                  : "bg-destructive/10 text-destructive"
              }`}
              data-testid={`status-${id}`}
            >
              {status === "completed" ? "Completed" : "Cancelled"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
