import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import RealEstate from './pages/RealEstate';
import RealEstateDetail from './pages/RealEstate/Detail';
import RealEstateForm from './pages/RealEstate/Form';
import MyRealEstateListings from './pages/RealEstate/MyListings';
import Automotive from './pages/Automotive';
import AutomotiveDetail from './pages/Automotive/Detail';
import AutomotiveForm from './pages/Automotive/Form';
import MyAutomotiveListings from './pages/Automotive/MyListings';
import Auth from './pages/Auth';
import AdminLayout from './pages/Admin';
import AdminDashboard from './pages/Admin/Dashboard';
import PendingListings from './pages/Admin/PendingListings';
import AllListings from './pages/Admin/Listings';
import AdminProjects from './pages/Admin/Projects';
import Users from './pages/Admin/Users';

import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="hakkimizda" element={<About />} />
            <Route path="hizmetler" element={<Services />} />
            <Route path="projeler" element={<Projects />} />
            <Route path="projeler/:id" element={<Projects />} />
            
            {/* Real Estate Public */}
            <Route path="emlak" element={<RealEstate />} />
            <Route path="emlak/:id" element={<RealEstateDetail />} />
            
            {/* Automotive Public */}
            <Route path="otomotiv" element={<Automotive />} />
            <Route path="otomotiv/:id" element={<AutomotiveDetail />} />

            {/* Auth */}
            <Route path="giris" element={<Auth />} />
            <Route path="kayit" element={<Auth />} />
            
            {/* Protected Routes (User & Admin) */}
            <Route element={<ProtectedRoute />}>
              <Route path="emlak/ilan-ver" element={<RealEstateForm />} />
              <Route path="emlak/duzenle/:id" element={<RealEstateForm />} />
              <Route path="emlak/ilanlarim" element={<MyRealEstateListings />} />
              
              <Route path="otomotiv/ilan-ver" element={<AutomotiveForm />} />
              <Route path="otomotiv/duzenle/:id" element={<AutomotiveForm />} />
              <Route path="otomotiv/ilanlarim" element={<MyAutomotiveListings />} />
            </Route>
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin" />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="bekleyenler" element={<PendingListings />} />
              <Route path="ilanlar" element={<AllListings />} />
              <Route path="projeler" element={<AdminProjects />} />
              <Route path="kullanicilar" element={<Users />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
