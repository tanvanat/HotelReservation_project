import React from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

import type { Hotel } from "../types/models";
import HotelCard from "./HotelCard";

type Props = {
    hotels: Hotel[];
};

// ✅ TS-safe wrappers (แก้แดง TabsHeader/TabsBody แบบชัวร์)
const SafeTabsHeader = TabsHeader as unknown as React.ComponentType<
    React.PropsWithChildren<{ className?: string }>
>;

const SafeTabsBody = TabsBody as unknown as React.ComponentType<
    React.PropsWithChildren<{ className?: string }>
>;
const SafeTab = Tab as unknown as React.ComponentType<
    React.PropsWithChildren<{ value: string; className?: string }>
>;
export function HotelGalleryTabs({ hotels }: Props) {
    // group hotels by city
    const cities = Array.from(new Set(hotels.map((h) => h.city))).sort();

    const tabs = [
        { label: "All", value: "all", list: hotels },
        ...cities.map((city) => ({
            label: city,
            value: city.toLowerCase().replace(/\s+/g, "-"),
            list: hotels.filter((h) => h.city === city),
        })),
    ];

    const defaultValue = tabs[0]?.value ?? "all";

    return (
        <Tabs value={defaultValue}>
            <div className="mb-4">
                <SafeTabsHeader>
                    {tabs.map(({ label, value }) => (
                        <SafeTab key={value} value={value}>
                            {label}
                        </SafeTab>

                    ))}
                </SafeTabsHeader>
            </div>

            <div>
                <SafeTabsBody>
                    {tabs.map(({ value, list }) => (
                        <TabPanel
                            key={value}
                            value={value}
                            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                        >
                            {list.length === 0 ? (
                                <p className="subtitle">No hotels in this tab</p>
                            ) : (
                                list.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
                            )}
                        </TabPanel>
                    ))}
                </SafeTabsBody>
            </div>
        </Tabs>
    );
}
