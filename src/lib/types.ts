export interface Element {
  number: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: string;
  block: string;
  group: number;
  period: number;
  electronConfiguration: string;
  electronegativity?: number;
  density?: number;
  meltingPoint?: number;
  boilingPoint?: number;
  discoveredBy?: string;
  yearDiscovered?: number;
  description: string;
}

export interface ElementCardProps {
  element: Element;
  isSelected: boolean;
  onClick: () => void;
}

export interface ElementDetailsProps {
  element: Element;
  onClose: () => void;
}

export type CategoryColors = Record<Element['category'], string>;

export interface ElementPosition {
  group: number;
  period: number;
} 