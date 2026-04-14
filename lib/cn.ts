import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * `cn` — the canonical className helper used across every component.
 *
 * Why both clsx *and* twMerge?
 *   - `clsx` handles conditional class strings ergonomically:
 *       cn("base", isActive && "bg-rausch", { "opacity-50": isDisabled })
 *   - `tailwind-merge` resolves conflicts when the consumer passes an
 *     override via `className` prop, so `cn("px-4", "px-6")` correctly
 *     resolves to `"px-6"` instead of emitting both.
 *
 * Every component that accepts `className` should run its internal
 * classes through this helper so external overrides are predictable.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
