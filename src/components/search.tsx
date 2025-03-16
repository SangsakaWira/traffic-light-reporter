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
                <Dashboard
                    userName={userName}
                    onViewMap={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                />
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
                    <p>© 2025 Pelaporan Lampu Jalan. Seluruh hak cipta dilindungi.</p>
                    <p className="mt-2">
                        Proyek layanan masyarakat untuk lingkungan yang lebih aman.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;

