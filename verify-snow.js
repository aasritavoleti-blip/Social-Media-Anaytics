require('dotenv').config();
const fetch = require('node-fetch');

const SN_INSTANCE = process.env.SNOW_INSTANCE || 'https://dev347812.service-now.com';
const USERNAME = process.env.SNOW_USERNAME || 'admin';
const PASSWORD = process.env.SNOW_PASSWORD || '';

const headers = {
  'Authorization': 'Basic ' + Buffer.from(USERNAME + ':' + PASSWORD).toString('base64'),
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

async function testServiceNowConnection() {
  console.log('Testing ServiceNow PDI Connection...');
  console.log('Instance:', SN_INSTANCE);
  console.log('Username:', USERNAME);
  console.log('---');

  try {
    // Test basic connectivity
    const response = await fetch(
      `${SN_INSTANCE}/api/now/table/incident?sysparm_limit=1`,
      { headers, timeout: 10000 }
    );

    if (response.ok) {
      console.log('✅ ServiceNow Connection: SUCCESS');
      console.log('Status:', response.status);
      
      const data = await response.json();
      console.log('Incident table accessible: YES');
      console.log('Records found:', data.result?.length || 0);
    } else {
      console.log('❌ ServiceNow Connection: FAILED');
      console.log('Status:', response.status);
      console.log('Response:', await response.text());
    }
  } catch (error) {
    console.log('❌ ServiceNow Connection: ERROR');
    console.log('Error:', error.message);
  }

  console.log('\n---');
  console.log('Testing Custom Tables...');

  // Test social media comments table
  try {
    const commentsResponse = await fetch(
      `${SN_INSTANCE}/api/now/table/x_1939553_smv_social_media_comments?sysparm_limit=1`,
      { headers, timeout: 10000 }
    );

    if (commentsResponse.ok) {
      console.log('✅ Social Media Comments Table: ACCESSIBLE');
      const data = await commentsResponse.json();
      console.log('Records:', data.result?.length || 0);
    } else {
      console.log('❌ Social Media Comments Table: NOT ACCESSIBLE');
      console.log('Status:', commentsResponse.status);
    }
  } catch (error) {
    console.log('❌ Social Media Comments Table: ERROR -', error.message);
  }

  // Test Instagram posts table
  try {
    const postsResponse = await fetch(
      `${SN_INSTANCE}/api/now/table/x_1939553_smv_instagram_posts?sysparm_limit=1`,
      { headers, timeout: 10000 }
    );

    if (postsResponse.ok) {
      console.log('✅ Instagram Posts Table: ACCESSIBLE');
      const data = await postsResponse.json();
      console.log('Records:', data.result?.length || 0);
    } else {
      console.log('❌ Instagram Posts Table: NOT ACCESSIBLE');
      console.log('Status:', postsResponse.status);
    }
  } catch (error) {
    console.log('❌ Instagram Posts Table: ERROR -', error.message);
  }

  console.log('\n---');
  console.log('Connection test complete!');
}

testServiceNowConnection();
