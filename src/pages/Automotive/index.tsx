export default function Automotive() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-8 text-primary">Saklan Otomotiv</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] bg-gray-200">
                <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80" alt="Araç" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">Mercedes-Benz C 200</h3>
                <p className="text-xs text-gray-500 mb-2">2023 • 15.000 km • Benzin</p>
                <div className="text-primary font-bold">3.250.000 TL</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
