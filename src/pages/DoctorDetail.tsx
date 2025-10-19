import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Clock, IndianRupee, Users, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { doctors, hospitals } from "@/data/mockData";
import { toast } from "sonner";
import doctorProfileBg from "@/assets/doctor-profile.jpg";

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find((d) => d.id === id);
  const hospital = hospitals.find((h) => h.id === doctor?.hospitalId);
  
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");

  if (!doctor) {
    return <div className="p-8 text-center">Doctor not found</div>;
  }

  const handleOpenBookingDialog = () => {
    if (!doctor.isAvailable) {
      toast.error("Doctor is not available for appointments");
      return;
    }
    setIsBookingDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!patientName.trim() || !patientAge.trim()) {
      toast.error("Please enter patient name and age");
      return;
    }

    const age = parseInt(patientAge);
    if (isNaN(age) || age < 0 || age > 120) {
      toast.error("Please enter a valid age");
      return;
    }

    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const token = `HD${Date.now().toString().slice(-6)}`;
    const newAppointment = {
      id: Date.now().toString(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      hospitalName: hospital?.name || "",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      token,
      fee: doctor.consultationFee + 20,
      status: "upcoming",
      patientName: patientName.trim(),
      patientAge: age,
    };

    appointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    
    setIsBookingDialogOpen(false);
    setPatientName("");
    setPatientAge("");
    toast.success("Appointment booked successfully!");
    navigate("/appointments");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[300px] mb-8 overflow-hidden">
        <img 
          src={doctorProfileBg} 
          alt="Doctor" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Doctor Profile</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <div className="flex-1 space-y-4">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground">{doctor.name}</h1>
                      <p className="text-lg text-primary font-medium">{doctor.specialty}</p>
                    </div>

                    <Badge
                      variant={doctor.isAvailable ? "default" : "destructive"}
                      className={`text-base px-4 py-1 ${
                        doctor.isAvailable
                          ? "bg-success hover:bg-success/90"
                          : ""
                      }`}
                    >
                      {doctor.isAvailable ? "Available Now" : "Currently Unavailable"}
                    </Badge>

                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-warning fill-warning" />
                        <span className="font-semibold">{doctor.rating}</span>
                        <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <span>{doctor.experience} years</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-muted-foreground" />
                        <span>{doctor.currentPatients} waiting</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Education & Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Qualifications</h3>
                  <p className="text-muted-foreground">{doctor.education}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Experience</h3>
                  <p className="text-muted-foreground">
                    {doctor.experience} years of professional practice in {doctor.specialty}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Hospital Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">{hospital?.name}</p>
                  <p className="text-muted-foreground">{hospital?.address}</p>
                  <p className="text-sm text-primary">{hospital?.distance} km away</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      const url = `https://www.google.com/maps/search/?api=1&query=${hospital?.latitude},${hospital?.longitude}`;
                      window.open(url, "_blank");
                    }}
                  >
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <span className="text-sm font-medium">Consultation Fee</span>
                    <div className="flex items-center gap-1 font-bold text-lg">
                      <IndianRupee className="w-5 h-5" />
                      {doctor.consultationFee}
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <span className="text-sm font-medium">Platform Fee</span>
                    <div className="flex items-center gap-1 font-bold text-lg">
                      <IndianRupee className="w-5 h-5" />
                      20
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border-2 border-primary">
                    <span className="font-semibold">Total Amount</span>
                    <div className="flex items-center gap-1 font-bold text-xl text-primary">
                      <IndianRupee className="w-6 h-6" />
                      {doctor.consultationFee + 20}
                    </div>
                  </div>
                </div>

                {doctor.isAvailable && (
                  <div className="space-y-2 p-4 bg-success/10 rounded-lg border border-success">
                    <div className="flex items-center gap-2 text-success font-semibold">
                      <Calendar className="w-4 h-4" />
                      <span>Available for walk-in</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Approximately {doctor.currentPatients} patients in queue
                    </p>
                  </div>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleOpenBookingDialog}
                  disabled={!doctor.isAvailable}
                >
                  {doctor.isAvailable ? "Book Now" : "Not Available"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Cancellation allowed before 30 appointments for full refund
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Patient Information</DialogTitle>
            <DialogDescription>
              Please provide patient details to complete the booking
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patient-name">Patient Name</Label>
              <Input
                id="patient-name"
                placeholder="Enter full name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patient-age">Age</Label>
              <Input
                id="patient-age"
                type="number"
                placeholder="Enter age"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmBooking}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorDetail;
