import MapView from '../MapView';

export default function MapViewExample() {
  return (
    <div className="h-96">
      <MapView
        pickupLocation="123 Main Street"
        dropLocation="456 Park Avenue"
        showDriver={true}
      />
    </div>
  );
}
