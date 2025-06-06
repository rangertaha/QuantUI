import React from 'react';
import { Box, Paper, Typography, Grid, LinearProgress, CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Bot } from '../../types/bot';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraphViewProps {
  bots: Bot[];
  loading: boolean;
}

const GraphView: React.FC<GraphViewProps> = ({ bots, loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Mock data for the graph
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Performance',
        data: [0, 10, 5, 15, 10, 20],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Paper sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          Performance History
        </Typography>
        <Box sx={{ flex: 1, minHeight: 0 }}>
          <Line data={data} options={options} />
        </Box>
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Daily Performance
            </Typography>
            <Typography variant="h6" color={bots[0].performance.daily >= 0 ? 'success.main' : 'error.main'}>
              {bots[0].performance.daily >= 0 ? '+' : ''}{bots[0].performance.daily}%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Weekly Performance
            </Typography>
            <Typography variant="h6" color={bots[0].performance.weekly >= 0 ? 'success.main' : 'error.main'}>
              {bots[0].performance.weekly >= 0 ? '+' : ''}{bots[0].performance.weekly}%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Monthly Performance
            </Typography>
            <Typography variant="h6" color={bots[0].performance.monthly >= 0 ? 'success.main' : 'error.main'}>
              {bots[0].performance.monthly >= 0 ? '+' : ''}{bots[0].performance.monthly}%
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GraphView;
