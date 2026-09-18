import React, { useEffect, useState } from 'react';
import { listingService } from '../../services/listingService';
import { VehicleListing } from '../../types';
import { ListingCard } from '../../components/shared/ListingCard';
import { FilterPanel } from '../../components/shared/FilterPanel';
import { Select, Input } from '../../components/shared/FormComponents';

export default function Automotive() {
  const [listings, setListings] = useState<VehicleListing[]>([]);
  const [filtered, setFiltered] = useState<VehicleListing[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await listingService.getVehicles('approved');
        setListings(data);
        setFiltered(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleApplyFilters = () => {
    let result = [...listings];
    
    if (category) result = result.filter(l => l.details.category === category);
    if (minPrice) result = result.filter(l => l.price >= Number(minPrice));
    if (maxPrice) result = result.filter(l => l.price <= Number(maxPrice));
    if (city) result = result.filter(l => l.city.toLowerCase().includes(city.toLowerCase()));
    
    setFiltered(result);
  };

  const handleResetFilters = () => {
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setCity('');
    setFiltered(listings);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold mb-8 text-primary">Saklan Otomotiv</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filter */}
          <div className="w-full lg:w-1/4">
            <FilterPanel onApply={handleApplyFilters} onReset={handleResetFilters}>
              <Select 
                label="Kategori" 
                value={category} 
                onChange={e => setCategory(e.target.value)}
                options={[
                  { value: 'Otomobil', label: 'Otomobil' },
                  { value: 'SUV', label: 'SUV' },
                  { value: 'Ticari Araç', label: 'Ticari Araç' },
                  { value: 'Motosiklet', label: 'Motosiklet' },
                  { value: 'Diğer', label: 'Diğer' }
                ]}
              />
              <Input 
                label="İl" 
                type="text" 
                value={city} 
                onChange={e => setCity(e.target.value)} 
                placeholder="Örn: İstanbul" 
              />
              <div className="flex space-x-2">
                <Input 
                  label="Min Fiyat" 
                  type="number" 
                  value={minPrice} 
                  onChange={e => setMinPrice(e.target.value)} 
                  className="w-full"
                />
                <Input 
                  label="Max Fiyat" 
                  type="number" 
                  value={maxPrice} 
                  onChange={e => setMaxPrice(e.target.value)} 
                  className="w-full"
                />
              </div>
            </FilterPanel>
          </div>

          {/* Listing Grid */}
          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="text-center py-10">Yükleniyor...</div>
            ) : filtered.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center text-gray-500">
                Arama kriterlerinize uygun araç bulunamadı.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(listing => (
                  <ListingCard key={listing.id} listing={listing} linkPrefix="otomotiv" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
