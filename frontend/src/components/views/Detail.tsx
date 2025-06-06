import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  LinearProgress,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Bot } from '../../types/bot';

type ActionType = 'start' | 'pause' | 'stop' | 'edit' | 'delete';

interface DetailViewProps {
  bot: Bot;
  onBack: () => void;
  onAction: (action: ActionType, bot: Bot) => void;
  loading?: boolean;
}

const DetailView: React.FC<DetailViewProps> = ({ bot, onBack, onAction, loading = false }) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {loading && <LinearProgress />}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          size="small"
        >
          Back to List
        </Button>
        <Typography variant="h6">{bot.name}</Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Status
            </Typography>
            <Typography variant="body1">{bot.status}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Strategy
            </Typography>
            <Typography variant="body1">{bot.strategy}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Daily Performance
            </Typography>
            <Typography 
              variant="body1"
              color={bot.performance.daily >= 0 ? 'success.main' : 'error.main'}
            >
              {bot.performance.daily >= 0 ? '+' : ''}{bot.performance.daily}%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Weekly Performance
            </Typography>
            <Typography 
              variant="body1"
              color={bot.performance.weekly >= 0 ? 'success.main' : 'error.main'}
            >
              {bot.performance.weekly >= 0 ? '+' : ''}{bot.performance.weekly}%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Monthly Performance
            </Typography>
            <Typography 
              variant="body1"
              color={bot.performance.monthly >= 0 ? 'success.main' : 'error.main'}
            >
              {bot.performance.monthly >= 0 ? '+' : ''}{bot.performance.monthly}%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Trades
            </Typography>
            <Typography variant="body1">
              Total: {bot.trades.total} (Win: {bot.trades.win}, Loss: {bot.trades.loss})
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Balance
            </Typography>
            <Typography variant="body1">
              ${bot.balance.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailView;

