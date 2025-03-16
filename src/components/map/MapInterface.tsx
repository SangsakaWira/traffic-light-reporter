import React, { useState, useEffect } from "react";
import { MapPin, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MapControls from "./MapControls";
import LightMarker from "./LightMarker";

interface StreetLight {
  id: string;
  status: "working" | "reported" | "maintenance";
  lastReported?: string;
  position: { lat: number; lng: number };
}

interface MapInterfaceProps {
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
  onLightSelect?: (lightId: string) => void;
}

const MapInterface = ({
  initialCenter = { lat: 40.7128, lng: -74.006 },
  initialZoom = 15,
  onLightSelect = () => {},
}: MapInterfaceProps) => {
  const [center, setCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(initialZoom);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for street lights
  const [streetLights, setStreetLights] = useState<StreetLight[]>([
    {
      id: "SL-1001",
      status: "working",
      position: { lat: 40.7135, lng: -74.0046 },
    },
    {
      id: "SL-1002",
      status: "reported",
      lastReported: "2023-06-10",
      position: { lat: 40.7118, lng: -74.0065 },
    },
    {
      id: "SL-1003",
      status: "maintenance",
      lastReported: "2023-06-15",
      position: { lat: 40.714, lng: -74.009 },
    },
    {
      id: "SL-1004",
      status: "working",
      position: { lat: 40.711, lng: -74.003 },
    },
    {
      id: "SL-1005",
      status: "reported",
      lastReported: "2023-06-18",
      position: { lat: 40.715, lng: -74.007 },
    },
  ]);

  // Filter lights based on selected filter
  const filteredLights = streetLights.filter((light) => {
    if (selectedFilter === "all") return true;
    return light.status === selectedFilter;
  });

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 20));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 10));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real implementation, this would search for lights by address or ID
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Mock implementation - just center on a random light
      if (streetLights.length > 0) {
        const randomIndex = Math.floor(Math.random() * streetLights.length);
        setCenter(streetLights[randomIndex].position);
      }
    }, 1000);
  };

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleUseCurrentLocation = () => {
    setIsLoading(true);
    // In a real implementation, this would use the browser's geolocation API
    setTimeout(() => {
      setIsLoading(false);
      // Mock implementation - just set to a predefined location
      setCenter({ lat: 40.7128, lng: -74.006 });
    }, 1000);
  };

  const handleLightClick = (lightId: string) => {
    onLightSelect(lightId);
  };

  return (
    <div className="relative w-full h-[700px] bg-gray-100 overflow-hidden rounded-lg border border-gray-200">
      {/* Map background - in a real implementation this would be a map library like Leaflet or Google Maps */}
      <div
        className="w-full h-full bg-[#e8eaed] relative overflow-hidden"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1553290322-e895dd09f2ae?w=1200&q=80)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Map overlay for zoom effect */}
        <div
          className="absolute inset-0 bg-black bg-opacity-10"
          style={{
            transform: `scale(${zoom / 15})`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>

        {/* Street light markers */}
        <div className="absolute inset-0 overflow-hidden">
          {filteredLights.map((light) => (
            <div
              key={light.id}
              style={{
                position: "absolute",
                left: `${(light.position.lng - center.lng) * 0.02 * zoom + 50}%`,
                top: `${(center.lat - light.position.lat) * 0.02 * zoom + 50}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <LightMarker
                id={light.id}
                status={light.status}
                lastReported={light.lastReported}
                position={light.position}
                onClick={handleLightClick}
              />
            </div>
          ))}
        </div>

        {/* Map controls */}
        <div className="absolute top-4 left-4 z-10">
          <MapControls
            onSearch={handleSearch}
            onFilter={handleFilter}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onUseCurrentLocation={handleUseCurrentLocation}
          />
        </div>

        {/* Map legend */}
        <Card className="absolute bottom-4 right-4 p-3 z-10 bg-white/90 backdrop-blur-sm">
          <div className="text-sm font-medium mb-2">Legenda Peta</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500 ring-2 ring-green-300"></div>
              <span className="text-xs">Berfungsi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-500 ring-2 ring-amber-300"></div>
              <span className="text-xs">Masalah Dilaporkan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 ring-2 ring-blue-300"></div>
              <span className="text-xs">Dalam Perbaikan</span>
            </div>
          </div>
        </Card>

        {/* Status indicators */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
            <MapPin className="w-3 h-3 mr-1" />
            {filteredLights.length} lampu terlihat
          </Badge>

          {selectedFilter !== "all" && (
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              <Filter className="w-3 h-3 mr-1" />
              Filtered: {selectedFilter}
            </Badge>
          )}
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-20">
            <Card className="p-4 flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
              <span>Memuat data peta...</span>
            </Card>
          </div>
        )}

        {/* Click anywhere to report */}
        <Button
          variant="secondary"
          className="absolute bottom-4 left-4 z-10 bg-white/80 backdrop-blur-sm"
          onClick={() => onLightSelect("new")}
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Laporkan Masalah Baru
        </Button>

        {/* Map attribution */}
        <div className="absolute bottom-1 right-1 text-[10px] text-gray-600 bg-white/70 px-1 rounded">
          <span>Map data © OpenStreetMap contributors</span>
        </div>
      </div>
    </div>
  );
};

export default MapInterface;
