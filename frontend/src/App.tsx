import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import Layout from './components/Layout';
import LoginOverlay from './components/overlays/Login';
import Dashboard from './pages/Dashboard';
import Bots from './pages/Bots';
import Orders from './pages/Orders';
import Accounts from './pages/Accounts';
import Prices from './pages/Prices';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import { useState } from 'react';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { getFontSize } from './utils/fontSize';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useKeyboardShortcuts();

  useEffect(() => {
    // Initialize font size from localStorage
    const fontSize = getFontSize();
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, []);

  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoginOverlay onLogin={() => setIsLoggedIn(true)} />
      </ThemeProvider>
    );
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bots" element={<Bots />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
};

export default App;
