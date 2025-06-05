import { ReactNode } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  InputBase,
  alpha,
  useMediaQuery,
  Menu,
  MenuItem,
  Popper,
  Paper,
  ClickAwayListener,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  SmartToy,
  ListAlt,
  AccountBalance,
  ShowChart,
  Settings,
  ChevronLeft as ChevronLeftIcon,
  Search as SearchIcon,
  AutoGraph as QuantIcon,
  Clear as ClearIcon,
  Person as ProfileIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const drawerWidth = 240;
const miniDrawerWidth = 65;

interface LayoutProps {
  children: ReactNode;
}

interface NavItem {
  text: string;
  icon: ReactNode;
  path: string;
}

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [searchQuery, setSearchQuery] = useState('');
  const [searchAnchorEl, setSearchAnchorEl] = useState<null | HTMLElement>(null);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Bots', icon: <SmartToy />, path: '/bots' },
    { text: 'Prices', icon: <ShowChart />, path: '/prices' },
    { text: 'Orders', icon: <ListAlt />, path: '/orders' },
    { text: 'Accounts', icon: <AccountBalance />, path: '/accounts' },
    { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
  ];

  const bottomMenuItems = [
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    
    // Simulate search results
    if (query.length > 0) {
      setSearchResults([
        `Search for "${query}" in Bots`,
        `Search for "${query}" in Orders`,
        `Search for "${query}" in Accounts`,
        `Search for "${query}" in Prices`,
      ]);
      setSearchAnchorEl(event.currentTarget);
    } else {
      setSearchResults([]);
      setSearchAnchorEl(null);
    }
  };

  const handleSearchClick = (result: string) => {
    // TODO: Implement search navigation
    console.log('Search clicked:', result);
    setSearchQuery('');
    setSearchResults([]);
    setSearchAnchorEl(null);
  };

  const handleSearchClose = () => {
    setSearchAnchorEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleNotificationsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenuClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    if (!searchQuery) {
      setIsSearchVisible(false);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar>
        {isCollapsed ? (
          <IconButton sx={{ color: 'primary.main' }}>
            <QuantIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <QuantIcon color="primary" />
            <Typography variant="h6" noWrap component="div">
              QuantUI
            </Typography>
          </Box>
        )}
      </Toolbar>
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              sx={{
                minHeight: 48,
                justifyContent: isCollapsed ? 'center' : 'initial',
                px: 2.5,
                '&.Mui-selected': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isCollapsed ? 'auto' : 3,
                  justifyContent: 'center',
                  color: location.pathname === item.path ? 'primary.main' : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {bottomMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              sx={{
                minHeight: 48,
                justifyContent: isCollapsed ? 'center' : 'initial',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isCollapsed ? 'auto' : 3,
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${isCollapsed ? miniDrawerWidth : drawerWidth}px)` },
          ml: { sm: `${isCollapsed ? miniDrawerWidth : drawerWidth}px` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          {isSearchVisible ? (
            <Box
              sx={{
                position: 'relative',
                borderRadius: 1,
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.05),
                },
                marginRight: 1,
                marginLeft: 0,
                width: '100%',
                [theme.breakpoints.up('sm')]: {
                  marginLeft: 0,
                  width: 'auto',
                },
                transition: theme.transitions.create(['background-color']),
                '&:focus-within': {
                  backgroundColor: alpha(theme.palette.common.white, 0.05),
                },
                height: 48,
              }}
            >
              <Box
                sx={{
                  padding: theme.spacing(0, 1),
                  height: '100%',
                  position: 'absolute',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: alpha(theme.palette.common.white, 0.7),
                }}
              >
                <SearchIcon sx={{ fontSize: 20 }} />
              </Box>
              <InputBase
                placeholder="Search bots, orders, accounts..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                autoFocus
                sx={{
                  color: 'inherit',
                  height: '100%',
                  '& .MuiInputBase-input': {
                    padding: theme.spacing(1, 1, 1, 0),
                    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
                    transition: theme.transitions.create('width'),
                    width: '100%',
                    [theme.breakpoints.up('md')]: {
                      width: '35ch',
                      '&:focus': {
                        width: '45ch',
                      },
                    },
                    fontSize: '0.95rem',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: alpha(theme.palette.common.white, 0.7),
                    opacity: 1,
                  },
                }}
              />
              {searchQuery && (
                <IconButton
                  size="small"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                    setSearchAnchorEl(null);
                    setIsSearchVisible(false);
                  }}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: alpha(theme.palette.common.white, 0.7),
                    '&:hover': {
                      color: theme.palette.common.white,
                    },
                    padding: 1,
                  }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          ) : (
            <IconButton
              color="inherit"
              onClick={() => setIsSearchVisible(true)}
              sx={{ mr: 1 }}
            >
              <SearchIcon />
            </IconButton>
          )}

          <Popper
            open={Boolean(searchAnchorEl) && searchResults.length > 0}
            anchorEl={searchAnchorEl}
            placement="bottom-start"
            sx={{ zIndex: 1300 }}
          >
            <ClickAwayListener onClickAway={() => {
              handleSearchClose();
              if (!searchQuery) {
                setIsSearchVisible(false);
              }
            }}>
              <Paper
                sx={{
                  mt: 1,
                  width: searchAnchorEl?.offsetWidth,
                  maxHeight: 300,
                  overflow: 'auto',
                }}
              >
                {searchResults.map((result, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleSearchClick(result);
                      setIsSearchVisible(false);
                    }}
                    sx={{
                      py: 1,
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      },
                    }}
                  >
                    {result}
                  </MenuItem>
                ))}
              </Paper>
            </ClickAwayListener>
          </Popper>

          {/* Spacer to push metrics to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Trading Metrics */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                BTC/USDT
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                $45,000.00
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                24h Change
              </Typography>
              <Typography variant="body1" sx={{ color: 'success.main', fontWeight: 600 }}>
                +2.5%
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                24h Volume
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                $1.2B
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                Market Cap
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                $875B
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                Dominance
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                52.3%
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                Open Interest
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                $18.5B
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ 
            
          width: { sm: isCollapsed ? miniDrawerWidth : drawerWidth }, 
          flexShrink: { sm: 0 },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: isCollapsed ? miniDrawerWidth : drawerWidth,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden',
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          m: 0,
          width: { sm: `calc(100% - ${isCollapsed ? miniDrawerWidth : drawerWidth}px)` },
          ml: 0,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          minHeight: '100vh',
          minWidth: '100vw',
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Toolbar sx={{ minHeight: '64px !important', m: 0, p: 0 }} />
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          m: 0,
          p: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}>
          {children}
        </Box>
        {/* Status Bar */}
        <Box
          sx={{
            height: '24px',
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            alignItems: 'center',
            px: 2,
            fontSize: '0.75rem',
            color: theme.palette.text.secondary,
          }}
        >
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'success.main',
                }}
              />
              <Typography variant="caption">System Online</Typography>
            </Box>
            <Typography variant="caption">Last Update: {new Date().toLocaleTimeString()}</Typography>
            <Typography variant="caption">API Status: Connected</Typography>
            <Typography variant="caption">Version: 1.0.0</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography variant="caption">Memory: 256MB / 1GB</Typography>
            <Typography variant="caption">CPU: 12%</Typography>
            <Typography variant="caption">Network: 1.2MB/s</Typography>
          </Box>
        </Box>
      </Box>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchorEl}
        open={Boolean(notificationsAnchorEl)}
        onClose={handleNotificationsMenuClose}
        PaperProps={{
          sx: {
            width: 320,
            maxHeight: 400,
            mt: 1.5,
          },
        }}
      >
        <MenuItem onClick={handleNotificationsMenuClose}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Notifications
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleNotificationsMenuClose}>
          <Box sx={{ width: '100%' }}>
            <Typography variant="body2">New trade executed</Typography>
            <Typography variant="caption" color="text.secondary">
              2 minutes ago
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleNotificationsMenuClose}>
          <Box sx={{ width: '100%' }}>
            <Typography variant="body2">Bot status changed</Typography>
            <Typography variant="caption" color="text.secondary">
              15 minutes ago
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleNotificationsMenuClose}>
          <Box sx={{ width: '100%' }}>
            <Typography variant="body2">System update available</Typography>
            <Typography variant="caption" color="text.secondary">
              1 hour ago
            </Typography>
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
} 