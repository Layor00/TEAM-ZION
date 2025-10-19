import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, MapPin, IndianRupee, Package, ScanLine } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { medicines } from "@/data/mockData";
import { toast } from "sonner";
import pharmacyBg from "@/assets/pharmacy-bg.jpg";

const MedBay = () => {
  const location = useLocation();
  const initialSearch = (location.state as { searchQuery?: string })?.searchQuery || "";
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedMedicine, setSelectedMedicine] = useState(medicines[0]);
  
  useEffect(() => {
    if (initialSearch) {
      // Auto-select medicine if it matches the search
      const matchedMedicine = medicines.find(m => 
        m.name.toLowerCase().includes(initialSearch.toLowerCase())
      );
      if (matchedMedicine) {
        setSelectedMedicine(matchedMedicine);
      }
    }
  }, [initialSearch]);

  const filteredMedicines = medicines.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOrderMedicine = (pharmacyName: string, price: number, withDelivery: boolean) => {
    const total = withDelivery ? price + 30 : price;
    toast.success(
      `Order placed at ${pharmacyName}. Total: ₹${total}${
        withDelivery ? " (including ₹30 delivery)" : ""
      }`
    );
  };

  const handleScanPrescription = () => {
    toast.info("QR/Barcode scanner feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[300px] mb-8 overflow-hidden">
        <img 
          src={pharmacyBg} 
          alt="Pharmacy" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold">Med Bay</h1>
          <p className="text-xl mt-2">Find medicines and compare prices</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 space-y-8">

        {/* Search Bar */}
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search for medicines..."
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="lg" variant="outline" onClick={handleScanPrescription}>
                <ScanLine className="w-5 h-5 mr-2" />
                Scan Prescription
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Medicine Selection */}
        <div className="grid md:grid-cols-4 gap-4">
          {filteredMedicines.map((medicine) => (
            <Button
              key={medicine.id}
              variant={selectedMedicine.id === medicine.id ? "default" : "outline"}
              className="h-auto p-4 flex flex-col items-start space-y-2"
              onClick={() => setSelectedMedicine(medicine)}
            >
              <Package className="w-5 h-5" />
              <span className="font-semibold text-left">{medicine.name}</span>
              <span className="text-xs opacity-80">{medicine.type}</span>
            </Button>
          ))}
        </div>

        {/* Pharmacy Availability */}
        <Card>
          <CardHeader>
            <CardTitle>{selectedMedicine.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{selectedMedicine.type}</p>
          </CardHeader>
        </Card>
        
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Available at</h3>
          {selectedMedicine.pharmacies.map((pharmacy) => (
            <Card key={pharmacy.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-foreground">{pharmacy.name}</h4>
                    <p className="text-xs text-muted-foreground">{pharmacy.address}</p>
                    <div className="flex items-center gap-2 text-xs text-primary">
                      <MapPin className="w-3 h-3" />
                      <span>{pharmacy.distance} km away</span>
                    </div>
                  </div>
                  <Badge
                    variant={pharmacy.inStock ? "default" : "secondary"}
                    className={pharmacy.inStock ? "bg-success hover:bg-success/90" : ""}
                  >
                    {pharmacy.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-xl font-bold text-primary">
                  <IndianRupee className="w-5 h-5" />
                  <span>{pharmacy.price}</span>
                </div>

                <div className="space-y-2">
                  <Button
                    className="w-full"
                    size="sm"
                    disabled={!pharmacy.inStock}
                    onClick={() => handleOrderMedicine(pharmacy.name, pharmacy.price, false)}
                  >
                    Pick Up from Store
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    size="sm"
                    disabled={!pharmacy.inStock}
                    onClick={() => handleOrderMedicine(pharmacy.name, pharmacy.price, true)}
                  >
                    Home Delivery (+₹30)
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${pharmacy.address}`,
                        "_blank"
                      );
                    }}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedBay;
