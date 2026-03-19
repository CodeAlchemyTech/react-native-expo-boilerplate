import { useState, useEffect } from 'react';

/**
 * Debounces a value — useful for search inputs to avoid excessive API calls.
 *
 * Usage:
 *   const debouncedSearch = useDebounce(searchQuery, 400);
 *   useEffect(() => fetchResults(debouncedSearch), [debouncedSearch]);
 */
export function useDebounce<T>(value: T, delayMs: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}
