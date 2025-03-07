'use client';

import { ElementCardProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

type CategoryType = 
  | "alkali metal"
  | "alkaline earth metal"
  | "transition metal"
  | "post-transition metal"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble gas"
  | "lanthanoid"
  | "actinoid";

const categoryColors: Record<CategoryType, string> = {
  "alkali metal": "bg-red-900/90 text-red-100",
  "alkaline earth metal": "bg-orange-900/90 text-orange-100",
  "transition metal": "bg-amber-900/90 text-amber-100",
  "post-transition metal": "bg-emerald-900/90 text-emerald-100",
  metalloid: "bg-teal-900/90 text-teal-100",
  nonmetal: "bg-sky-900/90 text-sky-100",
  halogen: "bg-indigo-900/90 text-indigo-100",
  "noble gas": "bg-violet-900/90 text-violet-100",
  lanthanoid: "bg-fuchsia-900/90 text-fuchsia-100",
  actinoid: "bg-rose-900/90 text-rose-100",
};

export function ElementCard({ element, isSelected, onClick, onHoverSelect }: ElementCardProps & {
  onHoverSelect?: (elementNumber: number | null) => void;
}) {
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (onHoverSelect) {
      hoverTimeoutRef.current = setTimeout(() => {
        onHoverSelect(element.number);
      }, 1000); // 1 second delay
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      if (onHoverSelect) {
        onHoverSelect(null);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "aspect-[4/5] p-2 rounded-lg transition-all duration-200 text-left",
        "hover:shadow-lg hover:scale-120 active:scale-100 select-none",
        "flex flex-col w-full",
        categoryColors[element.category.toLowerCase() as CategoryType],
        isSelected && "ring-2 ring-primary ring-offset-2 dark:ring-offset-background"
      )}
      style={{
        gridColumn: element.group + 1,
        gridRow: element.period,
      }}
    >
      <div className="text-xs opacity-80 mb-2">{element.number}</div>
      <div className="text-lg font-bold mb-1">{element.symbol}</div>
      <div className="text-[0.55rem] font-medium truncate opacity-90 mb-0.5">{element.name}</div>
      <div className="text-[0.6rem] opacity-80">
        {element.atomicMass.toFixed(2)}
      </div>
    </button>
  );
} 