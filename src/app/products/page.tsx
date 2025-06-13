'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Rating,
  Skeleton,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Favorite, FavoriteBorder, ShoppingCart } from '@mui/icons-material';

// 引入自定义样式（推荐更健壮做法）
import './products.css';

// 示例商品数据
const products = [
  {
    id: 1,
    name: 'Modern Chair',
    price: 129.99,
    image: 'https://plus.unsplash.com/premium_photo-1683121203379-ba4d4f27b933',
    rating: 4.5,
    reviews: 120,
    desc: '',
    category: 'Men',
  },
  {
    id: 2,
    name: 'Classic Sofa',
    price: 399.99,
    image: 'https://plus.unsplash.com/premium_photo-1688125414822-c1daf8543ffb',
    rating: 4.7,
    reviews: 86,
    desc: '',
    category: 'Women',
  },
  // ...其余商品数据
];

const tabItems = [
  { label: 'All', value: 'all' },
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Children', value: 'Children' },
];

const PRODUCTS_PER_PAGE = 8;

export default function AllProductsPage() {
  const [tab, setTab] = useState('all');
  const [page, setPage] = useState(1);
  const [favorited, setFavorited] = useState<{ [key: number]: boolean }>({});
  const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>({});
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
    setPage(1);
  };

  // 收藏
  const handleFavorite = (id: number) => {
    setFavorited((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 商品筛选
  const filteredProducts = tab === 'all'
    ? products
    : products.filter((item) => item.category === tab);

  // 分页
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const displayProducts = filteredProducts.slice(start, end);

  // 分页按钮
  const renderPagination = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 6,
        mb: 2,
        gap: 1.2,
        userSelect: 'none',
      }}
    >
      <IconButton
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        sx={{
          borderRadius: '50%',
          bgcolor: 'transparent',
          color: '#222',
          fontSize: 16,
          width: 28,
          height: 28,
          '&:hover': { bgcolor: 'grey.100' },
        }}
        size="small"
      >
        <ChevronLeftIcon fontSize="inherit" />
      </IconButton>
      {Array.from({ length: pageCount }).map((_, idx) => (
        <Box
          key={idx}
          onClick={() => setPage(idx + 1)}
          sx={{
            width: 28,
            height: 28,
            mx: 0.3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 500,
            fontSize: 14,
            color: page === idx + 1 ? '#222' : 'grey.700',
            bgcolor: page === idx + 1 ? 'grey.100' : 'transparent',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'background .2s',
            boxShadow: page === idx + 1 ? '0 2px 8px 0 rgba(0,0,0,0.07)' : 'none',
            border: 'none',
            outline: 'none',
            '&:hover': {
              bgcolor: page === idx + 1 ? 'grey.100' : 'grey.50',
            },
          }}
        >
          {idx + 1}
        </Box>
      ))}
      <IconButton
        onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
        disabled={page === pageCount}
        sx={{
          borderRadius: '50%',
          bgcolor: 'transparent',
          color: '#222',
          fontSize: 16,
          width: 28,
          height: 28,
          '&:hover': { bgcolor: 'grey.100' },
        }}
        size="small"
      >
        <ChevronRightIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: { xs: 3, md: 5 } }}>
        <Typography variant="h5" fontWeight={700} mb={4}>
          All Product
        </Typography>

        {/* Tabs 控件 */}
        <Box sx={{ mb: 3, borderBottom: '1px solid', borderColor: 'grey.200' }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            aria-label="product categories"
            TabIndicatorProps={{
              sx: {
                height: 2,
                bgcolor: 'common.black',
                borderRadius: 2,
              },
            }}
            sx={{
              minHeight: 40,
              '& .MuiTab-root': {
                minHeight: 40,
                px: 0,
                mr: 4,
                fontWeight: 600,
                fontSize: 15,
                color: 'grey.700',
                textTransform: 'none',
                letterSpacing: 0,
                '&.Mui-selected': {
                  color: 'common.black',
                },
              },
            }}
          >
            {tabItems.map((item) => (
              <Tab
                key={item.value}
                label={item.label}
                value={item.value}
                disableRipple
              />
            ))}
          </Tabs>
        </Box>

        {/* 商品整体左移1rem */}
        <Grid container spacing={0} className="custom-grid" sx={{ ml: '-1rem' }}>
          {displayProducts.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  }
                }}
              >
                {/* 图片区域 */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '100%',
                    bgcolor: 'grey.50',
                    overflow: 'hidden',
                    '&:hover .cart-fab': {
                      opacity: 1,
                      pointerEvents: 'auto'
                    }
                  }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <Link
                    href={`/product/${item.id}`}
                    style={{
                      display: 'block',
                      position: 'absolute',
                      inset: 0,
                      zIndex: 2,
                      borderRadius: '8px 8px 0 0',
                      overflow: 'hidden'
                    }}
                    tabIndex={-1}
                  >
                    {(!imageLoading[item.id] && !item.image) && (
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          borderRadius: '8px 8px 0 0',
                          zIndex: 1
                        }}
                      />
                    )}
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          objectFit: 'cover',
                          borderRadius: '8px 8px 0 0',
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          top: 0,
                          left: 0,
                          display: 'block'
                        }}
                        onLoad={() => setImageLoading(il => ({ ...il, [item.id]: true }))}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    {/* 购物车按钮，hover时显示，样式同首页 */}
                    <Box
                      className="cart-fab"
                      sx={{
                        position: 'absolute',
                        right: 8,
                        bottom: 8,
                        bgcolor: '#fff',
                        borderRadius: '50%',
                        width: 36,
                        height: 36,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                        opacity: 0,
                        pointerEvents: 'none',
                        transition: 'opacity 0.2s',
                        zIndex: 3,
                        cursor: 'pointer',
                        '&:hover .cart-icon': {
                          color: '#1976d2',
                        }
                      }}
                    >
                      <ShoppingCart className="cart-icon" sx={{ color: 'rgba(0, 0, 0, 0.54)', fontSize: 20 }} />
                    </Box>
                  </Link>
                </Box>
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1.5,
                    pb: '10px !important',
                  }}
                >
                  <Box sx={{ mb: 1 }}>
                    <Rating
                      value={item.rating}
                      readOnly
                      size="small"
                      precision={0.1}
                      sx={{ color: '#faaf00' }}
                    />
                  </Box>
                  {/* 商品名称可点击跳转详情 */}
                  <Link
                    href={`/product/${item.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 500,
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.2,
                        height: '2.4em',
                        color: 'text.primary',
                        cursor: 'pointer',
                        '&:hover': {
                          color: 'primary.main'
                        }
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Link>
                  {/* 价格行 */}
                  <Box
                    sx={{
                      mt: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: 'text.secondary',
                        textDecoration: 'line-through'
                      }}
                    >
                      ${item.price}
                    </Typography>
                    {/* 模拟会员价 */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        ml: 1
                      }}
                    >
                      MP:${(item.price - 20).toFixed(2)}
                    </Typography>
                  </Box>
                  {/* 收藏按钮独占一行，居左，无文字 */}
                  <Box
                    sx={{
                      mt: '0px',
                      mb: '0px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <IconButton
                      size="small"
                      aria-label="收藏"
                      onClick={() => handleFavorite(item.id)}
                      sx={{
                        color: favorited[item.id] ? '#1a73e8' : 'primary.main',
                        bgcolor: favorited[item.id] ? 'rgba(20,100,255,0.08)' : 'transparent',
                        transition: 'background 0.2s, color 0.2s',
                        p: '4px',
                        '&:hover': {
                          bgcolor: favorited[item.id] ? '#1a73e8' : 'primary.light',
                          color: 'primary.contrastText'
                        }
                      }}
                    >
                      {favorited[item.id] ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
                    </IconButton>
                  </Box>
                  {item.desc && (
                    <Typography variant="body2" color="text.secondary" noWrap mt={1}>
                      {item.desc}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 分页按钮 */}
        {pageCount > 1 && renderPagination()}
      </Container>
    </Box>
  );
}