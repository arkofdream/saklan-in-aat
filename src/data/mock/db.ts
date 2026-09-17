import { User, RealEstateListing, VehicleListing, Project } from '../../types';
import { mockRealEstate } from './realEstateListings';
import { mockVehicles } from './vehicleListings';
import { mockProjects } from './projects';
import { users as mockUsers } from './users';

// Initialize LocalStorage DB
const DB_KEY = 'saklan_db';

interface DBSchema {
  users: User[];
  realEstate: RealEstateListing[];
  vehicles: VehicleListing[];
  projects: Project[];
}

const initialDB: DBSchema = {
  users: mockUsers,
  realEstate: mockRealEstate,
  vehicles: mockVehicles,
  projects: mockProjects,
};

export const getDB = (): DBSchema => {
  const data = localStorage.getItem(DB_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing DB', e);
    }
  }
  
  // Save initial if not exist
  localStorage.setItem(DB_KEY, JSON.stringify(initialDB));
  return initialDB;
};

export const saveDB = (db: DBSchema) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};
