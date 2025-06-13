'use client';
import { useState, useMemo } from 'react';
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
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Favorite, FavoriteBorder, ShoppingCart } from '@mui/icons-material';

import './products.css';

// 产品数据可支持 type: 'image' | 'video'，video/videoPoster 字段
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
    brand: 'IKEA',
    sales: 120,
    type: 'image',
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
    brand: 'Ashley',
    sales: 300,
    type: 'image',
  },
  {
    id: 3,
    name: 'Kid Table',
    price: 89.99,
    image: 'https://plus.unsplash.com/premium_photo-1688125414822-c1daf8543ffb',
    rating: 4.3,
    reviews: 21,
    desc: '',
    category: 'Children',
    brand: 'IKEA',
    sales: 80,
    type: 'image',
  },
  {
    id: 4,
    name: 'ElegantLabmp',
    price: 59.99,
    image: 'https://plus.unsplash.com/premium_photo-1688125414822-c1daf8543ffb',
    rating: 4.8,
    reviews: 65,
    desc: '',
    category: 'Men',
    brand: 'Philips',
    sales: 20,
    type: 'image',
  },
  {
    id: 5,
    name: 'Elegant Lamp-test',
    price: 259.99,
    image: 'https://plus.unsplash.com/premium_photo-1688125414822-c1daf8543ffb',
    rating: 4.8,
    reviews: 65,
    desc: '',
    category: 'Men',
    brand: 'Philips',
    sales: 10,
    type: 'image',
  },
  {
    id: 6,
    name: 'Elegant Jack',
    price: 659.99,
    image: 'https://plus.unsplash.com/premium_photo-1688125414822-c1daf8543ffb',
    rating: 4.8,
    reviews: 65,
    desc: '',
    category: 'Men',
    brand: 'Philips',
    sales: 290,
    type: 'image',
  },
  {
    id: 7,
    name: 'Elegant Jack-7',
    price: 659.99,
    image: 'https://ix-marketing.imgix.net/case-study_culturekings2.png',
    rating: 4.8,
    reviews: 65,
    desc: '',
    category: 'Men',
    brand: 'Philips',
    sales: 290,
    type: 'image',
  },
  {
    id: 8,
    name: 'Elegant Jack-8',
    price: 659.99,
    image: 'https://ix-marketing.imgix.net/case-study_upworthy.png',
    rating: 4.8,
    reviews: 65,
    desc: '',
    category: 'Men',
    brand: 'Philips',
    sales: 290,
    type: 'image',
  },
  {
    id: 9,
    name: 'Jack-9',
    price: 9.99,
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    videoPoster: 'https://ix-marketing.imgix.net/case-study_tile_rew.png',
    image: 'https://ix-marketing.imgix.net/case-study_tile_rew.png',
    rating: 4.8,
    reviews: 65,
    desc: '',
    category: 'Men',
    brand: 'Philips',
    sales: 99990,
    type: 'video',
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
const allBrands = Array.from(new Set(products.map(item => item.brand).filter(Boolean)));

export default function AllProductsPage() {
  const [tab, setTab] = useState('all');
  const [page, setPage] = useState(1);
  const [favorited, setFavorited] = useState<{ [key: number]: boolean }>({});
  const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>({});
  const [sort, setSort] = useState('default');
  const [brand, setBrand] = useState('all');
  const [videoPlay, setVideoPlay] = useState<{ [key: number]: boolean }>({});
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
    setPage(1);
  };

  const handleFavorite = (id: number) => {
    setFavorited((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleVideoPlay = (id: number) => {
    setVideoPlay(prev => ({ ...prev, [id]: true }));
  };

  const processedProducts = useMemo(() => {
    let filtered = tab === 'all'
      ? products
      : products.filter(item => item.category === tab);

    if (brand !== 'all') {
      filtered = filtered.filter(item => item.brand === brand);
    }

    if (sort === 'price_asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
    else if (sort === 'sales_desc') filtered = [...filtered].sort((a, b) => (b.sales || 0) - (a.sales || 0));
    return filtered;
  }, [tab, brand, sort]);

  const pageCount = Math.max(1, Math.ceil(processedProducts.length / PRODUCTS_PER_PAGE));
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const displayProducts = processedProducts.slice(start, end);

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
        <Typography variant="h5" fontWeight={700} mb={2} >
          All Products
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

        {/* 优化后的 排序&品牌过滤 */}
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            flexWrap: 'wrap',
          }}
        >
          {/* 排序 下拉 */}
          <FormControl
            size="small"
            variant="outlined"
            sx={{
              minWidth: 160,
              bgcolor: 'white',
              borderRadius: 1,
              boxShadow: '0 1px 4px rgba(60,60,60,0.04)',
              '& .MuiInputLabel-root': { fontWeight: 600 },
              '& .MuiOutlinedInput-root': {
                  background: 'white',
                  borderRadius: 1,
                  '& fieldset': { borderColor: 'grey.100' },
                  '&:hover fieldset': { borderColor: 'grey.300' },
                  '&.Mui-focused fieldset': { borderColor: 'grey.300' },
              },
            }}
          >
            <InputLabel
              sx={{
                fontWeight: 600,
                color: 'grey.700',
              }}
            >
              Sort
            </InputLabel>
            <Select
              label="排序"
              value={sort}
              onChange={e => { setSort(e.target.value); setPage(1); }}
              sx={{
                fontWeight: 500,
                color: 'grey.800',
                '& .Mui-selected': { color: 'primary.main', fontWeight: 600 },
              }}
              MenuProps={{
                PaperProps: {
                  sx: { borderRadius: 1, mt: 1, minWidth: 160 },
                },
              }}
            >
              <MenuItem value="default">DEFAULT</MenuItem>
              <MenuItem value="price_asc">Price Low to High</MenuItem>
              <MenuItem value="price_desc">Price High to Low</MenuItem>
              <MenuItem value="sales_desc">销量从高到低</MenuItem>
            </Select>
          </FormControl>

          {/* 品牌 下拉 */}
          <FormControl
            size="small"
            variant="outlined"
            sx={{
              minWidth: 150,
              bgcolor: 'white',
              borderRadius: 1,
              boxShadow: '0 1px 4px rgba(60,60,60,0.04)',
              '& .MuiInputLabel-root': { fontWeight: 600 },
              '& .MuiOutlinedInput-root': {
                   background: 'white',
                   borderRadius: 1,
                  '& fieldset': { borderColor: 'grey.100' },
                  '&:hover fieldset': { borderColor: 'grey.300' },
                  '&.Mui-focused fieldset': { borderColor: 'grey.300' },
              },
            }}
          >
            <InputLabel
              sx={{
                fontWeight: 600,
                color: 'grey.700',
              }}
            >
              Brand
            </InputLabel>
            <Select
              label="品牌"
              value={brand}
              onChange={e => { setBrand(e.target.value); setPage(1); }}
              sx={{
                fontWeight: 500,
                color: 'grey.800',
                '& .Mui-selected': { color: 'primary.main', fontWeight: 600 },
              }}
              MenuProps={{
                PaperProps: {
                  sx: { borderRadius: 1, mt: 1, minWidth: 150 },
                },
              }}
            >
              <MenuItem value="all">ALL</MenuItem>
              {allBrands.map(b => (
                <MenuItem key={b} value={b}>{b}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={0} className="custom-grid" sx={{ ml: '-1rem' }}>
          {displayProducts.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card
                elevation={0}
                sx={{
                  height: '100%', width: 276,
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
                {/* 图片/视频区域 */}
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
                    {/* 视频模式 */}
                    {item.type === 'video' && item.video ? (
                      !videoPlay[item.id] ? (
                        <>
                          <img
                            src={item.videoPoster || item.image}
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
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: 48,
                              height: 48,
                              bgcolor: 'rgba(0,0,0,0.48)',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              zIndex: 3,
                              cursor: 'pointer'
                            }}
                            onClick={e => {
                              e.preventDefault();
                              handleVideoPlay(item.id);
                            }}
                          >
                            <svg width="32" height="32" viewBox="0 0 48 48" fill="white">
                              <polygon points="16,12 40,24 16,36" />
                            </svg>
                          </Box>
                        </>
                      ) : (
                        <video
                          src={item.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          poster={item.videoPoster || item.image}
                          style={{
                            objectFit: 'cover',
                            borderRadius: '8px 8px 0 0',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                            display: 'block',
                            background: '#eee'
                          }}
                        />
                      )
                    ) : (
                      // 图片模式
                      (!imageLoading[item.id] && !item.image) ? (
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
                      ) : (
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
                      )
                    )}

                    {/* 购物车按钮，hover时显示 */}
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

        {pageCount > 1 && renderPagination()}
      </Container>
    </Box>
  );
}