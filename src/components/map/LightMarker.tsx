import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Badge } from "../ui/badge";

type LightStatus = "working" | "reported" | "maintenance";

interface LightMarkerProps {
  id: string;
  status: LightStatus;
  lastReported?: string;
  position: { lat: number; lng: number };
  onClick?: (id: string) => void;
}

const statusConfig = {
  working: {
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
    ringColor: "ring-green-300",
    label: "Working",
    badgeVariant: "success",
  },
  reported: {
    color: "bg-amber-500",
    hoverColor: "hover:bg-amber-600",
    ringColor: "ring-amber-300",
    label: "Issue Reported",
    badgeVariant: "warning",
  },
  maintenance: {
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    ringColor: "ring-blue-300",
    label: "Under Maintenance",
    badgeVariant: "secondary",
  },
};

const LightMarker = ({
  id = "SL-1234",
  status = "working",
  lastReported = "2023-06-15",
  position = { lat: 40.7128, lng: -74.006 },
  onClick = () => {},
}: LightMarkerProps) => {
  const config = statusConfig[status];

  const handleClick = () => {
    onClick(id);
  };

  return (
    <div
      className="relative"
      style={{ position: "absolute", left: "50%", top: "50%" }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleClick}
              className={`w-8 h-8 rounded-full ${config.color} ${config.hoverColor} ring-2 ${config.ringColor} shadow-lg transform transition-all duration-200 hover:scale-110 flex items-center justify-center`}
              aria-label={`Street light ${id} - ${config.label}`}
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="bg-white p-3 rounded-md shadow-lg border z-50"
          >
            <div className="flex flex-col gap-1">
              <div className="font-semibold">Street Light {id}</div>
              <div className="flex items-center gap-2">
                <Badge variant={config.badgeVariant as any}>
                  {config.label}
                </Badge>
              </div>
              {lastReported && status !== "working" && (
                <div className="text-xs text-gray-500">
                  Reported: {new Date(lastReported).toLocaleDateString()}
                </div>
              )}
              <div className="text-xs text-gray-500 mt-1">
                Location: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
              </div>
              <div className="text-xs text-blue-600 mt-1 font-medium">
                Click to report an issue
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default LightMarker;
