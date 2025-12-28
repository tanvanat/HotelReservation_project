import { useMemo } from "react";
import type { Variant } from "../types/models";

export const GLOBAL_VARIANT_KEY = "triptweak_exp_global_variant";

export function getOrAssignGlobalVariant(): Variant {
  const existing = localStorage.getItem(GLOBAL_VARIANT_KEY);
  if (existing === "A" || existing === "B") return existing;

  const v: Variant = Math.random() < 0.5 ? "A" : "B";
  localStorage.setItem(GLOBAL_VARIANT_KEY, v);
  return v;
}

export function setGlobalVariant(v: Variant) {
  localStorage.setItem(GLOBAL_VARIANT_KEY, v);
}

export function clearGlobalVariant() {
  localStorage.removeItem(GLOBAL_VARIANT_KEY);
}

export function useGlobalVariant(): Variant {
  // ✅ สำคัญ: memoize ตอน mount พอ เพราะเราจะ reload หน้าเมื่อเปลี่ยน
  return useMemo(() => getOrAssignGlobalVariant(), []);
}
