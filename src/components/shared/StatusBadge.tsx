import React from 'react';
import { ListingStatus } from '../../types';

export const StatusBadge: React.FC<{ status: ListingStatus }> = ({ status }) => {
  const config = {
    pending: { label: 'Onay Bekliyor', classes: 'bg-yellow-100 text-yellow-800' },
    approved: { label: 'Yayında', classes: 'bg-green-100 text-green-800' },
    rejected: { label: 'Reddedildi', classes: 'bg-red-100 text-red-800' },
    inactive: { label: 'Yayından Kaldırıldı', classes: 'bg-gray-100 text-gray-800' }
  };

  const { label, classes } = config[status] || config.pending;

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${classes}`}>
      {label}
    </span>
  );
};
