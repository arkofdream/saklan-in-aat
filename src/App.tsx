import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import RealEstate from './pages/RealEstate';
import Automotive from './pages/Automotive';
import Auth from './pages/Auth';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="hakkimizda" element={<About />} />
          <Route path="hizmetler" element={<Services />} />
          <Route path="projeler" element={<Projects />} />
          <Route path="projeler/:id" element={<Projects />} />
          <Route path="emlak" element={<RealEstate />} />
          <Route path="emlak/:id" element={<RealEstate />} />
          <Route path="emlak/ilan-ver" element={<RealEstate />} />
          <Route path="otomotiv" element={<Automotive />} />
          <Route path="otomotiv/:id" element={<Automotive />} />
          <Route path="otomotiv/ilan-ver" element={<Automotive />} />
          <Route path="giris" element={<Auth />} />
          <Route path="kayit" element={<Auth />} />
          <Route path="profil" element={<Auth />} />
          <Route path="ilanlarim" element={<Auth />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
