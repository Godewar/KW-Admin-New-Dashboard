import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const seoService = {
  // Create or update SEO (POST)
  createOrUpdateSEO: async (seoData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/seo`, seoData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to create or update SEO' };
    }
  },

  // Get SEO by slug (GET)
  getSEOBySlug: async (slug) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/seo/${slug}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch SEO' };
    }
  },

  // Delete SEO by slug (DELETE)
  deleteSEOBySlug: async (slug) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/seo/${slug}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to delete SEO' };
    }
  },

  // Get all pages (GET)
  getAllPages: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pages`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch pages' };
    }
  }
}; 