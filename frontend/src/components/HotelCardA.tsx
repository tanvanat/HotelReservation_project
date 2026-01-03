import React from "react";
import { Link } from "react-router-dom";
import type { Hotel } from "../types/models";

interface Props {
  hotel: Hotel;
  onViewDetails?: (hotel: Hotel) => void;
}

const HotelCardA: React.FC<Props> = ({ hotel, onViewDetails }) => {
  return (
    <div className="hotel-card variant-a">
      {/* Variant A Badge */}
      <div className="variant-badge variant-a-badge">
        Variant A
      </div>
      
      <img 
        src={hotel.imageUrl} 
        className="hotel-image" 
        alt={hotel.name} 
      />

      <div className="hotel-info">
        <h3 className="hotel-name">{hotel.name}</h3>
        
        <div className="hotel-location">
          <span className="location-icon">📍</span>
          <span className="location-text">{hotel.city}</span>
        </div>
        
        <div className="hotel-rating-price">
          <div className="rating">
            <span className="star">⭐</span>
            <span className="rating-value">{hotel.rating.toFixed(1)}</span>
          </div>
          <div className="price">
            <span className="price-amount">${hotel.pricePerNight}</span>
            <span className="price-text">/night</span>
          </div>
        </div>
        
        <div className="hotel-description">
          Experience luxury and comfort with our premium amenities
        </div>

        <Link
          to={`/hotels/${hotel.id}`}
          className="btn-primary variant-a-btn"
          onClick={() => onViewDetails?.(hotel)}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HotelCardA;