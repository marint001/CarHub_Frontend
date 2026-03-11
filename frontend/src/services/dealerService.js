import api from './api';

export const dealerService = {
    // Get all dealers
    getDealers: async (params = {}) => {
        const response = await api.get('/dealers/', { params });
        return response.data;
    },

    // Get featured dealers
    getFeaturedDealers: async () => {
        const response = await api.get('/dealers/featured/');
        return response.data;
    },

    // Get single dealer
    getDealerById: async (id) => {
        const response = await api.get(`/dealers/${id}/`);
        return response.data;
    },

    // Get dealer inventory
    getDealerInventory: async (dealerId) => {
        const response = await api.get(`/dealers/${dealerId}/inventory/`);
        return response.data;
    },

    // Add dealer review
    addDealerReview: async (dealerId, reviewData) => {
        const response = await api.post(`/dealers/${dealerId}/add_review/`, reviewData);
        return response.data;
    },

    // Get nearby dealers
    getNearbyDealers: async (lat, lng, radius = 50) => {
        const response = await api.get('/dealers/nearby/', { 
            params: { lat, lng, radius } 
        });
        return response.data;
    },

    // Search dealers
    searchDealers: async (query) => {
        const response = await api.get('/dealers/', { 
            params: { search: query } 
        });
        return response.data;
    }
};