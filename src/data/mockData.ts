export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  education: string;
  experience: number;
  rating: number;
  reviews: number;
  consultationFee: number;
  isAvailable: boolean;
  currentPatients: number;
  hospitalId: string;
  photo: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: number;
  latitude: number;
  longitude: number;
}

export interface Medicine {
  id: string;
  name: string;
  type: string;
  uses: string;
  sideEffects: string;
  pharmacies: Pharmacy[];
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  distance: number;
  price: number;
  inStock: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  hospitalName: string;
  date: string;
  time: string;
  token: string;
  fee: number;
  status: "upcoming" | "completed" | "cancelled";
}

export interface Prescription {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  diagnosis: string;
  medicines: PrescriptionMedicine[];
}

export interface PrescriptionMedicine {
  name: string;
  dosage: string;
  timing: string;
  duration: string;
}

export const hospitals: Hospital[] = [
  {
    id: "1",
    name: "City General Hospital",
    address: "123 Main Street, Medical District",
    distance: 2.5,
    latitude: 28.6139,
    longitude: 77.2090,
  },
  {
    id: "2",
    name: "Apollo Healthcare Center",
    address: "456 Park Avenue, Downtown",
    distance: 3.8,
    latitude: 28.6129,
    longitude: 77.2295,
  },
  {
    id: "3",
    name: "Medicare Specialty Clinic",
    address: "789 Hospital Road, North Zone",
    distance: 5.2,
    latitude: 28.7041,
    longitude: 77.1025,
  },
];

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    education: "MBBS, MD (Cardiology)",
    experience: 15,
    rating: 4.8,
    reviews: 234,
    consultationFee: 800,
    isAvailable: true,
    currentPatients: 5,
    hospitalId: "1",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    specialty: "Orthopedic",
    education: "MBBS, MS (Orthopedics)",
    experience: 12,
    rating: 4.7,
    reviews: 189,
    consultationFee: 700,
    isAvailable: false,
    currentPatients: 0,
    hospitalId: "1",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
  },
  {
    id: "3",
    name: "Dr. Anjali Mehta",
    specialty: "Pediatrician",
    education: "MBBS, MD (Pediatrics)",
    experience: 10,
    rating: 4.9,
    reviews: 312,
    consultationFee: 600,
    isAvailable: true,
    currentPatients: 8,
    hospitalId: "1",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
  },
  {
    id: "4",
    name: "Dr. Vikram Singh",
    specialty: "General Physician",
    education: "MBBS, MD (General Medicine)",
    experience: 18,
    rating: 4.6,
    reviews: 267,
    consultationFee: 500,
    isAvailable: true,
    currentPatients: 12,
    hospitalId: "2",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
  },
  {
    id: "5",
    name: "Dr. Neha Patel",
    specialty: "Dermatologist",
    education: "MBBS, MD (Dermatology)",
    experience: 8,
    rating: 4.8,
    reviews: 178,
    consultationFee: 750,
    isAvailable: true,
    currentPatients: 6,
    hospitalId: "2",
    photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400",
  },
];

export const medicines: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    type: "Tablet",
    uses: "Pain relief and fever reduction",
    sideEffects: "Rare allergic reactions, liver damage with overdose",
    pharmacies: [
      {
        id: "1",
        name: "MedPlus Pharmacy",
        address: "Near City Hospital",
        distance: 1.2,
        price: 25,
        inStock: true,
      },
      {
        id: "2",
        name: "Apollo Pharmacy",
        address: "Main Road, Downtown",
        distance: 2.5,
        price: 28,
        inStock: true,
      },
    ],
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    type: "Capsule",
    uses: "Bacterial infections",
    sideEffects: "Nausea, diarrhea, allergic reactions",
    pharmacies: [
      {
        id: "1",
        name: "MedPlus Pharmacy",
        address: "Near City Hospital",
        distance: 1.2,
        price: 120,
        inStock: true,
      },
    ],
  },
];

export const samplePrescriptions: Prescription[] = [
  {
    id: "1",
    doctorName: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    date: "2025-10-15",
    diagnosis: "Mild hypertension. Regular monitoring required. Lifestyle modifications recommended.",
    medicines: [
      {
        name: "Amlodipine 5mg",
        dosage: "1 tablet",
        timing: "Morning after breakfast",
        duration: "30 days",
      },
      {
        name: "Aspirin 75mg",
        dosage: "1 tablet",
        timing: "Evening after dinner",
        duration: "30 days",
      },
    ],
  },
  {
    id: "2",
    doctorName: "Dr. Vikram Singh",
    specialty: "General Physician",
    date: "2025-09-28",
    diagnosis: "Viral fever with body ache. Rest and hydration recommended.",
    medicines: [
      {
        name: "Paracetamol 500mg",
        dosage: "1 tablet",
        timing: "Every 6 hours if fever",
        duration: "5 days",
      },
      {
        name: "Vitamin C",
        dosage: "1 tablet",
        timing: "Once daily after breakfast",
        duration: "7 days",
      },
    ],
  },
];
