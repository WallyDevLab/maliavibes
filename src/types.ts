export interface Song {
  id: string;
  title: string;
  duration: string;
  previewUrl: string; // URL for audio player
  lyrics?: string;
}

export interface Album {
  id: string;
  title: string;
  type: 'album' | 'ep' | 'single';
  releaseDate: string;
  coverUrl: string;
  description: string;
  tracks: Song[];
  spotifyUrl: string;
  appleMusicUrl: string;
  purchaseUrl?: string;
  isLatest?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'merch' | 'vinyl' | 'cd' | 'digital' | 'collectible' | 'ticket';
  price: number;
  description: string;
  imageUrl: string;
  stock: number;
  sizes?: string[]; // For apparel like hoodies, t-shirts
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface TourDate {
  id: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  ticketStatus: 'available' | 'low-stock' | 'sold-out';
  ticketUrl: string;
  isPast?: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: 'booking' | 'press' | 'management' | 'general';
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied';
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  country: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
}

export interface NewsPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  imageUrl: string;
  category: 'announcement' | 'release' | 'behind-the-scenes' | 'press';
}

export interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  category: 'live' | 'studio' | 'tour' | 'portrait';
  mediaUrl: string; // Image or YouTube embed ID
  thumbnailUrl: string;
}

export interface BioMilestone {
  year: string;
  title: string;
  description: string;
}

export interface BioData {
  story: string;
  influences: string[];
  achievements: string[];
  milestones: BioMilestone[];
  portraitUrl: string;
}
