import { Listing, RealEstateListing, VehicleListing, ListingType, ListingStatus } from '../types';
import { getDB, saveDB } from '../data/mock/db';

export const listingService = {
  // --- REAL ESTATE ---
  getRealEstates: async (status?: ListingStatus): Promise<RealEstateListing[]> => {
    const db = getDB();
    if (status) {
      return db.realEstate.filter(l => l.status === status);
    }
    return db.realEstate;
  },

  getRealEstateById: async (id: string): Promise<RealEstateListing | undefined> => {
    return getDB().realEstate.find(l => l.id === id);
  },

  getRealEstatesByUser: async (userId: string): Promise<RealEstateListing[]> => {
    return getDB().realEstate.filter(l => l.ownerId === userId);
  },

  createRealEstate: async (listing: Omit<RealEstateListing, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<RealEstateListing> => {
    const db = getDB();
    const newListing: RealEstateListing = {
      ...listing,
      id: `re_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.realEstate.push(newListing);
    saveDB(db);
    return newListing;
  },

  updateRealEstate: async (id: string, updates: Partial<RealEstateListing>): Promise<RealEstateListing> => {
    const db = getDB();
    const index = db.realEstate.findIndex(l => l.id === id);
    if (index === -1) throw new Error('İlan bulunamadı');
    
    db.realEstate[index] = {
      ...db.realEstate[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveDB(db);
    return db.realEstate[index];
  },

  deleteRealEstate: async (id: string): Promise<void> => {
    const db = getDB();
    db.realEstate = db.realEstate.filter(l => l.id !== id);
    saveDB(db);
  },

  // --- VEHICLES ---
  getVehicles: async (status?: ListingStatus): Promise<VehicleListing[]> => {
    const db = getDB();
    if (status) {
      return db.vehicles.filter(l => l.status === status);
    }
    return db.vehicles;
  },

  getVehicleById: async (id: string): Promise<VehicleListing | undefined> => {
    return getDB().vehicles.find(l => l.id === id);
  },

  getVehiclesByUser: async (userId: string): Promise<VehicleListing[]> => {
    return getDB().vehicles.filter(l => l.ownerId === userId);
  },

  createVehicle: async (listing: Omit<VehicleListing, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<VehicleListing> => {
    const db = getDB();
    const newListing: VehicleListing = {
      ...listing,
      id: `ve_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.vehicles.push(newListing);
    saveDB(db);
    return newListing;
  },

  updateVehicle: async (id: string, updates: Partial<VehicleListing>): Promise<VehicleListing> => {
    const db = getDB();
    const index = db.vehicles.findIndex(l => l.id === id);
    if (index === -1) throw new Error('İlan bulunamadı');
    
    db.vehicles[index] = {
      ...db.vehicles[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveDB(db);
    return db.vehicles[index];
  },

  deleteVehicle: async (id: string): Promise<void> => {
    const db = getDB();
    db.vehicles = db.vehicles.filter(l => l.id !== id);
    saveDB(db);
  },
  
  // --- ADMIN ACTIONS ---
  getAllPendingListings: async (): Promise<Listing[]> => {
    const db = getDB();
    return [
      ...db.realEstate.filter(l => l.status === 'pending'),
      ...db.vehicles.filter(l => l.status === 'pending')
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  updateListingStatus: async (id: string, type: ListingType, status: ListingStatus): Promise<void> => {
    if (type === 'real_estate') {
      await listingService.updateRealEstate(id, { status });
    } else {
      await listingService.updateVehicle(id, { status });
    }
  }
};
