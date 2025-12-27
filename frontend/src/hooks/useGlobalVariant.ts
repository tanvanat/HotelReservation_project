import { useMemo } from "react";
import type { Variant } from "../types/models";

const GLOBAL_KEY = "triptweak_global_variant";

export function useGlobalVariant(): Variant {
  return useMemo(() => {
    const existing = localStorage.getItem(GLOBAL_KEY) as Variant | null;
    if (existing === "A" || existing === "B") return existing;

    const v: Variant = Math.random() < 0.5 ? "A" : "B";
    localStorage.setItem(GLOBAL_KEY, v);
    return v;
  }, []);
}
