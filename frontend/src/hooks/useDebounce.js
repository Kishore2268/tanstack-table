import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing values
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  /**
   * Effect to debounce the value
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value); // Set the debounced value
    }, delay); // Set the delay

    return () => {
      clearTimeout(timer); // Clear the timeout when the component unmounts
    };
  }, [value, delay]); // Run the effect when the value or delay changes

  return debouncedValue;
}; 