import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, IndianRupee, Bell, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { Appointment } from "@/data/mockData";
import { hospitals } from "@/data/mockData";
import appointmentsBg from "@/assets/appointments-bg.jpg";

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  const handleCancel = (id: string) => {
    const updated = appointments.filter((a) => a.id !== id);
    localStorage.setItem("appointments", JSON.stringify(updated));
    setAppointments(updated);
    toast.success("Appointment cancelled. Refund will be processed.");
  };

  const handleSetReminder = (appointment: Appointment) => {
    toast.success(`Reminder set for ${appointment.doctorName} on ${appointment.date}`);
  };

  const handleGetDirections = (hospitalName: string) => {
    const hospital = hospitals.find((h) => h.name === hospitalName);
    if (hospital) {
      const url = `https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`;
      window.open(url, "_blank");
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="relative h-[300px] mb-8 overflow-hidden">
          <img 
            src={appointmentsBg} 
            alt="Appointments" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 flex flex-col items-center justify-center text-white">
            <h1 className="text-5xl font-bold">My Appointments</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
              <Calendar className="w-20 h-20 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">No appointments yet</p>
              <Button onClick={() => window.location.href = "/"}>Book Your First Appointment</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[300px] mb-8 overflow-hidden">
        <img 
          src={appointmentsBg} 
          alt="Appointments" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold">My Appointments</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 space-y-8">

        <div className="grid md:grid-cols-2 gap-6">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{appointment.doctorName}</CardTitle>
                    <p className="text-sm text-primary font-medium">{appointment.specialty}</p>
                  </div>
                  <Badge
                    variant={appointment.status === "upcoming" ? "default" : "secondary"}
                    className={
                      appointment.status === "upcoming"
                        ? "bg-success hover:bg-success/90"
                        : ""
                    }
                  >
                    {appointment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary">
                  <p className="text-sm text-muted-foreground mb-1">Your E-Token</p>
                  <p className="text-3xl font-bold text-primary text-center">
                    {appointment.token}
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(appointment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{appointment.hospitalName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IndianRupee className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">₹{appointment.fee}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleSetReminder(appointment)}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Set Reminder
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleGetDirections(appointment.hospitalName)}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                </div>

                {appointment.status === "upcoming" && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => handleCancel(appointment.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Cancel Appointment
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
