import React from 'react';
import { Link } from 'react-router-dom';
import { LibraryItem } from '../hooks/useLibrary';

export const LibraryCard: React.FC<{ item: LibraryItem }> = ({ item }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100 group">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                {item.coverImage ? (
                    <img 
                        src={item.coverImage} 
                        alt={item.title} 
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                        <span className="text-sm font-medium">No Cover</span>
                    </div>
                )}
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link 
                        to={`/library/read/${item.ebookId}`}
                        className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 font-semibold py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                        Read Now
                    </Link>
                </div>
            </div>
            
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mb-1" title={item.title}>
                    {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{item.author}</p>
                <div className="mt-auto pt-4 border-t border-gray-50">
                    <p className="text-xs text-gray-400">
                        Purchased on {new Date(item.purchaseDate).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};
