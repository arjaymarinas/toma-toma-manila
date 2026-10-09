export interface MenuItem {
  id: string;
  name: string;
  filipinoName?: string;
  category: 'skewers' | 'small-plates' | 'feasts' | 'cocktails' | 'desserts';
  price: number;
  description: string;
  ingredients: string[];
  dietary?: ('gluten-free' | 'chef-choice' | 'spicy' | 'contains-nuts' | 'pescatarian')[];
  image: string;
  pairingNote?: string;
}

export interface GoogleReview {
  id: string;
  authorName: string;
  authorPhoto?: string;
  rating: number;
  relativeTime: string;
  text: string;
  categoryTag: 'all' | 'cocktails' | 'skewers' | 'ambiance';
  verifiedVisit: boolean;
  likes: number;
  highlightDish?: string;
}

export type SeatingAreaType = 'bar' | 'dining-area';

export interface ReservationData {
  guests: number;
  date: string;
  timeSlot: string;
  seatingArea: SeatingAreaType;
  fullName: string;
  phone: string;
  email: string;
  dietaryRequirements: string[];
  customDietaryNote: string;
  specialOccasion?: string;
  sendMethod: 'both' | 'sms' | 'email';
}

export interface BookingConfirmation extends ReservationData {
  bookingId: string;
  createdAt: string;
  status: 'confirmed' | 'pending';
}

export interface SocialLink {
  platform: 'instagram' | 'facebook' | 'tiktok' | 'google-maps';
  name: string;
  handle: string;
  url: string;
  description: string;
  followers?: string;
}

export interface SocialPost {
  id: string;
  platform: 'instagram' | 'tiktok';
  image: string;
  caption: string;
  likes: string;
  url: string;
  tag: string;
}

