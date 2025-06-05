import { createTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

declare module '@mui/material/styles' {
  interface Components {
    MuiDataGrid?: {
      styleOverrides?: {
        root?: {
          border?: string;
          '& .MuiDataGrid-cell'?: {
            borderColor?: string;
          };
          '& .MuiDataGrid-columnHeaders'?: {
            backgroundColor?: string;
            borderColor?: string;
          };
        };
      };
    };
  }
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    success: {
      main: '#00C853',
      light: '#69F0AE',
      dark: '#009624',
    },
    error: {
      main: '#FF3D00',
      light: '#FF7539',
      dark: '#C30000',
    },
    warning: {
      main: '#FFD600',
      light: '#FFFF52',
      dark: '#C7A600',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 0,
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundImage: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          backgroundImage: 'none',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 200, 83, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(0, 200, 83, 0.12)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 500,
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgba(19, 47, 76, 0.4)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
  },
}); 