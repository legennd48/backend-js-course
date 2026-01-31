/**
 * Week 6 Session 11: Introduction to HTTP & JSON APIs
 * HTTP Client module - fetching data from external APIs
 */

const https = require('https');
const http = require('http');

/**
 * Fetch JSON data from a URL
 * @param {string} url - The URL to fetch
 * @returns {Promise<object>} - Parsed JSON response
 */
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (err) {
          reject(new Error('Failed to parse JSON response'));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Fetch a user by ID from JSONPlaceholder API
 * @param {number} userId - The user ID
 * @returns {Promise<object>} - User object
 */
async function getUser(userId) {
  const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
  return fetchJSON(url);
}

/**
 * Fetch posts by user ID from JSONPlaceholder API
 * @param {number} userId - The user ID
 * @returns {Promise<object[]>} - Array of posts
 */
async function getUserPosts(userId) {
  const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  return fetchJSON(url);
}

/**
 * Fetch all todos from JSONPlaceholder API
 * @returns {Promise<object[]>} - Array of todos
 */
async function getAllTodos() {
  const url = 'https://jsonplaceholder.typicode.com/todos';
  return fetchJSON(url);
}

/**
 * Fetch comments for a specific post
 * @param {number} postId - The post ID
 * @returns {Promise<object[]>} - Array of comments
 */
async function getPostComments(postId) {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
  return fetchJSON(url);
}

module.exports = {
  fetchJSON,
  getUser,
  getUserPosts,
  getAllTodos,
  getPostComments
};
