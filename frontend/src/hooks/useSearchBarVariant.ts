import { useEffect, useState } from "react";
import type { Variant } from "../types/models";

const KEY = "triptweak_variant_searchbar";

export function useSearchBarVariant(): Variant {
  const [variant, setVariant] = useState<Variant>("A");

  useEffect(() => {
    const existing = localStorage.getItem(KEY);
    if (existing === "A" || existing === "B") {
      setVariant(existing);
      return;
    }
    const assigned: Variant = Math.random() < 0.5 ? "A" : "B";
    localStorage.setItem(KEY, assigned);
    setVariant(assigned);
  }, []);

  return variant;
}
