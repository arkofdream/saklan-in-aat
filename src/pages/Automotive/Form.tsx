import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { listingService } from '../../services/listingService';
import { Input, Select, Textarea } from '../../components/shared/FormComponents';
import { ImageUploader } from '../../components/shared/ImageUploader';

export default function AutomotiveForm() {
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
  const [images, setImages] = useState<string[]>([]);
  
  // Details State
  const [category, setCategory] = useState('Otomobil');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [fuelType, setFuelType] = useState('Benzin');
  const [transmission, setTransmission] = useState('Otomatik');
  const [bodyType, setBodyType] = useState('Sedan');
  const [engineCapacity, setEngineCapacity] = useState('');
  const [enginePower, setEnginePower] = useState('');

  useEffect(() => {
    if (id) {
      // Edit mode
      const fetchListing = async () => {
        const data = await listingService.getVehicleById(id);
        if (data && data.ownerId === user?.id) {
          setTitle(data.title);
          setDescription(data.description);
          setPrice(data.price.toString());
          setCity(data.city);
          setDistrict(data.district);
          setImages(data.images);
          setCategory(data.details.category);
          setBrand(data.details.brand);
          setModel(data.details.model);
          setYear(data.details.year.toString());
          setMileage(data.details.mileage.toString());
          setFuelType(data.details.fuelType);
          setTransmission(data.details.transmission);
          setBodyType(data.details.bodyType);
          setEngineCapacity(data.details.engineCapacity ? data.details.engineCapacity.toString() : '');
          setEnginePower(data.details.enginePower ? data.details.enginePower.toString() : '');
        } else {
          navigate('/otomotiv/ilanlarim');
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
        type: 'vehicle' as const,
        title,
        description,
        price: Number(price),
        city,
        district,
        images,
        details: {
          category: category as any,
          brand,
          model,
          year: Number(year),
          mileage: Number(mileage),
          fuelType,
          transmission,
          bodyType,
          engineCapacity: engineCapacity ? Number(engineCapacity) : undefined,
          enginePower: enginePower ? Number(enginePower) : undefined
        }
      };

      if (id) {
        await listingService.updateVehicle(id, { ...listingData, status: 'pending' });
      } else {
        await listingService.createVehicle(listingData);
      }
      navigate('/otomotiv/ilanlarim');
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
          {id ? 'İlanı Düzenle' : 'Yeni Araç İlanı Ver'}
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
                      { value: 'Otomobil', label: 'Otomobil' },
                      { value: 'SUV', label: 'SUV' },
                      { value: 'Ticari Araç', label: 'Ticari Araç' },
                      { value: 'Motosiklet', label: 'Motosiklet' },
                      { value: 'Diğer', label: 'Diğer' }
                    ]} 
                    required 
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="font-semibold text-lg border-b pb-2 mb-4">Konum Bilgileri</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="İl" value={city} onChange={e => setCity(e.target.value)} required />
                  <Input label="İlçe" value={district} onChange={e => setDistrict(e.target.value)} required />
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="font-semibold text-lg border-b pb-2 mb-4">Teknik Özellikler</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Input label="Marka" value={brand} onChange={e => setBrand(e.target.value)} required />
                  <Input label="Model" value={model} onChange={e => setModel(e.target.value)} required />
                  <Input label="Yıl" type="number" value={year} onChange={e => setYear(e.target.value)} required />
                  <Input label="Kilometre" type="number" value={mileage} onChange={e => setMileage(e.target.value)} required />
                  
                  <Select 
                    label="Yakıt" 
                    value={fuelType} 
                    onChange={e => setFuelType(e.target.value)}
                    options={[{value: 'Benzin', label: 'Benzin'}, {value: 'Dizel', label: 'Dizel'}, {value: 'Elektrik', label: 'Elektrik'}, {value: 'Hibrit', label: 'Hibrit'}]}
                  />
                  <Select 
                    label="Vites" 
                    value={transmission} 
                    onChange={e => setTransmission(e.target.value)}
                    options={[{value: 'Manuel', label: 'Manuel'}, {value: 'Otomatik', label: 'Otomatik'}, {value: 'Yarı Otomatik', label: 'Yarı Otomatik'}]}
                  />
                  <Input label="Kasa Tipi" value={bodyType} onChange={e => setBodyType(e.target.value)} required />
                  <Input label="Motor Hacmi (cc)" type="number" value={engineCapacity} onChange={e => setEngineCapacity(e.target.value)} />
                  <Input label="Motor Gücü (hp)" type="number" value={enginePower} onChange={e => setEnginePower(e.target.value)} />
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
                onClick={() => navigate('/otomotiv/ilanlarim')}
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
