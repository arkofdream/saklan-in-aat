import { Project, RealEstateListing, VehicleListing } from '../types';

export const mockProjects: Project[] = [
  {
    id: 'mock-proj-1',
    title: 'Saklan Residence',
    category: 'Konut',
    location: 'İstanbul / Kadıköy',
    description: 'Modern mimari, premium kalite ve güven veren projelerle hayallerinizi gerçeğe dönüştürüyoruz.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80'
  },
  {
    id: 'mock-proj-2',
    title: 'Saklan Villa',
    category: 'Villa',
    location: 'Muğla / Bodrum',
    description: 'Doğa ile iç içe, huzurlu bir yaşam alanı sunan Saklan Villa projemiz.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80'
  },
  {
    id: 'mock-proj-3',
    title: 'Saklan Plaza',
    category: 'Ticari',
    location: 'İstanbul / Levent',
    description: 'İş dünyasının kalbinde, prestijli bir çalışma ortamı sunan Saklan Plaza.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80'
  }
];

export const mockRealEstates: RealEstateListing[] = [
  {
    id: 'mock-re-1',
    ownerId: 'mock-owner',
    type: 'real_estate',
    title: 'Lüks Deniz Manzaralı Daire',
    description: 'Kadıköy Moda\'da kaçırılmayacak fırsat.',
    price: 12500000,
    city: 'İstanbul',
    district: 'Kadıköy',
    neighborhood: 'Moda',
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80'],
    details: {
      category: 'Satılık Daire',
      sizeSqM: 145,
      rooms: '3+1',
      buildingAge: 5,
      floor: '4',
      heating: 'Doğalgaz (Kombi)',
      bathrooms: 2,
      balcony: true
    }
  },
  {
    id: 'mock-re-2',
    ownerId: 'mock-owner',
    type: 'real_estate',
    title: 'Havuzlu Müstakil Villa',
    description: 'Doğa ile iç içe, ultra lüks villa.',
    price: 25000000,
    city: 'Muğla',
    district: 'Bodrum',
    neighborhood: 'Yalıkavak',
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80'],
    details: {
      category: 'Villa',
      sizeSqM: 350,
      rooms: '5+2',
      buildingAge: 0,
      floor: '2',
      heating: 'Yerden Isıtma',
      bathrooms: 4,
      balcony: true
    }
  },
  {
    id: 'mock-re-3',
    ownerId: 'mock-owner',
    type: 'real_estate',
    title: 'Metroya Yakın 2+1 Fırsat',
    description: 'Yatırımlık uygun fiyatlı daire.',
    price: 3500000,
    city: 'İzmir',
    district: 'Karşıyaka',
    neighborhood: 'Bostanlı',
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: ['https://images.unsplash.com/photo-1502672260266-1c1e525044c7?auto=format&fit=crop&q=80'],
    details: {
      category: 'Satılık Daire',
      sizeSqM: 95,
      rooms: '2+1',
      buildingAge: 12,
      floor: '2',
      heating: 'Merkezi',
      bathrooms: 1,
      balcony: true
    }
  }
];

export const mockVehicles: VehicleListing[] = [
  {
    id: 'mock-veh-1',
    ownerId: 'mock-owner',
    type: 'vehicle',
    title: 'Mercedes-Benz C 200 AMG',
    description: 'Hatasız, boyasız, ilk sahibinden.',
    price: 3250000,
    city: 'İstanbul',
    district: 'Beşiktaş',
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80'],
    details: {
      category: 'Otomobil',
      brand: 'Mercedes-Benz',
      model: 'C 200',
      year: 2023,
      mileage: 15000,
      fuelType: 'Benzin',
      transmission: 'Otomatik',
      bodyType: 'Sedan',
      engineCapacity: 1496,
      enginePower: 204
    }
  },
  {
    id: 'mock-veh-2',
    ownerId: 'mock-owner',
    type: 'vehicle',
    title: 'BMW 520i M Sport',
    description: 'Servis bakımlı, garantisi devam ediyor.',
    price: 4150000,
    city: 'Ankara',
    district: 'Çankaya',
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80'],
    details: {
      category: 'Otomobil',
      brand: 'BMW',
      model: '520i',
      year: 2022,
      mileage: 32000,
      fuelType: 'Benzin',
      transmission: 'Otomatik',
      bodyType: 'Sedan',
      engineCapacity: 1597,
      enginePower: 170
    }
  },
  {
    id: 'mock-veh-3',
    ownerId: 'mock-owner',
    type: 'vehicle',
    title: 'Volkswagen Tiguan 1.5 TSI Elegance',
    description: 'Aile aracı, geniş hacimli.',
    price: 2100000,
    city: 'Bursa',
    district: 'Nilüfer',
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80'],
    details: {
      category: 'SUV',
      brand: 'Volkswagen',
      model: 'Tiguan',
      year: 2021,
      mileage: 54000,
      fuelType: 'Benzin',
      transmission: 'Otomatik',
      bodyType: 'SUV',
      engineCapacity: 1498,
      enginePower: 150
    }
  }
];
