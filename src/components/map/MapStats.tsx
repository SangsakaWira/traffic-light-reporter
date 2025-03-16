import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  LightbulbIcon,
  AlertTriangleIcon,
  WrenchIcon,
  MapIcon,
} from "lucide-react";

interface MapStatsProps {
  totalLights?: number;
  workingLights?: number;
  reportedLights?: number;
  maintenanceLights?: number;
}

const MapStats: React.FC<MapStatsProps> = ({
  totalLights = 125,
  workingLights = 98,
  reportedLights = 15,
  maintenanceLights = 12,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <StatCard
        title="Total Lampu"
        value={totalLights}
        icon={<MapIcon className="h-5 w-5 text-gray-500" />}
        bgColor="bg-card"
      />
      <StatCard
        title="Berfungsi"
        value={workingLights}
        icon={<LightbulbIcon className="h-5 w-5 text-green-500" />}
        bgColor="bg-green-50"
      />
      <StatCard
        title="Bermasalah"
        value={reportedLights}
        icon={<AlertTriangleIcon className="h-5 w-5 text-amber-500" />}
        bgColor="bg-amber-50"
      />
      <StatCard
        title="Dalam Perbaikan"
        value={maintenanceLights}
        icon={<WrenchIcon className="h-5 w-5 text-blue-500" />}
        bgColor="bg-blue-50"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bgColor }) => {
  return (
    <Card className={`${bgColor} border-none shadow-sm`}>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-full bg-background">{icon}</div>
      </CardContent>
    </Card>
  );
};

export default MapStats;
