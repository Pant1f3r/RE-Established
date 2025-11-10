import React, { useState } from 'react';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';

interface GlobalSearchInputProps {
  onSearch: (query: string) => void;
}

export const GlobalSearchInput: React.FC<GlobalSearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 pl-10 pr-3 text-gray-200 ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6"
        placeholder="Global Intel Search (e.g., 'Cyberdyne Systems', 'Project Chimera')"
      />
    </form>
  );
};
