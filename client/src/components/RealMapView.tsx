import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";

interface RealMapViewProps {
  pickupLocation?: { lat: number; lng: number; name: string };
  dropLocation?: { lat: number; lng: number; name: string };
  driverLocation?: { lat: number; lng: number };
  showDriver?: boolean;
}

export default function RealMapView({
  pickupLocation,
  dropLocation,
  driverLocation,
  showDriver = false,
}: RealMapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const customIcon = L.divIcon({
      className: "custom-marker",
      html: `<div class="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center">
        <div class="w-3 h-3 bg-white rounded-full"></div>
      </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const driverIcon = L.divIcon({
      className: "custom-marker",
      html: `<div class="w-10 h-10 bg-accent rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
        </svg>
      </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    const defaultCenter: [number, number] = pickupLocation
      ? [pickupLocation.lat, pickupLocation.lng]
      : [28.6139, 77.209];

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView(defaultCenter, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(mapRef.current);

      L.control.zoom({ position: "bottomright" }).addTo(mapRef.current);
    }

    if (pickupLocation) {
      L.marker([pickupLocation.lat, pickupLocation.lng], { icon: customIcon })
        .addTo(mapRef.current)
        .bindPopup(`<b>Pickup:</b> ${pickupLocation.name}`);
    }

    if (dropLocation) {
      L.marker([dropLocation.lat, dropLocation.lng], { icon: customIcon })
        .addTo(mapRef.current)
        .bindPopup(`<b>Drop:</b> ${dropLocation.name}`);

      if (pickupLocation) {
        L.polyline(
          [
            [pickupLocation.lat, pickupLocation.lng],
            [dropLocation.lat, dropLocation.lng],
          ],
          {
            color: "hsl(var(--primary))",
            weight: 4,
            opacity: 0.7,
            dashArray: "10, 10",
          }
        ).addTo(mapRef.current);

        const bounds = L.latLngBounds([
          [pickupLocation.lat, pickupLocation.lng],
          [dropLocation.lat, dropLocation.lng],
        ]);
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }

    if (showDriver && driverLocation) {
      L.marker([driverLocation.lat, driverLocation.lng], { icon: driverIcon })
        .addTo(mapRef.current)
        .bindPopup("<b>Driver Location</b>");
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [pickupLocation, dropLocation, driverLocation, showDriver]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      ref={mapContainerRef}
      className="w-full h-full relative"
    >
      <div className="absolute top-4 left-4 z-[1000] bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium border shadow-sm">
        Live Map View
      </div>
    </motion.div>
  );
}
