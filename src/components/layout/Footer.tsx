export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold tracking-tighter mb-4">SAKLAN<span className="font-light">İNŞAAT</span></h3>
            <p className="text-sm text-gray-300">Modern ve premium yaşam alanları inşa ediyoruz.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/hakkimizda">Hakkımızda</a></li>
              <li><a href="/projeler">Projeler</a></li>
              <li><a href="/emlak">Emlak İlanları</a></li>
            </ul>
          </div>
          <div>
             <h4 className="font-semibold mb-4">İletişim</h4>
             <ul className="space-y-2 text-sm text-gray-300">
               <li>info@saklaninsaat.com</li>
               <li>+90 532 000 00 00</li>
             </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Saklan İnşaat. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
