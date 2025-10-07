import RideHistoryCard from '../RideHistoryCard';

export default function RideHistoryCardExample() {
  return (
    <div className="space-y-4">
      <RideHistoryCard
        id="1"
        from="123 Main Street, Downtown"
        to="456 Park Avenue, Uptown"
        date={new Date('2025-10-05T14:30:00')}
        fare={15.50}
        driverName="John Doe"
        rating={4.8}
        status="completed"
      />
      <RideHistoryCard
        id="2"
        from="789 Airport Road"
        to="321 Hotel Plaza"
        date={new Date('2025-10-03T09:15:00')}
        fare={28.00}
        driverName="Jane Smith"
        rating={5.0}
        status="completed"
      />
    </div>
  );
}
