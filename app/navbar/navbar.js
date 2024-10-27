import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { 
  Favorite, 
  Menu as MenuIcon,
  Pets,
  Settings,
  BookmarkBorder,
  ChevronRight,
} from '@mui/icons-material';

const Navbar = ({ title }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Search Pets', icon: <Pets />, href: '/tinder-page' },
    { text: 'Preferences', icon: <Settings />, href: '/PreferencePage' },
    { text: 'Saved Pets', icon: <BookmarkBorder />, href: '' },
  ];

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#40a824', height: '80px', justifyContent: 'center' }}>
        <Toolbar sx={{ padding: '0 !important' }}>
          <Box 
            component="img" 
            src="/logo.png" 
            alt="Logo" 
            sx={{ 
              height: '80px',
              marginLeft: 0
            }} 
          />
          <Typography 
            variant="h4" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              textAlign: 'center', 
              fontWeight: 'bold',
              ml: -7.5 
            }}
          >
            {title}
          </Typography>
          <IconButton 
            color="inherit" 
            sx={{ 
              '& .MuiSvgIcon-root': { 
                fontSize: '3rem',
                '&:hover': {
                  color: 'rgb(219, 240, 219)'
                }
              }
            }}
          >
            <Favorite />
          </IconButton>
          <IconButton 
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{ 
              '& .MuiSvgIcon-root': { 
                fontSize: '3rem',
                '&:hover': {
                  color: 'rgb(219, 240, 219)'
                }
              },
              marginRight: '8px'
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            bgcolor: '#40a824',
            color: 'white',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 1,
          }}
        >
          <IconButton 
            onClick={toggleDrawer(false)}
            sx={{ 
              color: 'white',
              '&:hover': {
                color: 'rgb(219, 240, 219)'
              }
            }}
          >
            <ChevronRight sx={{ fontSize: '2rem' }} />
          </IconButton>
        </Box>
        <List sx={{ pt: 0 }}>
          {menuItems.map((item) => (
            <ListItem 
              key={item.text} 
              disablePadding
              sx={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <ListItemButton
                component="a"
                href={item.href}
                sx={{
                  py: 2,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 45 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '1.1rem',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;