import React, { useEffect, useState } from "react";
import { fetchHotels } from "../services/apiClient";
import { Hotel } from "../types/models";
import HotelCard from "../components/HotelCard";

const HotelListPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHotels()
      .then((data) => setHotels(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load hotels");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h1>Available Hotels</h1>
      <p className="subtitle">
        This list simulates Agoda-style search results. Click one to see the
        experiment in action.
      </p>
      <div className="hotel-grid">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelListPage;
