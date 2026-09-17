import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { listingService } from '../../services/listingService';
import { Input, Select, Textarea } from '../../components/shared/FormComponents';
import { ImageUploader } from '../../components/shared/ImageUploader';
import { RealEstateListing } from '../../types';

export default function RealEstateForm() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [images, setImages] = useState<string[]>([]);
  
  // Details State
  const [category, setCategory] = useState('Satılık Daire');
  const [sizeSqM, setSizeSqM] = useState('');
  const [rooms, setRooms] = useState('');
  const [buildingAge, setBuildingAge] = useState('');
  const [floor, setFloor] = useState('');
  const [heating, setHeating] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [balcony, setBalcony] = useState('true');

  useEffect(() => {
    if (id) {
      // Edit mode
      const fetchListing = async () => {
        const data = await listingService.getRealEstateById(id);
        if (data && data.ownerId === user?.id) {
          setTitle(data.title);
          setDescription(data.description);
          setPrice(data.price.toString());
          setCity(data.city);
          setDistrict(data.district);
          setNeighborhood(data.neighborhood || '');
          setImages(data.images);
          setCategory(data.details.category);
          setSizeSqM(data.details.sizeSqM.toString());
          setRooms(data.details.rooms);
          setBuildingAge(data.details.buildingAge.toString());
          setFloor(data.details.floor);
          setHeating(data.details.heating);
          setBathrooms(data.details.bathrooms.toString());
          setBalcony(data.details.balcony ? 'true' : 'false');
        } else {
          navigate('/emlak/ilanlarim');
        }
      };
      fetchListing();
    }
  }, [id, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError('');
    setLoading(true);

    try {
      const listingData = {
        ownerId: user.id,
        type: 'real_estate' as const,
        title,
        description,
        price: Number(price),
        city,
        district,
        neighborhood,
        images,
        details: {
          category: category as any,
          sizeSqM: Number(sizeSqM),
          rooms,
          buildingAge: Number(buildingAge),
          floor,
          heating,
          bathrooms: Number(bathrooms),
          balcony: balcony === 'true'
        }
      };

      if (id) {
        // We set status to pending again on edit, or leave it. Let's set it to pending.
        await listingService.updateRealEstate(id, { ...listingData, status: 'pending' });
      } else {
        await listingService.createRealEstate(listingData);
      }
      navigate('/emlak/ilanlarim');
    } catch (err: any) {
      setError(err.message || 'Kayıt sırasında bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold mb-8 text-primary">
          {id ? 'İlanı Düzenle' : 'Yeni Emlak İlanı Ver'}
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          {error && <div className="bg-red-50 text-red-600 p-4 rounded mb-6">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h3 className="font-semibold text-lg border-b pb-2 mb-4">Temel Bilgiler</h3>
                <Input label="İlan Başlığı" value={title} onChange={e => setTitle(e.target.value)} required />
                <Textarea label="Açıklama" value={description} onChange={e => setDescription(e.target.value)} rows={4} required />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Fiyat (TL)" type="number" value={price} onChange={e => setPrice(e.target.value)} required min="0" />
                  <Select 
                    label="Kategori" 
                    value={category} 
                    onChange={e => setCategory(e.target.value)} 
                    options={[
                      { value: 'Satılık Daire', label: 'Satılık Daire' },
                      { value: 'Kiralık Daire', label: 'Kiralık Daire' },
                      { value: 'Villa', label: 'Villa' },
                      { value: 'Arsa', label: 'Arsa' },
                      { value: 'İş Yeri', label: 'İş Yeri' },
                      { value: 'Müstakil Ev', label: 'Müstakil Ev' }
                    ]} 
                    required 
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="font-semibold text-lg border-b pb-2 mb-4">Konum Bilgileri</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Input label="İl" value={city} onChange={e => setCity(e.target.value)} required />
                  <Input label="İlçe" value={district} onChange={e => setDistrict(e.target.value)} required />
                  <Input label="Mahalle" value={neighborhood} onChange={e => setNeighborhood(e.target.value)} />
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="font-semibold text-lg border-b pb-2 mb-4">Teknik Özellikler</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Input label="Metrekare (m²)" type="number" value={sizeSqM} onChange={e => setSizeSqM(e.target.value)} required />
                  <Input label="Oda Sayısı" value={rooms} onChange={e => setRooms(e.target.value)} placeholder="Örn: 3+1" required />
                  <Input label="Bina Yaşı" type="number" value={buildingAge} onChange={e => setBuildingAge(e.target.value)} required />
                  <Input label="Bulunduğu Kat" value={floor} onChange={e => setFloor(e.target.value)} required />
                  <Input label="Isıtma" value={heating} onChange={e => setHeating(e.target.value)} required />
                  <Input label="Banyo Sayısı" type="number" value={bathrooms} onChange={e => setBathrooms(e.target.value)} required />
                  <Select 
                    label="Balkon" 
                    value={balcony} 
                    onChange={e => setBalcony(e.target.value)}
                    options={[{value: 'true', label: 'Var'}, {value: 'false', label: 'Yok'}]}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="font-semibold text-lg border-b pb-2 mb-4">Fotoğraflar</h3>
                <ImageUploader images={images} onChange={setImages} />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/emlak/ilanlarim')}
                className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {loading ? 'Kaydediliyor...' : (id ? 'Güncelle' : 'İlanı Gönder')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
