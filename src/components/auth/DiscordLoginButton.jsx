import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DiscordLoginButton = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Step 1: Redirect the user to the Discord OAuth2 authorization URL
      window.location.href = `https://discord.com/oauth2/authorize?client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID}&scope=identify%20guilds%20guilds.members.read&response_type=code&redirect_uri=${encodeURIComponent(import.meta.env.VITE_DISCORD_REDIRECT_URI)}`;

      // Note: The user will be redirected back to the redirect_uri with a code parameter upon successful authorization.
    } catch (error) {
      console.error('Discord OAuth2 login error:', error);
    }
  };

  // Check if there is a code parameter in the URL (after the user is redirected back from Discord)
  useEffect(() => {
    const handleDiscordCallback = async () => {
      const code = new URLSearchParams(window.location.search).get('code');

      if (code) {
        try {
          // Step 2: Exchange the authorization code for an access token
          const response = await axios.post(
            'https://discord.com/api/oauth2/token',
            new URLSearchParams({
              client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
              client_secret: import.meta.env.VITE_DISCORD_CLIENT_SECRET,
              grant_type: 'authorization_code',
              code,
              redirect_uri: import.meta.env.VITE_DISCORD_REDIRECT_URI,
              scope: 'identify guilds', // Adjust scopes as needed
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );

          // Step 3: Use the access token to fetch user data or perform other actions
          const { access_token } = response.data;

          // Example: Fetch user data
          const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });

          const user = userResponse.data;

          // Example: Store user data in React Query cache
          queryClient.setQueryData('user', user);

          // Example: Navigate to the dashboard
           navigate('/dashboard', { state: { user } });

           
        } catch (error) {
          console.error('Discord OAuth2 token exchange error:', error);
        }
      }
    };

    handleDiscordCallback();
  }, [queryClient, navigate]);

  const handleLogout = () => {
    // Example: Clear user data from React Query cache
    queryClient.removeQueries('user');

    // Example: Redirect to the login page
    navigate('/');
  };

  useEffect(() => {
    // Check for an existing access token in local storage on page load
    const storedAccessToken = localStorage.getItem('discord_access_token');

    if (storedAccessToken) {
      // Fetch user data or perform other actions with the stored access token
      // Note: This is a simplified example; you might want to validate the access token with the Discord API
      const fetchUserData = async () => {
        try {
          const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
              Authorization: `Bearer ${storedAccessToken}`,
            },
          });

          const user = userResponse.data;

          // Example: Store user data in React Query cache
          queryClient.setQueryData('user', user);

          // Example: Navigate to the dashboard
          navigate('/dashboard', { state: { user } });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [queryClient, navigate]);
  
  return (
    <>
    {queryClient.getQueryData('user') ? (
      <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded inline-flex items-center">
        Logout
      </button>
    ) : (
      <button onClick={handleLogin} className="bg-gradient-to-r  from-indigo-500 text-white py-2 px-4 rounded inline-flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1 bi bi-discord" viewBox="0 0 16 16"> <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/> </svg>
        <span>Discord Login</span>
      </button>
    )}
  </>
  );
};

export default DiscordLoginButton;
