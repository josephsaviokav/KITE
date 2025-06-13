// src/utils/api.js
export const fetchSongs = async (query) => {
  try {
    const response = await fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
};