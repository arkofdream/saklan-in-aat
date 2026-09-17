import React, { useEffect, useState } from 'react';
import { listingService } from '../../services/listingService';
import { Listing } from '../../types';
import { Link } from 'react-router-dom';

export default function PendingListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    const data = await listingService.getAllPendingListings();
    setListings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleAction = async (id: string, type: 'real_estate' | 'vehicle', action: 'approved' | 'rejected') => {
    if (window.confirm(`Bu ilanı ${action === 'approved' ? 'onaylamak' : 'reddetmek'} istediğinize emin misiniz?`)) {
      await listingService.updateListingStatus(id, type, action);
      fetchListings(); // Refresh list
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Bekleyen İlanlar</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Yükleniyor...</div>
        ) : listings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Onay bekleyen ilan bulunmuyor.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İlan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
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
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {listing.type === 'real_estate' ? 'Emlak' : 'Otomotiv'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(listing.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    {/* Link to view might be complex for pending, but admin can see it in detail component if we didn't restrict it heavily. 
                        Let's just give approval/rejection actions */}
                    <button 
                      onClick={() => handleAction(listing.id, listing.type, 'approved')}
                      className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded"
                    >
                      Onayla
                    </button>
                    <button 
                      onClick={() => handleAction(listing.id, listing.type, 'rejected')}
                      className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded"
                    >
                      Reddet
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
