import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DoctorDetail from "./pages/DoctorDetail";
import Appointments from "./pages/Appointments";
import MedBay from "./pages/MedBay";
import MedicalHistory from "./pages/MedicalHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem("hasSeenLoading");
    if (hasSeenLoading) {
      setLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("hasSeenLoading", "true");
    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctor/:id" element={<DoctorDetail />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/med-bay" element={<MedBay />} />
              <Route path="/history" element={<MedicalHistory />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
