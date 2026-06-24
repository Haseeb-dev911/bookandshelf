import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useProfileDataQuery } from '@/features/profile-setting/services/query.service';

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

let socketInstance: Socket | null = null;

export const useSocket = () => {
    const { data: profileData } = useProfileDataQuery();
    const user = profileData?.payload;
    const [socket, setSocket] = useState<Socket | null>(socketInstance);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!user) {
            if (socketInstance) {
                socketInstance.disconnect();
                socketInstance = null;
                setSocket(null);
                setIsConnected(false);
            }
            return;
        }

        if (!socketInstance) {
            socketInstance = io(SOCKET_URL, {
                withCredentials: true,
                autoConnect: true
            });

            socketInstance.on('connect', () => {
                setIsConnected(true);
                // Join personal room
                socketInstance?.emit('join', user.id);
            });

            socketInstance.on('disconnect', () => {
                setIsConnected(false);
            });
            
            setSocket(socketInstance);
        } else if (!socketInstance.connected) {
            socketInstance.connect();
        }

        return () => {
            // We usually want to keep the socket alive across page navigations in a SPA
            // so we don't disconnect on unmount unless user logs out.
        };
    }, [user]);

    return { socket, isConnected };
};
