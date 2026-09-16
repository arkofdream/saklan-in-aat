import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu if open
    if (location.pathname !== '/') {
      navigate('/#iletisim');
    } else {
      const el = document.getElementById('iletisim');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-primary" onClick={closeMenu}>
          SAKLAN<span className="font-light">İNŞAAT</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Ana Sayfa</Link>
          <Link to="/hakkimizda" className="text-gray-600 hover:text-primary transition-colors">Hakkımızda</Link>
          <Link to="/hizmetler" className="text-gray-600 hover:text-primary transition-colors">Hizmetler</Link>
          <Link to="/projeler" className="text-gray-600 hover:text-primary transition-colors">Projeler</Link>
          <Link to="/emlak" className="text-primary font-medium hover:text-primary-dark transition-colors">Emlak</Link>
          <Link to="/otomotiv" className="text-primary font-medium hover:text-primary-dark transition-colors">Otomotiv</Link>
          <a href="/#iletisim" onClick={handleContactClick} className="text-gray-600 hover:text-primary transition-colors cursor-pointer">İletişim</a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-white border-t border-gray-100 shadow-xl py-4 px-6 flex flex-col space-y-4">
          <Link to="/" onClick={closeMenu} className="text-gray-700 font-medium border-b border-gray-50 pb-2">Ana Sayfa</Link>
          <Link to="/hakkimizda" onClick={closeMenu} className="text-gray-700 font-medium border-b border-gray-50 pb-2">Hakkımızda</Link>
          <Link to="/hizmetler" onClick={closeMenu} className="text-gray-700 font-medium border-b border-gray-50 pb-2">Hizmetler</Link>
          <Link to="/projeler" onClick={closeMenu} className="text-gray-700 font-medium border-b border-gray-50 pb-2">Projeler</Link>
          <Link to="/emlak" onClick={closeMenu} className="text-primary font-bold border-b border-gray-50 pb-2">Emlak</Link>
          <Link to="/otomotiv" onClick={closeMenu} className="text-primary font-bold border-b border-gray-50 pb-2">Otomotiv</Link>
          <a href="/#iletisim" onClick={handleContactClick} className="text-gray-700 font-medium pb-2">İletişim</a>
        </div>
      )}
    </header>
  );
}
