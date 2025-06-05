import { Box, Paper, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';

interface LoginOverlayProps {
  onLogin: () => void;
}

export default function Config({ onLogin }: LoginOverlayProps) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    if (credentials.username && credentials.password) {
      onLogin();
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 9999,
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
          Login to QuantUI
        </Typography>
        <TextField
          label="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          fullWidth
          required
        />
        <TextField
          label="Password"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
} 