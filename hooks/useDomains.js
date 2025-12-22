import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

// Fetch domain details by name
export const useDomain = (domainName) => {
    return useQuery({
        queryKey: ['domain', domainName],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/domains/${domainName}`);
            return data;
        },
        enabled: !!domainName,
    });
};

// Search domains
export const useSearchDomains = (query) => {
    return useQuery({
        queryKey: ['domains', 'search', query],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/domains/search?q=${query}`);
            return data;
        },
        enabled: !!query && query.length > 0,
    });
};
