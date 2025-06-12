'use client';
import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Badge,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  FavoriteBorder as FavoriteBorderIcon
} from '@mui/icons-material';
import SearchBar from '../shared/SearchBar';

const pages = ['Home', 'Products', 'Categories', 'Deals'];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  // 用于存储哪个图标被“点击/按下”
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // 图标的基础高亮样式和active样式
  const getIconButtonSx = (iconName: string) => ({
    mx: 0.5,
    color: 'primary.main',
    bgcolor: 'rgba(25, 118, 210, 0.08)', // primary.main 的透明背景
    boxShadow: activeIcon === iconName
      ? '0 4px 20px rgba(25,118,210,0.15)'
      : '0 2px 8px rgba(25,118,210,0.10)',
    transform: activeIcon === iconName
      ? 'scale(0.90)'
      : 'scale(1.00)',
    transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
    '&:hover': {
      bgcolor: 'primary.light',
      color: 'primary.contrastText',
      boxShadow: '0 4px 20px rgba(25,118,210,0.17)',
      transform: 'scale(0.95)',
    },
  });

  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              borderBottom: '1px solid',
              borderColor: (theme) => theme.palette.grey[200],
              boxShadow: 'none',
              backgroundColor: (theme) => theme.palette.background.paper
            }}
          >
            NShop
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
            }}
          >
            NShop
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'text.primary', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Search Bar */}
          <SearchBar />

          {/* Icons */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', ml: 1, height: 40 }}>
            <IconButton
              size="medium"
              sx={{
                ...getIconButtonSx('cart'),
                p: 0.75, // padding更小
                '& svg': { fontSize: 22 },
                minWidth: 32,
                minHeight: 32,
              }}
              onMouseDown={() => setActiveIcon('cart')}
              onMouseUp={() => setActiveIcon(null)}
              onMouseLeave={() => setActiveIcon(null)}
              aria-label="购物车"
            >
              <Badge badgeContent={0} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.70rem', minWidth: 16, height: 16 } }}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="medium"
              sx={{
                ...getIconButtonSx('favorite'),
                p: 0.75,
                '& svg': { fontSize: 22 },
                minWidth: 32,
                minHeight: 32,
              }}
              onMouseDown={() => setActiveIcon('favorite')}
              onMouseUp={() => setActiveIcon(null)}
              onMouseLeave={() => setActiveIcon(null)}
              aria-label="收藏"
            >
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton
              size="medium"
              sx={{
                ...getIconButtonSx('person'),
                p: 0.75,
                '& svg': { fontSize: 22 },
                minWidth: 32,
                minHeight: 32,
              }}
              onMouseDown={() => setActiveIcon('person')}
              onMouseUp={() => setActiveIcon(null)}
              onMouseLeave={() => setActiveIcon(null)}
              aria-label="用户"
            >
              <PersonIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}