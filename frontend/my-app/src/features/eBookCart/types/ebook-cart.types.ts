export type EBookFormat = "PDF" | "EPUB" | "MOBI";

export type EBookCartItem = {
  id: string;
  title: string;
  author: string;
  category: string;
  format: EBookFormat;
  license: string;
  price: number;
  quantity: number;
  coverImage: string;
  fileSize: string;
  delivery: string;
};

export type CartTotals = {
  subtotal: number;
  shipping: number;
  tax: number;
  grandTotal: number;
  totalItems: number;
};