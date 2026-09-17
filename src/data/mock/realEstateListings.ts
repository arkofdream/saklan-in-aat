import { RealEstateListing } from '../../types';

export const mockRealEstate: RealEstateListing[] = [
  {
    id: '1',
    ownerId: 'u2',
    type: 'real_estate',
    title: 'Lüks Deniz Manzaralı Daire',
    description: 'Kadıköy Moda\'da kaçırılmayacak lüks daire.',
    price: 12500000,
    city: 'İstanbul',
    district: 'Kadıköy',
    neighborhood: 'Moda',
    status: 'approved',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    details: {
      category: 'Satılık Daire',
      sizeSqM: 145,
      rooms: '3+1',
      buildingAge: 5,
      floor: '3',
      heating: 'Doğalgaz (Kombi)',
      bathrooms: 2,
      balcony: true
    }
  },
  {
    id: '2',
    ownerId: 'u2',
    type: 'real_estate',
    title: 'Havuzlu Müstakil Villa',
    description: 'Bodrum Yalıkavak\'ta özel havuzlu harika villa.',
    price: 45000000,
    city: 'Muğla',
    district: 'Bodrum',
    neighborhood: 'Yalıkavak',
    status: 'approved',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    details: {
      category: 'Villa',
      sizeSqM: 350,
      rooms: '5+2',
      buildingAge: 2,
      floor: 'Müstakil',
      heating: 'Yerden Isıtma',
      bathrooms: 4,
      balcony: true
    }
  },
  {
    id: '3',
    ownerId: 'u3',
    type: 'real_estate',
    title: 'Şişli Merkezde Kiralık Ofis',
    description: 'Metroya 2 dakika yürüme mesafesinde geniş ofis.',
    price: 45000,
    city: 'İstanbul',
    district: 'Şişli',
    neighborhood: 'Merkez',
    status: 'pending',
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    details: {
      category: 'İş Yeri',
      sizeSqM: 120,
      rooms: '3+0',
      buildingAge: 10,
      floor: '1',
      heating: 'Merkezi',
      bathrooms: 1,
      balcony: false
    }
  }
];
