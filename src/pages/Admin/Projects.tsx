import React, { useEffect, useState } from 'react';
import { projectService } from '../../services/projectService';
import { Project } from '../../types';
import { Input, Textarea } from '../../components/shared/FormComponents';

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const fetchProjects = async () => {
    const data = await projectService.getProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setTitle('');
    setLocation('');
    setCategory('');
    setDescription('');
    setImage('');
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEdit = (p: Project) => {
    setTitle(p.title);
    setLocation(p.location);
    setCategory(p.category);
    setDescription(p.description);
    setImage(p.image);
    setEditingId(p.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Projeyi silmek istediğinize emin misiniz?')) {
      await projectService.deleteProject(id);
      fetchProjects();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title, location, category, description, image };
    
    if (editingId) {
      await projectService.updateProject(editingId, data);
    } else {
      await projectService.createProject(data);
    }
    
    resetForm();
    fetchProjects();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">İnşaat Projeleri</h1>
        {!isFormOpen && (
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
          >
            Yeni Proje Ekle
          </button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <Input label="Proje Adı" required value={title} onChange={e => setTitle(e.target.value)} />
            <Input label="Konum" required value={location} onChange={e => setLocation(e.target.value)} />
            <Input label="Kategori" required value={category} onChange={e => setCategory(e.target.value)} />
            <Input label="Görsel URL" required type="url" value={image} onChange={e => setImage(e.target.value)} />
            <Textarea label="Açıklama" required value={description} onChange={e => setDescription(e.target.value)} rows={3} />
            
            <div className="flex space-x-3 pt-4 border-t">
              <button type="button" onClick={resetForm} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50">İptal</button>
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">Kaydet</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="aspect-video bg-gray-200">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{project.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{project.location}</p>
                <div className="flex justify-end space-x-3 pt-3 border-t">
                  <button onClick={() => handleEdit(project)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Düzenle</button>
                  <button onClick={() => handleDelete(project.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Sil</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
