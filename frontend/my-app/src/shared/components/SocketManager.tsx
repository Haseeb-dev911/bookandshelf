import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@/features/messaging/hooks/useSocket";

/**
 * SocketManager — mounts once at the app root.
 *
 * Pattern: Socket.IO broadcasts that something changed →
 *          TanStack Query fetches the latest data from the server →
 *          React simply renders the updated data.
 *
 * Intentionally excluded: payment / Stripe webhook flows.
 */
export const SocketManager = () => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) return;

        // ── Listing events ────────────────────────────────────────────────────
        const onListingSold = () => {
            queryClient.invalidateQueries({ queryKey: ["plp-all-active-listings"] });
            queryClient.invalidateQueries({ queryKey: ["user-old-book-listings"] });
            queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
        };

        const onListingDeleted = () => {
            queryClient.invalidateQueries({ queryKey: ["plp-all-active-listings"] });
            queryClient.invalidateQueries({ queryKey: ["user-old-book-listings"] });
        };

        const onListingUpdated = () => {
            queryClient.invalidateQueries({ queryKey: ["plp-all-active-listings"] });
            queryClient.invalidateQueries({ queryKey: ["user-old-book-listings"] });
        };

        // ── User status events ────────────────────────────────────────────────
        // When any user's status changes (banned/unbanned), refresh PLP and
        // wishlist so blocked users' books disappear immediately
        const onUserStatusChanged = () => {
            queryClient.invalidateQueries({ queryKey: ["plp-all-active-listings"] });
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
            queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
        };

        // ── Ebook events ──────────────────────────────────────────────────────
        const onEbookChanged = () => {
            queryClient.invalidateQueries({ queryKey: ["plp-all-active-listings"] });
            queryClient.invalidateQueries({ queryKey: ["admin-ebooks"] });
            queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        };

        // ── Personal Account events ───────────────────────────────────────────
        // ACCOUNT_BANNED and ACCOUNT_UNRESTRICTED are handled directly in AccountStatusWatcher
        // for instant modal/banner response. We only handle ACCOUNT_RESTRICTED here for
        // the yellow banner invalidation.
        const onPersonalAccountRestricted = () => {
            queryClient.invalidateQueries({ queryKey: ["profileData"] });
        };

        socket.on("LISTING_SOLD", onListingSold);
        socket.on("LISTING_DELETED", onListingDeleted);
        socket.on("LISTING_UPDATED", onListingUpdated);
        socket.on("USER_STATUS_CHANGED", onUserStatusChanged);
        socket.on("EBOOK_CHANGED", onEbookChanged);
        socket.on("ACCOUNT_RESTRICTED", onPersonalAccountRestricted);

        return () => {
            socket.off("LISTING_SOLD", onListingSold);
            socket.off("LISTING_DELETED", onListingDeleted);
            socket.off("LISTING_UPDATED", onListingUpdated);
            socket.off("USER_STATUS_CHANGED", onUserStatusChanged);
            socket.off("EBOOK_CHANGED", onEbookChanged);
            socket.off("ACCOUNT_RESTRICTED", onPersonalAccountRestricted);
        };
    }, [socket, queryClient]);

    // Render nothing — this is a pure side-effect component
    return null;
};
