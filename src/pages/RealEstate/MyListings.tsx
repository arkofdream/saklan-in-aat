import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { listingService } from '../../services/listingService';
import { RealEstateListing } from '../../types';
import { StatusBadge } from '../../components/shared/StatusBadge';

export default function MyRealEstateListings() {
  const { user } = useAuth();
  const [listings, setListings] = useState<RealEstateListing[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      if (user) {
        const data = await listingService.getRealEstatesByUser(user.id);
        setListings(data);
      }
      setLoading(false);
    };
    fetchListings();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu ilanı silmek istediğinize emin misiniz?')) {
      await listingService.deleteRealEstate(id);
      setListings(listings.filter(l => l.id !== id));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-primary">Emlak İlanlarım</h1>
          <Link to="/emlak/ilan-ver" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors">
            Yeni İlan Ver
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Yükleniyor...</div>
          ) : listings.length === 0 ? (
            <div className="p-8 text-center text-gray-500 flex flex-col items-center">
              <p className="mb-4">Henüz bir emlak ilanınız bulunmuyor.</p>
              <Link to="/emlak/ilan-ver" className="text-primary hover:underline">Hemen bir ilan verin</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İlan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fiyat</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {listings.map((listing) => (
                    <tr key={listing.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded overflow-hidden">
                            {listing.images && listing.images[0] ? (
                              <img className="h-10 w-10 object-cover" src={listing.images[0]} alt="" />
                            ) : (
                              <div className="h-10 w-10 flex items-center justify-center text-gray-400 text-xs">Yok</div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                            <div className="text-sm text-gray-500">{listing.details.category} - {listing.district}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">{formatPrice(listing.price)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(listing.createdAt).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={listing.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {listing.status === 'approved' && (
                          <Link to={`/emlak/${listing.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                            Görüntüle
                          </Link>
                        )}
                        <Link to={`/emlak/duzenle/${listing.id}`} className="text-primary hover:text-primary-dark mr-4">
                          Düzenle
                        </Link>
                        <button onClick={() => handleDelete(listing.id)} className="text-red-600 hover:text-red-900">
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
