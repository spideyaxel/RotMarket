import React from 'react';
import { Item } from '../types';
import { X, ShieldCheck, Heart, Share2, AlertTriangle, MessageCircle } from 'lucide-react';

interface ProductModalProps {
  item: Item | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  // Handle outside click to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBuy = () => {
    // Open Vinted link in new tab
    window.open(item.vintedUrl, '_blank');
  };

  return (
    <div 
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
        onClick={handleBackdropClick}
    >
      <div className="bg-white w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[90vh] rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button Mobile */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full md:hidden"
        >
            <X size={24} />
        </button>

        {/* Left: Image (Scrollable on mobile) */}
        <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center overflow-hidden relative">
            <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover md:object-contain bg-neutral-200"
            />
        </div>

        {/* Right: Details (Scrollable) */}
        <div className="w-full md:w-1/2 flex flex-col h-full bg-white">
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
                
                {/* Header Info */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 leading-tight">{item.title}</h1>
                        <p className="text-sm text-gray-500 mt-1">{item.size} • {item.brand}</p>
                    </div>
                    <div className="hidden md:block cursor-pointer hover:bg-gray-100 p-2 rounded-full transition" onClick={onClose}>
                        <X size={24} className="text-gray-400" />
                    </div>
                </div>

                <div className="h-px bg-gray-100 my-4"></div>

                {/* Price & Protection */}
                <div className="mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{item.price.toFixed(2)} {item.currency}</div>
                    <div className="flex items-center gap-2 text-vinted-teal text-xs font-medium bg-teal-50 w-fit px-2 py-1 rounded">
                        <ShieldCheck size={14} />
                        Protection acheteurs incluse
                    </div>
                </div>

                {/* Main CTA */}
                <div className="space-y-3 mb-6">
                    <button 
                        onClick={handleBuy}
                        className="w-full bg-vinted-teal hover:bg-[#00636d] text-white text-lg font-medium py-3 rounded-md shadow-sm transition-all transform hover:scale-[1.01] active:scale-[0.99]"
                    >
                        Acheter maintenant
                    </button>
                    <div className="flex gap-3">
                         <button className="flex-1 flex items-center justify-center gap-2 border border-vinted-teal text-vinted-teal py-2 rounded-md font-medium hover:bg-teal-50 transition">
                            <MessageCircle className="w-4 h-4" />
                            Message
                         </button>
                         <button className="w-12 flex items-center justify-center border border-gray-300 rounded-md hover:border-gray-400 text-gray-500 transition">
                            <Heart className="w-5 h-5" />
                         </button>
                    </div>
                </div>

                {/* Item Details Table (SIMPLIFIED) */}
                <div className="space-y-3 text-sm text-gray-700 mb-6">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-500">Jeu</span>
                        <span className="font-medium text-vinted-teal">Steal a Brainrots</span>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap font-light">
                        {item.description}
                    </p>
                    {item.isBrainrot && (
                        <div className="mt-4 bg-gradient-to-r from-brainrot-pink/10 to-brainrot-purple/10 p-3 rounded-lg border border-brainrot-pink/20">
                            <p className="text-xs text-brainrot-purple font-bold flex items-center gap-2">
                                <AlertTriangle size={12} /> Note du vendeur : Article certifié 100% Brainrot
                            </p>
                        </div>
                    )}
                </div>

                {/* Seller Profile - Simplified */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xl font-bold text-gray-500 shadow-inner">
                        {item.sellerName[0].toUpperCase()}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{item.sellerName}</div>
                        <div className="text-xs text-gray-400">Membre actif</div>
                    </div>
                    <div className="ml-auto">
                        <button className="text-vinted-teal border border-vinted-teal px-3 py-1 rounded text-sm hover:bg-teal-50">
                            S'abonner
                        </button>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};