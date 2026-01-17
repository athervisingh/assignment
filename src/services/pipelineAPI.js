import { APP_CONFIG } from '../config/constants';

class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

async function apiRequest(endpoint, options = {}) {
  const url = `${APP_CONFIG.API_BASE_URL}${endpoint}`;
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || `HTTP ${response.status}`,
        response.status,
        errorData
      );
    }
    return await response.json();
  } catch (error) {
    if (error instanceof APIError) throw error;
    throw new APIError(error.message || 'Network error', 0, { originalError: error });
  }
}

export const PipelineAPI = {
  async parsePipeline(pipeline) {
    try {
      const response = await apiRequest('/pipelines/parse', {
        method: 'POST',
        body: JSON.stringify(pipeline),
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message, status: error.status };
    }
  },
};