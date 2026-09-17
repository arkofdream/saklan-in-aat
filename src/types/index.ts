export type Role = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
}

export type ListingStatus = 'pending' | 'approved' | 'rejected' | 'inactive';
export type ListingType = 'real_estate' | 'vehicle';

export interface BaseListing {
  id: string;
  ownerId: string;
  type: ListingType;
  title: string;
  description: string;
  price: number;
  city: string;
  district: string;
  neighborhood?: string;
  status: ListingStatus;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RealEstateDetails {
  category: 'Satılık Daire' | 'Kiralık Daire' | 'Villa' | 'Arsa' | 'İş Yeri' | 'Müstakil Ev' | 'Diğer';
  sizeSqM: number;
  rooms: string;
  buildingAge: number;
  floor: string;
  heating: string;
  bathrooms: number;
  balcony: boolean;
}

export interface RealEstateListing extends BaseListing {
  type: 'real_estate';
  details: RealEstateDetails;
}

export interface VehicleDetails {
  category: 'Otomobil' | 'SUV' | 'Ticari Araç' | 'Motosiklet' | 'Diğer';
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  engineCapacity?: number;
  enginePower?: number;
}

export interface VehicleListing extends BaseListing {
  type: 'vehicle';
  details: VehicleDetails;
}

export type Listing = RealEstateListing | VehicleListing;

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  location: string;
  createdAt?: string;
}
