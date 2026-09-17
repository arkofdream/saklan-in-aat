import type { Listing, RealEstateListing, VehicleListing, ListingType, ListingStatus } from '../types';
import { supabase } from '../lib/supabase';

// Helper to construct listings properly
const constructListing = (row: any): any => {
  if (row.listing_type === 'real_estate') {
    const details = row.real_estate_details?.[0] || {};
    return {
      id: row.id,
      ownerId: row.owner_id,
      type: 'real_estate',
      title: row.title,
      description: row.description,
      price: row.price,
      city: row.city,
      district: row.district,
      neighborhood: row.neighborhood,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      images: (row.listing_images || []).sort((a: any, b: any) => a.display_order - b.display_order).map((img: any) => img.storage_path),
      details: {
        category: details.category,
        sizeSqM: details.area_m2,
        rooms: details.rooms,
        buildingAge: details.building_age,
        floor: details.floor,
        heating: details.heating,
        bathrooms: details.bathrooms,
        balcony: details.balcony
      }
    };
  } else {
    const details = row.vehicle_details?.[0] || {};
    return {
      id: row.id,
      ownerId: row.owner_id,
      type: 'vehicle',
      title: row.title,
      description: row.description,
      price: row.price,
      city: row.city,
      district: row.district,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      images: (row.listing_images || []).sort((a: any, b: any) => a.display_order - b.display_order).map((img: any) => img.storage_path),
      details: {
        category: details.category,
        brand: details.brand,
        model: details.model,
        year: details.year,
        mileage: details.mileage,
        fuelType: details.fuel,
        transmission: details.transmission,
        bodyType: details.body_type,
        engineCapacity: details.engine_capacity,
        enginePower: details.engine_power
      }
    };
  }
};

export const listingService = {
  // --- REAL ESTATE ---
  getRealEstates: async (status?: ListingStatus): Promise<RealEstateListing[]> => {
    let query = supabase
      .from('listings')
      .select('*, real_estate_details(*), listing_images(*)')
      .eq('listing_type', 'real_estate')
      .order('created_at', { ascending: false });

    if (status) query = query.eq('status', status);

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    return (data || []).map(constructListing);
  },

  getRealEstateById: async (id: string): Promise<RealEstateListing | undefined> => {
    const { data, error } = await supabase
      .from('listings')
      .select('*, real_estate_details(*), listing_images(*)')
      .eq('listing_type', 'real_estate')
      .eq('id', id)
      .single();

    if (error || !data) return undefined;
    return constructListing(data);
  },

  getRealEstatesByUser: async (userId: string): Promise<RealEstateListing[]> => {
    const { data, error } = await supabase
      .from('listings')
      .select('*, real_estate_details(*), listing_images(*)')
      .eq('listing_type', 'real_estate')
      .eq('owner_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return (data || []).map(constructListing);
  },

  createRealEstate: async (listing: Omit<RealEstateListing, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'ownerId'>): Promise<string> => {
    // Calling RPC function for atomicity
    const { data, error } = await supabase.rpc('create_real_estate_listing', {
      p_title: listing.title,
      p_description: listing.description,
      p_price: listing.price,
      p_city: listing.city,
      p_district: listing.district,
      p_neighborhood: listing.neighborhood || null,
      p_category: listing.details.category,
      p_area_m2: listing.details.sizeSqM,
      p_rooms: listing.details.rooms,
      p_building_age: listing.details.buildingAge,
      p_floor: listing.details.floor,
      p_heating: listing.details.heating,
      p_bathrooms: listing.details.bathrooms,
      p_balcony: listing.details.balcony,
      p_images: listing.images || []
    });

    if (error) throw new Error(error.message);
    return data as string;
  },

  updateRealEstate: async (id: string, updates: Partial<RealEstateListing>): Promise<void> => {
    // For update, we do sequential updates. If it's partial, it's safer.
    // In a production setup, we might also use an RPC for update.
    
    // Update listing base
    const baseUpdates: any = {};
    if (updates.title) baseUpdates.title = updates.title;
    if (updates.description) baseUpdates.description = updates.description;
    if (updates.price) baseUpdates.price = updates.price;
    if (updates.city) baseUpdates.city = updates.city;
    if (updates.district) baseUpdates.district = updates.district;
    if (updates.neighborhood) baseUpdates.neighborhood = updates.neighborhood;
    if (updates.status) baseUpdates.status = updates.status;
    
    if (Object.keys(baseUpdates).length > 0) {
      const { error } = await supabase.from('listings').update(baseUpdates).eq('id', id);
      if (error) throw new Error(error.message);
    }

    // Update details
    if (updates.details) {
      const detailUpdates = {
        category: updates.details.category,
        area_m2: updates.details.sizeSqM,
        rooms: updates.details.rooms,
        building_age: updates.details.buildingAge,
        floor: updates.details.floor,
        heating: updates.details.heating,
        bathrooms: updates.details.bathrooms,
        balcony: updates.details.balcony
      };
      const { error } = await supabase.from('real_estate_details').update(detailUpdates).eq('listing_id', id);
      if (error) throw new Error(error.message);
    }

    // Replace images (naive approach: delete existing images and insert new ones)
    if (updates.images) {
      await supabase.from('listing_images').delete().eq('listing_id', id);
      if (updates.images.length > 0) {
        const imageInserts = updates.images.map((img, idx) => ({
          listing_id: id,
          storage_path: img,
          display_order: idx
        }));
        const { error } = await supabase.from('listing_images').insert(imageInserts);
        if (error) throw new Error(error.message);
      }
    }
  },

  deleteRealEstate: async (id: string): Promise<void> => {
    const { error } = await supabase.from('listings').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },

  // --- VEHICLES ---
  getVehicles: async (status?: ListingStatus): Promise<VehicleListing[]> => {
    let query = supabase
      .from('listings')
      .select('*, vehicle_details(*), listing_images(*)')
      .eq('listing_type', 'vehicle')
      .order('created_at', { ascending: false });

    if (status) query = query.eq('status', status);

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    return (data || []).map(constructListing);
  },

  getVehicleById: async (id: string): Promise<VehicleListing | undefined> => {
    const { data, error } = await supabase
      .from('listings')
      .select('*, vehicle_details(*), listing_images(*)')
      .eq('listing_type', 'vehicle')
      .eq('id', id)
      .single();

    if (error || !data) return undefined;
    return constructListing(data);
  },

  getVehiclesByUser: async (userId: string): Promise<VehicleListing[]> => {
    const { data, error } = await supabase
      .from('listings')
      .select('*, vehicle_details(*), listing_images(*)')
      .eq('listing_type', 'vehicle')
      .eq('owner_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return (data || []).map(constructListing);
  },

  createVehicle: async (listing: Omit<VehicleListing, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'ownerId'>): Promise<string> => {
    const { data, error } = await supabase.rpc('create_vehicle_listing', {
      p_title: listing.title,
      p_description: listing.description,
      p_price: listing.price,
      p_city: listing.city,
      p_district: listing.district,
      p_category: listing.details.category,
      p_brand: listing.details.brand,
      p_model: listing.details.model,
      p_year: listing.details.year,
      p_mileage: listing.details.mileage,
      p_fuel: listing.details.fuelType,
      p_transmission: listing.details.transmission,
      p_body_type: listing.details.bodyType,
      p_engine_capacity: listing.details.engineCapacity || null,
      p_engine_power: listing.details.enginePower || null,
      p_images: listing.images || []
    });

    if (error) throw new Error(error.message);
    return data as string;
  },

  updateVehicle: async (id: string, updates: Partial<VehicleListing>): Promise<void> => {
    const baseUpdates: any = {};
    if (updates.title) baseUpdates.title = updates.title;
    if (updates.description) baseUpdates.description = updates.description;
    if (updates.price) baseUpdates.price = updates.price;
    if (updates.city) baseUpdates.city = updates.city;
    if (updates.district) baseUpdates.district = updates.district;
    if (updates.status) baseUpdates.status = updates.status;
    
    if (Object.keys(baseUpdates).length > 0) {
      const { error } = await supabase.from('listings').update(baseUpdates).eq('id', id);
      if (error) throw new Error(error.message);
    }

    if (updates.details) {
      const detailUpdates = {
        category: updates.details.category,
        brand: updates.details.brand,
        model: updates.details.model,
        year: updates.details.year,
        mileage: updates.details.mileage,
        fuel: updates.details.fuelType,
        transmission: updates.details.transmission,
        body_type: updates.details.bodyType,
        engine_capacity: updates.details.engineCapacity,
        engine_power: updates.details.enginePower
      };
      const { error } = await supabase.from('vehicle_details').update(detailUpdates).eq('listing_id', id);
      if (error) throw new Error(error.message);
    }

    if (updates.images) {
      await supabase.from('listing_images').delete().eq('listing_id', id);
      if (updates.images.length > 0) {
        const imageInserts = updates.images.map((img, idx) => ({
          listing_id: id,
          storage_path: img,
          display_order: idx
        }));
        const { error } = await supabase.from('listing_images').insert(imageInserts);
        if (error) throw new Error(error.message);
      }
    }
  },

  deleteVehicle: async (id: string): Promise<void> => {
    const { error } = await supabase.from('listings').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },
  
  // --- ADMIN ACTIONS ---
  getAllPendingListings: async (): Promise<Listing[]> => {
    const { data: reData, error: reError } = await supabase
      .from('listings')
      .select('*, real_estate_details(*), listing_images(*)')
      .eq('listing_type', 'real_estate')
      .eq('status', 'pending');

    const { data: vData, error: vError } = await supabase
      .from('listings')
      .select('*, vehicle_details(*), listing_images(*)')
      .eq('listing_type', 'vehicle')
      .eq('status', 'pending');

    if (reError) throw new Error(reError.message);
    if (vError) throw new Error(vError.message);

    const listings = [
      ...(reData || []).map(constructListing),
      ...(vData || []).map(constructListing)
    ];

    return listings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  updateListingStatus: async (id: string, type: ListingType, status: ListingStatus): Promise<void> => {
    const { error } = await supabase.from('listings').update({ status }).eq('id', id);
    if (error) throw new Error(error.message);
  }
};
