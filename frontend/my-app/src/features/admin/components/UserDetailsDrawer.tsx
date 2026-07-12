import React from "react";
import { UserDetails } from "../services/admin.users.service";

interface UserDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserDetails | null;
    isLoading: boolean;
}

export const UserDetailsDrawer: React.FC<UserDetailsDrawerProps> = ({ isOpen, onClose, user, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-60 transition-opacity p-4 sm:p-6">
            <div className="w-full max-w-5xl bg-white h-full max-h-[90vh] shadow-2xl p-6 sm:p-8 rounded-2xl overflow-y-auto transform transition-transform">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : user ? (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 text-2xl font-bold uppercase">
                                    {user.name.charAt(0)}
                                </div>
                            )}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                                <p className="text-gray-500">{user.email}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {user.role}
                                    </span>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : user.status === 'restricted' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Account Information</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Joined</span>
                                    <span className="font-medium text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Email Verified</span>
                                    <span className="font-medium text-gray-900">{user.isEmailVerified ? "Yes" : "No"}</span>
                                </div>
                                {user.bio && (
                                    <div className="pt-2">
                                        <span className="text-gray-600 block mb-1">Bio</span>
                                        <p className="text-gray-900 text-sm bg-white p-2 border rounded">{user.bio}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Activity Statistics</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-3 rounded shadow-sm border text-center">
                                    <span className="block text-2xl font-bold text-indigo-600">{user.totalOrders}</span>
                                    <span className="text-xs text-gray-500">Orders</span>
                                </div>
                                <div className="bg-white p-3 rounded shadow-sm border text-center">
                                    <span className="block text-2xl font-bold text-indigo-600">{user.uploadedOldBooks}</span>
                                    <span className="text-xs text-gray-500">Uploads</span>
                                </div>
                                <div className="bg-white p-3 rounded shadow-sm border text-center col-span-2">
                                    <span className="block text-2xl font-bold text-indigo-600">{user.wishlistCount}</span>
                                    <span className="text-xs text-gray-500">Items in Wishlist</span>
                                </div>
                            </div>
                        </div>

                        {user.activeListings && user.activeListings.length > 0 && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Recent Active Listings</h4>
                                <div className="space-y-3">
                                    {user.activeListings.map(listing => (
                                        <div key={listing.id} className="bg-white p-3 rounded shadow-sm border flex justify-between items-center">
                                            <div className="truncate pr-2">
                                                <p className="text-sm font-medium text-gray-900 truncate">{listing.title}</p>
                                                <p className="text-xs text-gray-500">{new Date(listing.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <span className="text-sm font-bold text-indigo-600">${listing.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-10">User not found.</div>
                )}
                
                <div className="mt-8 border-t pt-4">
                    <button className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 py-3 rounded-xl font-medium transition-colors duration-200" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
