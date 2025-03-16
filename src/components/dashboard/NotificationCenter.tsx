import React from "react";
import { Bell, CheckCircle, AlertCircle, Clock, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationProps {
  id: string;
  title: string;
  message: string;
  time: string;
  status: "info" | "success" | "warning" | "update";
  read: boolean;
}

interface NotificationCenterProps {
  notifications?: NotificationProps[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDismiss?: (id: string) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications = [
    {
      id: "1",
      title: "Report Status Update",
      message: "Your report #1234 has been marked as 'In Progress'",
      time: "10 minutes ago",
      status: "update",
      read: false,
    },
    {
      id: "2",
      title: "Report Resolved",
      message: "Street light #SL-789 has been fixed",
      time: "2 hours ago",
      status: "success",
      read: false,
    },
    {
      id: "3",
      title: "Maintenance Scheduled",
      message: "Maintenance for street light #SL-456 scheduled for tomorrow",
      time: "Yesterday",
      status: "info",
      read: true,
    },
    {
      id: "4",
      title: "Report Verification",
      message: "Your report #5678 requires additional information",
      time: "2 days ago",
      status: "warning",
      read: true,
    },
  ],
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  onDismiss = () => {},
}) => {
  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const getStatusIcon = (status: NotificationProps["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "info":
        return <Bell className="h-4 w-4 text-blue-500" />;
      case "update":
        return <Clock className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: NotificationProps["status"]) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="default" className="bg-green-500">
            Resolved
          </Badge>
        );
      case "warning":
        return (
          <Badge variant="default" className="bg-amber-500">
            Action Required
          </Badge>
        );
      case "info":
        return (
          <Badge variant="default" className="bg-blue-500">
            Information
          </Badge>
        );
      case "update":
        return (
          <Badge variant="default" className="bg-purple-500">
            Update
          </Badge>
        );
      default:
        return <Badge variant="default">Notification</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full max-w-md border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onMarkAllAsRead}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Mark all as read
        </Button>
      </div>

      <ScrollArea className="h-[350px]">
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 flex gap-3 ${!notification.read ? "bg-blue-50" : ""}`}
              >
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(notification.status)}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">
                      {notification.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(notification.status)}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-gray-200"
                        onClick={() => onDismiss(notification.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {notification.time}
                    </span>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-blue-600 hover:text-blue-800 h-6 px-2"
                        onClick={() => onMarkAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <Bell className="h-12 w-12 text-gray-300 mb-2" />
            <h4 className="text-lg font-medium text-gray-900">
              No notifications
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              You don't have any notifications at the moment.
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotificationCenter;
