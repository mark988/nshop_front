'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Grid,
  Typography,
  Rating,
  Button,
  IconButton,
  Skeleton,
  Stack,
  Divider,
  Tabs,
  Tab,
  useTheme,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  Share,
  LocalShipping,
  Assignment,
  Security,
  AddCircleOutline,
  RemoveCircleOutline,
} from '@mui/icons-material';
import Link from 'next/link';

// 模拟产品数据 - 实际应该从API获取
const getProduct = (id: string) => ({
  id,
  name: 'Kid Table',
  price: 89.99,
  images: [
    'https://plus.unsplash.com/premium_photo-1688125414822-c1daf8543ffb',
    'https://plus.unsplash.com/premium_photo-1683121203379-ba4d4f27b933',
    'https://ix-marketing.imgix.net/case-study_culturekings2.png',
    'https://ix-marketing.imgix.net/case-study_upworthy.png',
  ],
  video: 'https://www.w3schools.com/html/mov_bbb.mp4',
  videoPoster: 'https://ix-marketing.imgix.net/case-study_tile_rew.png',
  rating: 4.3,
  reviews: 21,
  description: `
    • Premium Quality Material
    • Modern Design
    • Easy Assembly
    • Perfect for Children's Room
    • Sturdy Construction
    • Safe Rounded Edges
    • Multiple Color Options
    • Water-resistant Surface
  `,
  specifications: {
    'Material': 'Solid Wood + MDF',
    'Dimensions': '60 x 40 x 45 cm',
    'Weight': '5 kg',
    'Age Range': '3-12 years',
    'Color Options': 'White, Natural Wood, Pink, Blue',
    'Assembly Required': 'Yes',
    'Package Contents': '1 x Table Top, 4 x Legs, 1 x Assembly Kit',
  },
  stock: 50,
  deliveryTime: '3-5 business days',
  warranty: '2 years',
  colors: ['White', 'Natural Wood', 'Pink', 'Blue'],
  category: 'Children',
  brand: 'IKEA',
});

const tabItems = [
  { label: 'Description', value: 'description' },
  { label: 'Specifications', value: 'specifications' },
  { label: 'Reviews', value: 'reviews' },
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const theme = useTheme();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedColor, setSelectedColor] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [videoPlay, setVideoPlay] = useState(false);

  useEffect(() => {
    // 模拟API调用
    const productData = getProduct(params.id);
    setProduct(productData);
    setSelectedColor(productData.colors[0]);
  }, [params.id]);

  const handleQuantityChange = (delta: number) => {
    setQuantity(q => Math.max(1, Math.min(q + delta, product?.stock || 1)));
  };

  // Tab 样式保持与商品列表页一致
  const tabSx = {
    minHeight: 44,
    mb: 1,
    '& .MuiTabs-flexContainer': {
      gap: 0,
      position: 'relative',
    },
    '& .MuiTab-root': {
      position: 'relative',
      minHeight: 44,
      px: 3,
      mr: 0,
      borderRadius: 0,
      fontWeight: 600,
      fontSize: 16,
      color: 'grey.600',
      textTransform: 'none',
      letterSpacing: 0,
      '&:not(:last-child)': {
        '&:after': {
          content: '""',
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 1,
          height: 16,
          backgroundColor: 'rgba(FF, 0, 0,0.12)',
        }
      },
      '&:hover': {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
      },
      '&.Mui-selected': {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
        fontWeight: 700,
        boxShadow: 'none',
      },
    },
    '& .MuiTabs-indicator': {
      display: 'block',
      height: 2,
    },
  };

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={400} />
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        {/* 面包屑导航 */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Home
          </Link>
          <Link href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>
            Products
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* 左侧图片区域 */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', width: '100%', mb: 2 }}>
              <Box
                sx={{
                  position: 'relative',
                  paddingTop: '100%',
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: 'grey.100',
                }}
              >
                {isImageLoading && (
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                  />
                )}
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: isImageLoading ? 'none' : 'block',
                  }}
                  onLoad={() => setIsImageLoading(false)}
                />
              </Box>
            </Box>

            {/* 缩略图列表 */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                overflowX: 'auto',
                pb: 2,
                '&::-webkit-scrollbar': {
                  height: 6,
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'grey.100',
                  borderRadius: 3,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'grey.400',
                  borderRadius: 3,
                },
              }}
            >
              {product.images.map((image: string, index: number) => (
                <Box
                  key={index}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 1,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: index === selectedImage ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
                    '&:hover': {
                      border: `2px solid ${theme.palette.primary.main}`,
                    },
                  }}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>

          {/* 右侧商品信息 */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
              {product.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.1} readOnly sx={{ color: '#faaf00' }} />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.reviews} reviews)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
              <Typography
                variant="h4"
                component="span"
                color="primary"
                fontWeight={700}
                sx={{ mr: 2 }}
              >
                MP:${(product.price - 20).toFixed(2)}
              </Typography>
              <Typography
                variant="h6"
                component="span"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                ${product.price}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* 颜色选择 */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Color
              </Typography>
              <Stack direction="row" spacing={1}>
                {product.colors.map((color: string) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? 'contained' : 'outlined'}
                    sx={{
                      minWidth: 'auto',
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      textTransform: 'none',
                    }}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </Stack>
            </Box>

            {/* 数量选择 */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Quantity
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <RemoveCircleOutline />
                </IconButton>
                <Typography>{quantity}</Typography>
                <IconButton 
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  <AddCircleOutline />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  ({product.stock} available)
                </Typography>
              </Box>
            </Box>

            {/* 购买按钮 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                size="medium"
                startIcon={<ShoppingCart />}
                sx={{
                  flex: 1,
                  height: 40,
                  borderRadius: 1,
                  textTransform: 'none',
                  fontSize: 14,
                }}
              >
                Add to Cart
              </Button>
              <IconButton
                sx={{
                  width: 48,
                  height: 48,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  color: favorited ? '#1a73e8' : 'grey.600',
                  '&:hover': {
                    borderColor: 'grey.300',
                  },
                }}
                onClick={() => setFavorited(!favorited)}
              >
                {favorited ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              <IconButton
                sx={{
                  width: 48,
                  height: 48,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  '&:hover': {
                    borderColor: 'grey.300',
                  },
                }}
              >
                <Share />
              </IconButton>
            </Box>

            {/* 服务信息 */}
            <Stack spacing={2} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocalShipping sx={{ color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  Free shipping · Estimated delivery: {product.deliveryTime}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Assignment sx={{ color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {product.warranty} warranty · 30-day return policy
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Security sx={{ color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  Secure payment · SSL encryption
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* 详细信息标签页 */}
            <Box>
              <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
                sx={tabSx}
              >
                {tabItems.map(item => (
                  <Tab
                    key={item.value}
                    label={item.label}
                    value={item.value}
                    disableRipple
                  />
                ))}
              </Tabs>
              
              <Box sx={{ py: 3 }}>
                {activeTab === 'description' && (
                  <Typography
                    component="div"
                    variant="body1"
                    color="text.secondary"
                    sx={{ whiteSpace: 'pre-line' }}
                  >
                    {product.description}
                  </Typography>
                )}

                {activeTab === 'specifications' && (
                  <Stack spacing={2}>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <Box key={key}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {key}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {value}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                )}

                {activeTab === 'reviews' && (
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" fontWeight={600} mr={2}>
                        Overall Rating
                      </Typography>
                      <Rating value={product.rating} precision={0.1} readOnly sx={{ color: '#faaf00' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({product.reviews} reviews)
                      </Typography>
                    </Box>
                    <Typography color="text.secondary">
                      Review functionality coming soon...
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* 推荐商品部分 */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" fontWeight={600} mb={3}>
            You May Also Like
          </Typography>
          <Grid container spacing={3}>
            {/* 这里可以添加推荐商品列表 */}
            <Typography color="text.secondary">
              Related products coming soon...
            </Typography>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}