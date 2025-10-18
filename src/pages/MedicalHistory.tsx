import { Calendar, Info, Bell, PackageSearch } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { samplePrescriptions } from "@/data/mockData";
import { toast } from "sonner";

const MedicalHistory = () => {
  const navigate = useNavigate();

  const handleSetReminder = (medicineName: string) => {
    toast.success(`Reminder set for ${medicineName}`);
  };

  const handleCheckAvailability = () => {
    navigate("/med-bay");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Medical History</h1>
          <p className="text-muted-foreground">Your E-Prescriptions and past visits</p>
        </div>

        {samplePrescriptions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
              <Calendar className="w-20 h-20 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">No medical history yet</p>
              <Button onClick={() => navigate("/")}>Book Your First Appointment</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {samplePrescriptions.map((prescription) => (
              <Card key={prescription.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{prescription.doctorName}</CardTitle>
                      <p className="text-sm text-primary font-medium">
                        {prescription.specialty}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(prescription.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-secondary rounded-lg space-y-2">
                    <h3 className="font-semibold text-foreground">Diagnosis</h3>
                    <p className="text-sm text-muted-foreground">{prescription.diagnosis}</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground text-lg">Prescribed Medicines</h3>
                    {prescription.medicines.map((medicine, index) => (
                      <Card key={index} className="bg-card/50">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h4 className="font-semibold text-foreground">{medicine.name}</h4>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <p>
                                  <span className="font-medium">Dosage:</span> {medicine.dosage}
                                </p>
                                <p>
                                  <span className="font-medium">Timing:</span> {medicine.timing}
                                </p>
                                <p>
                                  <span className="font-medium">Duration:</span> {medicine.duration}
                                </p>
                              </div>
                            </div>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Info className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>{medicine.name}</DialogTitle>
                                  <DialogDescription className="space-y-3 pt-4">
                                    <div>
                                      <h4 className="font-semibold text-foreground mb-1">
                                        Prescription Details
                                      </h4>
                                      <p>Dosage: {medicine.dosage}</p>
                                      <p>Timing: {medicine.timing}</p>
                                      <p>Duration: {medicine.duration}</p>
                                    </div>
                                    <p className="text-xs text-warning">
                                      ⚠ For detailed medicine information, consult your pharmacist
                                      or doctor.
                                    </p>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={handleCheckAvailability}
                            >
                              <PackageSearch className="w-4 h-4 mr-2" />
                              Check Availability
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleSetReminder(medicine.name)}
                            >
                              <Bell className="w-4 h-4 mr-2" />
                              Set Reminder
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;
