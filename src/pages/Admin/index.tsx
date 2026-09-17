import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLayout() {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Bekleyen İlanlar', path: '/admin/bekleyenler' },
    { name: 'Tüm İlanlar', path: '/admin/ilanlar' },
    { name: 'Projeler (İnşaat)', path: '/admin/projeler' },
    { name: 'Kullanıcılar', path: '/admin/kullanicilar' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-primary text-white p-6 flex flex-col h-screen sticky top-0">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4 flex-1">
          {navItems.map(item => {
            const isActive = item.path === '/admin' 
              ? pathname === '/admin' 
              : pathname.startsWith(item.path);
            
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`block px-3 py-2 rounded transition-colors ${isActive ? 'bg-primary-dark font-medium' : 'hover:bg-primary-dark/50 text-white/80'}`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-6 border-t border-primary-dark">
          <Link to="/" className="block px-3 py-2 text-white/80 hover:text-white transition-colors mb-2">Siteye Dön</Link>
          <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-red-300 hover:text-red-200 transition-colors">Çıkış Yap</button>
        </div>
      </aside>
      
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
