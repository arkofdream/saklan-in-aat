const fs = require('fs');
const path = require('path');

const files = {
  'src/App.tsx': `import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
`,
  'src/pages/Auth/index.tsx': `export default function Auth() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Kullanıcı Alanı</h1>
        <p className="text-gray-500">Bu alan henüz yapım aşamasındadır.</p>
      </div>
    </div>
  );
}
`,
  'src/pages/Admin/index.tsx': `export default function Admin() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-primary text-white p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          <a href="#" className="block hover:text-accent">Dashboard</a>
          <a href="#" className="block hover:text-accent">Projeler</a>
          <a href="#" className="block hover:text-accent">Emlak İlanları</a>
          <a href="#" className="block hover:text-accent">Otomotiv İlanları</a>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 mb-2">Toplam Kullanıcı</h3>
            <p className="text-3xl font-bold">128</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 mb-2">Emlak İlanı</h3>
            <p className="text-3xl font-bold">45</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 mb-2">Otomotiv İlanı</h3>
            <p className="text-3xl font-bold">32</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 mb-2">Bekleyen İlan</h3>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>
      </main>
    </div>
  );
}
`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(__dirname, filepath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content);
});
