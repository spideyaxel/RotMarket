import React, { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { generateBrainrotDescription } from '../services/geminiService';

interface SellModalProps {
  onClose: () => void;
}

export const SellModal: React.FC<SellModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('Très bon état');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDescription = async () => {
    if (!title) return;
    setIsGenerating(true);
    const generated = await generateBrainrotDescription(title, condition);
    setDescription(generated);
    setIsGenerating(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 relative">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
            <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Vends ton Brainrot 🚽</h2>

        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre de l'article</label>
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Peluche Skibidi..."
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-vinted-teal focus:border-vinted-teal"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">État</label>
                <select 
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                >
                    <option>Neuf avec étiquette</option>
                    <option>Très bon état</option>
                    <option>Bon état</option>
                    <option>Satisfaisant</option>
                </select>
            </div>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <button 
                        onClick={handleGenerateDescription}
                        disabled={!title || isGenerating}
                        className="text-xs flex items-center gap-1 text-brainrot-purple font-bold hover:underline disabled:opacity-50"
                    >
                        {isGenerating ? <Loader2 className="animate-spin h-3 w-3" /> : <Sparkles size={12} />}
                        Générer avec IA (Rizz Mode)
                    </button>
                </div>
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-vinted-teal focus:border-vinted-teal text-sm"
                    placeholder="Décris ton objet..."
                />
            </div>

             <div className="pt-4 border-t border-gray-100">
                <button 
                    onClick={onClose}
                    className="w-full bg-vinted-teal text-white py-3 rounded-md font-bold hover:bg-[#00636d] transition"
                >
                    Mettre en ligne (Fake)
                </button>
             </div>
        </div>
      </div>
    </div>
  );
};
