export interface Bot {
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