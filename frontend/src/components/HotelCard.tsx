import React from "react";
import { Link } from "react-router-dom";
import { Hotel } from "../types/models";

interface Props {
  hotel: Hotel;
  onViewDetails?: (hotel: Hotel) => void;
}

const HotelCard: React.FC<Props> = ({ hotel, onViewDetails }) => {
  return (
    <div className="hotel-card">
      {/* ===== Image wrapper (hover zoom) ===== */}
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
      </div>

      {/* ===== Info ===== */}
      <div className="hotel-info">
        <h3>{hotel.name}</h3>
        <p>
          {hotel.city} • ⭐ {hotel.rating.toFixed(1)} • $
          {hotel.pricePerNight}/night
        </p>

        <Link to={`/hotels/${hotel.id}`} className="btn-primary" onClick={() => onViewDetails?.(hotel)}>
          View details
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;
