import { VehicleListing } from '../../types';

export const mockVehicles: VehicleListing[] = [
  {
    id: '1',
    ownerId: 'u2',
    type: 'vehicle',
    title: 'Mercedes-Benz C 200',
    description: 'Temiz aile aracı, hatasız boyasız.',
    price: 3250000,
    city: 'İstanbul',
    district: 'Beşiktaş',
    status: 'approved',
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    id: '2',
    ownerId: 'u3',
    type: 'vehicle',
    title: 'BMW 520i',
    description: 'İlk sahibinden servis bakımlı.',
    price: 4100000,
    city: 'Ankara',
    district: 'Çankaya',
    status: 'pending',
    images: ['https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    details: {
      category: 'Otomobil',
      brand: 'BMW',
      model: '520i',
      year: 2022,
      mileage: 25000,
      fuelType: 'Benzin',
      transmission: 'Otomatik',
      bodyType: 'Sedan',
      engineCapacity: 1597,
      enginePower: 170
    }
  }
];
