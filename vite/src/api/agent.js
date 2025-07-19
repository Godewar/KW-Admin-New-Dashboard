import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const agentService = {
  // Create a new agent
  createAgent: async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/agent`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to create agent' };
    }
  },

  // Get all agents
  getAllAgents: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/agents`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch agents' };
    }
  },

  // Get a single agent by ID
  getAgentById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/agent/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch agent' };
    }
  },

  // Update an agent
  updateAgent: async (id, formData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/agent/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to update agent' };
    }
  },

  // Delete an agent
  deleteAgent: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/agent/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to delete agent' };
    }
  },

  // Get agents by organization ID
  getAgentsByOrgId: async (orgId, page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/agent/${orgId}`, {
        params: {
          page,
          limit
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch agents' };
    }
  },

  // Get filtered/merged agents
  getFilteredAgents: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/agents/merge`, {
        params: {
          page,
          limit
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch filtered agents' };
    }
  }
}; 