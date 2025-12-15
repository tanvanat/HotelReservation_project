import React from "react";
import { Link } from "react-router-dom";
import { Hotel } from "../types/models";

interface Props {
  hotel: Hotel;
}

const HotelCard: React.FC<Props> = ({ hotel }) => {
  return (
    <div className="hotel-card">
      <img src={hotel.imageUrl} alt={hotel.name} className="hotel-image" />
      <div className="hotel-info">
        <h3>{hotel.name}</h3>
        <p>
          {hotel.city} • ⭐ {hotel.rating.toFixed(1)} • ${hotel.pricePerNight}/night
        </p>
        <Link to={`/hotels/${hotel.id}`} className="btn-primary">
          View details
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;
