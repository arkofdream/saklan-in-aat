export default function Services() {
  const services = ['Konut Projeleri', 'Villa Projeleri', 'Ticari Yapılar', 'Anahtar Teslim Projeler', 'Tadilat / Renovasyon', 'Proje Yönetimi'];
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-light mb-12">Hizmetlerimiz</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <div key={i} className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-medium mb-4">{s}</h3>
            <p className="text-gray-600 font-light">Profesyonel ekibimizle size en iyi hizmeti sunmak için buradayız. Detaylı bilgi için bizimle iletişime geçin.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
