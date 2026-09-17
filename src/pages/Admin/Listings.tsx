import React, { useEffect, useState } from 'react';
import { listingService } from '../../services/listingService';
import { Listing } from '../../types';
import { StatusBadge } from '../../components/shared/StatusBadge';

export default function AllListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    const data = [
      ...(await listingService.getRealEstates()),
      ...(await listingService.getVehicles())
    ].filter(l => l.status !== 'pending')
     .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setListings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDeactivate = async (id: string, type: 'real_estate' | 'vehicle') => {
    if (window.confirm('Bu ilanı yayından kaldırmak istediğinize emin misiniz?')) {
      await listingService.updateListingStatus(id, type, 'inactive');
      fetchListings();
    }
  };
  
  const handleActivate = async (id: string, type: 'real_estate' | 'vehicle') => {
    if (window.confirm('Bu ilanı tekrar yayına almak istediğinize emin misiniz?')) {
      await listingService.updateListingStatus(id, type, 'approved');
      fetchListings();
    }
  };

  const handleDelete = async (id: string, type: 'real_estate' | 'vehicle') => {
    if (window.confirm('Bu ilanı kalıcı olarak SİLMEK istediğinize emin misiniz?')) {
      if (type === 'real_estate') await listingService.deleteRealEstate(id);
      else await listingService.deleteVehicle(id);
      fetchListings();
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Tüm İlanlar (Aktif/Pasif)</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Yükleniyor...</div>
        ) : listings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">İlan bulunmuyor.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İlan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tip</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {listings.map(listing => (
                  <tr key={listing.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                      <div className="text-sm text-gray-500">{listing.price} TL</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {listing.type === 'real_estate' ? 'Emlak' : 'Otomotiv'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={listing.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      {listing.status === 'approved' ? (
                        <button 
                          onClick={() => handleDeactivate(listing.id, listing.type)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          Yayından Kaldır
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleActivate(listing.id, listing.type)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Yayına Al
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(listing.id, listing.type)}
                        className="text-red-600 hover:text-red-900"
                      >
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
    </>
  );
}
