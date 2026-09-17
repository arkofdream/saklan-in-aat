import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { useAuth } from '../../contexts/AuthContext';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  isProject?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ images, onChange, isProject = false }) => {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (!user) {
      alert("Fotoğraf yüklemek için giriş yapmalısınız.");
      return;
    }

    setUploading(true);
    const newUrls: string[] = [];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let url = '';
        if (isProject) {
          url = await storageService.uploadProjectImage(file);
        } else {
          url = await storageService.uploadListingImage(user.id, file);
        }
        newUrls.push(url);
      }
      onChange([...images, ...newUrls]);
    } catch (err: any) {
      alert("Fotoğraf yüklenirken hata oluştu: " + err.message);
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleRemove = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Fotoğraflar</label>
      
      <div className="flex items-center space-x-2 mb-4">
        <label className={`cursor-pointer px-4 py-2 rounded-md font-medium text-sm transition-colors ${uploading ? 'bg-gray-400 text-gray-100' : 'bg-primary text-white hover:bg-primary-dark'}`}>
          {uploading ? 'Yükleniyor...' : 'Dosya Seç'}
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
        <span className="text-sm text-gray-500">Maksimum 5MB, JPG/PNG</span>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {images.map((img, idx) => (
            <div key={idx} className="relative group rounded-md overflow-hidden bg-gray-100 aspect-[4/3]">
              <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs w-6 h-6 flex items-center justify-center"
              >
                X
              </button>
              {idx === 0 && (
                <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-1">
                  Kapak
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      {images.length === 0 && (
        <div className="text-sm text-gray-500 italic">Henüz fotoğraf eklenmedi.</div>
      )}
    </div>
  );
};
