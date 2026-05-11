require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

// ServiceNow credentials from environment variables
const SN_INSTANCE = process.env.SNOW_INSTANCE || 'https://dev347812.service-now.com';
const USERNAME = process.env.SNOW_USERNAME || 'admin';
const PASSWORD = process.env.SNOW_PASSWORD || '';

const headers = {
  'Authorization': 'Basic ' + Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'),
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Proxy endpoint for social media comments
app.get('/api/social-media-comments', async (req, res) => {
  try {
    const response = await fetch(
      `${SN_INSTANCE}/api/now/table/x_1939553_smv_social_media_comments?sysparm_limit=50`,
      { headers }
    );
    const data = await response.json();
    res.json(data.result || []);
  } catch (error) {
    console.error('Error fetching from ServiceNow:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Proxy endpoint for Instagram posts
app.get('/api/instagram-posts', async (req, res) => {
  try {
    const response = await fetch(
      `${SN_INSTANCE}/api/now/table/x_1939553_smv_instagram_posts?sysparm_limit=50`,
      { headers }
    );
    const data = await response.json();
    res.json(data.result || []);
  } catch (error) {
    console.error('Error fetching from ServiceNow:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Proxy endpoint for creating incidents
app.post('/api/create-incident', async (req, res) => {
  try {
    const { title, description } = req.body;
    const response = await fetch(
      `${SN_INSTANCE}/api/now/table/incident`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          short_description: title,
          description: description,
          urgency: '1',
          impact: '1',
        }),
      }
    );
    const data = await response.json();
    res.json(data.result);
  } catch (error) {
    console.error('Error creating incident:', error);
    res.status(500).json({ error: 'Failed to create incident' });
  }
});

// Proxy endpoint for fetching incidents
app.get('/api/incidents', async (req, res) => {
  try {
    const limit = req.query.sysparm_limit || 50;
    const response = await fetch(
      `${SN_INSTANCE}/api/now/table/incident?sysparm_limit=${limit}&sysparm_query=active=true^ORDERBYDESCsys_created_on`,
      { headers }
    );
    const data = await response.json();
    res.json(data.result || []);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    res.status(500).json({ error: 'Failed to fetch incidents' });
  }
});

// Proxy endpoint for resolving incidents
app.patch('/api/incidents/:sys_id', async (req, res) => {
  try {
    const { sys_id } = req.params;
    const response = await fetch(
      `${SN_INSTANCE}/api/now/table/incident/${sys_id}`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ state: '6', close_code: 'Closed/Resolved', close_notes: 'Resolved via SMA Platform' }),
      }
    );
    const data = await response.json();
    res.json(data.result);
  } catch (error) {
    console.error('Error resolving incident:', error);
    res.status(500).json({ error: 'Failed to resolve incident' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ServiceNow connection test
app.get('/api/servicenow-status', async (req, res) => {
  try {
    const response = await fetch(
      `${SN_INSTANCE}/api/now/table/incident?sysparm_limit=1`,
      { headers, timeout: 10000 }
    );
    if (response.ok) {
      res.json({ connected: true, instance: SN_INSTANCE });
    } else {
      res.json({ connected: false, instance: SN_INSTANCE, statusCode: response.status });
    }
  } catch (error) {
    res.json({ connected: false, instance: SN_INSTANCE, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
  console.log(`ServiceNow Instance: ${SN_INSTANCE}`);
});
