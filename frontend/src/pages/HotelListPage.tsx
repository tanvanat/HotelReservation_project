import React, { useEffect, useState } from "react";
import { fetchHotels } from "../services/apiClient";
import { Hotel } from "../types/models";
import HotelCard from "../components/HotelCard";

const HotelListPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHotels()
      .then((data) => setHotels(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load hotels");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredHotels = hotels.filter((hotel) => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return true;

    return (
      hotel.name.toLowerCase().includes(keyword) ||
      hotel.city.toLowerCase().includes(keyword)
    );
  });

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h1>Available Hotels</h1>
      <p className="subtitle">
        This list simulates Agoda-style search results. Click one to see the
        experiment in action.
      </p>

      {/* ✅ Search bar (ใช้ class จาก index.css) */}
      <div className="search-wrap">
        <form
          className="search-form"
          onSubmit={(e) => e.preventDefault()}
          role="search"
        >
          <label htmlFor="search" className="sr-only">
            Search
          </label>

          <div className="search-box">
            <span className="search-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <input
              type="search"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hotel or city"
              className="search-input"
            />

            <button type="button" className="search-btn">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* ✅ Hotel grid */}
      <div className="hotel-grid">
        {filteredHotels.length === 0 ? (
          <p className="error" style={{ color: "#6b7280" }}>
            No hotels found
          </p>
        ) : (
          filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))
        )}
      </div>
    </div>
  );
};

export default HotelListPage;
