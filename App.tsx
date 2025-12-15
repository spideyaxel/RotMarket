import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { ItemCard } from './components/ItemCard';
import { ProductModal } from './components/ProductModal';
import { MOCK_ITEMS } from './constants';
import { Item } from './types';
import { Lock, Crown, Zap, X } from 'lucide-react';

type FilterType = 'ALL' | 'GOD' | 'SECRET' | '1M' | '10M' | '100M';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Filter items
  const filteredItems = useMemo(() => {
    let items = MOCK_ITEMS;

    // Search filter
    if (searchTerm) {
      items = items.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category/Aura filters
    switch (activeFilter) {
      case 'GOD':
        return items.filter(item => item.rarity === 'god');
      case 'SECRET':
        return items.filter(item => item.rarity === 'secret');
      case '1M':
        return items.filter(item => item.aura >= 1_000_000);
      case '10M':
        return items.filter(item => item.aura >= 10_000_000);
      case '100M':
        return items.filter(item => item.aura >= 100_000_000);
      default:
        return items;
    }
  }, [searchTerm, activeFilter]);

  const toggleFilter = (filter: FilterType) => {
    if (activeFilter === filter) {
      setActiveFilter('ALL');
    } else {
      setActiveFilter(filter);
    }
  };

  const scrollToGrid = () => {
    const element = document.getElementById('items-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar 
        onSearch={setSearchTerm} 
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-brainrot-purple via-brainrot-pink to-brainrot-lime h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg tracking-tight">
                Achète ton <br/>
                <span className="text-brainrot-lime">BRAINROT</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium max-w-xl drop-shadow-md mb-8">
                La première marketplace certifiée 100% Rizz. <br/>
                Des pépites sélectionnées avec amour.
            </p>
            <button 
                onClick={scrollToGrid}
                className="bg-white text-brainrot-purple px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-100 transition shadow-xl transform hover:-translate-y-1"
            >
                Explorer les pépites
            </button>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-brainrot-lime rounded-full blur-3xl opacity-50 mix-blend-overlay"></div>
        <div className="absolute top-10 right-1/4 w-32 h-32 bg-brainrot-pink rounded-full blur-2xl opacity-60 mix-blend-overlay"></div>
      </div>

      {/* Filters Bar (Functional) */}
      <div className="border-b border-gray-200 bg-white sticky top-[65px] z-40 shadow-sm overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-4 text-sm text-gray-600 whitespace-nowrap items-center">
            {activeFilter !== 'ALL' && (
                <button 
                    onClick={() => setActiveFilter('ALL')}
                    className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-full font-medium transition"
                >
                    <X size={14} /> Reset
                </button>
            )}

            <button 
                onClick={() => toggleFilter('GOD')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-bold transition shadow-sm border ${
                    activeFilter === 'GOD' 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-orange-600 ring-2 ring-orange-300' 
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:brightness-110 border-orange-400'
                }`}
            >
                <Crown size={14} fill="currentColor" />
                Brainrot God
            </button>
            
            <button 
                onClick={() => toggleFilter('SECRET')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-bold transition shadow-sm border ${
                    activeFilter === 'SECRET'
                    ? 'bg-black text-white border-black ring-2 ring-gray-400'
                    : 'bg-black text-white hover:bg-gray-800 border-gray-800'
                }`}
            >
                Secret
            </button>
            
            <button 
                onClick={() => toggleFilter('1M')}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-full transition font-medium ${
                    activeFilter === '1M'
                    ? 'bg-brainrot-purple text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
            >
                <Zap size={14} className={activeFilter === '1M' ? 'text-white' : 'text-brainrot-purple'} />
                + 1 Million
            </button>
            
            <button 
                onClick={() => toggleFilter('10M')}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-full transition font-medium ${
                    activeFilter === '10M'
                    ? 'bg-brainrot-pink text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
            >
                <Zap size={14} className={activeFilter === '10M' ? 'text-white' : 'text-brainrot-pink'} />
                + 10 Millions
            </button>
            
            <button 
                onClick={() => toggleFilter('100M')}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-full font-bold transition border ${
                    activeFilter === '100M'
                    ? 'bg-brainrot-lime text-black border-black ring-2 ring-lime-400'
                    : 'bg-brainrot-lime/20 hover:bg-brainrot-lime/40 text-gray-900 border-brainrot-lime'
                }`}
            >
                <Zap size={14} className="text-green-600 fill-green-600" />
                + 100 Millions
            </button>
        </div>
      </div>

      {/* Grid Content */}
      <main className="max-w-7xl mx-auto px-4 py-8" id="items-grid">
        <div className="flex justify-between items-end mb-6">
             <h2 className="text-xl font-bold text-gray-800">
                {activeFilter === 'ALL' ? "Fil d'actu populaire" : `Résultats : ${filteredItems.length} pépites`}
             </h2>
             {activeFilter === 'ALL' && <a href="#" className="text-vinted-teal text-sm hover:underline">Voir tout</a>}
        </div>
        
        {filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 animate-in fade-in duration-500">
            {filteredItems.map(item => (
                <ItemCard 
                    key={item.id} 
                    item={item} 
                    onClick={setSelectedItem} 
                />
            ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg mb-2">Aucun objet n'a autant de millions... 😢</p>
                <p className="text-sm text-gray-400">Essaie un filtre moins puissant.</p>
                <button 
                    onClick={() => setActiveFilter('ALL')}
                    className="mt-4 text-vinted-teal font-medium hover:underline"
                >
                    Tout voir
                </button>
            </div>
        )}

        {/* SEO / Trust Footer Block */}
        <div className="mt-20 border-t border-gray-200 pt-10 grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
                <h3 className="font-bold text-gray-800 mb-2">Sécurité garantie</h3>
                <p className="text-sm text-gray-500">Nous ne gardons pas ton argent. Les transactions se font via la plateforme sécurisée de Vinted. Zéro arnaque.</p>
            </div>
            <div>
                <h3 className="font-bold text-gray-800 mb-2">Service Client Skibidi</h3>
                <p className="text-sm text-gray-500">Une équipe dédiée disponible pour répondre à tes questions bizarres 24/7.</p>
            </div>
            <div>
                <h3 className="font-bold text-gray-800 mb-2">Communauté Rizz</h3>
                <p className="text-sm text-gray-500">Rejoins des millions de vendeurs qui ont compris comment faire de l'argent avec des objets random.</p>
            </div>
        </div>
      </main>

      {/* Modals */}
      <ProductModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
}

export default App;