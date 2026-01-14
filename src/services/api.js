// services/api.js
// Professional API service layer for backend communication

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

/**
 * API Error class for standardized error handling
 */
class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Generic API request handler with error handling
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
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

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    // Parse JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    // Re-throw APIError as-is
    if (error instanceof APIError) {
      throw error;
    }

    // Network or other errors
    throw new APIError(
      error.message || 'Network error occurred',
      0,
      { originalError: error }
    );
  }
}

/**
 * Pipeline API Service
 */
export const PipelineAPI = {
  /**
   * Health check endpoint
   */
  async healthCheck() {
    try {
      const response = await apiRequest('/');
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Parse and validate pipeline
   * @param {Object} pipeline - Pipeline data containing nodes and edges
   * @param {Array} pipeline.nodes - Array of node objects
   * @param {Array} pipeline.edges - Array of edge objects
   * @returns {Promise<Object>} Analysis results with num_nodes, num_edges, is_dag
   */
  async parsePipeline(pipeline) {
    if (!pipeline || !pipeline.nodes || !pipeline.edges) {
      throw new APIError('Invalid pipeline data', 400, {
        message: 'Pipeline must contain nodes and edges arrays',
      });
    }

    try {
      const response = await apiRequest('/pipelines/parse', {
        method: 'POST',
        body: JSON.stringify(pipeline),
      });

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: error.status,
        details: error.data,
      };
    }
  },
};

/**
 * Utility function to format pipeline data for API
 * @param {Array} nodes - ReactFlow nodes
 * @param {Array} edges - ReactFlow edges
 * @returns {Object} Formatted pipeline object
 */
export function formatPipelineData(nodes, edges) {
  return {
    nodes: nodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data || {},
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle || null,
      targetHandle: edge.targetHandle || null,
    })),
  };
}

export default PipelineAPI;