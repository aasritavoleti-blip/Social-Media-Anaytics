/**
 * ServiceNow PDI Table Setup Script
 * 
 * This script creates the required custom tables in your ServiceNow PDI instance.
 * Run this script in ServiceNow Scripts - Background (System Definition > Scripts - Background)
 * or use the REST API endpoints below to create the tables programmatically.
 * 
 * REQUIRED TABLES:
 * =================
 * 
 * 1. x_1939553_smv_social_media_comments
 *    - Stores social media comments with sentiment analysis
 *    - Columns:
 *      - comment_text (String, 500) - The comment text
 *      - platform (String, 50) - Platform name (Instagram, Facebook, X)
 *      - sentiment (String, 50) - Sentiment (Positive, Negative, Neutral, Weak Positive)
 *      - username (String, 100) - Username of the commenter
 *      - comment_date (Date/Time) - When the comment was posted
 *      - likes (Integer) - Number of likes on the comment
 *      - sentiment_score (Float) - Numerical sentiment score (0-1)
 * 
 * 2. x_1939553_smv_instagram_posts
 *    - Stores Instagram post data with engagement metrics
 *    - Columns:
 *      - post_caption (String, 1000) - Post caption text
 *      - post_url (String, 500) - URL to the Instagram post
 *      - likes (Integer) - Number of likes
 *      - comments_count (Integer) - Number of comments
 *      - shares (Integer) - Number of shares
 *      - post_date (Date/Time) - When the post was published
 *      - sentiment (String, 50) - Overall sentiment of the post
 *      - engagement_rate (Float) - Engagement rate percentage
 *      - image_url (String, 500) - URL to the post image
 * 
 * ADDITIONAL STANDARD TABLES (already in ServiceNow):
 * ====================================================
 * 
 * 3. incident (Standard ServiceNow table)
 *    - Used for auto-generated incidents from sentiment alerts
 *    - The app creates incidents with:
 *      - short_description - Alert title
 *      - description - Alert details
 *      - urgency - Set to 1 (High)
 *      - impact - Set to 1 (High)
 * 
 * SETUP INSTRUCTIONS:
 * ===================
 * 
 * Option A: Manual Setup via ServiceNow UI
 * -----------------------------------------
 * 1. Log into your ServiceNow PDI instance
 * 2. Go to System Definition > Tables
 * 3. Click "New" to create each custom table
 * 4. Set the label and name as specified above
 * 5. Add columns as specified
 * 6. Ensure the table namespace is x_1939553_smv
 * 
 * Option B: REST API Setup (run from this Node.js project)
 * --------------------------------------------------------
 * 1. Set your .env file with SNOW credentials
 * 2. Run: node servicenow-setup.js
 * 
 * Option C: Scripts - Background in ServiceNow
 * --------------------------------------------
 * Copy the JavaScript code below and run it in Scripts - Background
 */

// ============================================================
// ServiceNow Scripts - Background Code
// Copy and paste this into System Definition > Scripts - Background
// ============================================================

// Create Social Media Comments Table
var createCommentsTable = function() {
    var gr = new GlideRecord('sys_db_object');
    gr.initialize();
    gr.name = 'x_1939553_smv_social_media_comments';
    gr.label = 'Social Media Comments';
    gr.prefix = 'x_1939553_smv';
    gr.sys_class_name = 'sys_db_object';
    gr.insert();
    
    // Add columns
    var columns = [
        {name: 'comment_text', label: 'Comment Text', type: 'string', length: 500},
        {name: 'platform', label: 'Platform', type: 'string', length: 50},
        {name: 'sentiment', label: 'Sentiment', type: 'string', length: 50},
        {name: 'username', label: 'Username', type: 'string', length: 100},
        {name: 'comment_date', label: 'Comment Date', type: 'glide_date_time'},
        {name: 'likes', label: 'Likes', type: 'integer'},
        {name: 'sentiment_score', label: 'Sentiment Score', type: 'float'}
    ];
    
    columns.forEach(function(col) {
        var element = new GlideRecord('sys_dictionary');
        element.initialize();
        element.name = 'x_1939553_smv_social_media_comments';
        element.element = col.name;
        element.column_label = col.label;
        element.internal_type = col.type;
        if (col.length) element.max_length = col.length;
        element.insert();
    });
    
    gs.print('Created table: x_1939553_smv_social_media_comments');
};

// Create Instagram Posts Table
var createInstagramPostsTable = function() {
    var gr = new GlideRecord('sys_db_object');
    gr.initialize();
    gr.name = 'x_1939553_smv_instagram_posts';
    gr.label = 'Instagram Posts';
    gr.prefix = 'x_1939553_smv';
    gr.sys_class_name = 'sys_db_object';
    gr.insert();
    
    // Add columns
    var columns = [
        {name: 'post_caption', label: 'Post Caption', type: 'string', length: 1000},
        {name: 'post_url', label: 'Post URL', type: 'string', length: 500},
        {name: 'likes', label: 'Likes', type: 'integer'},
        {name: 'comments_count', label: 'Comments Count', type: 'integer'},
        {name: 'shares', label: 'Shares', type: 'integer'},
        {name: 'post_date', label: 'Post Date', type: 'glide_date_time'},
        {name: 'sentiment', label: 'Sentiment', type: 'string', length: 50},
        {name: 'engagement_rate', label: 'Engagement Rate', type: 'float'},
        {name: 'image_url', label: 'Image URL', type: 'string', length: 500}
    ];
    
    columns.forEach(function(col) {
        var element = new GlideRecord('sys_dictionary');
        element.initialize();
        element.name = 'x_1939553_smv_instagram_posts';
        element.element = col.name;
        element.column_label = col.label;
        element.internal_type = col.type;
        if (col.length) element.max_length = col.length;
        element.insert();
    });
    
    gs.print('Created table: x_1939553_smv_instagram_posts');
};

// Execute
createCommentsTable();
createInstagramPostsTable();
gs.print('All tables created successfully!');

// ============================================================
// Sample Data Insert Scripts
// Run these after tables are created to add sample data
// ============================================================

// Insert sample social media comments
var sampleComments = [
    {comment_text: 'Great product, love the new update!', platform: 'Instagram', sentiment: 'Positive', username: 'user_ig_001', likes: 45, sentiment_score: 0.92},
    {comment_text: 'Customer support is very slow to respond', platform: 'X', sentiment: 'Negative', username: 'user_x_002', likes: 12, sentiment_score: 0.15},
    {comment_text: 'When is the next sale happening?', platform: 'Facebook', sentiment: 'Neutral', username: 'user_fb_003', likes: 8, sentiment_score: 0.50},
    {comment_text: 'App keeps crashing on my device', platform: 'X', sentiment: 'Negative', username: 'user_x_004', likes: 23, sentiment_score: 0.10},
    {comment_text: 'Absolutely love the packaging and quality', platform: 'Instagram', sentiment: 'Positive', username: 'user_ig_005', likes: 67, sentiment_score: 0.95},
    {comment_text: 'The new feature is okay, nothing special', platform: 'Facebook', sentiment: 'Weak Positive', username: 'user_fb_006', likes: 5, sentiment_score: 0.60},
    {comment_text: 'Terrible experience with my last order', platform: 'X', sentiment: 'Negative', username: 'user_x_007', likes: 34, sentiment_score: 0.08},
    {comment_text: 'Beautiful design and fast delivery!', platform: 'Instagram', sentiment: 'Positive', username: 'user_ig_008', likes: 52, sentiment_score: 0.88},
    {comment_text: 'Can someone help me with returns?', platform: 'Facebook', sentiment: 'Neutral', username: 'user_fb_009', likes: 3, sentiment_score: 0.45},
    {comment_text: 'Best purchase I made this year!', platform: 'Instagram', sentiment: 'Positive', username: 'user_ig_010', likes: 89, sentiment_score: 0.97}
];

sampleComments.forEach(function(item) {
    var gr = new GlideRecord('x_1939553_smv_social_media_comments');
    gr.initialize();
    gr.comment_text = item.comment_text;
    gr.platform = item.platform;
    gr.sentiment = item.sentiment;
    gr.username = item.username;
    gr.likes = item.likes;
    gr.sentiment_score = item.sentiment_score;
    gr.insert();
});

gs.print('Sample comments inserted successfully!');

// Insert sample Instagram posts
var samplePosts = [
    {post_caption: 'Exciting new product launch! Check out our latest collection.', likes: 24500, comments_count: 890, shares: 1200, sentiment: 'Positive', engagement_rate: 4.5, image_url: ''},
    {post_caption: 'Behind the scenes of our creative process.', likes: 18200, comments_count: 560, shares: 890, sentiment: 'Positive', engagement_rate: 3.8, image_url: ''},
    {post_caption: 'Customer appreciation week - special discounts inside!', likes: 32100, comments_count: 1200, shares: 2400, sentiment: 'Positive', engagement_rate: 5.2, image_url: ''},
    {post_caption: 'Addressing your concerns about recent delivery delays.', likes: 8900, comments_count: 2100, shares: 450, sentiment: 'Negative', engagement_rate: 6.1, image_url: ''},
    {post_caption: 'Meet our team! Get to know the people behind the brand.', likes: 15600, comments_count: 430, shares: 670, sentiment: 'Neutral', engagement_rate: 2.9, image_url: ''}
];

samplePosts.forEach(function(item) {
    var gr = new GlideRecord('x_1939553_smv_instagram_posts');
    gr.initialize();
    gr.post_caption = item.post_caption;
    gr.likes = item.likes;
    gr.comments_count = item.comments_count;
    gr.shares = item.shares;
    gr.sentiment = item.sentiment;
    gr.engagement_rate = item.engagement_rate;
    gr.image_url = item.image_url;
    gr.insert();
});

gs.print('Sample Instagram posts inserted successfully!');
