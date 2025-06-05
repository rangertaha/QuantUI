import { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Tabs,
  Tab,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ViewList as ListViewIcon,
  ViewModule as DetailViewIcon,
  TrendingUp,
  TrendingDown,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';

interface Bot {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'stopped';
  strategy: string;
  performance: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  trades: {
    total: number;
    win: number;
    loss: number;
  };
  balance: number;
}

const mockBots: Bot[] = [
  {
    id: '1',
    name: 'BTC/USDT Scalper',
    status: 'active',
    strategy: 'RSI + MACD',
    performance: {
      daily: 2.5,
      weekly: 8.3,
      monthly: 15.7,
    },
    trades: {
      total: 156,
      win: 98,
      loss: 58,
    },
    balance: 12500.50,
  },
  {
    id: '2',
    name: 'ETH/USDT Swing',
    status: 'paused',
    strategy: 'Bollinger Bands',
    performance: {
      daily: -1.2,
      weekly: 3.8,
      monthly: 12.4,
    },
    trades: {
      total: 89,
      win: 52,
      loss: 37,
    },
    balance: 8750.25,
  },
  {
    id: '3',
    name: 'SOL/USDT Momentum',
    status: 'active',
    strategy: 'Momentum + Volume',
    performance: {
      daily: 3.8,
      weekly: 12.5,
      monthly: 28.3,
    },
    trades: {
      total: 234,
      win: 145,
      loss: 89,
    },
    balance: 18750.75,
  },
];

export default function Dashboard() {
  const theme = useTheme();
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

  const handleViewChange = (newView: 'list' | 'detail') => {
    setView(newView);
  };

  const handleBotSelect = (bot: Bot) => {
    setSelectedBot(bot);
    setView('detail');
  };

  const ListView = () => (
    <TableContainer component={Paper} sx={{ height: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Bot Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Strategy</TableCell>
            <TableCell align="right">Daily %</TableCell>
            <TableCell align="right">Weekly %</TableCell>
            <TableCell align="right">Monthly %</TableCell>
            <TableCell align="right">Win Rate</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockBots.map((bot) => (
            <TableRow
              key={bot.id}
              hover
              onClick={() => handleBotSelect(bot)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell>{bot.name}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'inline-block',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    backgroundColor: bot.status === 'active' 
                      ? alpha(theme.palette.success.main, 0.1)
                      : bot.status === 'paused'
                      ? alpha(theme.palette.warning.main, 0.1)
                      : alpha(theme.palette.error.main, 0.1),
                    color: bot.status === 'active'
                      ? theme.palette.success.main
                      : bot.status === 'paused'
                      ? theme.palette.warning.main
                      : theme.palette.error.main,
                  }}
                >
                  {bot.status}
                </Box>
              </TableCell>
              <TableCell>{bot.strategy}</TableCell>
              <TableCell align="right" sx={{ color: bot.performance.daily >= 0 ? 'success.main' : 'error.main' }}>
                {bot.performance.daily >= 0 ? '+' : ''}{bot.performance.daily}%
              </TableCell>
              <TableCell align="right" sx={{ color: bot.performance.weekly >= 0 ? 'success.main' : 'error.main' }}>
                {bot.performance.weekly >= 0 ? '+' : ''}{bot.performance.weekly}%
              </TableCell>
              <TableCell align="right" sx={{ color: bot.performance.monthly >= 0 ? 'success.main' : 'error.main' }}>
                {bot.performance.monthly >= 0 ? '+' : ''}{bot.performance.monthly}%
              </TableCell>
              <TableCell align="right">
                {((bot.trades.win / bot.trades.total) * 100).toFixed(1)}%
              </TableCell>
              <TableCell align="right">${bot.balance.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const DetailView = () => {
    if (!selectedBot) return null;

    return (
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">{selectedBot.name}</Typography>
          <IconButton onClick={() => setView('list')}>
            <ArrowUpward />
          </IconButton>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Performance</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" color="text.secondary">Daily</Typography>
                    <Typography
                      variant="h6"
                      color={selectedBot.performance.daily >= 0 ? 'success.main' : 'error.main'}
                    >
                      {selectedBot.performance.daily >= 0 ? '+' : ''}{selectedBot.performance.daily}%
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" color="text.secondary">Weekly</Typography>
                    <Typography
                      variant="h6"
                      color={selectedBot.performance.weekly >= 0 ? 'success.main' : 'error.main'}
                    >
                      {selectedBot.performance.weekly >= 0 ? '+' : ''}{selectedBot.performance.weekly}%
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" color="text.secondary">Monthly</Typography>
                    <Typography
                      variant="h6"
                      color={selectedBot.performance.monthly >= 0 ? 'success.main' : 'error.main'}
                    >
                      {selectedBot.performance.monthly >= 0 ? '+' : ''}{selectedBot.performance.monthly}%
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Trading Statistics</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" color="text.secondary">Total Trades</Typography>
                    <Typography variant="h6">{selectedBot.trades.total}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" color="text.secondary">Win Rate</Typography>
                    <Typography variant="h6">
                      {((selectedBot.trades.win / selectedBot.trades.total) * 100).toFixed(1)}%
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" color="text.secondary">Balance</Typography>
                    <Typography variant="h6">${selectedBot.balance.toLocaleString()}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Strategy Details</Typography>
                <Typography variant="body1">{selectedBot.strategy}</Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: selectedBot.status === 'active' 
                        ? alpha(theme.palette.success.main, 0.1)
                        : selectedBot.status === 'paused'
                        ? alpha(theme.palette.warning.main, 0.1)
                        : alpha(theme.palette.error.main, 0.1),
                      color: selectedBot.status === 'active'
                        ? theme.palette.success.main
                        : selectedBot.status === 'paused'
                        ? theme.palette.warning.main
                        : theme.palette.error.main,
                    }}
                  >
                    {selectedBot.status}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1 }}>
          <Typography variant="h6">Trading Bots</Typography>
          <Box>
            <IconButton
              onClick={() => handleViewChange('list')}
              color={view === 'list' ? 'primary' : 'default'}
            >
              <ListViewIcon />
            </IconButton>
            <IconButton
              onClick={() => handleViewChange('detail')}
              color={view === 'detail' ? 'primary' : 'default'}
            >
              <DetailViewIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {view === 'list' ? <ListView /> : <DetailView />}
      </Box>
    </Box>
  );
} 