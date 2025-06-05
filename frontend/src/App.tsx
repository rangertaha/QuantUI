import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
        <LoginOverlay onLogin={() => setIsLoggedIn(true)} />
      </ThemeProvider>
    );
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
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
}
