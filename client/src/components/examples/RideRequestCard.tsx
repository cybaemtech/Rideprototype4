import RideRequestCard from '../RideRequestCard';

export default function RideRequestCardExample() {
  return (
    <RideRequestCard
      id="1"
      pickupLocation="123 Main Street, Downtown"
      dropLocation="456 Park Avenue, Uptown"
      estimatedFare={15.50}
      estimatedDistance="5.2 km"
      estimatedTime="12 min"
      onAccept={() => console.log('Ride accepted')}
      onReject={() => console.log('Ride rejected')}
    />
  );
}
