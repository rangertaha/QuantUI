import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Paper,
  Grid,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress,
  Divider,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  ShowChart as ShowChartIcon,
  Refresh as RefreshIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Bot } from '../types/bot';
import ListView from '../components/views/List';
import DetailView from '../components/views/Detail';
import GraphView from '../components/views/Graph';

type ViewType = 'list' | 'detail' | 'graph';
type ActionType = 'start' | 'pause' | 'stop' | 'edit' | 'delete';
type ActionState = {
  type: ActionType;
  bot: Bot;
  status: 'success' | 'error';
  message: string;
};

const generateMockBots = (count: number): Bot[] => {
  const tradingPairs = [
    'BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'ADA/USDT', 'DOT/USDT',
    'AVAX/USDT', 'MATIC/USDT', 'LINK/USDT', 'UNI/USDT', 'ATOM/USDT',
    'LTC/USDT', 'XRP/USDT', 'DOGE/USDT', 'BNB/USDT', 'TRX/USDT',
    'EOS/USDT', 'XLM/USDT', 'VET/USDT', 'FIL/USDT', 'ALGO/USDT'
  ];

  const strategies = [
    'RSI + MACD', 'Bollinger Bands', 'Momentum + Volume', 'Grid Trading',
    'Dollar Cost Average', 'Trend Following', 'Mean Reversion', 'Breakout Trading',
    'Range Trading', 'RSI + EMA', 'Swing Trading', 'Momentum + RSI',
    'Fibonacci Retracement', 'Ichimoku Cloud', 'Stochastic Oscillator',
    'Volume Profile', 'Price Action', 'Support/Resistance', 'Moving Averages',
    'Parabolic SAR'
  ];

  const statuses: ('active' | 'paused' | 'stopped')[] = ['active', 'paused', 'stopped'];

  return Array.from({ length: count }, (_, index) => {
    const totalTrades = Math.floor(Math.random() * 300) + 50;
    const winRate = Math.random() * 0.4 + 0.4; // 40% to 80% win rate
    const wins = Math.floor(totalTrades * winRate);
    const losses = totalTrades - wins;

    return {
      id: (index + 14).toString(), // Start from 14 since we already have 13 bots
      name: `${tradingPairs[Math.floor(Math.random() * tradingPairs.length)]} ${strategies[Math.floor(Math.random() * strategies.length)].split(' ')[0]}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      strategy: strategies[Math.floor(Math.random() * strategies.length)],
      performance: {
        daily: Number((Math.random() * 8 - 2).toFixed(1)), // -2% to +6%
        weekly: Number((Math.random() * 20 - 5).toFixed(1)), // -5% to +15%
        monthly: Number((Math.random() * 40 - 10).toFixed(1)), // -10% to +30%
      },
      trades: {
        total: totalTrades,
        win: wins,
        loss: losses,
      },
      balance: Number((Math.random() * 20000 + 1000).toFixed(2)), // $1,000 to $21,000
    };
  });
};

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
  {
    id: '4',
    name: 'ADA/USDT Grid',
    status: 'active',
    strategy: 'Grid Trading',
    performance: {
      daily: 1.2,
      weekly: 4.5,
      monthly: 18.2,
    },
    trades: {
      total: 312,
      win: 187,
      loss: 125,
    },
    balance: 9250.00,
  },
  {
    id: '5',
    name: 'DOT/USDT DCA',
    status: 'stopped',
    strategy: 'Dollar Cost Average',
    performance: {
      daily: -0.8,
      weekly: -2.3,
      monthly: 5.7,
    },
    trades: {
      total: 45,
      win: 28,
      loss: 17,
    },
    balance: 5675.50,
  },
  {
    id: '6',
    name: 'AVAX/USDT Trend',
    status: 'active',
    strategy: 'Trend Following',
    performance: {
      daily: 4.2,
      weekly: 15.8,
      monthly: 32.5,
    },
    trades: {
      total: 178,
      win: 112,
      loss: 66,
    },
    balance: 15250.25,
  },
  {
    id: '7',
    name: 'MATIC/USDT Scalper',
    status: 'paused',
    strategy: 'RSI + Volume',
    performance: {
      daily: 1.5,
      weekly: 6.2,
      monthly: 14.8,
    },
    trades: {
      total: 267,
      win: 156,
      loss: 111,
    },
    balance: 7850.75,
  },
  {
    id: '8',
    name: 'LINK/USDT Mean Reversion',
    status: 'active',
    strategy: 'Mean Reversion',
    performance: {
      daily: 2.8,
      weekly: 9.5,
      monthly: 22.3,
    },
    trades: {
      total: 198,
      win: 123,
      loss: 75,
    },
    balance: 11250.00,
  },
  {
    id: '9',
    name: 'UNI/USDT Breakout',
    status: 'stopped',
    strategy: 'Breakout Trading',
    performance: {
      daily: -2.1,
      weekly: -5.4,
      monthly: 8.7,
    },
    trades: {
      total: 67,
      win: 35,
      loss: 32,
    },
    balance: 4325.50,
  },
  {
    id: '10',
    name: 'ATOM/USDT Range',
    status: 'active',
    strategy: 'Range Trading',
    performance: {
      daily: 1.8,
      weekly: 7.2,
      monthly: 16.5,
    },
    trades: {
      total: 145,
      win: 89,
      loss: 56,
    },
    balance: 6750.25,
  },
  {
    id: '11',
    name: 'LTC/USDT Scalper',
    status: 'active',
    strategy: 'RSI + EMA',
    performance: {
      daily: 2.2,
      weekly: 8.7,
      monthly: 19.3,
    },
    trades: {
      total: 189,
      win: 112,
      loss: 77,
    },
    balance: 9875.50,
  },
  {
    id: '12',
    name: 'XRP/USDT Swing',
    status: 'paused',
    strategy: 'Swing Trading',
    performance: {
      daily: -0.5,
      weekly: 2.8,
      monthly: 9.5,
    },
    trades: {
      total: 78,
      win: 45,
      loss: 33,
    },
    balance: 5675.25,
  },
  {
    id: '13',
    name: 'DOGE/USDT Momentum',
    status: 'active',
    strategy: 'Momentum + RSI',
    performance: {
      daily: 3.5,
      weekly: 14.2,
      monthly: 25.8,
    },
    trades: {
      total: 156,
      win: 98,
      loss: 58,
    },
    balance: 13250.75,
  },
  ...generateMockBots(100)
];

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [view, setView] = useState<ViewType>('list');
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionState, setActionState] = useState<ActionState | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleViewChange = useCallback((newView: ViewType) => {
    setView(newView);
    if (newView === 'list') {
      setSelectedBot(null);
    }
  }, []);

  const handleBotSelect = useCallback((bot: Bot) => {
    setSelectedBot(bot);
    setView('detail');
  }, []);

  const handleAction = useCallback(async (action: ActionType, bot: Bot) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setActionState({
        type: action,
        bot,
        status: 'success',
        message: `Successfully ${action}ed bot: ${bot.name}`
      });
    } catch (error) {
      setActionState({
        type: action,
        bot,
        status: 'error',
        message: `Failed to ${action} bot: ${bot.name}`
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Refresh data logic here
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredBots = mockBots.filter(bot => 
    bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bot.strategy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      p: { xs: 0.5, sm: 1 }, 
      gap: 1,
      mt: 8 // 64px = 8 * 8px (MUI's spacing unit)
    }}>
      {/* Header Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 1.5, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          bgcolor: 'background.default',
          borderRadius: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Trading Bots
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filteredBots.length} active bots
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Tooltip title="Search">
            <IconButton size="small">
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filters">
            <IconButton 
              size="small"
              onClick={() => setShowFilters(!showFilters)}
              color={showFilters ? 'primary' : 'default'}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton 
              size="small"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Paper>

      {/* Search and Filters Section */}
      {showFilters && (
        <Paper 
          elevation={0}
          sx={{ 
            p: 1.5,
            bgcolor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1
          }}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <SearchIcon sx={{ color: 'text.secondary' }} />
                <input
                  type="text"
                  placeholder="Search bots..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    background: 'transparent',
                    color: theme.palette.text.primary,
                    fontSize: '0.875rem'
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1}>
                <Button size="small" variant="outlined">Status</Button>
                <Button size="small" variant="outlined">Strategy</Button>
                <Button size="small" variant="outlined">Performance</Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        minHeight: 0, 
        position: 'relative',
        bgcolor: 'background.paper',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden'
      }}>
        {loading && (
          <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            zIndex: 1 
          }}>
            <CircularProgress size={24} />
          </Box>
        )}
        
        {view === 'list' && (
          <ListView
            bots={filteredBots}
            onBotSelect={handleBotSelect}
            onAction={handleAction}
            loading={loading}
          />
        )}
        
        {view === 'detail' && selectedBot && (
          <DetailView
            bot={selectedBot}
            onAction={handleAction}
            onBack={() => handleViewChange('list')}
            loading={loading}
          />
        )}
        
        {view === 'graph' && (
          <GraphView
            bots={filteredBots}
            loading={loading}
          />
        )}
      </Box>

      {/* Action Feedback */}
      <Snackbar
        open={Boolean(actionState)}
        autoHideDuration={6000}
        onClose={() => setActionState(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setActionState(null)} 
          severity={actionState?.status} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {actionState?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard; 