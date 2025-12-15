import React from 'react';
import { Search } from 'lucide-react';

interface NavbarProps {
  onSearch: (term: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm py-3 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => window.location.hash = ''}>
            <span className="text-2xl font-black text-brainrot-pink tracking-tighter">Rot</span>
            <span className="text-2xl font-black text-vinted-teal tracking-tighter">Market</span>
        </div>

        {/* Search Bar (Hidden on super small screens) */}
        <div className="hidden md:flex flex-1 max-w-2xl relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-vinted-teal focus:ring-1 focus:ring-vinted-teal sm:text-sm transition duration-150 ease-in-out"
            placeholder="Rechercher des articles brainrot..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        {/* Empty div to balance layout if needed, or just removed entirely. 
            Removing content as requested. */}
      </div>
      
      {/* Mobile Search (visible only on mobile) */}
      <div className="mt-3 md:hidden">
         <input
            type="text"
            className="block w-full pl-4 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:border-vinted-teal focus:ring-1 focus:ring-vinted-teal sm:text-sm"
            placeholder="Rechercher..."
            onChange={(e) => onSearch(e.target.value)}
          />
      </div>
    </nav>
  );
};