export interface Item {
  id: string;
  title: string;
  price: number;
  currency: string;
  brand: string;
  size: string;
  condition: 'Neuf avec étiquette' | 'Très bon état' | 'Bon état' | 'Satisfaisant';
  imageUrl: string;
  vintedUrl: string; // The link to the real Vinted item
  sellerName: string;
  sellerRating: number;
  sellerReviewCount: number;
  description: string;
  likes: number;
  isBrainrot: boolean; // Just a flag for styling
  aura: number; // New metric for filtering
  rarity: 'common' | 'god' | 'secret'; // New metric for filtering
}

export interface FilterState {
  search: string;
  minPrice: number;
  maxPrice: number;
}
