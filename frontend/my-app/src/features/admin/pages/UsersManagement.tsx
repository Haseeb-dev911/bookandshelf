import React, { useEffect, useState, useCallback } from "react";
import { adminUsersService, UserItem, UserDetails } from "../services/admin.users.service";
import { UsersTable } from "../components/UsersTable";
import { UserDetailsDrawer } from "../components/UserDetailsDrawer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const UsersManagement: React.FC = () => {
    const [users, setUsers] = useState<UserItem[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    
    // Pagination & Filters
    const [page, setPage] = useState(1);
    const limit = 10;
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    // Drawer state
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
    const [isDrawerLoading, setIsDrawerLoading] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1); // Reset page on new search
        }, 500);
        return () => clearTimeout(handler);
    }, [search]);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await adminUsersService.getUsers({
                page,
                limit,
                search: debouncedSearch,
                status,
                sortBy
            });
            if (response.success) {
                setUsers(response.payload.users);
                setTotalCount(response.payload.totalCount);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Error fetching users");
        } finally {
            setIsLoading(false);
        }
    }, [page, debouncedSearch, status, sortBy]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleViewDetails = async (userId: string) => {
        setIsDrawerOpen(true);
        setIsDrawerLoading(true);
        try {
            const response = await adminUsersService.getUserDetails(userId);
            if (response.success) {
                setSelectedUser(response.payload);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Could not fetch user details.");
            setIsDrawerOpen(false);
        } finally {
            setIsDrawerLoading(false);
        }
    };

    const handleBlockUser = async (userId: string) => {
        try {
            const response = await adminUsersService.blockUser(userId);
            if (response.success) {
                toast.success("The user has been successfully blocked.");
                fetchUsers();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Could not block user.");
        }
    };

    const handleUnblockUser = async (userId: string) => {
        try {
            const response = await adminUsersService.unblockUser(userId);
            if (response.success) {
                toast.success("The user has been successfully restored.");
                fetchUsers();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Could not unblock user.");
        }
    };

    const handleRestrictUser = async (userId: string) => {
        try {
            const response = await adminUsersService.restrictUser(userId);
            if (response.success) {
                toast.success("The user has been successfully restricted.");
                fetchUsers();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Could not restrict user.");
        }
    };

    const handleUnrestrictUser = async (userId: string) => {
        try {
            const response = await adminUsersService.unrestrictUser(userId);
            if (response.success) {
                toast.success("The user restriction has been removed.");
                fetchUsers();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Could not unrestrict user.");
        }
    };

    const totalPages = Math.ceil(totalCount / limit);

    const navigate = useNavigate();

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen bg-gray-50">
            <div className="mb-8">
                <button 
                    onClick={() => navigate(-1)} 
                    className="mb-4 text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
                >
                    &larr; Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User Management</h1>
                <p className="mt-2 text-gray-600">View and manage all registered users, their roles, and access statuses.</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="w-full md:w-1/3">
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-auto flex flex-wrap gap-4">
                    <select 
                        className="px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-indigo-500"
                        value={status}
                        onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                    >
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="restricted">Restricted</option>
                        <option value="banned">Banned</option>
                    </select>

                    <select 
                        className="px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-indigo-500"
                        value={sortBy}
                        onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>

            <UsersTable 
                users={users} 
                isLoading={isLoading}
                onViewDetails={handleViewDetails}
                onBlockUser={handleBlockUser}
                onUnblockUser={handleUnblockUser}
                onRestrictUser={handleRestrictUser}
                onUnrestrictUser={handleUnrestrictUser}
            />

            {!isLoading && totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-xl shadow-sm border">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to <span className="font-medium">{Math.min(page * limit, totalCount)}</span> of{' '}
                                <span className="font-medium">{totalCount}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                                >
                                    <span className="sr-only">Previous</span>
                                    &larr;
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setPage(i + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${
                                            page === i + 1 
                                                ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                                >
                                    <span className="sr-only">Next</span>
                                    &rarr;
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            <UserDetailsDrawer 
                isOpen={isDrawerOpen} 
                onClose={() => setIsDrawerOpen(false)} 
                user={selectedUser}
                isLoading={isDrawerLoading} 
            />
        </div>
    );
};
