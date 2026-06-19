import type { ComponentType } from "react";
import {
  Battery,
  Droplets,
  Layers,
  Palette,
  Scan,
  Utensils,
} from "lucide-react";
import type { Industry } from "./industries-data";

export const INDUSTRY_LUCIDE_ICONS: Record<
  Industry["icon"],
  ComponentType<{ className?: string }>
> = {
  layers: Layers,
  droplets: Droplets,
  palette: Palette,
  utensils: Utensils,
  scan: Scan,
  battery: Battery,
};
