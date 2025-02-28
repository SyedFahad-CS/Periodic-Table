'use client';

import { ElementCardProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

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

  const categoryColors: Record<string, string> = {
    "alkali metal": "bg-red-200 hover:bg-red-300 text-red-950 dark:bg-red-950 dark:hover:bg-red-900 dark:text-red-200",
    "alkaline earth metal": "bg-orange-200 hover:bg-orange-300 text-orange-950 dark:bg-orange-950 dark:hover:bg-orange-900 dark:text-orange-200",
    "transition metal": "bg-amber-200 hover:bg-amber-300 text-amber-950 dark:bg-amber-950 dark:hover:bg-amber-900 dark:text-amber-200",
    "post-transition metal": "bg-emerald-200 hover:bg-emerald-300 text-emerald-950 dark:bg-emerald-950 dark:hover:bg-emerald-900 dark:text-emerald-200",
    metalloid: "bg-teal-200 hover:bg-teal-300 text-teal-950 dark:bg-teal-950 dark:hover:bg-teal-900 dark:text-teal-200",
    nonmetal: "bg-sky-200 hover:bg-sky-300 text-sky-950 dark:bg-sky-950 dark:hover:bg-sky-900 dark:text-sky-200",
    halogen: "bg-indigo-200 hover:bg-indigo-300 text-indigo-950 dark:bg-indigo-950 dark:hover:bg-indigo-900 dark:text-indigo-200",
    "noble gas": "bg-violet-200 hover:bg-violet-300 text-violet-950 dark:bg-violet-950 dark:hover:bg-violet-900 dark:text-violet-200",
    lanthanoid: "bg-fuchsia-200 hover:bg-fuchsia-300 text-fuchsia-950 dark:bg-fuchsia-950 dark:hover:bg-fuchsia-900 dark:text-fuchsia-200",
    actinoid: "bg-rose-200 hover:bg-rose-300 text-rose-950 dark:bg-rose-950 dark:hover:bg-rose-900 dark:text-rose-200",
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "p-2 rounded-lg transition-all duration-200 text-left shadow-sm hover:shadow-md",
        categoryColors[element.category.toLowerCase()],
        isSelected && "ring-2 ring-primary ring-offset-2 dark:ring-offset-background"
      )}
      style={{
        gridColumn: element.group + 1,
        gridRow: element.period,
      }}
    >
      <div className="text-xs opacity-75">{element.number}</div>
      <div className="text-lg font-bold">{element.symbol}</div>
      <div className="text-xs truncate font-medium">{element.name}</div>
      <div className="text-xs opacity-75">
        {element.atomicMass.toFixed(2)}
      </div>
    </button>
  );
} 