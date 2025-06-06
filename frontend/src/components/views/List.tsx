import React, { useState, useCallback } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  Chip,
  useTheme,
  Divider,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import { Bot } from '../../types/bot';

interface ListViewProps {
  bots: Bot[];
  onBotSelect: (bot: Bot) => void;
  onAction: (action: 'start' | 'pause' | 'stop' | 'edit' | 'delete', bot: Bot) => void;
  loading: boolean;
}

const ListView: React.FC<ListViewProps> = ({ bots, onBotSelect, onAction, loading }) => {
  const theme = useTheme();
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedBotForAction, setSelectedBotForAction] = useState<Bot | null>(null);

  const handleActionClick = useCallback((event: React.MouseEvent<HTMLElement>, bot: Bot) => {
    event.stopPropagation();
    setActionMenuAnchor(event.currentTarget);
    setSelectedBotForAction(bot);
  }, []);

  const handleActionClose = useCallback(() => {
    setActionMenuAnchor(null);
    setSelectedBotForAction(null);
  }, []);

  const handleAction = useCallback((action: 'start' | 'pause' | 'stop' | 'edit' | 'delete') => {
    if (selectedBotForAction) {
      onAction(action, selectedBotForAction);
      handleActionClose();
    }
  }, [selectedBotForAction, onAction, handleActionClose]);

  const handleRowClick = useCallback((params: GridRowParams) => {
    if (!actionMenuAnchor) {
      onBotSelect(params.row as Bot);
    }
  }, [onBotSelect, actionMenuAnchor]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'paused':
        return 'warning';
      case 'stopped':
        return 'error';
      default:
        return 'default';
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'NAME',
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          variant="body2"
          sx={{ 
            cursor: 'pointer',
            fontWeight: 600,
            color: '#ffffff',
            fontFamily: 'monospace',
            '&:hover': { 
              color: '#87ceeb',
              textShadow: '0 0 10px rgba(135, 206, 235, 0.5)',
            }
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'STATUS',
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        const status = params.value as string;
        const color = status === 'active' ? '#4caf50' : 
                     status === 'paused' ? '#b0e0e6' : '#ff6b6b';
        return (
          <Chip
            label={status}
            size="small"
            sx={{
              bgcolor: 'transparent',
              color,
              fontWeight: 600,
              textTransform: 'capitalize',
              height: '20px',
              '& .MuiChip-label': {
                px: 1,
                fontSize: '0.75rem',
                fontFamily: 'monospace',
              },
            }}
          />
        );
      },
    },
    {
      field: 'strategy',
      headerName: 'STRATEGY',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          variant="body2"
          sx={{
            color: '#87ceeb',
            fontWeight: 500,
            fontFamily: 'monospace',
            fontSize: '0.8125rem',
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'dailyPerformance',
      headerName: 'DAILY',
      width: 100,
      valueGetter: (params) => params.row.performance.daily,
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          sx={{
            color: params.value >= 0 ? '#87ceeb' : '#ff6b6b',
            fontSize: '0.875rem',
            fontWeight: 600,
            fontFamily: 'monospace',
          }}
        >
          {params.value >= 0 ? '+' : ''}{params.value}%
        </Typography>
      ),
    },
    {
      field: 'weeklyPerformance',
      headerName: 'WEEKLY',
      width: 100,
      valueGetter: (params) => params.row.performance.weekly,
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          sx={{
            color: params.value >= 0 ? '#87ceeb' : '#ff6b6b',
            fontSize: '0.875rem',
            fontWeight: 600,
            fontFamily: 'monospace',
          }}
        >
          {params.value >= 0 ? '+' : ''}{params.value}%
        </Typography>
      ),
    },
    {
      field: 'monthlyPerformance',
      headerName: 'MONTHLY',
      width: 100,
      valueGetter: (params) => params.row.performance.monthly,
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          sx={{
            color: params.value >= 0 ? '#87ceeb' : '#ff6b6b',
            fontSize: '0.875rem',
            fontWeight: 600,
            fontFamily: 'monospace',
          }}
        >
          {params.value >= 0 ? '+' : ''}{params.value}%
        </Typography>
      ),
    },
    {
      field: 'trades',
      headerName: 'TRADES',
      width: 120,
      valueGetter: (params) => `${params.row.trades.total} (${params.row.trades.win}/${params.row.trades.loss})`,
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 500,
            fontFamily: 'monospace',
            color: '#87ceeb',
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'balance',
      headerName: 'BALANCE',
      minWidth: 80,
      valueGetter: (params) => params.row.balance,
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            fontFamily: 'monospace',
            color: '#ffffff',
          }}
        >
          ${params.value.toLocaleString()}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: '',
      width: 5,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title="Actions">
          <IconButton
            size="small"
            onClick={(e) => handleActionClick(e, params.row as Bot)}
            sx={{
              color: '#87ceeb',
              '&:hover': {
                color: '#ffffff',
                bgcolor: 'rgba(135, 206, 235, 0.1)',
                boxShadow: '0 0 10px rgba(135, 206, 235, 0.3)',
              },
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex', 
      flexDirection: 'column',
      '& .MuiDataGrid-root': {
        border: 'none',
        height: '100%',
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        '& .MuiDataGrid-main': {
          bgcolor: 'rgba(0, 0, 0, 0.9)',
        },
      },
      '& .MuiDataGrid-row': {
        minHeight: '28px !important',
        maxHeight: '28px !important',
        borderBottom: '1px solid',
        borderColor: 'rgba(135, 206, 235, 0.1)',
        transition: 'all 0.2s ease-in-out',
        position: 'relative',
        '&:hover': {
          bgcolor: 'rgba(135, 206, 235, 0.02)',
          cursor: 'pointer',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '2px',
            bgcolor: '#87ceeb',
            boxShadow: '0 0 10px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
          },
        },
        '&.Mui-selected': {
          bgcolor: 'rgba(135, 206, 235, 0.05)',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '2px',
            bgcolor: '#87ceeb',
            boxShadow: '0 0 10px rgba(135, 206, 235, 0.3), 0 0 20px rgba(135, 206, 235, 0.1)',
          },
          '&:hover': {
            bgcolor: 'rgba(135, 206, 235, 0.08)',
          },
        },
        '&:nth-of-type(odd)': {
          bgcolor: 'rgba(0, 0, 0, 0.8)',
        },
        '&:nth-of-type(even)': {
          bgcolor: 'rgba(0, 0, 0, 0.9)',
        },
      },
      '& .MuiDataGrid-cell': {
        borderColor: 'transparent',
        py: 0,
        px: 1,
        fontSize: '0.8125rem',
        fontWeight: 500,
        color: '#e0e0e0',
        transition: 'all 0.2s ease-in-out',
        '&:focus': {
          outline: 'none',
        },
        '&.MuiDataGrid-cell--editing': {
          bgcolor: 'transparent',
        },
      },
      '& .MuiDataGrid-columnHeader': {
        borderColor: 'rgba(135, 206, 235, 0.1)',
        py: 0,
        px: 1,
        bgcolor: 'rgba(1, 16, 30, 0.95)',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#87ceeb',
        '&:focus': {
          outline: 'none',
        },
        '&:hover': {
          bgcolor: 'rgba(135, 206, 235, 0.05)',
        },
      },
      '& .MuiDataGrid-columnHeaders': {
        borderBottom: '2px solid',
        borderColor: '#87ceeb',
        minHeight: '32px !important',
        maxHeight: '32px !important',
        bgcolor: 'rgba(1, 16, 30, 0.95)',
        boxShadow: '0 0 10px rgba(135, 206, 235, 0.2)',
      },
      '& .MuiDataGrid-footerContainer': {
        borderTop: '2px solid',
        borderColor: '#87ceeb',
        minHeight: '32px !important',
        maxHeight: '32px !important',
        bgcolor: 'rgba(1, 16, 30, 0.95)',
        boxShadow: '0 0 10px rgba(135, 206, 235, 0.2)',
      },
      '& .MuiDataGrid-virtualScroller': {
        '& .MuiDataGrid-virtualScrollerContent': {
          paddingBottom: '0 !important',
          paddingTop: '0 !important',
          marginBottom: '0 !important',
          marginTop: '0 !important',
        },
      },
      '& .MuiDataGrid-columnSeparator': {
        display: 'none',
      },
      '& .MuiDataGrid-cell:focus': {
        outline: 'none',
      },
      '& .MuiDataGrid-columnHeader:focus': {
        outline: 'none',
      },
      '& .MuiDataGrid-pagination': {
        fontSize: '0.75rem',
        color: '#e0e0e0',
        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
          fontSize: '0.75rem',
          color: '#e0e0e0',
        },
        '& .MuiTablePagination-select': {
          color: '#87ceeb',
        },
        '& .MuiTablePagination-selectIcon': {
          color: '#87ceeb',
        },
      },
      '& .MuiDataGrid-selectedRowCount': {
        visibility: 'hidden',
      },
      '& .MuiDataGrid-menuIcon': {
        color: '#87ceeb',
        '&:hover': {
          color: '#ffffff',
        },
      },
      '& .MuiDataGrid-sortIcon': {
        color: '#87ceeb',
      },
      '& .MuiDataGrid-filterIcon': {
        color: '#87ceeb',
        '&:hover': {
          color: '#ffffff',
        },
      },
    }}>
      <DataGrid
        rows={bots}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={(params) => onBotSelect(params.row)}
        loading={loading}
        disableRowSelectionOnClick
        density="compact"
        initialState={{
          pagination: {
            paginationModel: { pageSize: 15, page: 0 },
          },
        }}
        pageSizeOptions={[15, 30, 60]}
        sx={{
          '& .MuiDataGrid-pagination': {
            fontSize: '0.75rem',
          },
          '& .MuiDataGrid-row': {
            '&[data-status="stopped"]': {
              bgcolor: 'rgba(255, 107, 107, 0.05) !important',
              '&:hover': {
                bgcolor: 'rgba(255, 107, 107, 0.08) !important',
              },
              '&.Mui-selected': {
                bgcolor: 'rgba(255, 107, 107, 0.1) !important',
                '&:hover': {
                  bgcolor: 'rgba(255, 107, 107, 0.15) !important',
                },
              },
            },
          },
        }}
        getRowClassName={(params) => `status-${params.row.status}`}
      />
      {actionMenuAnchor && (
        <Menu
          anchorEl={actionMenuAnchor}
          open={Boolean(actionMenuAnchor)}
          onClose={handleActionClose}
          onClick={handleActionClose}
        >
          <MenuItem onClick={() => handleAction('start')}>
            <PlayArrowIcon fontSize="small" sx={{ mr: 1 }} /> Start
          </MenuItem>
          <MenuItem onClick={() => handleAction('pause')}>
            <PauseIcon fontSize="small" sx={{ mr: 1 }} /> Pause
          </MenuItem>
          <MenuItem onClick={() => handleAction('stop')}>
            <StopIcon fontSize="small" sx={{ mr: 1 }} /> Stop
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleAction('edit')}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem onClick={() => handleAction('delete')} sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
};

export default ListView;
