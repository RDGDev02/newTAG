import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Navbar , Hero } from './components'
import ParticleBg from './components/ParticleBg'

import Home from './pages/home';
import Dashboard from './pages/dashboard';
import DiscordLoginButton from './components/auth/DiscordLoginButton';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/callback" element={<DiscordLoginButton />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};
export default App;
