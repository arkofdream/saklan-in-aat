import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      // Different page, navigate normally
      navigate('/#iletisim');
    } else {
      // Same page, just scroll
      const el = document.getElementById('iletisim');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-primary">SAKLAN<span className="font-light">İNŞAAT</span></Link>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Ana Sayfa</Link>
          <Link to="/hakkimizda" className="text-gray-600 hover:text-primary transition-colors">Hakkımızda</Link>
          <Link to="/hizmetler" className="text-gray-600 hover:text-primary transition-colors">Hizmetler</Link>
          <Link to="/projeler" className="text-gray-600 hover:text-primary transition-colors">Projeler</Link>
          <Link to="/emlak" className="text-primary font-medium hover:text-primary-dark transition-colors">Emlak</Link>
          <Link to="/otomotiv" className="text-primary font-medium hover:text-primary-dark transition-colors">Otomotiv</Link>
          <a href="/#iletisim" onClick={handleContactClick} className="text-gray-600 hover:text-primary transition-colors cursor-pointer">İletişim</a>
        </nav>
        <button className="md:hidden p-2"><Menu className="w-6 h-6" /></button>
      </div>
    </header>
  );
}
