import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, MapPin, History, Settings } from "lucide-react";
import ReportHistory from "./ReportHistory";
import NotificationCenter from "./NotificationCenter";

interface DashboardProps {
  userName?: string;
  activeReports?: number;
  resolvedReports?: number;
  pendingReports?: number;
  onViewMap?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  userName = "John Doe",
  activeReports = 2,
  resolvedReports = 5,
  pendingReports = 1,
  onViewMap = () => console.log("View map clicked"),
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto p-4  min-h-screen">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Semua PJUTS di Kota Palembang</h1>
            <p className="text-gray-500">Selamat datang kembali, {userName}</p>
          </div>
          <Button onClick={onViewMap} className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Lihat Peta
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Laporan Aktif
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeReports}</div>
              <p className="text-xs text-gray-500 mt-1">
                Laporan yang sedang diproses
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Laporan Terselesaikan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{resolvedReports}</div>
              <p className="text-xs text-gray-500 mt-1">
                Laporan yang berhasil diselesaikan
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Laporan Tertunda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingReports}</div>
              <p className="text-xs text-gray-500 mt-1">
                Laporan yang menunggu peninjauan awal
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 md:w-[400px] mb-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">Riwayat Laporan</span>
              <span className="sm:hidden">Riwayat</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifikasi</span>
              <span className="sm:hidden">Peringatan</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Pengaturan</span>
              <span className="sm:hidden">Pengaturan</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Laporan Anda</CardTitle>
                <CardDescription>
                  Lihat dan kelola semua laporan lampu jalan yang telah Anda
                  kirimkan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ReportHistory />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifikasi</CardTitle>
                <CardDescription>
                  Tetap mendapatkan informasi terbaru tentang status laporan
                  Anda dan pengumuman sistem.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationCenter />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Akun</CardTitle>
                <CardDescription>
                  Kelola preferensi akun dan pengaturan notifikasi Anda.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-100 rounded-md text-center">
                  <p className="text-gray-500">
                    Panel pengaturan sedang dalam pengembangan
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
