import React, { useState } from "react";
import { Search, MapPin, Filter, ZoomIn, ZoomOut, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MapControlsProps {
  onSearch?: (query: string) => void;
  onFilter?: (filter: string) => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onUseCurrentLocation?: () => void;
}

const MapControls = ({
  onSearch = () => {},
  onFilter = () => {},
  onZoomIn = () => {},
  onZoomOut = () => {},
  onUseCurrentLocation = () => {},
}: MapControlsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    onFilter(value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-xs flex flex-col gap-4">
      <form onSubmit={handleSearch} className="space-y-2">
        <div className="relative">
          <Input
            type="text"
            placeholder="Cari berdasarkan alamat atau ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <Button type="submit" className="w-full">
          Cari
        </Button>
      </form>

      <div className="space-y-2">
        <p className="text-sm font-medium">Filter Lampu</p>
        <Select value={filterValue} onValueChange={handleFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter berdasarkan status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Lampu</SelectItem>
            <SelectItem value="working">Berfungsi</SelectItem>
            <SelectItem value="reported">Masalah Dilaporkan</SelectItem>
            <SelectItem value="maintenance">Dalam Perbaikan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={onZoomIn}
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onZoomOut}
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onUseCurrentLocation}
          title="Use Current Location"
        >
          <MapPin className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" title="Map Layers">
          <Layers className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-2">
        <Button
          variant="secondary"
          className="w-full"
          onClick={onUseCurrentLocation}
        >
          <MapPin className="mr-2 h-4 w-4" />
          Gunakan Lokasi Saya
        </Button>
      </div>
    </div>
  );
};

export default MapControls;
