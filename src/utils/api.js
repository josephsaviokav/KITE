// Backend URL - Hosted on Render
const BACKEND_URL = "https://kite-r69x.onrender.com";

export const fetchSongs = async (query) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/search?q=${encodeURIComponent(query)}`);
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

export const fetchSongUrl = async (id) => {
  try {
    const response = await fetch(`${BACKEND_URL}/getSong?id=${encodeURIComponent(id)}`);
    if (!response.ok) throw new Error("Failed to fetch song URL");
    return await response.text();
  } catch (error) {
    console.error("Error fetching song URL:", error);
    return null;
  }
};
  
