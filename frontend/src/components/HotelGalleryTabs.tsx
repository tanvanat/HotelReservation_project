import React, { useMemo, useState } from "react";
import type { Hotel } from "../types/models";
import HotelBookingCard from "./HotelBookingCard";

type Props = {
  hotels: Hotel[];
};

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export function HotelGalleryTabs({ hotels }: Props) {
  const cities = useMemo(() => Array.from(new Set(hotels.map((h) => h.city))), [hotels]);

  const tabs = useMemo(
    () => [
      { label: "For you", value: "all", list: hotels },
      ...cities.map((city) => ({
        label: city,
        value: slug(city),
        list: hotels.filter((h) => h.city === city),
      })),
    ],
    [hotels, cities]
  );

  const [active, setActive] = useState(tabs[0]?.value ?? "all");
  const activeTab = tabs.find((t) => t.value === active) ?? tabs[0];

  return (
    <div className="mt-6">
      {/* ===== Pills bar ===== */}
      <div className="mb-3 flex justify-center">
        <div className="max-w-[900px] w-full overflow-x-auto">
          <div className="mx-auto flex w-max gap-2 px-1 py-1">
            {tabs.map((t) => {
              const isActive = t.value === active;
              return (
                <button
                  key={t.value}
                  onClick={() => setActive(t.value)}
                  className={[
                    "shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium",
                    "border transition shadow-sm",
                    isActive
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
                  ].join(" ")}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== Cards row ===== */}
      <div className="flex justify-center">
        <div className="max-w-[1100px] w-full">
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 px-1">
            {activeTab?.list?.length ? (
              activeTab.list.map((hotel) => (
                <HotelBookingCard key={hotel.id} hotel={hotel} />
              ))
            ) : (
              <p className="text-gray-500">No hotels</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default HotelGalleryTabs;