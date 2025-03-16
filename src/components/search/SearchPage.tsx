import React, { useState, useEffect } from "react";
import { Search, Filter, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

interface SearchPageProps {
  title?: string;
}

const SearchPage = ({ title = "Cari Lampu Jalan" }: SearchPageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streetLights, setStreetLights] = useState<any[]>([]);
  const [filteredLights, setFilteredLights] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Fetch street lights data from Supabase
  const fetchStreetLights = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("trafficlight").select("*");

      if (error) {
        console.error("Error fetching street lights:", error);
        return;
      }

      setStreetLights(data || []);
      setFilteredLights(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStreetLights();
  }, []);

  // Filter lights based on search query and status filter
  useEffect(() => {
    let filtered = [...streetLights];

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (light) =>
          light.codenumber?.toLowerCase().includes(query) ||
          light.address?.toLowerCase().includes(query) ||
          light.kecamatan?.toLowerCase().includes(query) ||
          light.kelurahan?.toLowerCase().includes(query),
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter((light) => light.status === statusFilter);
    }

    setFilteredLights(filtered);
  }, [searchQuery, statusFilter, streetLights]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };

  const handleRefresh = () => {
    fetchStreetLights();
  };

  const getStatusBadge = (status: string | null) => {
    if (!status) return <Badge variant="outline">Tidak Diketahui</Badge>;

    switch (status.toLowerCase()) {
      case "working":
        return <Badge className="bg-green-500">Berfungsi</Badge>;
      case "reported":
        return <Badge className="bg-amber-500">Dilaporkan</Badge>;
      case "maintenance":
        return <Badge className="bg-blue-500">Perbaikan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6 bg-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card className="p-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Cari berdasarkan kode, alamat, kecamatan, atau kelurahan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Cari
          </Button>
        </form>

        <div className="flex gap-2 mt-4">
          <Button
            variant={statusFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(null)}
          >
            Semua
          </Button>
          <Button
            variant={statusFilter === "working" ? "default" : "outline"}
            size="sm"
            className="bg-green-500 hover:bg-green-600"
            onClick={() => setStatusFilter("working")}
          >
            Berfungsi
          </Button>
          <Button
            variant={statusFilter === "reported" ? "default" : "outline"}
            size="sm"
            className="bg-amber-500 hover:bg-amber-600"
            onClick={() => setStatusFilter("reported")}
          >
            Dilaporkan
          </Button>
          <Button
            variant={statusFilter === "maintenance" ? "default" : "outline"}
            size="sm"
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => setStatusFilter("maintenance")}
          >
            Perbaikan
          </Button>
        </div>
      </Card>

      <Card>
        <Table>
          <TableCaption>
            {isLoading
              ? "Memuat data..."
              : `Total ${filteredLights.length} lampu jalan ditemukan`}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>Kecamatan</TableHead>
              <TableHead>Kelurahan</TableHead>
              <TableHead>Koordinat</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-5 h-5 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                    <span>Memuat data...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredLights.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Tidak ada data lampu jalan yang ditemukan
                </TableCell>
              </TableRow>
            ) : (
              filteredLights.map((light) => (
                <TableRow key={light.id}>
                  <TableCell className="font-medium">
                    {light.codenumber || "-"}
                  </TableCell>
                  <TableCell>{light.address || "-"}</TableCell>
                  <TableCell>{light.kecamatan || "-"}</TableCell>
                  <TableCell>{light.kelurahan || "-"}</TableCell>
                  <TableCell>
                    {light.latitude && light.longitude
                      ? `${light.latitude}, ${light.longitude}`
                      : "-"}
                  </TableCell>
                  <TableCell>{getStatusBadge(light.status)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default SearchPage;
