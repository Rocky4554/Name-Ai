import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

// Fetch all chats for the current user
export const useChats = () => {
    return useQuery({
        queryKey: ['chats'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/chats');
            return data;
        },
    });
};

// Fetch a single chat by ID
export const useChat = (chatId) => {
    return useQuery({
        queryKey: ['chat', chatId],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/chats/${chatId}`);
            return data;
        },
        enabled: !!chatId,
    });
};

// Create a new chat
export const useCreateChat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (chatData) => {
            const { data } = await axiosInstance.post('/chats', chatData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chats'] });
        },
    });
};

// Send a message in a chat
export const useSendMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ chatId, message }) => {
            const { data } = await axiosInstance.post(`/chats/${chatId}/messages`, { message });
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['chat', variables.chatId] });
        },
    });
};

// Search chats
export const useSearchChats = (query) => {
    return useQuery({
        queryKey: ['chats', 'search', query],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/chats/search?q=${query}`);
            return data;
        },
        enabled: !!query && query.length > 0,
    });
};
