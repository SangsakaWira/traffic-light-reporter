import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import MapboxReact from "./map-box/MapBoxReact";
import ReportForm from "./reports/ReportForm";
import Dashboard from "./dashboard/Dashboard";
import AuthModal from "./auth/AuthModal";
import axios from "axios";

const Home: React.FC = () => {
  // State for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("Guest User");

  // State for modals
  const [reportFormOpen, setReportFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">(
    "login",
  );

  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.sumselprov.info/api/v1/project");
      console.log(response.data.data)
      setProjects(response.data.data.Projects || []);
    } catch (err: any) {
      setError(err?.message || "Error fetching projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("handleViewportChange")
  }, []);

  // State for selected light
  const [selectedLightId, setSelectedLightId] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 40.7128,
    lng: -74.006,
  });

  // State for theme
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Handle light selection from map
  const handleLightSelect = (lightId: string) => {
    setSelectedLightId(lightId);
    setReportFormOpen(true);
    // In a real app, we would fetch the light's location
    setSelectedLocation({ lat: 40.7128, lng: -74.006 });
  };

  // Handle login
  const handleLogin = () => {
    setAuthModalOpen(true);
    setAuthModalTab("login");
  };

  // Handle register
  const handleRegister = () => {
    setAuthModalOpen(true);
    setAuthModalTab("register");
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("Guest User");
  };

  // Handle report submission
  const handleReportSubmit = (data: any) => {
    console.log("Report submitted:", data);
    setReportFormOpen(false);

    // If user is not authenticated, prompt them to login/register
    if (!isAuthenticated) {
      setAuthModalOpen(true);
    }
  };

  // Handle successful authentication
  const handleAuthSuccess = (userData: { name: string }) => {
    setIsAuthenticated(true);
    setUserName(userData.name);
    setAuthModalOpen(false);
  };

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // In a real app, we would apply the theme to the document
  };

  return (
    <div className={`min-h-screen bg-background ${isDarkTheme ? "dark" : ""}`}>
      <Header
        isAuthenticated={isAuthenticated}
        userName={userName}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
        onToggleTheme={toggleTheme}
        isDarkTheme={isDarkTheme}
      />

      <main className="container mx-auto px-4 py-6">
        {isAuthenticated ? (
          <div className="space-y-8">
            <MapStats></MapStats>
            <MapboxReact projects={projects}></MapboxReact>

            <Dashboard
              userName={userName}
              onViewMap={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          </div>
        ) : (
          <div className="space-y-8">
            <section className="text-center py-12">
              <h1 className="text-4xl font-bold mb-4">Sistem Pelaporan PJU Dishub Kota Palembang</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Bantu jaga keamanan komunitas Anda dengan melaporkan masalah
                pada lampu jalan.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  size="xl"
                  onClick={handleRegister}
                  className="bg-primary text-white hover:bg-primary/90 px-8"
                >
                  <h2>Laporkan Lampu Bermasalah</h2>
                </Button>
                {/* <Button
                  size="lg"
                  variant="outline"
                  onClick={() =>
                    window.scrollTo({ top: 500, behavior: "smooth" })
                  }
                >
                  Lihat Peta
                </Button> */}
              </div>
            </section>

            <MapStats></MapStats>
            <MapboxReact projects={projects}></MapboxReact>

            <section className="py-12 text-center">
              <h2 className="text-3xl font-bold mb-6">Cara Kerjanya</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Temukan</h3>
                  <p className="text-muted-foreground text-center">
                    Temukan lampu jalan di peta atau gunakan lokasi Anda saat
                    ini.
                  </p>
                </div>
                <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Laporkan</h3>
                  <p className="text-muted-foreground text-center">
                    Kirim detail tentang masalah dengan bukti foto opsional.
                  </p>
                </div>
                <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Pantau</h3>
                  <p className="text-muted-foreground text-center">
                    Terima pembaruan saat laporan Anda diproses dan
                    diselesaikan.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Modals */}
      <ReportForm
        open={reportFormOpen}
        onOpenChange={setReportFormOpen}
        onSubmit={handleReportSubmit}
        location={selectedLocation}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalTab}
      />

      <footer className="bg-muted py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2023 Pelaporan Lampu Jalan. Seluruh hak cipta dilindungi.</p>
          <p className="mt-2">
            Proyek layanan masyarakat untuk lingkungan yang lebih aman.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

// Import missing components
import { Button } from "./ui/button";
import { MapPin, AlertTriangle, Bell } from "lucide-react"; import MapStats from "./map/MapStats";

