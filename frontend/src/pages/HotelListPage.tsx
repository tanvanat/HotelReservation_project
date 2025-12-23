import React, { useEffect, useMemo, useState } from "react";
import { fetchHotels } from "../services/apiClient";
import { Hotel } from "../types/models";
import { HotelGalleryTabs } from "../components/HotelGalleryTabs";
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

  const filteredHotels = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return hotels;
    return hotels.filter(
      (h) =>
        h.name.toLowerCase().includes(keyword) ||
        h.city.toLowerCase().includes(keyword)
    );
  }, [hotels, search]);

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      {/* ✅ ทำให้ทุกอย่างอยู่กลางเหมือน search bar */}
      <div className="text-center">
        <h1>Available Hotels</h1>
        <p className="subtitle">
          This list simulates Agoda-style search results. Click one to see the
          experiment in action.
        </p>

        {/* Search bar */}
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

        <p className="subtitle">
          96% guest satisfaction with 52,000+ nights booked
        </p>
      </div>

      {/* ✅ ส่ง hotels เข้า tabs */}
      <div className="hotel-list">
        {filteredHotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>

      {/* <HotelGalleryTabs hotels={filteredHotels} /> */}
    </div>
  );
};

export default HotelListPage;
