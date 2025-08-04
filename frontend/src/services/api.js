// API service for making requests to the backend
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || import.meta.env?.REACT_APP_BACKEND_URL;

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Product methods
  async getProducts() {
    return this.makeRequest('/api/products');
  }

  async getProduct(productId) {
    return this.makeRequest(`/api/products/${productId}`);
  }

  async createProduct(productData) {
    return this.makeRequest('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(productId, productData) {
    return this.makeRequest(`/api/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(productId) {
    return this.makeRequest(`/api/products/${productId}`, {
      method: 'DELETE',
    });
  }

  // Stock methods
  async getStock() {
    return this.makeRequest('/api/stock');
  }

  async updateStock(stockData) {
    return this.makeRequest('/api/stock', {
      method: 'PUT',
      body: JSON.stringify(stockData),
    });
  }

  // Testimonial methods
  async getTestimonials() {
    return this.makeRequest('/api/testimonials');
  }

  async createTestimonial(testimonialData) {
    return this.makeRequest('/api/testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonialData),
    });
  }

  // Status check method (for testing connectivity)
  async getStatus() {
    return this.makeRequest('/api/status');
  }
}

export const apiService = new ApiService();
export default apiService;