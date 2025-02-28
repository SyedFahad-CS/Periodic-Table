"use client";

import { useState, useMemo } from "react";
import { Element } from "@/lib/types";
import { ElementCard } from "./element-card";
import { ElementDetails } from "./element-details";

interface PeriodicTableProps {
  elements: Element[];
  searchQuery: string;
}

export function PeriodicTable({ elements, searchQuery }: PeriodicTableProps) {
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const [hoveredElement, setHoveredElement] = useState<number | null>(null);
  
  // Filter elements based on search query
  const filteredElements = useMemo(() => {
    if (!searchQuery) return elements;
    const query = searchQuery.toLowerCase();
    return elements.filter(
      (element) =>
        element.name.toLowerCase().includes(query) ||
        element.symbol.toLowerCase().includes(query) ||
        element.number.toString().includes(query) ||
        element.category.toLowerCase().includes(query)
    );
  }, [elements, searchQuery]);

  // Filter lanthanides and actinides based on search query
  const filteredLanthanides = useMemo(() => {
    if (!searchQuery) return elements.filter((element) => element.category === "lanthanoid");
    return filteredElements.filter((element) => element.category === "lanthanoid");
  }, [filteredElements, searchQuery]);

  const filteredActinides = useMemo(() => {
    if (!searchQuery) return elements.filter((element) => element.category === "actinoid");
    return filteredElements.filter((element) => element.category === "actinoid");
  }, [filteredElements, searchQuery]);

  // Show special rows only if they have matching elements or no search query
  const showLanthanidesRow = !searchQuery || filteredLanthanides.length > 0;
  const showActinidesRow = !searchQuery || filteredActinides.length > 0;

  // Handle hover selection
  const handleHoverSelect = (elementNumber: number | null) => {
    setHoveredElement(elementNumber);
    // If an element is already selected, don't show hover details
    if (selectedElement === null) {
      setSelectedElement(elementNumber);
    }
  };

  return (
    <div className="relative w-full">
      {/* Mobile scroll indicator */}
      <div className="md:hidden absolute right-4 top-0 text-muted-foreground animate-pulse text-sm">
        ← Scroll →
      </div>
      
      {/* Scrollable container */}
      <div className="w-full overflow-x-auto pb-4 -mx-2 px-2 md:mx-0 md:px-0">
        <div className="min-w-[900px] w-full max-w-[1800px] mx-auto space-y-4">
          {/* Main periodic table */}
          <div className="grid grid-cols-18 gap-0.5 sm:gap-1 scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 origin-top">
            {filteredElements.map((element) => {
              // Skip lanthanides except La
              if (element.category === "lanthanoid" && element.number !== 57) {
                return null;
              }
              // Skip actinides except Ac
              if (element.category === "actinoid" && element.number !== 89) {
                return null;
              }
              return (
                <ElementCard
                  key={element.number}
                  element={element}
                  isSelected={selectedElement === element.number}
                  onClick={() => setSelectedElement(element.number)}
                  onHoverSelect={handleHoverSelect}
                />
              );
            })}
          </div>

          {/* Lanthanides */}
          {showLanthanidesRow && filteredLanthanides.length > 0 && (
            <div className="grid grid-cols-15 gap-0.5 sm:gap-1 ml-[8.33%] scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 origin-top">
              {filteredLanthanides.map((element, index) => (
                <ElementCard
                  key={element.number}
                  element={{ ...element, group: index, period: 8 }}
                  isSelected={selectedElement === element.number}
                  onClick={() => setSelectedElement(element.number)}
                  onHoverSelect={handleHoverSelect}
                />
              ))}
            </div>
          )}

          {/* Actinides */}
          {showActinidesRow && filteredActinides.length > 0 && (
            <div className="grid grid-cols-15 gap-0.5 sm:gap-1 ml-[8.33%] scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 origin-top">
              {filteredActinides.map((element, index) => (
                <ElementCard
                  key={element.number}
                  element={{ ...element, group: index, period: 9 }}
                  isSelected={selectedElement === element.number}
                  onClick={() => setSelectedElement(element.number)}
                  onHoverSelect={handleHoverSelect}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedElement && (
        <ElementDetails
          element={elements.find((e) => e.number === selectedElement)!}
          onClose={() => {
            setSelectedElement(null);
            setHoveredElement(null);
          }}
        />
      )}
    </div>
  );
} 