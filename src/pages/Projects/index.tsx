import { useParams, Link } from 'react-router-dom';
import { mockProjects } from '../../data/mock/projects';

export default function Projects() {
  const { id } = useParams();

  // If there's an ID, show project detail
  if (id) {
    const project = mockProjects.find(p => p.id === id);
    if (!project) return <div className="p-20 text-center text-2xl">Proje bulunamadı.</div>;

    return (
      <div className="animate-in fade-in duration-500 pb-20">
        <div className="w-full h-[60vh] bg-gray-200 relative mb-12">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8 md:p-16">
            <span className="text-accent font-medium tracking-widest uppercase mb-4">{project.category}</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{project.title}</h1>
            <p className="text-xl text-gray-200">{project.location}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4">
          <Link to="/projeler" className="text-primary hover:underline mb-8 inline-block">&larr; Projelere Dön</Link>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-4">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-light mb-6">Proje Hakkında</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {project.description}
                <br /><br />
                Saklan İnşaat kalitesiyle hayata geçirilen bu proje, modern mimari çizgileri, ferah yaşam alanları ve merkezi konumuyla dikkat çekiyor. Sürdürülebilir yapı malzemeleri ve doğaya saygılı tasarımı ile sadece bir ev değil, aynı zamanda geleceğe yapılan değerli bir yatırım sunuyoruz.
              </p>
              
              <h2 className="text-2xl font-light mb-6 mt-12">Proje Özellikleri</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span>7/24 Güvenlik</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span>Kapalı Otopark</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span>Yüzme Havuzu</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span>Spor Salonu</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span>Çocuk Oyun Alanları</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-3"></span>Akıllı Ev Sistemi</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 border border-gray-100">
              <h3 className="text-xl font-medium mb-6">Proje Künyesi</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Durum</p>
                  <p className="font-medium text-gray-900">Satışta</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Proje Tipi</p>
                  <p className="font-medium text-gray-900">{project.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Lokasyon</p>
                  <p className="font-medium text-gray-900">{project.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Teslim Tarihi</p>
                  <p className="font-medium text-gray-900">Aralık 2026</p>
                </div>
              </div>
              <a href="/#iletisim" className="block w-full text-center bg-primary hover:bg-primary-dark text-white py-3 mt-8 transition-colors">
                Bilgi Al
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-light text-primary mb-4">Projelerimiz</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Geçmişten geleceğe uzanan, yaşam standartlarını yükselten vizyoner projelerimiz.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {mockProjects.map(project => (
          <Link to={`/projeler/${project.id}`} key={project.id} className="group block">
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden mb-6 relative">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 text-sm font-medium text-primary">
                {project.category}
              </div>
            </div>
            <h3 className="text-2xl font-medium mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
            <p className="text-gray-500 font-light mb-3">{project.location}</p>
            <span className="text-primary font-medium flex items-center group-hover:underline">
              Projeyi İncele &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
