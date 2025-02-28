'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Element } from "@/lib/types";

interface ElementDetailsProps {
  element: Element;
  onClose: () => void;
}

export function ElementDetails({ element, onClose }: ElementDetailsProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-baseline gap-3">
            <span>{element.name}</span>
            <span className="text-lg text-muted-foreground">{element.symbol}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div>
                <span className="font-medium text-muted-foreground">Atomic Number:</span>{" "}
                <span>{element.number}</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Atomic Mass:</span>{" "}
                <span>{element.atomicMass.toFixed(4)}</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Category:</span>{" "}
                <span className="capitalize">{element.category}</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Block:</span>{" "}
                <span className="uppercase">{element.block}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-muted-foreground">Period:</span>{" "}
                <span>{element.period}</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Group:</span>{" "}
                <span>{element.group}</span>
              </div>
              {element.electronegativity && (
                <div>
                  <span className="font-medium text-muted-foreground">
                    Electronegativity:
                  </span>{" "}
                  <span>{element.electronegativity}</span>
                </div>
              )}
              {element.density && (
                <div>
                  <span className="font-medium text-muted-foreground">
                    Density (g/cm³):
                  </span>{" "}
                  <span>{element.density}</span>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <span className="font-medium text-muted-foreground">
                Electron Configuration:
              </span>{" "}
              <span>{element.electronConfiguration}</span>
            </div>
            {element.meltingPoint && (
              <div>
                <span className="font-medium text-muted-foreground">
                  Melting Point (K):
                </span>{" "}
                <span>{element.meltingPoint}</span>
              </div>
            )}
            {element.boilingPoint && (
              <div>
                <span className="font-medium text-muted-foreground">
                  Boiling Point (K):
                </span>{" "}
                <span>{element.boilingPoint}</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="font-medium text-muted-foreground">Description:</div>
            <p className="text-sm leading-relaxed">{element.description}</p>
          </div>
          {element.discoveredBy && (
            <div>
              <span className="font-medium text-muted-foreground">
                Discovered by:
              </span>{" "}
              <span>
                {element.discoveredBy}
                {element.yearDiscovered && ` (${element.yearDiscovered})`}
              </span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 