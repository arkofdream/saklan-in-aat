import type { User } from '../types';
import { supabase } from '../lib/supabase';

export const authService = {
  login: async (email: string, password?: string): Promise<User> => {
    // We fall back to a default password if none provided for easy mock transition, 
    // but in real app password is required.
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: password || 'password123',
    });
    
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('Giriş başarısız.');

    // Fetch profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw new Error('Profil bulunamadı.');

    return {
      id: profile.id,
      name: profile.full_name,
      email: data.user.email!,
      phone: profile.phone,
      role: profile.role,
    };
  },

  register: async (name: string, email: string, phone: string, password?: string): Promise<User> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: password || 'password123',
      options: {
        data: {
          full_name: name,
        }
      }
    });
    
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('Kayıt başarısız.');

    // Note: Trigger handles inserting to profiles table.
    // Wait for trigger to complete, or just return optimistic User object.
    return {
      id: data.user.id,
      name,
      email,
      phone,
      role: 'user',
    };
  },

  getCurrentUser: async (): Promise<User | null> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (!profile) return null;

    return {
      id: profile.id,
      name: profile.full_name,
      email: session.user.email!,
      phone: profile.phone,
      role: profile.role,
    };
  },

  logout: async (): Promise<void> => {
    await supabase.auth.signOut();
  }
};
