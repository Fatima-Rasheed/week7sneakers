'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  InputBase,
  Collapse,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { useGetCartQuery } from '@/services/api';

interface NavbarProps {
  onSearch?: (query: string) => void;
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export default function Navbar({
  onSearch,
  activeCategory = 'ALL',
  onCategoryChange,
}: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: cart } = useGetCartQuery();
  const cartCount =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  // ✅ ICON IMAGES — kept exactly as before for search, user, cart
  const icons = {
    search: '/поиск.png ',
    user: '/войти.png',
    cart: '/корзина.png',
  };

  const handleSearchToggle = () => {
    if (searchOpen) {
      setSearchOpen(false);
      setSearchQuery('');
      onSearch?.('');
    } else {
      setSearchOpen(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch?.(val);
  };

  const navItems = [
    { label: 'WOMAN', category: 'woman' },
    { label: 'MEN', category: 'men' },
    { label: 'ALL', category: 'ALL' },
  ];

  const drawerItems = [
    { label: 'ALL', category: 'ALL' },
    { label: 'WOMAN', category: 'woman' },
    { label: 'MEN', category: 'men' },
    { label: 'WORKOUT', category: 'workout' },
    { label: 'RUN', category: 'run' },
    { label: 'FOOTBALL', category: 'football' },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'white',
          color: 'black',
          borderBottom: '1px solid #e0e0e0',
          zIndex: 1200,
        }}
      >
        <Box sx={{ maxWidth: '1400px', width: '100%', mx: 'auto' }}>
          <Toolbar
            sx={{
              position: 'relative',
              height: '79px',
              minHeight: '79px !important',
              px: { xs: 2, md: 4 },
            }}
          >
            {/* MOBILE MENU — MUI MenuIcon */}
            <IconButton
              sx={{
                display: { xs: 'flex', md: 'none' },
                position: 'absolute',
                left: 16,
                color: 'black',
              }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon sx={{ fontSize: 26 }} />
            </IconButton>

            {/* LEFT NAV */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: { md: 4, lg: '50px' },
                ml: { md: 2, lg: 4 },
              }}
            >
              {navItems.map((item) => (
                <Box
                  key={item.label}
                  onClick={() => onCategoryChange?.(item.category)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    height: '22px',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight:
                        activeCategory === item.category ? 700 : 400,
                      fontSize: '18px',
                      lineHeight: '100%',
                      textAlign: 'center',
                      color: '#000',
                      borderBottom:
                        activeCategory === item.category
                          ? '2px solid black'
                          : 'none',
                      pb: '4px',
                      '&:hover': { color: '#666' },
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* CENTER LOGO */}
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 400,
                    fontSize: '32px',
                    letterSpacing: '0.1em',
                    color: '#999',
                  }}
                >
                  YOUR
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 900,
                    fontSize: '32px',
                    letterSpacing: '0.1em',
                    ml: 0.5,
                    color: '#000',
                  }}
                >
                  SNEAKER
                </Typography>
              </Box>
            </Link>

            {/* RIGHT ICONS */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 2, md: '50px' },
                ml: 'auto',
              }}
            >
              {/* USER — hidden on mobile, shown in drawer instead */}
              <IconButton sx={{ p: 0, display: { xs: 'none', md: 'flex' } }}>
                <img src={icons.user} alt="user" width={22} height={22} />
              </IconButton>

              {/* SEARCH — hidden on mobile (moved to drawer) */}
              <IconButton onClick={handleSearchToggle} sx={{ p: 0, display: { xs: 'none', md: 'flex' } }}>
                {searchOpen ? (
                  <CloseIcon sx={{ fontSize: 22, color: 'black' }} />
                ) : (
                  <img src={icons.search} alt="search" width={22} height={22} />
                )}
              </IconButton>

              {/* CART — original image icon */}
              <Link href="/cart">
                <IconButton sx={{ p: 0 }}>
                  <Badge badgeContent={cartCount} color="error">
                    <img src={icons.cart} alt="cart" width={22} height={22} />
                  </Badge>
                </IconButton>
              </Link>
            </Box>
          </Toolbar>

          {/* SEARCH BAR */}
          <Collapse in={searchOpen} timeout={250}>
            <Box
              sx={{
                px: { xs: 2, md: 4 },
                pb: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                borderTop: '1px solid #f0f0f0',
              }}
            >
              <img src={icons.search} alt="search" width={18} height={18} />
              <InputBase
                autoFocus
                fullWidth
                placeholder="Search sneakers…"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.95rem',
                }}
              />
              {searchQuery && (
                <IconButton
                  size="small"
                  onClick={() => {
                    setSearchQuery('');
                    onSearch?.('');
                  }}
                >
                  {/* MUI CloseIcon for clearing search input */}
                  <CloseIcon sx={{ fontSize: 18, color: 'black' }} />
                </IconButton>
              )}
            </Box>
          </Collapse>
        </Box>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              display: 'flex',
              flexDirection: 'column',
            },
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 900, fontSize: '1.1rem' }}>
            YOUR <strong>SNEAKER</strong>
          </Typography>

          {/* DRAWER CLOSE — MUI CloseIcon */}
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'black' }}>
            <CloseIcon sx={{ fontSize: 22 }} />
          </IconButton>
        </Box>

        <Divider />

        <List sx={{ pt: 1 }}>
          {drawerItems.map((item) => (
            <ListItem
              key={item.label}
              onClick={() => {
                onCategoryChange?.(item.category);
                setDrawerOpen(false);
              }}
              sx={{
                py: 1.5,
                cursor: 'pointer',
                '&:hover': { bgcolor: '#f5f5f5' },
              }}
            >
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: {
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight:
                        activeCategory === item.category ? 700 : 400,
                      fontSize: '1rem',
                      letterSpacing: '0.05em',
                      borderBottom:
                        activeCategory === item.category
                          ? '2px solid black'
                          : 'none',
                      display: 'inline-block',
                      pb: activeCategory === item.category ? '2px' : 0,
                    },
                  },
                }}
              />
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* SEARCH in drawer — mobile only */}
        <ListItem sx={{ py: 1.5, cursor: 'pointer', '&:hover': { bgcolor: '#f5f5f5' } }} onClick={() => { setDrawerOpen(false); handleSearchToggle(); }}>
          <img src={icons.search} alt="search" width={22} height={22} style={{ marginRight: 12 }} />
          <ListItemText
            primary="Search"
            slotProps={{
              primary: {
                sx: {
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 400,
                  fontSize: '1rem',
                  letterSpacing: '0.05em',
                },
              },
            }}
          />
        </ListItem>

        <Divider />

        {/* USER ICON in drawer — mobile only */}
        <ListItem sx={{ py: 1.5, cursor: 'pointer', '&:hover': { bgcolor: '#f5f5f5' } }}>
          <img src={icons.user} alt="user" width={22} height={22} style={{ marginRight: 12 }} />
          <ListItemText
            primary="Sign In"
            slotProps={{
              primary: {
                sx: {
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 400,
                  fontSize: '1rem',
                  letterSpacing: '0.05em',
                },
              },
            }}
          />
        </ListItem>
      </Drawer>
    </>
  );
}