import { useProfileDataQuery } from "@/features/profile-setting/services/query.service";
import { settingService } from "@/features/profile-setting/services/setting.page.service";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@/features/messaging/hooks/useSocket";

import { useState, useEffect, useRef } from "react";

export const AccountStatusWatcher = () => {
    const { data, isSuccess, isError, error } = useProfileDataQuery();
    const queryClient = useQueryClient();
    const { socket } = useSocket();
    const [isRestrictedBannerDismissed, setIsRestrictedBannerDismissed] = useState(false);
    // wasBanned: set instantly when socket fires — no API round-trip needed
    const [wasBanned, setWasBanned] = useState(false);
    const lastStatusRef = useRef<string | null>(null);

    // Sync last known status from successful profile fetches
    useEffect(() => {
        if (isSuccess && data?.payload?.status) {
            lastStatusRef.current = data.payload.status;
        }
    }, [isSuccess, data?.payload?.status]);

    // Reset dismissed banner when user becomes active again (after unban/unrestrict)
    useEffect(() => {
        if (data?.payload?.status === "active") {
            setIsRestrictedBannerDismissed(false);
            setWasBanned(false);
        }
    }, [data?.payload?.status]);

    // Listen for ACCOUNT_BANNED on socket for instant modal — no page refresh needed
    useEffect(() => {
        if (!socket) return;
        const onBanned = () => {
            // Show modal immediately — user stays logged in until they click "Log Out"
            setWasBanned(true);
            // Invalidate so page-refresh fallback (403 check) also works
            queryClient.invalidateQueries({ queryKey: ["profileData"] });
        };
        const onUnrestricted = () => {
            setIsRestrictedBannerDismissed(false);
            queryClient.invalidateQueries({ queryKey: ["profileData"] });
        };
        socket.on("ACCOUNT_BANNED", onBanned);
        socket.on("ACCOUNT_UNRESTRICTED", onUnrestricted);
        return () => {
            socket.off("ACCOUNT_BANNED", onBanned);
            socket.off("ACCOUNT_UNRESTRICTED", onUnrestricted);
        };
    }, [socket, queryClient]);

    const isLoggedIn = isSuccess && data?.success;
    const status = data?.payload?.status;

    // Page-refresh fallback: GET /settings/profile returns 403 + field:"status" for banned users
    // Their session is still alive (we intentionally don't delete it on ban)
    const isBannedFromError = isError &&
        (error as any)?.response?.status === 403 &&
        (error as any)?.response?.data?.errors?.some((e: any) => e.field === "status");

    const showBanModal = status === "banned" || wasBanned || isBannedFromError;

    // Not logged in and nothing to show — render nothing
    if (!isLoggedIn && !showBanModal) return null;

    // ── BAN MODAL ─────────────────────────────────────────────────────────────
    // Full-screen, blurred overlay. Non-dismissible — only action is to log out.
    if (showBanModal) {
        const handleLogout = async () => {
            try {
                await settingService.logout();
                queryClient.clear();
            } catch {
                // ignore errors — still redirect
            } finally {
                window.location.href = "/login";
            }
        };

        return (
            <div
                className="fixed inset-0 z-[9999] flex items-center justify-center"
                style={{ backdropFilter: "blur(16px)", backgroundColor: "rgba(0,0,0,0.80)" }}
                aria-modal="true"
                role="alertdialog"
                aria-labelledby="ban-modal-title"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
                    style={{ animation: "banModalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both" }}
                >
                    <style>{`
                        @keyframes banModalIn {
                            from { opacity: 0; transform: scale(0.85) translateY(20px); }
                            to   { opacity: 1; transform: scale(1) translateY(0); }
                        }
                    `}</style>

                    {/* Top accent bar */}
                    <div className="h-1.5 bg-gradient-to-r from-red-500 via-rose-500 to-red-600" />

                    <div className="p-8 text-center">
                        {/* Ban icon */}
                        <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center">
                            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        </div>

                        <h2 id="ban-modal-title" className="text-2xl font-bold text-gray-900 mb-2">
                            Account Suspended
                        </h2>
                        <p className="text-gray-600 mb-2">
                            Your account has been{" "}
                            <span className="font-semibold text-red-600">permanently suspended</span>{" "}
                            by an administrator.
                        </p>
                        <p className="text-gray-400 text-sm mb-2">
                            You cannot access Book&Shelf while your account is suspended.
                        </p>
                        <p className="text-gray-400 text-sm mb-8">
                            If you believe this is a mistake, please contact support at{" "}
                            <span className="text-slate-600 font-medium">support@bookshelf.com</span>
                        </p>

                        <button
                            id="ban-modal-logout-btn"
                            onClick={handleLogout}
                            className="w-full py-3.5 px-6 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-semibold rounded-xl transition-all duration-150 cursor-pointer shadow-md shadow-red-200"
                        >
                            Log Out of My Account
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── RESTRICTED BANNER ─────────────────────────────────────────────────────
    // Dismissible yellow bar that sits above page content (not fixed/overlapping)
    if (status === "restricted" && !isRestrictedBannerDismissed) {
        return (
            <div className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-white shadow-md relative z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-sm font-medium text-white">
                            <span className="font-bold">Account Restricted:</span> Your account has been restricted by an administrator. You can browse and shop, but you cannot list or sell books. Contact support for assistance.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsRestrictedBannerDismissed(true)}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }

    return null;
};
