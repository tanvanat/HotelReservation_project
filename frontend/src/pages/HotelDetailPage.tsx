import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchHotelById, postEvent } from "../services/apiClient";
import type { Hotel } from "../types/models";
import { useSessionId } from "../hooks/useSessionId";
import BookNowButton from "../components/BookNowButton";
import { useGlobalVariant } from "../hooks/useGlobalVariant";

const HotelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sessionId = useSessionId();
  const variant = useGlobalVariant(); // ✅ ใช้ A/B เดียวกันทั้งเว็บ

  const hotelId = useMemo(() => Number(id), [id]);

  useEffect(() => {
    if (!hotelId) {
      setError("Invalid hotel id");
      setLoading(false);
      return;
    }

    fetchHotelById(hotelId)
      .then((data) => setHotel(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load hotel");
      })
      .finally(() => setLoading(false));
  }, [hotelId]);

  useEffect(() => {
    if (!hotel || !sessionId) return;

    postEvent({
      sessionId,
      hotelId: hotel.id,
      variant,
      eventType: "view_hotel",
    }).catch((err) => console.error("Failed to log view event", err));
  }, [hotel, sessionId, variant]);

  const handleBookClick = () => {
    if (!hotel || !sessionId) return;

    postEvent({
      sessionId,
      hotelId: hotel.id,
      variant,
      eventType: "click_book",
    }).catch((err) => console.error("Failed to log click event", err));

    alert("Booking simulated! Event logged for experiment.");
  };

  if (loading) return <p>Loading hotel...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!hotel) return <p>Hotel not found.</p>;

  return (
    <div className="hotel-detail">
      <img src={hotel.imageUrl} alt={hotel.name} className="hotel-detail-img" />
      <div className="hotel-detail-info">
        <h1>{hotel.name}</h1>
        <p>
          {hotel.city} • ⭐ {hotel.rating.toFixed(1)} • ${hotel.pricePerNight}/night
        </p>

        <p className="subtitle">
          Global variant: <strong>{variant}</strong>
        </p>

        <BookNowButton variant={variant} onClick={handleBookClick} />
      </div>
    </div>
  );
};

export default HotelDetailPage;
