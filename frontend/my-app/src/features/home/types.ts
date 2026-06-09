export interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
  reviewsCount: number;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  badge: {
    text: string;
    type: 'used' | 'digital' | 'first-edition';
  };
}

export interface Category {
  id: string;
  name: string;
  countText: string;
  image: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}
