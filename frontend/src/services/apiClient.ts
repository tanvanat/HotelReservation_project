import { EventPayload, Hotel, VariantMetrics } from "../types/models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchHotels(): Promise<Hotel[]> {
  const res = await fetch(`${API_BASE_URL}/api/hotels`);
  return handleResponse<Hotel[]>(res);
}

export async function fetchHotelById(id: number): Promise<Hotel> {
  const res = await fetch(`${API_BASE_URL}/api/hotels/${id}`);
  return handleResponse<Hotel>(res);
}

export async function postEvent(payload: EventPayload): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to post event:", text);
  }
}

export async function fetchMetrics(): Promise<VariantMetrics[]> {
  const res = await fetch(`${API_BASE_URL}/api/metrics`);
  return handleResponse<VariantMetrics[]>(res);
}

/* =========================================================
   ✅ Aliases (กัน error: no exported member 'trackClick/createBooking')
   ========================================================= */

export async function trackClick(payload: Omit<EventPayload, "eventType">) {
  return postEvent({ ...payload, eventType: "click_book" });
}

export async function trackView(payload: Omit<EventPayload, "eventType">) {
  return postEvent({ ...payload, eventType: "view_hotel" });
}

// ในโปรเจกต์นี้ยังไม่มี /api/bookings → ให้ createBooking = click_book
export async function createBooking(payload: Omit<EventPayload, "eventType">) {
  return postEvent({ ...payload, eventType: "click_book" });
}
