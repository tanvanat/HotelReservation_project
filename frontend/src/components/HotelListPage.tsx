import React, { useEffect, useMemo, useRef, useState } from "react";
import { fetchHotels, postTrackEvent } from "../services/apiClient";
import type { Hotel, TrackEventPayload } from "../types/models";
import { useSessionId } from "../hooks/useSessionId";
import { useGlobalVariant } from "../hooks/useGlobalVariant";
import HotelCard from "../components/HotelCard";

const STICKY_THRESHOLD_PX = 80;

const HotelListPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const sessionId = useSessionId();
  const variant = useGlobalVariant(); // "A" | "B"

  const pageEnterAtRef = useRef<number>(Date.now());
  const firstHotelClickSentRef = useRef<boolean>(false);
  const typingTimerRef = useRef<number | null>(null);
  const [isStuck, setIsStuck] = useState(false);

  const track = (payload: Omit<TrackEventPayload, "sessionId" | "variant">) => {
    postTrackEvent({ sessionId, variant, ...payload }).catch((e) => {
      console.warn("postTrackEvent failed:", e);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchHotels()
      .then((data) => {
        console.log("Fetched hotels data:", data);
        // Ensure data is an array
        if (Array.isArray(data)) {
          setHotels(data);
        } else if (data) {
          setHotels([data]);
        } else {
          setHotels([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch hotels:", err);
        setError("Failed to load hotels. Please try again later.");
        setHotels([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

  const onSubmitSearch = (source: "enter" | "button") => {
    const keyword = search.trim();
    track({
      eventName: "SEARCH_SUBMITTED",
      source,
      keyword,
      keywordLength: keyword.length,
    });
  };

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
    console.log("Filtering hotels:", hotels.length, "hotels, search:", search);
    
    // If no search term, return all hotels
    if (!search.trim()) {
      return hotels;
    }
    
    const keyword = search.trim().toLowerCase();
    return hotels.filter(hotel => {
      if (!hotel) return false;
      
      const nameMatch = hotel.name?.toLowerCase().includes(keyword) || false;
      const cityMatch = hotel.city?.toLowerCase().includes(keyword) || false;
      
      return nameMatch || cityMatch;
    });
  }, [hotels, search]);

  // Add cleanup for timeout
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, []);

  // Debug: Log current state
  useEffect(() => {
    console.log("Current state:", {
      hotelsCount: hotels.length,
      filteredCount: filteredHotels.length,
      loading,
      error,
      variant
    });
  }, [hotels, filteredHotels, loading, error, variant]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Hotels</h2>
          <p className="text-gray-600">Please wait while we fetch the latest hotel deals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto p-8 bg-red-50 rounded-2xl border border-red-200 shadow-lg">
          <div className="text-red-600 text-5xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-4">Error Loading Hotels</h2>
          <p className="text-red-700 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-md"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  const searchWrapClass =
    variant === "A"
      ? `search-wrap search-centered ${isStuck ? "search-fixed search-stuck" : ""}`
      : "search-wrap search-normal";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white pt-10 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 tracking-tight">
            Available Hotels
          </h1>
          <p className="text-center text-blue-100 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Discover amazing hotel deals for your next trip. Click any hotel to view detailed information and book your stay.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-12">
          <div className={searchWrapClass}>
            <form
              className="search-form bg-white rounded-2xl shadow-xl p-6 border border-slate-200"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmitSearch("enter");
              }}
              role="search"
            >
              <div className="mb-4">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Find your perfect stay
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="search"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search by hotel name or city (e.g., Bangkok, Marriott)"
                    className="search-input pl-12 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    aria-label="Search hotels"
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 px-6 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => onSubmitSearch("button")}
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Stats & Info */}
              <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-900 mr-2">{filteredHotels.length}</span>
                    <span className="text-gray-600">
                      {filteredHotels.length === 1 ? 'hotel found' : 'hotels found'}
                    </span>
                  </div>
                  <div className="hidden md:flex items-center">
                    <span className="text-gray-500 mr-2">Experiment variant:</span>
                    <span className={`font-bold text-lg ${variant === 'A' ? 'text-blue-600' : 'text-green-600'}`}>
                      {variant}
                    </span>
                  </div>
                </div>
                
                {variant === "A" && (
                  <div className="flex items-center mt-2 md:mt-0">
                    <span className="text-gray-500 mr-2">Sticky search:</span>
                    <span className={`font-semibold ${isStuck ? 'text-green-600' : 'text-amber-600'}`}>
                      {isStuck ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-4 bg-white rounded-full px-8 py-4 shadow-lg border border-slate-200">
            <div className="flex items-center space-x-2">
              <span className="text-2xl text-green-600">✓</span>
              <span className="text-gray-800 font-semibold">96% Guest Satisfaction</span>
            </div>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl text-green-600">✓</span>
              <span className="text-gray-800 font-semibold">52,000+ Nights Booked</span>
            </div>
          </div>
        </div>

        {/* Hotels Display */}
        {filteredHotels.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-7xl mb-6 text-gray-300">🏨</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No hotels found
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                {search.trim()
                  ? `We couldn't find any hotels matching "${search}". Try a different search term.`
                  : "No hotels are currently available. Please check back later."}
              </p>
              {search.trim() && (
                <button
                  onClick={() => setSearch("")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Variant A - Grid Layout */}
            {variant === "A" ? (
              <div className="hotel-grid-a">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Hotels Available</h2>
                  <p className="text-gray-600">Browse through our selection of premium hotels</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredHotels.map((h) => (
                    <HotelCard
                      key={h.id}
                      hotel={h}
                      onViewDetails={onFirstHotelClick}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* Variant B - Grid Layout with different styling */
              <div className="hotel-grid-b">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">🔥 Exclusive Hotel Deals</h2>
                  <p className="text-gray-600 text-lg">Special limited-time offers just for you!</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredHotels.map((h) => (
                    <HotelCard
                      key={h.id}
                      hotel={h}
                      onViewDetails={onFirstHotelClick}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer Stats */}
        {filteredHotels.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{hotels.length}</div>
                <div className="text-gray-700 font-medium">Total Hotels</div>
                <div className="text-gray-500 text-sm mt-1">In our database</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">4.8</div>
                <div className="text-gray-700 font-medium">Average Rating</div>
                <div className="text-gray-500 text-sm mt-1">Based on guest reviews</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{sessionId.slice(0, 8)}...</div>
                <div className="text-gray-700 font-medium">Your Session ID</div>
                <div className="text-gray-500 text-sm mt-1">For A/B testing tracking</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Debug Info (only in development) - Fixed the process.env check */}
      {import.meta.env.DEV && (
        <div className="fixed bottom-6 right-6 bg-black/90 text-white text-sm p-4 rounded-xl max-w-xs z-50 shadow-2xl">
          <div className="font-mono space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Variant:</span>
              <span className={`font-bold ${variant === 'A' ? 'text-blue-400' : 'text-green-400'}`}>
                {variant}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Hotels:</span>
              <span>{hotels.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Filtered:</span>
              <span>{filteredHotels.length}</span>
            </div>
            {variant === "A" && (
              <div className="flex justify-between">
                <span className="text-gray-400">Sticky Search:</span>
                <span className={isStuck ? 'text-green-400' : 'text-yellow-400'}>
                  {isStuck ? 'YES' : 'NO'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add custom styles via inline style tag - Fixed */}
      <style>
        {`
          .search-wrap {
            transition: all 0.3s ease;
            max-width: 800px;
            margin: 0 auto;
          }
          
          .search-centered {
            position: relative;
          }
          
          .search-fixed {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            width: 90%;
            max-width: 800px;
            animation: slideDown 0.3s ease;
          }
          
          .search-stuck {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translate(-50%, -20px);
            }
            to {
              opacity: 1;
              transform: translate(-50%, 0);
            }
          }
          
          .hotel-grid-a .hotel-card {
            animation: fadeIn 0.5s ease-out;
          }
          
          .hotel-grid-b .hotel-card {
            animation: fadeIn 0.5s ease-out 0.1s backwards;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default HotelListPage;