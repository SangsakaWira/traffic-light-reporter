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
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500">Welcome back, {userName}</p>
          </div>
          <Button onClick={onViewMap} className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            View Map
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Active Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeReports}</div>
              <p className="text-xs text-gray-500 mt-1">
                Reports currently being processed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Resolved Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{resolvedReports}</div>
              <p className="text-xs text-gray-500 mt-1">
                Successfully completed reports
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Pending Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingReports}</div>
              <p className="text-xs text-gray-500 mt-1">
                Reports awaiting initial review
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
              <span className="hidden sm:inline">Report History</span>
              <span className="sm:hidden">History</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
              <span className="sm:hidden">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
              <span className="sm:hidden">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Report History</CardTitle>
                <CardDescription>
                  View and manage all your submitted street light reports.
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
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Stay updated on the status of your reports and system
                  announcements.
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
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and notification settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-100 rounded-md text-center">
                  <p className="text-gray-500">
                    Settings panel is under development
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
