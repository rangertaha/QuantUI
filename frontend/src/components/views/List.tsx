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
            '&:hover': { color: 'primary.main' }
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
        const color = status === 'active' ? 'success.main' : 
                     status === 'paused' ? 'warning.main' : 'error.main';
        return (
          <Typography
            variant="body2"
            sx={{
              color,
              fontWeight: 500,
              textTransform: 'capitalize',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            {status}
          </Typography>
        );
      },
    },
    {
      field: 'strategy',
      headerName: 'STRATEGY',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'dailyPerformance',
      headerName: 'DAILY',
      width: 100,
      valueGetter: (params) => params.row.performance.daily,
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          color={params.value >= 0 ? 'success.main' : 'error.main'}
          sx={{ fontSize: '0.875rem' }}
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
          color={params.value >= 0 ? 'success.main' : 'error.main'}
          sx={{ fontSize: '0.875rem' }}
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
          color={params.value >= 0 ? 'success.main' : 'error.main'}
          sx={{ fontSize: '0.875rem' }}
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
    },
    {
      field: 'balance',
      headerName: 'BALANCE',
      minWidth: 80,
      valueGetter: (params) => params.row.balance,
      renderCell: (params: GridRenderCellParams) => (
        <Typography sx={{ fontSize: '0.875rem' }}>
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
      },
      '& .MuiDataGrid-row': {
        minHeight: '32px !important',
        borderBottom: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.15s ease-in-out',
        position: 'relative',
        '&:hover': {
          bgcolor: 'action.hover',
          cursor: 'pointer',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '3px',
            bgcolor: 'primary.main',
          },
          '& .MuiDataGrid-cell': {
            bgcolor: 'action.hover',
          },
        },
        '&.Mui-selected': {
          bgcolor: 'action.selected',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '3px',
            bgcolor: 'primary.main',
          },
          '&:hover': {
            bgcolor: 'action.selected',
            '& .MuiDataGrid-cell': {
              bgcolor: 'action.selected',
            },
          },
        },
        '&:nth-of-type(odd)': {
          bgcolor: 'background.default',
        },
        '&:nth-of-type(even)': {
          bgcolor: 'background.paper',
        },
      },
      '& .MuiDataGrid-cell': {
        borderColor: 'divider',
        py: 0,
        px: 1.5,
        fontSize: '0.875rem',
        fontWeight: 500,
        transition: 'background-color 0.15s ease-in-out',
        '&:focus': {
          outline: 'none',
        },
        '&.MuiDataGrid-cell--editing': {
          bgcolor: 'action.selected',
        },
      },
      '& .MuiDataGrid-columnHeader': {
        borderColor: 'divider',
        py: 0,
        px: 1.5,
        bgcolor: 'background.default',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        color: 'text.secondary',
        '&:focus': {
          outline: 'none',
        },
        '&:hover': {
          bgcolor: 'action.hover',
        },
      },
      '& .MuiDataGrid-columnHeaders': {
        borderBottom: '2px solid',
        borderColor: 'divider',
        minHeight: '40px !important',
        bgcolor: 'background.default',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      },
      '& .MuiDataGrid-footerContainer': {
        borderTop: '2px solid',
        borderColor: 'divider',
        minHeight: '40px !important',
        bgcolor: 'background.default',
        boxShadow: '0 -2px 4px rgba(0,0,0,0.05)',
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
        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
          fontSize: '0.75rem',
        },
      },
      '& .MuiDataGrid-selectedRowCount': {
        visibility: 'hidden',
      },
    }}>
      <DataGrid
        rows={bots}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={(params) => onBotSelect(params.row)}
        loading={loading}
        disableRowSelectionOnClick
        density="standard"
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
        }}
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
