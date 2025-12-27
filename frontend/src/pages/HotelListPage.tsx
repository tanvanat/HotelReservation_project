import React, { useEffect, useMemo, useRef, useState } from "react";
import { fetchHotels, postTrackEvent } from "../services/apiClient";
import type { Hotel, TrackEventPayload } from "../types/models";
import { useSessionId } from "../hooks/useSessionId";
import HotelCard from "../components/HotelCard";
import { useGlobalVariant } from "../hooks/useGlobalVariant";

const STICKY_THRESHOLD_PX = 80;

const HotelListPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  // ✅ session + global variant (ใช้ทั้งเว็บ)
  const sessionId = useSessionId();
  const variant = useGlobalVariant(); // "A" | "B"

  // ===== Metrics refs =====
  const pageEnterAtRef = useRef<number>(Date.now());
  const firstHotelClickSentRef = useRef<boolean>(false);
  const typingTimerRef = useRef<number | null>(null);

  // ===== Scroll state (เฉพาะ Variant A) =====
  const [isStuck, setIsStuck] = useState(false);

  // ===== Helper: safe tracking =====
  const track = (payload: Omit<TrackEventPayload, "sessionId" | "variant">) => {
    postTrackEvent({ sessionId, variant, ...payload }).catch((e) => {
      console.warn("postTrackEvent failed:", e);
    });
  };

  // ===== Load hotels =====
  useEffect(() => {
    fetchHotels()
      .then((data) => setHotels(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load hotels");
      })
      .finally(() => setLoading(false));
  }, []);

  // ===== Detect scroll: fixed เฉพาะ Variant A =====
  useEffect(() => {
    if (variant !== "A") {
      setIsStuck(false);
      return;
    }

    const onScroll = () => setIsStuck(window.scrollY > STICKY_THRESHOLD_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  // ===== Search typed (debounced) =====
  const onSearchChange = (v: string) => {
    setSearch(v);

    if (typingTimerRef.current) window.clearTimeout(typingTimerRef.current);
    typingTimerRef.current = window.setTimeout(() => {
      const keyword = v.trim();
      track({
        eventName: "SEARCH_TYPED",
        keyword,
        keywordLength: keyword.length,
      });
    }, 400);
  };

  // ===== Search submitted =====
  const onSubmitSearch = (source: "enter" | "button") => {
    const keyword = search.trim();
    track({
      eventName: "SEARCH_SUBMITTED",
      source,
      keyword,
      keywordLength: keyword.length,
    });
  };

  // ===== First hotel click =====
  const onFirstHotelClick = (hotel: Hotel) => {
    if (firstHotelClickSentRef.current) return;
    firstHotelClickSentRef.current = true;

    const ms = Date.now() - pageEnterAtRef.current;
    track({
      eventName: "FIRST_HOTEL_CLICK",
      hotelId: hotel.id,
      msToFirstClick: ms,
    });
  };

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

  // A: centered + fixed after scroll
  // B: left + normal
  const searchWrapClass =
    variant === "A"
      ? `search-wrap search-centered ${isStuck ? "search-fixed search-stuck" : ""}`
      : "search-wrap search-normal search-left";

  return (
    <div>
      <div className="text-center">
        <h1>Available Hotels</h1>
        <p className="subtitle">
          This list simulates Agoda-style search results. Click one to see the
          experiment in action.
        </p>

        <div className={searchWrapClass}>
          <form
            className="search-form"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitSearch("enter");
            }}
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
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search hotel or city"
                className="search-input"
              />

              <button
                type="button"
                className="search-btn"
                onClick={() => onSubmitSearch("button")}
              >
                Search
              </button>
            </div>

            <p className="subtitle" style={{ marginTop: 10, fontSize: 12 }}>
              Global variant: <b>{variant}</b>
              {variant === "A" ? (
                <>
                  {" "}
                  • stuck: <b>{String(isStuck)}</b>
                </>
              ) : null}
            </p>
          </form>
        </div>

        <p className="subtitle">96% guest satisfaction with 52,000+ nights booked</p>
      </div>

      <div className="hotel-grid">
        {filteredHotels.map((h) => (
          <HotelCard key={h.id} hotel={h} onViewDetails={onFirstHotelClick} />
        ))}
      </div>
    </div>
  );
};

export default HotelListPage;
