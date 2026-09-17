import React from 'react';

export const FilterPanel: React.FC<{ title?: string; children: React.ReactNode; onApply: () => void; onReset: () => void }> = ({ title = 'Filtreler', children, onApply, onReset }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 border-b pb-2">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
      <div className="mt-6 flex flex-col space-y-2">
        <button
          onClick={onApply}
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors"
        >
          Filtrele
        </button>
        <button
          onClick={onReset}
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition-colors"
        >
          Temizle
        </button>
      </div>
    </div>
  );
};
