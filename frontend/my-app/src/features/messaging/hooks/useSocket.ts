import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useProfileDataQuery } from '@/features/profile-setting/services/query.service';

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// ─── Singleton socket instance (persists across component mounts/unmounts) ────
// We use a module-level ref to avoid creating multiple connections in a SPA.
let socketInstance: Socket | null = null;

// ─── Expose raw socket for hooks that need it ─────────────────────────────────
export const getSocket = (): Socket | null => socketInstance;

export const useSocket = () => {
    // We use the profile query to know when the authenticated user is ready.
    const { data: profileData } = useProfileDataQuery();
    const user = profileData?.payload;

    // Track whether we have already emitted 'join' for this user session.
    // This ref persists for the lifetime of the hook instance so we never
    // double-join even if the component re-renders.
    const hasJoined = useRef(false);

    useEffect(() => {
        // ── Teardown path: user logged out ────────────────────────────────────
        if (!user) {
            if (socketInstance) {
                socketInstance.disconnect();
                socketInstance = null;
            }
            hasJoined.current = false;
            return;
        }

        // ── Create socket once ────────────────────────────────────────────────
        if (!socketInstance) {
            socketInstance = io(SOCKET_URL, {
                withCredentials: true,
                autoConnect: true,
                // Reconnection keeps the single connection alive across navigations.
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
            });
        }

        // ── Register 'join' on every connect / reconnect ──────────────────────
        // We do NOT use hasJoined to prevent emitting on reconnect, because
        // when the socket reconnects (e.g. server restart), it loses its rooms
        // and MUST re-join. Emitting 'join' multiple times is idempotent.
        const handleConnect = () => {
            socketInstance!.emit('join', user.id);
        };

        socketInstance.on('connect', handleConnect);

        // If the socket is already connected when this effect runs (e.g., user
        // loaded after socket was created), emit join immediately.
        if (socketInstance.connected) {
            socketInstance.emit('join', user.id);
        }

        return () => {
            // Remove only the handler we added in this render cycle.
            // We deliberately DO NOT disconnect the socket — it must live for
            // the full SPA session.
            socketInstance?.off('connect', handleConnect);
        };
    }, [user]);

    // We return the module-level instance directly. Returning the module-level
    // variable (not a state copy) means callers always get the current socket
    // without needing to re-render when isConnected changes.
    return { socket: socketInstance };
};
