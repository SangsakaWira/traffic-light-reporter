import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare, AlertTriangle } from "lucide-react";

type ReportStatus = "pending" | "in-progress" | "resolved" | "closed";

interface Report {
  id: string;
  lightId: string;
  reportDate: string;
  location: string;
  issueType: string;
  status: ReportStatus;
  lastUpdated: string;
}

interface ReportHistoryProps {
  reports?: Report[];
  onViewReport?: (reportId: string) => void;
  onAddComment?: (reportId: string) => void;
  onReportProblem?: (reportId: string) => void;
}

const getStatusBadgeVariant = (status: ReportStatus) => {
  switch (status) {
    case "pending":
      return "secondary";
    case "in-progress":
      return "default";
    case "resolved":
      return "outline";
    case "closed":
      return "destructive";
    default:
      return "secondary";
  }
};

const ReportHistory = ({
  reports = [
    {
      id: "REP-001",
      lightId: "SL-12345",
      reportDate: "2023-06-15",
      location: "Main St & 5th Ave",
      issueType: "Light Out",
      status: "pending",
      lastUpdated: "2023-06-15",
    },
    {
      id: "REP-002",
      lightId: "SL-67890",
      reportDate: "2023-06-10",
      location: "Oak Rd & Pine St",
      issueType: "Flickering",
      status: "in-progress",
      lastUpdated: "2023-06-12",
    },
    {
      id: "REP-003",
      lightId: "SL-54321",
      reportDate: "2023-05-28",
      location: "Cedar Ave & Elm St",
      issueType: "Damaged Pole",
      status: "resolved",
      lastUpdated: "2023-06-05",
    },
    {
      id: "REP-004",
      lightId: "SL-13579",
      reportDate: "2023-05-15",
      location: "Maple Dr & Birch Ln",
      issueType: "Light Out",
      status: "closed",
      lastUpdated: "2023-05-30",
    },
  ],
  onViewReport = (id) => console.log(`View report ${id}`),
  onAddComment = (id) => console.log(`Add comment to ${id}`),
  onReportProblem = (id) => console.log(`Report problem with ${id}`),
}: ReportHistoryProps) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-semibold mb-4">Riwayat Laporan Anda</h2>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Laporan</TableHead>
              <TableHead>ID Lampu</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Masalah</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Terakhir Diperbarui</TableHead>
              <TableHead>Tindakan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.lightId}</TableCell>
                <TableCell>{report.reportDate}</TableCell>
                <TableCell>{report.location}</TableCell>
                <TableCell>{report.issueType}</TableCell>
                <TableCell>
                  <Badge
                    variant={getStatusBadgeVariant(
                      report.status as ReportStatus,
                    )}
                  >
                    {report.status.charAt(0).toUpperCase() +
                      report.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{report.lastUpdated}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewReport(report.id)}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onAddComment(report.id)}
                      title="Add Comment"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onReportProblem(report.id)}
                      title="Report Problem"
                    >
                      <AlertTriangle className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={8} className="text-right">
                Total Laporan: {reports.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default ReportHistory;
