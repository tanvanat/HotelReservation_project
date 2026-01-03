import React from "react";
import { Link } from "react-router-dom";
import type { Hotel } from "../types/models";
import { useGlobalVariant } from "../hooks/useGlobalVariant";

interface Props {
  hotel: Hotel;
  onViewDetails?: (hotel: Hotel) => void;
}

const HotelCard: React.FC<Props> = ({ hotel, onViewDetails }) => {
  const variant = useGlobalVariant(); // "A" | "B"

  // ถ้าเป็น variant A
  if (variant === "A") {
    return (
      <div className="hotel-card variant-a">
        {/* ===== Image wrapper ===== */}
        <div className="relative overflow-hidden">
          <img
            src={hotel.imageUrl}
            alt={hotel.name}
            className="
              hotel-image
              transition-transform duration-300 ease-in-out
              hover:scale-110
            "
          />
          {/* Variant A Badge */}
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Variant A
          </div>
        </div>

        {/* ===== Info ===== */}
        <div className="hotel-info">
          <h3 className="text-lg font-bold text-gray-900">{hotel.name}</h3>
          <p className="text-gray-600 mt-2">
            {hotel.city} • ⭐ {hotel.rating.toFixed(1)} • $
            {hotel.pricePerNight}/night
          </p>
          
          {/* Additional info for Variant A */}
          <div className="mt-3 text-sm text-gray-500">
            <p>✓ Free cancellation</p>
            <p>✓ Breakfast included</p>
          </div>

          <Link 
            to={`/hotels/${hotel.id}`} 
            className="btn-primary bg-blue-600 hover:bg-blue-700 mt-4" 
            onClick={() => onViewDetails?.(hotel)}
          >
            View details
          </Link>
        </div>
      </div>
    );
  }

  // ถ้าเป็น variant B
  return (
    <div className="hotel-card variant-b border-2 border-green-500">
      {/* ===== Image wrapper with special badge ===== */}
      <div className="relative overflow-hidden">
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="
            hotel-image
            transition-transform duration-300 ease-in-out
            hover:scale-110
          "
        />
        {/* Variant B - Special Offer Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          🔥 BEST DEAL
        </div>
        {/* Discount badge */}
        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          SAVE 15%
        </div>
      </div>

      {/* ===== Info ===== */}
      <div className="hotel-info bg-gradient-to-b from-white to-green-50 p-4">
        <h3 className="text-lg font-bold text-gray-900">{hotel.name}</h3>
        
        {/* Rating with review count */}
        <div className="flex items-center mt-2">
          <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded mr-3">
            <span className="font-bold">⭐ {hotel.rating.toFixed(1)}</span>
            <span className="text-xs ml-1">(125 reviews)</span>
          </div>
          <span className="text-gray-600">{hotel.city}</span>
        </div>

        {/* Price with discount */}
        <div className="mt-3">
          <div className="flex items-baseline">
            <span className="text-gray-400 line-through mr-2">
              ${(hotel.pricePerNight * 1.15).toFixed(0)}
            </span>
            <span className="text-2xl font-bold text-red-600">
              ${hotel.pricePerNight}
            </span>
            <span className="text-gray-600 ml-1">/night</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Including taxes & fees</p>
        </div>

        {/* Features for Variant B */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            <span>Free Breakfast</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            <span>Pool Access</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            <span>Free Parking</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            <span>WiFi</span>
          </div>
        </div>

        {/* Urgency message */}
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
          <p className="text-yellow-800 font-semibold">⏰ Limited time offer</p>
          <p className="text-yellow-600 text-xs">Only 3 rooms left at this price!</p>
        </div>

        {/* Different CTA button for Variant B */}
        <Link 
          to={`/hotels/${hotel.id}`} 
          className="
            btn-primary 
            bg-gradient-to-r from-green-600 to-emerald-600 
            hover:from-green-700 hover:to-emerald-700
            font-bold
            mt-4
            w-full
            text-center
            py-3
            rounded-lg
            shadow-lg
            hover:shadow-xl
            transition-all
          " 
          onClick={() => onViewDetails?.(hotel)}
        >
          Book Now & Save 15%
        </Link>
        
        {/* Trust indicators */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            ✓ 96% guest satisfaction • ✓ Free cancellation
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;