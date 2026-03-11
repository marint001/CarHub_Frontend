import api from './api';

export const carService = {
    // Get all cars
    getCars: async (params = {}) => {
        const response = await api.get('/cars/', { params });
        return response.data;
    },

    // Get featured cars
    getFeaturedCars: async () => {
        const response = await api.get('/cars/featured/');
        return response.data;
    },

    // Get single car
    getCarById: async (id) => {
        const response = await api.get(`/cars/${id}/`);
        return response.data;
    },

    // Search cars
    searchCars: async (query) => {
        const response = await api.get('/cars/search/', { params: { q: query } });
        return response.data;
    },

    // Filter cars
    filterCars: async (filters) => {
        const response = await api.get('/cars/filter/', { params: filters });
        return response.data;
    },

    // Get all brands
    getBrands: async () => {
        const response = await api.get('/brands/');
        return response.data;
    },

    // Get new arrivals
    getNewArrivals: async () => {
        const response = await api.get('/cars/new_arrivals/');
        return response.data;
    },

    // Compare multiple cars
    compareCars: async (carIds) => {
        const response = await api.post('/cars/compare/', { car_ids: carIds });
        return response.data;
    },

    // Get preset comparison
    getPresetComparison: async (category = 'popular') => {
        const response = await api.get('/cars/compare_preset/', { 
            params: { category } 
        });
        return response.data;
    }
};