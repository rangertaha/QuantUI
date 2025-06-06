import { createTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

declare module '@mui/material/styles' {
  interface Components {
    MuiDataGrid?: {
      styleOverrides?: {
        root?: {
          border?: string;
          backgroundColor?: string;
          backdropFilter?: string;
          borderRadius?: string;
          overflow?: string;
          '& .MuiDataGrid-cell'?: {
            borderColor?: string;
          };
          '& .MuiDataGrid-row'?: {
            backgroundColor?: string;
            '&:hover'?: {
              backgroundColor?: string;
              '&::before'?: {
                content?: string;
                position?: string;
                left?: string;
                top?: string;
                bottom?: string;
                width?: string;
                background?: string;
                boxShadow?: string;
              };
            };
            '&.Mui-selected'?: {
              backgroundColor?: string;
              '&:hover'?: {
                backgroundColor?: string;
              };
            };
          };
          '& .MuiDataGrid-columnHeaders'?: {
            backgroundColor?: string;
            borderColor?: string;
          };
          '& .MuiDataGrid-footerContainer'?: {
            backgroundColor?: string;
            borderColor?: string;
          };
          '& .MuiDataGrid-virtualScroller'?: {
            backgroundColor?: string;
          };
          '& .MuiDataGrid-virtualScrollerContent'?: {
            backgroundColor?: string;
          };
          '& .MuiDataGrid-virtualScrollerRenderZone'?: {
            backgroundColor?: string;
          };
          '& .MuiDataGrid-columnSeparator'?: {
            display?: string;
          };
          '& .MuiDataGrid-cell:focus'?: {
            outline?: string;
          };
          '& .MuiDataGrid-columnHeader:focus'?: {
            outline?: string;
          };
          '& .MuiDataGrid-columnHeader:focus-within'?: {
            outline?: string;
          };
        };
      };
    };
  }
}

const cyberpunkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#87ceeb',
      light: '#a5d8f3',
      dark: '#5fa3d4',
      contrastText: '#000000',
    },
    secondary: {
      main: '#b0e0e6',
      light: '#c5e8ed',
      dark: '#8bc8d0',
      contrastText: '#000000',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#b0e0e6',
      light: '#c5e8ed',
      dark: '#8bc8d0',
      contrastText: '#000000',
    },
    error: {
      main: '#ff6b6b',
      light: '#ff8a8a',
      dark: '#cc5555',
      contrastText: '#ffffff',
    },
    background: {
      default: 'rgba(255, 255, 255, 0.08)',
      paper: 'rgba(1, 16, 30, 0.08)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e0e0e0',
    },
  },
  typography: {
    fontFamily: '"Roboto Mono", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Roboto Mono", monospace',
      fontWeight: 700,
      letterSpacing: '1px',
      textShadow: '0 0 10px rgba(135, 206, 235, 0.5), 0 0 20px rgba(135, 206, 235, 0.3)',
    },
    h2: {
      fontFamily: '"Roboto Mono", monospace',
      fontWeight: 700,
      letterSpacing: '1px',
      textShadow: '0 0 8px rgba(135, 206, 235, 0.4), 0 0 16px rgba(135, 206, 235, 0.2)',
    },
    h3: {
      fontFamily: '"Roboto Mono", monospace',
      fontWeight: 700,
      letterSpacing: '0.75px',
      textShadow: '0 0 6px rgba(135, 206, 235, 0.3), 0 0 12px rgba(135, 206, 235, 0.1)',
    },
    h4: {
      fontFamily: '"Roboto Mono", monospace',
      fontWeight: 600,
      letterSpacing: '0.75px',
      textShadow: '0 0 4px rgba(135, 206, 235, 0.2), 0 0 8px rgba(135, 206, 235, 0.1)',
    },
    h5: {
      fontFamily: '"Roboto Mono", monospace',
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
    h6: {
      fontFamily: '"Roboto Mono", monospace',
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
    subtitle1: {
      fontFamily: '"Roboto Mono", monospace',
      letterSpacing: '0.5px',
      fontWeight: 500,
    },
    subtitle2: {
      fontFamily: '"Roboto Mono", monospace',
      letterSpacing: '0.5px',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Roboto Mono", monospace',
      letterSpacing: '0.25px',
    },
    body2: {
      fontFamily: '"Roboto Mono", monospace',
      letterSpacing: '0.25px',
    },
    button: {
      fontFamily: '"Roboto Mono", monospace',
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'rgba(1, 16, 30, 0)',
          backgroundImage: `
            linear-gradient(rgba(135, 206, 235, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(135, 206, 235, 0.05) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(135, 206, 235, 0.02) 0%, transparent 50%),
            linear-gradient(45deg, rgba(135, 206, 235, 0.01) 25%, transparent 25%, transparent 50%, rgba(135, 206, 235, 0.01) 50%, rgba(135, 206, 235, 0.01) 75%, transparent 75%, transparent)
          `,
          backgroundSize: '20px 20px, 20px 20px, 100% 100%, 40px 40px',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // background: 'radial-gradient(circle at 50% 50%, rgba(135, 206, 235, 0.03) 0%, transparent 50%)',
            pointerEvents: 'none',
            zIndex: 0,
          },
          '&::after': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // background: 'linear-gradient(45deg, rgba(135, 206, 235, 0.01) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 0,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(1, 16, 30, 0)',
          boxShadow: '0 0 20px rgba(135, 206, 235, 0.1)',
          backdropFilter: 'blur(10px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '1px solid rgba(135, 206, 235, 0.1)',
            borderRadius: 'inherit',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // background: 'linear-gradient(45deg, transparent, rgba(135, 206, 235, 0.05), transparent)',
            pointerEvents: 'none',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: '0.5px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // background: 'linear-gradient(45deg, transparent, rgba(135, 206, 235, 0.1), transparent)',
            transform: 'translateX(-100%)',
            transition: 'transform 0.6s ease',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '1px solid rgba(135, 206, 235, 0.2)',
            borderRadius: 'inherit',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover': {
            boxShadow: '0 0 15px rgba(135, 206, 235, 0.4)',
            '&::before': {
              transform: 'translateX(100%)',
            },
            '&::after': {
              opacity: 1,
            },
          },
        },
        contained: {
          background: 'linear-gradient(45deg, rgba(1, 16, 30, 0.5), rgba(135, 206, 235, 0.1))',
          '&:hover': {
            background: 'linear-gradient(45deg, rgba(1, 16, 30, 0.5), rgba(135, 206, 235, 0.2))',
            boxShadow: '0 0 20px rgba(135, 206, 235, 0.5)',
          },
        },
        outlined: {
          borderColor: 'rgba(135, 206, 235, 0.3)',
          '&:hover': {
            borderColor: 'rgba(135, 206, 235, 0.5)',
            boxShadow: '0 0 15px rgba(135, 206, 235, 0.3)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(135, 206, 235, 0.1) 0%, transparent 70%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '1px solid rgba(135, 206, 235, 0.2)',
            borderRadius: '50%',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover': {
            backgroundColor: 'rgba(135, 206, 235, 0.1)',
            boxShadow: '0 0 15px rgba(135, 206, 235, 0.4)',
            '&::before': {
              opacity: 1,
            },
            '&::after': {
              opacity: 1,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 600,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent, rgba(135, 206, 235, 0.1), transparent)',
            transform: 'translateX(-100%)',
            transition: 'transform 0.6s ease',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '1px solid rgba(135, 206, 235, 0.2)',
            borderRadius: 'inherit',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover': {
            boxShadow: '0 0 15px rgba(135, 206, 235, 0.4)',
            '&::before': {
              transform: 'translateX(100%)',
            },
            '&::after': {
              opacity: 1,
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            transition: 'all 0.3s ease',
            '& fieldset': {
              borderColor: 'rgba(135, 206, 235, 0.3)',
              transition: 'all 0.3s ease',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(135, 206, 235, 0.5)',
              boxShadow: '0 0 10px rgba(135, 206, 235, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#87ceeb',
              boxShadow: '0 0 15px rgba(135, 206, 235, 0.4)',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(135, 206, 235, 0.3)',
            transition: 'all 0.3s ease',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(135, 206, 235, 0.5)',
            boxShadow: '0 0 10px rgba(135, 206, 235, 0.2)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#87ceeb',
            boxShadow: '0 0 15px rgba(135, 206, 235, 0.4)',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(135, 206, 235, 0.1)',
            boxShadow: '0 0 10px rgba(135, 206, 235, 0.2)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(135, 206, 235, 0.2)',
            boxShadow: '0 0 15px rgba(135, 206, 235, 0.3)',
            '&:hover': {
              backgroundColor: 'rgba(135, 206, 235, 0.25)',
              boxShadow: '0 0 20px rgba(135, 206, 235, 0.4)',
            },
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(1, 16, 30, 0.9)',
          border: '1px solid rgba(135, 206, 235, 0.3)',
          boxShadow: '0 0 15px rgba(135, 206, 235, 0.3)',
          fontSize: '0.75rem',
          padding: '8px 12px',
          backdropFilter: 'blur(5px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent, rgba(135, 206, 235, 0.05), transparent)',
            pointerEvents: 'none',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(135, 206, 235, 0.1)',
          '&::before, &::after': {
            borderColor: 'rgba(135, 206, 235, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(1, 16, 30, 0.9)',
          border: '1px solid rgba(135, 206, 235, 0.1)',
          boxShadow: '0 0 20px rgba(135, 206, 235, 0.1)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent, rgba(135, 206, 235, 0.05), transparent)',
            pointerEvents: 'none',
          },
          '&:hover': {
            boxShadow: '0 0 30px rgba(135, 206, 235, 0.2)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(1, 16, 30, 0.95)',
          boxShadow: '0 0 20px rgba(135, 206, 235, 0.1)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(135, 206, 235, 0.1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent, rgba(135, 206, 235, 0.05), transparent)',
            pointerEvents: 'none',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(1, 16, 30, 0.95)',
          borderRight: '1px solid rgba(135, 206, 235, 0.1)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 20px rgba(135, 206, 235, 0.1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent, rgba(135, 206, 235, 0.05), transparent)',
            pointerEvents: 'none',
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          '& .MuiListItem-root': {
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(135, 206, 235, 0.1)',
              boxShadow: '0 0 10px rgba(135, 206, 235, 0.2)',
            },
            '&.Mui-selected': {
              backgroundColor: 'rgba(135, 206, 235, 0.2)',
              boxShadow: '0 0 15px rgba(135, 206, 235, 0.3)',
              '&:hover': {
                backgroundColor: 'rgba(135, 206, 235, 0.25)',
                boxShadow: '0 0 20px rgba(135, 206, 235, 0.4)',
              },
            },
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 20, 40, 0.3)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(135, 206, 235, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          '& .MuiDataGrid-cell': {
            borderColor: 'transparent',
          },
          '& .MuiDataGrid-row': {
            backgroundColor: 'rgba(0, 20, 40, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(135, 206, 235, 0.02)',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: '0',
                top: '0',
                bottom: '0',
                width: '2px',
                background: 'linear-gradient(to bottom, rgba(135, 206, 235, 0.5), rgba(135, 206, 235, 0.2))',
                boxShadow: '0 0 8px rgba(135, 206, 235, 0.3)',
              },
            },
            '&.Mui-selected': {
              backgroundColor: 'rgba(135, 206, 235, 0.05)',
              '&:hover': {
                backgroundColor: 'rgba(135, 206, 235, 0.08)',
              },
            },
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgba(0, 20, 40, 0.4)',
            borderColor: 'rgba(135, 206, 235, 0.1)',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: 'rgba(0, 20, 40, 0.4)',
            borderColor: 'rgba(135, 206, 235, 0.1)',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: 'transparent',
          },
          '& .MuiDataGrid-virtualScrollerContent': {
            backgroundColor: 'transparent',
          },
          '& .MuiDataGrid-virtualScrollerRenderZone': {
            backgroundColor: 'transparent',
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
          '& .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none',
          },
        },
      },
    },
  },
});

export default cyberpunkTheme; 