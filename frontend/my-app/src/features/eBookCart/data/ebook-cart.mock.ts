import libraryImg from "@/assets/images/library.png";
import type { EBookCartItem } from "../types/ebook-cart.types";

export const initialEBookCartItems: EBookCartItem[] = [
  {
    id: "ebook-001",
    title: "Modern Web Development Handbook",
    author: "Sarah Mitchell",
    category: "Programming",
    format: "PDF",
    license: "Personal Use",
    price: 24.99,
    quantity: 1,
    coverImage: libraryImg,
    fileSize: "18 MB",
    delivery: "Instant digital download",
  },
  {
    id: "ebook-002",
    title: "Clean Code for React Developers",
    author: "Daniel Reed",
    category: "Software Engineering",
    format: "EPUB",
    license: "Personal Use",
    price: 19.99,
    quantity: 1,
    coverImage: libraryImg,
    fileSize: "12 MB",
    delivery: "Instant digital download",
  },
];