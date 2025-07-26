// API service for portfolio backend communication
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new APIError(
      errorData.message || `HTTP error! status: ${response.status}`,
      response.status,
      errorData
    );
  }
  return response.json();
};

export const portfolioAPI = {
  // Get complete portfolio data
  getPortfolioData: async () => {
    try {
      const response = await fetch(`${API_BASE}/portfolio`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      throw error;
    }
  },

  // Submit contact form
  submitContactForm: async (formData) => {
    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await fetch(`${API_BASE}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error checking API health:', error);
      throw error;
    }
  }
};

// Helper function to handle API errors in components
export const handleAPIError = (error, fallbackMessage = 'An unexpected error occurred') => {
  if (error instanceof APIError) {
    return error.message;
  }
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Unable to connect to server. Please check your internet connection.';
  }
  return fallbackMessage;
};

// Loading state manager for API calls
export class LoadingManager {
  constructor() {
    this.loadingStates = new Map();
    this.listeners = new Set();
  }

  setLoading(key, isLoading) {
    this.loadingStates.set(key, isLoading);
    this.notifyListeners();
  }

  isLoading(key) {
    return this.loadingStates.get(key) || false;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.loadingStates));
  }
}

export const loadingManager = new LoadingManager();