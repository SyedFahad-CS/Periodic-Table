'use client';

import { useState } from 'react';
import { PeriodicTable } from '@/components/periodic-table';
import { elements } from '@/lib/periodic-table-data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="min-h-screen p-2 sm:p-4 md:p-8 bg-background text-foreground">
      <ThemeToggle />
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Interactive Periodic Table</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Click on any element to view detailed information. Use the search bar to find specific elements.
          </p>
        </div>
        
        {/* Search bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by element name, symbol, or atomic number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>

        <PeriodicTable elements={elements} searchQuery={searchQuery} />
      </div>
    </main>
  );
}
