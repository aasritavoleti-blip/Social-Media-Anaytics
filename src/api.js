const PROXY_URL = 'http://localhost:5000';

// Instagram Posts
export const getInstagramPosts = async () => {
  try {
    const response = await fetch(`${PROXY_URL}/api/instagram-posts`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return [];
  }
};

// Create Incident
export const createIncident = async (title, description) => {
  try {
    const response = await fetch(`${PROXY_URL}/api/create-incident`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating incident:', error);
    return null;
  }
};

// Social Media Comments
export const getSocialMediaComments = async () => {
  try {
    const response = await fetch(`${PROXY_URL}/api/social-media-comments`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

// Fetch Incidents from ServiceNow
export const getIncidents = async () => {
  try {
    const response = await fetch(`${PROXY_URL}/api/incidents`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching incidents:', error);
    return [];
  }
};

// Resolve Incident in ServiceNow
export const resolveIncident = async (sys_id) => {
  try {
    const response = await fetch(`${PROXY_URL}/api/incidents/${sys_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error resolving incident:', error);
    return null;
  }
};

// Health Check
export const checkHealth = async () => {
  try {
    const response = await fetch(`${PROXY_URL}/api/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'error' };
  }
};

// ServiceNow Connection Status
export const checkServiceNowStatus = async () => {
  try {
    const response = await fetch(`${PROXY_URL}/api/servicenow-status`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('ServiceNow status check failed:', error);
    return { connected: false, error: error.message };
  }
};