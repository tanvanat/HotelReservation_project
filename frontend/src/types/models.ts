export interface Hotel {
  id: number;
  name: string;
  city: string;
  pricePerNight: number;
  rating: number;
  imageUrl: string;
}

export type Variant = "A" | "B";

export interface EventPayload {
  sessionId: string;
  hotelId: number;
  variant: Variant;
  eventType: "view_hotel" | "click_book";
}

export interface VariantMetrics {
  variant: Variant;
  views: number;
  clicks: number;
  conversionRate: number;
}

export interface TrackEventPayload {
  sessionId: string;
  variant: Variant;
  eventName: "SEARCH_TYPED" | "SEARCH_SUBMITTED" | "FIRST_HOTEL_CLICK";
  keyword?: string;
  source?: "enter" | "button";
  keywordLength?: number;
  hotelId?: number;
  msToFirstClick?: number;
}
