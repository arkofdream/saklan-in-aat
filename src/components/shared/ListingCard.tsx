import React from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '../../types';

interface ListingCardProps {
  listing: Listing;
  linkPrefix: 'emlak' | 'otomotiv';
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, linkPrefix }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
  };

  const mainImage = listing.images && listing.images.length > 0 ? listing.images[0] : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80';

  return (
    <Link to={`/${linkPrefix}/${listing.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
          <img 
            src={mainImage} 
            alt={listing.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="text-primary font-bold text-xl mb-2">{formatPrice(listing.price)}</div>
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{listing.title}</h3>
          <p className="text-sm text-gray-500 mb-3">{listing.district}, {listing.city}</p>
          
          <div className="mt-auto flex text-sm text-gray-600 space-x-4 border-t pt-3">
            {listing.type === 'real_estate' ? (
              <>
                <span>{listing.details.rooms}</span>
                <span>{listing.details.sizeSqM} m²</span>
                <span className="truncate">{listing.details.category}</span>
              </>
            ) : (
              <>
                <span>{listing.details.year}</span>
                <span>{listing.details.mileage} km</span>
                <span className="truncate">{listing.details.fuelType}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
