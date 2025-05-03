import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

/**
 * Custom hook for fetching and managing paginated users with sorting and searching
 * This hook handles all the data fetching, pagination, sorting, and searching logic
 */
export const usePaginatedUsers = (initialLimit = 50) => {
  const [users, setUsers] = useState([]); // State to store the users data
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(null); // State to store any errors
  const [page, setPage] = useState(1); // State to manage the current page number
  const [hasMore, setHasMore] = useState(true); // State to track if there are more users to load
  const [total, setTotal] = useState(0); // State to store the total number of users
  const [sortBy, setSortBy] = useState('name'); // State to manage the sorting column
  const [sortOrder, setSortOrder] = useState('asc'); // State to manage the sorting order
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term

  /**
   * Fetches users data from the API
   */
  const fetchUsers = useCallback(async (pageNum) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(API_URL, {
        params: {
          page: pageNum,
          limit: initialLimit,
          sortBy,
          sortOrder,
          search: searchTerm
        }
      });
      
      const { data, total: totalUsers } = response.data;
      
      setTotal(totalUsers);
      setHasMore(pageNum * initialLimit < totalUsers);
      
      if (pageNum === 1) {
        setUsers(data);
      } else {
        setUsers(prev => [...prev, ...data]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [initialLimit, sortBy, sortOrder, searchTerm]);

  /**
   * Effect to reset pagination when sorting or searching changes
   */
  useEffect(() => {
    setPage(1);
    setUsers([]);
    fetchUsers(1);
  }, [sortBy, sortOrder, searchTerm, fetchUsers]);

  /**
   * Loads more users when the user scrolls near the bottom of the list
   */
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1); // Increment the page number
      fetchUsers(page + 1); // Fetch the next page of users
    }
  }, [loading, hasMore, page, fetchUsers]);

  /**
   * Toggles the sorting order between ascending and descending
   */
  const toggleSort = useCallback((column) => {
    setSortBy(column); // Set the sorting column
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc'); // Toggle the sorting order
  }, []);

  return {
    users,
    loading,
    error,
    hasMore,
    loadMore,
    total,
    sortBy,
    sortOrder,
    searchTerm,
    setSearchTerm,
    toggleSort
  };
}; 