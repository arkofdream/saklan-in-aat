import React, { useState } from 'react';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ images, onChange }) => {
  const [urlInput, setUrlInput] = useState('');

  const handleAdd = () => {
    if (urlInput.trim()) {
      onChange([...images, urlInput.trim()]);
      setUrlInput('');
    }
  };

  const handleRemove = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Fotoğraflar (URL olarak ekleyin)</label>
      
      <div className="flex space-x-2 mb-4">
        <input
          type="url"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          placeholder="https://images.unsplash.com/photo-..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Ekle
        </button>
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
