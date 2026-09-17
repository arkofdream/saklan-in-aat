import { User } from '../types';
import { getDB } from '../data/mock/db';

const CURRENT_USER_KEY = 'saklan_current_user';

export const authService = {
  login: async (email: string): Promise<User> => {
    // Mock login, just checking email
    const db = getDB();
    const user = db.users.find(u => u.email === email);
    
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return user;
    }
    throw new Error('Kullanıcı bulunamadı. (Mock login: admin@saklan.com veya ahmet@example.com deneyin)');
  },

  register: async (name: string, email: string, phone: string): Promise<User> => {
    const db = getDB();
    if (db.users.find(u => u.email === email)) {
      throw new Error('Bu email zaten kayıtlı.');
    }
    
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      phone,
      role: 'user'
    };
    
    db.users.push(newUser);
    localStorage.setItem('saklan_db', JSON.stringify(db)); // We can refactor this to saveDB later
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    
    return newUser;
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    }
    return null;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};
