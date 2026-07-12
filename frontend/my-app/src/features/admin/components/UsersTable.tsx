import React, { useState } from "react";
import { UserItem } from "../services/admin.users.service";

interface UsersTableProps {
    users: UserItem[];
    isLoading: boolean;
    onViewDetails: (userId: string) => void;
    onBlockUser: (userId: string) => void;
    onUnblockUser: (userId: string) => void;
    onRestrictUser: (userId: string) => void;
    onUnrestrictUser: (userId: string) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({ 
    users, isLoading, onViewDetails, onBlockUser, onUnblockUser, onRestrictUser, onUnrestrictUser 
}) => {
    const [actionUser, setActionUser] = useState<{ id: string; action: string } | null>(null);

    const handleConfirmAction = () => {
        if (!actionUser) return;
        const { id, action } = actionUser;
        if (action === "block") onBlockUser(id);
        if (action === "unblock") onUnblockUser(id);
        if (action === "restrict") onRestrictUser(id);
        if (action === "unrestrict") onUnrestrictUser(id);
        setActionUser(null);
    };

    if (isLoading) {
        return (
            <div className="w-full animate-pulse space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-16 bg-gray-200 rounded w-full"></div>
                ))}
            </div>
        );
    }

    if (!users.length) {
        return (
            <div className="bg-white rounded-xl shadow-sm border p-10 text-center">
                <div className="text-gray-400 text-5xl mb-4">👥</div>
                <h3 className="text-lg font-medium text-gray-900">No users found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your search or filters.</p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white shadow-sm border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined Date</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {user.avatar ? (
                                                    <img className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt="" />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold uppercase">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${user.status === 'active' ? 'bg-green-100 text-green-800' : 
                                              user.status === 'restricted' ? 'bg-yellow-100 text-yellow-800' : 
                                              'bg-red-100 text-red-800'}`}>
                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button onClick={() => onViewDetails(user.id)} className="text-indigo-600 hover:text-indigo-900">
                                            View
                                        </button>
                                        
                                        {user.status !== "banned" ? (
                                            <button 
                                                onClick={() => setActionUser({ id: user.id, action: "block" })} 
                                                className="text-red-600 hover:text-red-900 ml-2"
                                            >
                                                Block
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => setActionUser({ id: user.id, action: "unblock" })} 
                                                className="text-green-600 hover:text-green-900 ml-2"
                                            >
                                                Unblock
                                            </button>
                                        )}
                                        
                                        {user.status === "active" ? (
                                            <button 
                                                onClick={() => setActionUser({ id: user.id, action: "restrict" })} 
                                                className="text-yellow-600 hover:text-yellow-900 ml-2"
                                            >
                                                Restrict
                                            </button>
                                        ) : user.status === "restricted" ? (
                                            <button 
                                                onClick={() => setActionUser({ id: user.id, action: "unrestrict" })} 
                                                className="text-yellow-600 hover:text-yellow-900 ml-2"
                                            >
                                                Unrestrict
                                            </button>
                                        ) : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {actionUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
                        <h3 className="text-lg font-bold mb-2">Confirm {actionUser.action}</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to {actionUser.action} this user? 
                            {actionUser.action === "block" && " Blocked users cannot access their account until an administrator restores access."}
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button 
                                className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                                onClick={() => setActionUser(null)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors"
                                onClick={handleConfirmAction}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
