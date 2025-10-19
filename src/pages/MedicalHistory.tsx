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
import { samplePrescriptions, medicines } from "@/data/mockData";
import { toast } from "sonner";

const MedicalHistory = () => {
  const navigate = useNavigate();

  const handleSetReminder = (medicineName: string) => {
    toast.success(`Reminder set for ${medicineName}`);
  };

  const handleCheckAvailability = (medicineName: string) => {
    navigate("/med-bay", { state: { searchQuery: medicineName } });
  };

  const getMedicineInfo = (medicineName: string) => {
    // Try to find medicine info from the medicines database
    const medicineInfo = medicines.find(m => 
      m.name.toLowerCase().includes(medicineName.toLowerCase().split(' ')[0])
    );
    return medicineInfo || null;
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
                  <div className="p-4 bg-secondary rounded-lg space-y-3">
                    <h3 className="font-semibold text-foreground">Diagnosis</h3>
                    <p className="text-sm text-muted-foreground">{prescription.diagnosis}</p>
                    
                    <div className="pt-2 border-t border-border/50 space-y-2">
                      <h4 className="text-sm font-semibold text-foreground">Medicine Schedule</h4>
                      {prescription.medicines.map((medicine, index) => (
                        <div key={index} className="text-xs text-muted-foreground pl-3 border-l-2 border-primary/30">
                          <span className="font-medium text-foreground">{medicine.name}</span>
                          {" - "}{medicine.dosage} - {medicine.timing} - {medicine.duration}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground text-lg">Prescribed Medicines</h3>
                    {prescription.medicines.map((medicine, index) => {
                      const medicineInfo = getMedicineInfo(medicine.name);
                      
                      return (
                        <Card key={index} className="bg-card/50">
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1 flex-1">
                                <h4 className="font-semibold text-foreground">{medicine.name}</h4>
                              </div>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="shrink-0">
                                    <Info className="w-5 h-5" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>{medicine.name}</DialogTitle>
                                    <DialogDescription className="space-y-3 pt-4 text-left">
                                      {medicineInfo ? (
                                        <>
                                          <div>
                                            <h4 className="font-semibold text-foreground mb-1">Uses</h4>
                                            <p>{medicineInfo.uses}</p>
                                          </div>
                                          <div>
                                            <h4 className="font-semibold text-foreground mb-1">Side Effects</h4>
                                            <p>{medicineInfo.sideEffects}</p>
                                          </div>
                                          <div>
                                            <h4 className="font-semibold text-foreground mb-1">Type</h4>
                                            <p>{medicineInfo.type}</p>
                                          </div>
                                        </>
                                      ) : (
                                        <div>
                                          <p className="text-muted-foreground">
                                            Detailed information not available for this medicine.
                                          </p>
                                        </div>
                                      )}
                                      <p className="text-xs text-warning">
                                        ⚠️ This information is for reference only. Always consult your doctor or pharmacist.
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
                                onClick={() => handleCheckAvailability(medicine.name)}
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
                      );
                    })}
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
