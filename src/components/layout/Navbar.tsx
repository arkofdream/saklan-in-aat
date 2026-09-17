import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

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
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-primary" onClick={closeMenu}>
          SAKLAN<span className="font-light">İNŞAAT</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Ana Sayfa</Link>
          <Link to="/hakkimizda" className="text-gray-600 hover:text-primary transition-colors">Hakkımızda</Link>
          <Link to="/hizmetler" className="text-gray-600 hover:text-primary transition-colors">Hizmetler</Link>
          <Link to="/projeler" className="text-gray-600 hover:text-primary transition-colors">Projeler</Link>
          <Link to="/emlak" className="text-primary font-medium hover:text-primary-dark transition-colors">Emlak</Link>
          <Link to="/otomotiv" className="text-primary font-medium hover:text-primary-dark transition-colors">Otomotiv</Link>
          <a href="/#iletisim" onClick={handleContactClick} className="text-gray-600 hover:text-primary transition-colors cursor-pointer">İletişim</a>
          
          <div className="relative border-l pl-6 border-gray-200">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary focus:outline-none"
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="font-medium text-sm">{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg py-1 z-50">
                    {user.role === 'admin' && (
                      <Link to="/admin" onClick={closeMenu} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-b">Admin Paneli</Link>
                    )}
                    <Link to="/emlak/ilanlarim" onClick={closeMenu} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Emlak İlanlarım</Link>
                    <Link to="/otomotiv/ilanlarim" onClick={closeMenu} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-b">Araç İlanlarım</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Çıkış Yap</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/giris" className="text-gray-600 hover:text-primary transition-colors flex items-center space-x-1">
                <UserIcon className="w-5 h-5" />
                <span>Giriş Yap</span>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          type="button"
          className="md:hidden p-2 text-primary cursor-pointer select-none"
          onClick={(e) => {
            e.preventDefault();
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8 pointer-events-none" /> : <Menu className="w-8 h-8 pointer-events-none" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-white border-t border-gray-100 shadow-xl py-4 px-6 flex flex-col space-y-4 max-h-[80vh] overflow-y-auto">
          <Link to="/" onClick={closeMenu} className="text-gray-700 font-medium border-b border-gray-50 pb-2">Ana Sayfa</Link>
          <Link to="/hakkimizda" onClick={closeMenu} className="text-gray-700 font-medium border-b border-gray-50 pb-2">Hakkımızda</Link>
          <Link to="/hizmetler" onClick={closeMenu} className="text-gray-700 font-medium border-b border-gray-50 pb-2">Hizmetler</Link>
          <Link to="/projeler" onClick={closeMenu} className="text-gray-700 font-medium border-b border-gray-50 pb-2">Projeler</Link>
          <Link to="/emlak" onClick={closeMenu} className="text-primary font-bold border-b border-gray-50 pb-2">Emlak</Link>
          <Link to="/otomotiv" onClick={closeMenu} className="text-primary font-bold border-b border-gray-50 pb-2">Otomotiv</Link>
          <a href="/#iletisim" onClick={handleContactClick} className="text-gray-700 font-medium pb-2 border-b border-gray-50">İletişim</a>
          
          <div className="pt-2">
            {user ? (
              <div className="flex flex-col space-y-3">
                <span className="text-sm text-gray-500">Hoş geldin, {user.name}</span>
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={closeMenu} className="text-primary font-medium">Admin Paneli</Link>
                )}
                <Link to="/emlak/ilanlarim" onClick={closeMenu} className="text-gray-700 font-medium">Emlak İlanlarım</Link>
                <Link to="/otomotiv/ilanlarim" onClick={closeMenu} className="text-gray-700 font-medium">Araç İlanlarım</Link>
                <button onClick={handleLogout} className="text-left text-red-600 font-medium pt-2 border-t border-gray-50">Çıkış Yap</button>
              </div>
            ) : (
              <Link to="/giris" onClick={closeMenu} className="text-primary font-medium flex items-center space-x-2">
                <UserIcon className="w-5 h-5" />
                <span>Giriş Yap / Kayıt Ol</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
