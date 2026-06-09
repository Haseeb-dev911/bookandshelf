import React from "react";
import type { Book } from "../types";
import gatsbyImg from "../../../assets/new arr 1.png";
import duneImg from "../../../assets/new arr 2.png";
import prideImg from "../../../assets/new arr 3.png";
import orwellImg from "../../../assets/new arr 4.png";

const books: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    rating: 4.5,
    reviewsCount: 1240,
    description:
      "A masterpiece of the Jazz Age, charting the rise and fall of the enigmatic Jay Gatsby...",
    price: 24.0,
    originalPrice: 32.0,
    image: gatsbyImg,
    badge: { text: "Used", type: "used" },
  },
  {
    id: "2",
    title: "Dune",
    author: "Frank Herbert",
    rating: 5.0,
    reviewsCount: 860,
    description:
      "The epic saga of political intrigue and mystical destiny set on the desert planet Arrakis.",
    price: 9.99,
    originalPrice: 16.99,
    image: duneImg,
    badge: { text: "Digital", type: "digital" },
  },
  {
    id: "3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    rating: 4.8,
    reviewsCount: 3980,
    description:
      "A timeless comedy of manners, marriage, and money in 19th-century England.",
    price: 150.0,
    originalPrice: 200.0,
    image: prideImg,
    badge: { text: "First Edition", type: "first-edition" },
  },
  {
    id: "4",
    title: "1984",
    author: "George Orwell",
    rating: 4.7,
    reviewsCount: 2300,
    description:
      "The definitive dystopian novel about totalitarianism and the power of the surveillance state.",
    price: 12.0,
    originalPrice: 16.0,
    image: orwellImg,
    badge: { text: "Used", type: "used" },
  },
];

const getBadgeClasses = (type: string) => {
  switch (type) {
    case "used":
      return "bg-mahogany/10 text-mahogany";
    case "digital":
      return "bg-red-100 text-red-800";
    case "first-edition":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const NewArrivals: React.FC = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-mahogany text-center sm:text-left">
            New Arrivals
          </h2>
          <button className="border border-mahogany text-mahogany px-6 py-2 rounded-full font-bold text-xs hover:bg-mahogany hover:text-white transition-colors">
            View All Curations
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="product-card p-3 flex flex-col group h-full"
            >
              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-md bg-surface-dim">
                <img
                  alt={book.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  src={book.image}
                />
                <span
                  className={`absolute top-3 left-3 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest ${getBadgeClasses(book.badge.type)}`}
                >
                  {book.badge.text}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-[10px] text-gray-600 mb-2">
                  by {book.author}
                </p>
                <div className="flex items-center gap-1 mb-3 text-accent-gold text-[10px]">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(book.rating) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-500 ml-1">
                    {book.rating.toFixed(1)} •{" "}
                    {book.reviewsCount.toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 line-clamp-2 leading-tight">
                  {book.description}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-surface-dim pt-3">
                <div>
                  <span className="text-lg font-bold text-mahogany">
                    ${book.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-gray-400 line-through ml-2">
                    ${book.originalPrice.toFixed(2)}
                  </span>
                </div>
                <button className="bg-mahogany text-white px-4 py-1.5 rounded-custom text-[11px] font-bold hover:bg-mahogany-dark transition-colors">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
