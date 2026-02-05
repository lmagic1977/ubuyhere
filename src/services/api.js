/**
 * UBUYHERE - API Service
 * 前端API调用服务
 */

// 在Vercel部署时使用相对路径
const API_BASE_URL = '/api';

class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // ===== 商品相关 =====

  async parseProductUrl(url) {
    return this.request('/products/parse', {
      method: 'POST',
      body: JSON.stringify({ url })
    });
  }

  async parseProductFromText(text) {
    return this.request('/products/parse', {
      method: 'POST',
      body: JSON.stringify({ text })
    });
  }

  async searchProducts(params) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products/search?${queryString}`);
  }

  async getProductDetails(productId, options = {}) {
    const queryString = new URLSearchParams(options).toString();
    return this.request(`/products/${productId}?${queryString}`);
  }

  async healthCheck() {
    return this.request('/health');
  }
}

const api = new ApiService(API_BASE_URL);

export default api;
export { ApiService, API_BASE_URL };
