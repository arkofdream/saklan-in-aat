import { Project } from '../types';
import { getDB, saveDB } from '../data/mock/db';

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    return getDB().projects;
  },

  getProjectById: async (id: string): Promise<Project | undefined> => {
    return getDB().projects.find(p => p.id === id);
  },

  createProject: async (project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> => {
    const db = getDB();
    const newProject: Project = {
      ...project,
      id: `pr_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    db.projects.push(newProject);
    saveDB(db);
    return newProject;
  },

  updateProject: async (id: string, updates: Partial<Project>): Promise<Project> => {
    const db = getDB();
    const index = db.projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Proje bulunamadı');
    
    db.projects[index] = {
      ...db.projects[index],
      ...updates
    };
    saveDB(db);
    return db.projects[index];
  },

  deleteProject: async (id: string): Promise<void> => {
    const db = getDB();
    db.projects = db.projects.filter(p => p.id !== id);
    saveDB(db);
  }
};
