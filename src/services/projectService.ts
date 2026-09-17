import type { Project } from '../types';
import { supabase } from '../lib/supabase';

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    
    return data.map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      location: p.location,
      description: p.description,
      image: p.image
    }));
  },

  getProjectById: async (id: string): Promise<Project | undefined> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return undefined;
    
    return {
      id: data.id,
      title: data.title,
      category: data.category,
      location: data.location,
      description: data.description,
      image: data.image
    };
  },

  createProject: async (project: Omit<Project, 'id'>): Promise<string> => {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data.id;
  },

  updateProject: async (id: string, updates: Partial<Project>): Promise<void> => {
    const { error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id);

    if (error) throw new Error(error.message);
  },

  deleteProject: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
};
