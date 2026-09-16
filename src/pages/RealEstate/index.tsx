export default function RealEstate() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-8 text-primary">Saklan Emlak</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-200">
                 <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80" alt="Emlak" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="text-primary font-bold text-xl mb-2">12.500.000 TL</div>
                <h3 className="font-medium text-gray-900 mb-1">Lüks Deniz Manzaralı Daire</h3>
                <p className="text-sm text-gray-500 mb-4">Kadıköy, Moda</p>
                <div className="flex text-sm text-gray-600 space-x-4">
                  <span>3+1</span>
                  <span>145 m²</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
