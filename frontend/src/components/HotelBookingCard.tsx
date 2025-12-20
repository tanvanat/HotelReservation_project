import React from "react";
import { useNavigate } from "react-router-dom";
import type { Hotel } from "../types/models";
import { postEvent } from "../services/apiClient";
import { useSessionId } from "../hooks/useSessionId";


import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

/* ===== TS-safe wrappers (กัน typings เพี้ยน) ===== */
const SafeCard = Card as unknown as React.ComponentType<
  React.PropsWithChildren<{ className?: string }>
>;
const SafeCardHeader = CardHeader as unknown as React.ComponentType<
  React.PropsWithChildren<{ className?: string; floated?: boolean; color?: any }>
>;
const SafeCardBody = CardBody as unknown as React.ComponentType<
  React.PropsWithChildren<{ className?: string }>
>;
const SafeCardFooter = CardFooter as unknown as React.ComponentType<
  React.PropsWithChildren<{ className?: string }>
>;
const SafeTypography = Typography as unknown as React.ComponentType<
  React.PropsWithChildren<{ className?: string; color?: any; variant?: any }>
>;
const SafeButton = Button as unknown as React.ComponentType<
  React.PropsWithChildren<{
    className?: string;
    size?: any;
    fullWidth?: boolean;
    onClick?: () => void;
  }>
>;
const SafeIconButton = IconButton as unknown as React.ComponentType<
  React.PropsWithChildren<{
    className?: string;
    size?: any;
    color?: any;
    variant?: any;
    onClick?: () => void;
  }>
>;

type Props = { hotel: Hotel };

/* ✅ variant assignment (เหมือน HotelDetailPage) */
function getOrAssignVariant(hotelId: number): "A" | "B" {
  const key = `triptweak_variant_hotel_${hotelId}`;
  const existing = localStorage.getItem(key);
  if (existing === "A" || existing === "B") return existing;

  const assigned: "A" | "B" = Math.random() < 0.5 ? "A" : "B";
  localStorage.setItem(key, assigned);
  return assigned;
}

export default function HotelBookingCard({ hotel }: Props) {
  const navigate = useNavigate();
  const sessionId = useSessionId();

  const onReserve = async () => {
    const variant = getOrAssignVariant(hotel.id);

    // ✅ ยิง event ไป backend (ให้หน้า Admin update)
    await postEvent({
      sessionId,
      hotelId: hotel.id,
      variant,
      eventType: "click_book",
    });

    // ✅ อยากพาไปหน้า detail ด้วย (แนะนำ)
    navigate(`/hotels/${hotel.id}`);
  };

  return (
    <SafeCard className="w-[260px] md:w-[280px] lg:w-[300px] shrink-0 snap-start shadow-lg rounded-2xl overflow-hidden">
      <SafeCardHeader floated={false} color="blue-gray" className="relative !m-0 !rounded-none h-[190px] p-0 overflow-hidden">
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/60" />

        <SafeIconButton
          size="sm"
          color="red"
          variant="text"
          className="!absolute right-3 top-3 rounded-full bg-white/10 backdrop-blur hover:bg-white/20"
        >
          ❤
        </SafeIconButton>
      </SafeCardHeader>

      <SafeCardBody className="pb-2">
        <div className="mb-2 flex items-start justify-between gap-2">
          <SafeTypography
            variant="h6"
            color="blue-gray"
            className="text-sm font-semibold leading-snug"
          >
            {hotel.name}
          </SafeTypography>

          <SafeTypography className="flex items-center gap-1 text-sm text-yellow-700 whitespace-nowrap">
            ★ {Number(hotel.rating).toFixed(1)}
          </SafeTypography>
        </div>

        <SafeTypography color="gray" className="text-sm">
          {hotel.city} · ${hotel.pricePerNight}/night
        </SafeTypography>
      </SafeCardBody>

      <SafeCardFooter className="pt-0">
        <SafeButton
          size="sm"
          fullWidth
          onClick={onReserve}
          className="bg-gray-900 hover:bg-gray-800"
        >
          Reserve
        </SafeButton>
      </SafeCardFooter>
    </SafeCard>
  );
}
