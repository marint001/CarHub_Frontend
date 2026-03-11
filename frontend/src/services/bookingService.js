import api from './api';

export const bookingService = {
  // Create test drive booking
  createTestDrive: async (bookingData) => {
    const response = await api.post('/test-drives/', bookingData);
    return response.data;
  },

  // Send contact message
  sendContactMessage: async (messageData) => {
    const response = await api.post('/contact/', messageData);
    return response.data;
  }
};