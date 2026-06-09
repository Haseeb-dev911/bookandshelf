import React from "react";
import type { Category } from "../types";
import animeImg from "../../../assets/cat-anime.jpg";
import businessImg from "../../../assets/cat-business.jpg";
import comedyImg from "../../../assets/cat-comedy.jpg";
import romanceImg from "../../../assets/cat romance.jpg";
import biographyImg from "../../../assets/cat-biography.png";
import historyImg from "../../../assets/cat-history.jpg";

const categories: Category[] = [
  {
    id: "1",
    name: "Anime",
    countText: "1500+ Manga",
    image: animeImg,
  },
  {
    id: "2",
    name: "Business",
    countText: "600+ Books",
    image: businessImg,
  },
  {
    id: "3",
    name: "Comedy",
    countText: "410+ Humor",
    image: comedyImg,
  },
  {
    id: "4",
    name: "Romance",
    countText: "800+ Novels",
    image: romanceImg,
  },
  {
    id: "5",
    name: "Biography",
    countText: "700+ Stories",
    image: biographyImg,
  },
  {
    id: "6",
    name: "History",
    countText: "500+ Titles",
    image: historyImg,
  },
];

const ShopByCategory: React.FC = () => {
  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-bold">Shop by Category</h2>
          <a
            className="text-sm font-bold flex items-center gap-1 group"
            href="#"
          >
            View all categories
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card bg-surface-container-low p-6 text-center rounded-custom cursor-pointer"
            >
              <div className="h-32 mb-4 flex items-center justify-center">
                <img
                  alt={`${category.name} Category`}
                  className="max-h-full"
                  src={category.image}
                />
              </div>
              <h4 className="font-bold mb-1">{category.name}</h4>
              <p className="text-xs text-gray-500 uppercase tracking-tighter">
                {category.countText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
