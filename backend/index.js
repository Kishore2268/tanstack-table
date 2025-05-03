const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

// Initialize our Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing for our API
app.use(cors());
app.use(express.json());

// Store our users data in memory
let users = [];

// Function to load users from our JSON file when server starts
const loadUsers = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'users.json'), 'utf8');
    users = JSON.parse(data);
  } catch (error) {
    console.error('Error loading users:', error);
  }
};

// Load users data when server starts
loadUsers();

// Helper function to sort users by any field
// sortOrder can be 'asc' for ascending or 'desc' for descending
const sortUsers = (users, sortBy, sortOrder) => {
  return [...users].sort((a, b) => {
    const aValue = a[sortBy]?.toLowerCase() || '';
    const bValue = b[sortBy]?.toLowerCase() || '';
    return sortOrder === 'asc' 
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });
};

// Helper function to search users by name or email
// Returns filtered users that match the search term
const searchUsers = (users, searchTerm) => {
  if (!searchTerm) return users;
  const term = searchTerm.toLowerCase();
  return users.filter(user => 
    user.name?.toLowerCase().includes(term) ||
    user.email?.toLowerCase().includes(term)
  );
};

// Main API endpoint for getting paginated users
// Supports pagination, sorting, and searching
app.get('/api/users', (req, res) => {
  try {
    // Get query parameters with default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const sortBy = req.query.sortBy || 'name';
    const sortOrder = req.query.sortOrder || 'asc';
    const searchTerm = req.query.search || '';

    // Validate pagination parameters
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Invalid page or limit' });
    }

    // First apply search filter to get matching users
    let filteredUsers = searchUsers(users, searchTerm);
    const total = filteredUsers.length;

    // Then sort the filtered users
    filteredUsers = sortUsers(filteredUsers, sortBy, sortOrder);

    // Finally apply pagination to get the current page of users
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    // Send response with paginated data and metadata
    res.json({
      data: paginatedUsers,
      total,
      page,
      limit
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 