import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Hotel } from "../types/models";

type Props = {
  hotels: Hotel[];
  onViewDetails?: (hotel: Hotel) => void;
};

const HotelCardB: React.FC<Props> = ({ hotels = [], onViewDetails }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  
  // For single hotel display (like in variant A)
  const singleHotelMode = hotels.length === 1;
  const currentHotel = singleHotelMode ? hotels[0] : (hotels[index] || null);

  if (hotels.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-200 text-slate-600">
        No hotels found.
      </div>
    );
  }

  return (
    <div className="hotel-card variant-b">
      {/* Variant B Badge */}
      <div className="variant-badge variant-b-badge">
        Variant B - Best Deal!
      </div>
      
      {!singleHotelMode && hotels.length > 1 && (
        <div className="carousel-controls">
          <button 
            onClick={() => setIndex((i) => (i - 1 + hotels.length) % hotels.length)}
            className="carousel-btn prev"
            aria-label="Previous"
          >
            ←
          </button>
          <button 
            onClick={() => setIndex((i) => (i + 1) % hotels.length)}
            className="carousel-btn next"
            aria-label="Next"
          >
            →
          </button>
          
          {/* Carousel dots */}
          <div className="carousel-dots">
            {hotels.slice(0, 5).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`dot ${i === index ? 'active' : ''}`}
                aria-label={`Go to hotel ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
      
      <img 
        src={currentHotel.imageUrl} 
        className="hotel-image" 
        alt={currentHotel.name} 
      />

      <div className="hotel-info">
        <h3 className="hotel-name">{currentHotel.name}</h3>
        
        {/* Special offer tag for Variant B */}
        <div className="special-offer">
          <span className="offer-tag">🔥 LIMITED OFFER</span>
          <span className="offer-text">Save 15% on your stay!</span>
        </div>
        
        <div className="hotel-location">
          <span className="location-icon">📍</span>
          <span className="location-text">{currentHotel.city}</span>
        </div>
        
        <div className="hotel-rating-price">
          <div className="rating">
            <span className="star">⭐</span>
            <span className="rating-value">{currentHotel.rating.toFixed(1)}</span>
            <span className="rating-count">(125 reviews)</span>
          </div>
          <div className="price">
            <span className="original-price">${currentHotel.pricePerNight * 1.15}</span>
            <span className="current-price">${currentHotel.pricePerNight}</span>
            <span className="price-text">/night</span>
          </div>
        </div>
        
        <div className="hotel-features">
          <span className="feature">🆓 Free Breakfast</span>
          <span className="feature">🚗 Free Parking</span>
          <span className="feature">🏊 Pool</span>
        </div>

        <button
          onClick={() => {
            onViewDetails?.(currentHotel);
            navigate(`/hotels/${currentHotel.id}`);
          }}
          className="btn-primary variant-b-btn"
        >
          Book Now - Save 15%
        </button>
        
        {!singleHotelMode && (
          <div className="carousel-counter">
            <span>{index + 1} of {hotels.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelCardB;