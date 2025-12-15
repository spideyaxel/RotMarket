import React from 'react';
import { Item } from '../types';
import { Heart, Info } from 'lucide-react';

interface ItemCardProps {
  item: Item;
  onClick: (item: Item) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  return (
    <div 
        className="group bg-white rounded-none cursor-pointer flex flex-col relative"
        onClick={() => onClick(item)}
    >
      {/* User Header (Vinted style often shows user first on feed, but here we do layout mix) */}
      <div className="flex items-center gap-2 p-2">
         <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brainrot-pink to-brainrot-purple flex items-center justify-center text-[10px] text-white font-bold">
            {item.sellerName[0].toUpperCase()}
         </div>
         <span className="text-xs text-gray-500 font-medium">{item.sellerName}</span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 mb-2">
        <img 
            src={item.imageUrl} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
        />
        {item.isBrainrot && (
            <span className="absolute top-2 left-2 bg-brainrot-lime text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-sm border border-black/10">
                VENDEUR CERTIFIÉ
            </span>
        )}
        <div className="absolute bottom-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
             <Heart size={16} className="text-gray-600 hover:text-red-500 hover:fill-red-500 transition-colors" />
        </div>
      </div>

      {/* Info */}
      <div className="px-1">
        <div className="flex items-start justify-between">
            <h3 className="text-lg font-bold text-gray-900">{item.price.toFixed(2)} {item.currency}</h3>
            <div className="text-gray-400">
                <Info size={14} />
            </div>
        </div>
        <div className="text-xs text-gray-500 mt-0.5">{item.size} • {item.brand}</div>
        <div className="text-xs text-gray-400 mt-0.5 truncate border-t border-gray-100 pt-1 mt-1">
             {item.condition}
        </div>
      </div>
    </div>
  );
};