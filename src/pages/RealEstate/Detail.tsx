import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listingService } from '../../services/listingService';
import { RealEstateListing } from '../../types';

export default function RealEstateDetail() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<RealEstateListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      if (id) {
        const data = await listingService.getRealEstateById(id);
        if (data && data.status === 'approved') {
          setListing(data);
        }
      }
      setLoading(false);
    };
    fetchListing();
  }, [id]);

  if (loading) return <div className="text-center py-20">Yükleniyor...</div>;
  if (!listing) return <div className="text-center py-20 text-red-500">İlan bulunamadı veya yayında değil.</div>;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6">
          <Link to="/emlak" className="text-primary hover:underline">&larr; İlanlara Dön</Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Gallery */}
            <div className="p-6">
              <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden mb-4">
                {listing.images && listing.images.length > 0 ? (
                  <img src={listing.images[activeImage]} alt="İlan" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">Görsel yok</div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {listing.images?.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-square rounded-md overflow-hidden border-2 ${activeImage === idx ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="p-6 lg:border-l border-gray-100">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{listing.title}</h1>
              <p className="text-gray-500 mb-4">{listing.district}, {listing.city}</p>
              <div className="text-3xl font-bold text-primary mb-8">{formatPrice(listing.price)}</div>

              <div className="bg-gray-50 p-4 rounded-md mb-8">
                <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">Özellikler</h3>
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div><span className="text-gray-500 block">Kategori</span><span className="font-medium">{listing.details.category}</span></div>
                  <div><span className="text-gray-500 block">Oda Sayısı</span><span className="font-medium">{listing.details.rooms}</span></div>
                  <div><span className="text-gray-500 block">Brüt/Net m²</span><span className="font-medium">{listing.details.sizeSqM} m²</span></div>
                  <div><span className="text-gray-500 block">Bina Yaşı</span><span className="font-medium">{listing.details.buildingAge}</span></div>
                  <div><span className="text-gray-500 block">Bulunduğu Kat</span><span className="font-medium">{listing.details.floor}</span></div>
                  <div><span className="text-gray-500 block">Isıtma</span><span className="font-medium">{listing.details.heating}</span></div>
                  <div><span className="text-gray-500 block">Banyo Sayısı</span><span className="font-medium">{listing.details.bathrooms}</span></div>
                  <div><span className="text-gray-500 block">Balkon</span><span className="font-medium">{listing.details.balcony ? 'Var' : 'Yok'}</span></div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Açıklama</h3>
                <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">{listing.description}</p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                 <button className="w-full bg-primary text-white py-3 rounded-md font-bold hover:bg-primary-dark transition-colors">
                   İletişime Geç
                 </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
