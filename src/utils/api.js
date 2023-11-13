import axios from 'axios';

const BASE_URL = import.meta.env.VITE_DISCORD_API_URL;

const api = {
  // Example function to fetch user data
  getUserData: async () => {
    try {
      // Make a GET request to the server or API endpoint
      const response = await axios.get(`${BASE_URL}/user`);

      // Return the data from the response
      return response.data;
    } catch (error) {
      // Handle errors (you may want to log, throw, or handle errors based on your needs)
      console.error('Error fetching user data:', error);
      throw error;
    }
  },

};

export default api;
