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
      
      {/* Table container */}
      <div className="w-full overflow-x-auto pb-8">
        <div className="min-w-[1000px] w-full max-w-[1600px] mx-auto space-y-2">
          {/* Main periodic table */}
          <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-1.5 mb-4">
            {filteredElements.map((element) => {
              if (element.category === "lanthanoid" && element.number !== 57) return null;
              if (element.category === "actinoid" && element.number !== 89) return null;
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
            <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-1.5 ml-[8.33%] mb-2">
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
            <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-1.5 ml-[8.33%]">
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