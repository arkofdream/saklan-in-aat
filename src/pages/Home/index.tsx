import React, { useEffect, useState } from 'react';
import { projectService } from '../../services/projectService';
import { Project } from '../../types';
import { Link } from 'react-router-dom';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const p = await projectService.getProjects();
        setProjects(p);
      } catch (err) {
        console.error("Error fetching projects", err);
      }
    };
    fetchProjects();
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projeler')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Geleceği İnşa Ediyoruz
          </h1>
          <p className="text-xl text-gray-200 mb-10 font-light">
            Modern mimari, premium kalite ve güven veren projelerle hayallerinizi gerçeğe dönüştürüyoruz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToProjects}
              className="bg-primary hover:bg-primary-dark cursor-pointer text-white px-8 py-4 rounded-none text-lg transition-colors">
              Projelerimizi İncele
            </button>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projeler" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-primary mb-4">Öne Çıkan Projeler</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Mimari mükemmellik ve yüksek kalite standartlarıyla hayata geçirdiğimiz vizyoner projelerimiz.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.slice(0, 4).map((project) => (
              <Link to={`/projeler/${project.id}`} key={project.id} className="group cursor-pointer block">
                <div className="aspect-[4/3] bg-gray-200 overflow-hidden mb-4">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="text-2xl font-medium mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-gray-600 font-light">{project.location}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/projeler" className="inline-block border border-primary text-primary hover:bg-primary hover:text-white transition-colors px-8 py-3">
              Tüm Projeleri Gör
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="iletisim" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-primary mb-4">İletişime Geçin</h2>
            <p className="text-gray-500">Projelerimiz hakkında detaylı bilgi almak veya yeni bir proje için bizimle iletişime geçin.</p>
          </div>
          
          <form className="bg-white p-8 shadow-sm border border-gray-100 rounded-sm" onSubmit={(e) => { e.preventDefault(); alert("Mesajınız alındı (Mock State)"); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                <input type="text" required className="w-full border border-gray-300 p-3 outline-none focus:border-primary transition-colors" placeholder="Adınız Soyadınız" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                <input type="tel" required className="w-full border border-gray-300 p-3 outline-none focus:border-primary transition-colors" placeholder="05XX XXX XX XX" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
              <input type="email" required className="w-full border border-gray-300 p-3 outline-none focus:border-primary transition-colors" placeholder="ornek@email.com" />
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Mesajınız</label>
              <textarea required rows={4} className="w-full border border-gray-300 p-3 outline-none focus:border-primary transition-colors" placeholder="Size nasıl yardımcı olabiliriz?"></textarea>
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white px-8 py-4 transition-colors font-medium">
              Mesaj Gönder
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
