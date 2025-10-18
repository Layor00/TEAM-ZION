import { useState } from "react";
import { Search, MapPin, Star, Clock, IndianRupee, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { hospitals, doctors } from "@/data/mockData";

const Home = () => {
  const [selectedHospital, setSelectedHospital] = useState(hospitals[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const selectedHospitalData = hospitals.find((h) => h.id === selectedHospital);
  const filteredDoctors = doctors
    .filter((d) => d.hospitalId === selectedHospital)
    .filter(
      (d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Find Your Doctor</h1>
          <p className="text-muted-foreground">Book appointments with ease</p>
        </div>

        {/* Hospital Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Hospitals Near You
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {hospitals.map((hospital) => (
                <Button
                  key={hospital.id}
                  variant={selectedHospital === hospital.id ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-start space-y-2"
                  onClick={() => setSelectedHospital(hospital.id)}
                >
                  <span className="font-semibold text-left">{hospital.name}</span>
                  <span className="text-xs text-left opacity-80">{hospital.address}</span>
                  <span className="text-xs font-medium">{hospital.distance} km away</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Doctor Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search doctors by name or specialty..."
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Doctors List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Available Doctors at {selectedHospitalData?.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/doctor/${doctor.id}`)}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <h3 className="font-bold text-lg text-foreground">{doctor.name}</h3>
                      <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
                      <Badge
                        variant={doctor.isAvailable ? "default" : "destructive"}
                        className={
                          doctor.isAvailable
                            ? "bg-success hover:bg-success/90"
                            : ""
                        }
                      >
                        {doctor.isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">{doctor.education}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-primary">
                      <IndianRupee className="w-4 h-4" />
                      <span>{doctor.consultationFee}</span>
                    </div>
                  </div>

                  <Button className="w-full" disabled={!doctor.isAvailable}>
                    View Details
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
