'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  IconButton,
  Rating
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';
import Image from 'next/image';

interface ProductCardProps {
  id: number;
  image?: string;
  video?: string;
  type?: 'image' | 'video';
  name: string;
  price: number;
  memberPrice?: number;
  description?: string;
  rating?: number;
}

export default function ProductCard({
  id,
  image,
  video,
  type = 'image',
  name,
  price,
  memberPrice,
  description,
  rating = 5
}: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [favorited, setFavorited] = useState(false);

  const handleFavorite = () => {
    setFavorited((prev) => !prev);
    // 可加入收藏接口调用
  };

  return (
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
          '& .MuiIconButton-root.add-to-cart': {
            opacity: 1,
            transform: 'translateY(0)',
          }
        }
      }}
    >
      <Box sx={{
        position: 'relative',
        width: '100%',
        paddingTop: '100%',
        bgcolor: 'grey.50'
      }}>
        <Link
          href={`/product/${id}`}
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
          {isLoading && type === 'image' && (
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
          {type === 'image' && image && (
            <Image
              src={image}
              alt={name}
              fill
              style={{
                objectFit: 'cover',
                borderRadius: '8px 8px 0 0'
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              referrerPolicy="no-referrer"
              onLoadingComplete={() => setIsLoading(false)}
            />
          )}
          {type === 'video' && video && (
            <video
              src={video}
              autoPlay
              muted
              loop
              preload="metadata"
              //controls   视频控件整个工具栏都隐藏
              controlsList="nodownload"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px 8px 0 0',
                background: '#eee'
              }}
              poster=""
              onLoadedData={() => setIsLoading(false)}
            />
          )}
        </Link>
        <IconButton
          className="add-to-cart"
          sx={{
            position: 'absolute',
            right: 8,
            bottom: 8,
            bgcolor: 'white',
            boxShadow: 2,
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'all 0.3s ease',
            zIndex: 3,
            '&:hover': {
              bgcolor: 'white',
              color: 'primary.main'
            }
          }}
        >
          <ShoppingCartIcon fontSize="small" />
        </IconButton>
      </Box>
      <CardContent sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        p: 2
      }}>
        <Box sx={{ mb: 1 }}>
          <Rating
            value={rating}
            readOnly
            size="small"
            sx={{ color: 'primary.main' }}
          />
        </Box>
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
            height: '2.4em'
          }}
        >
          {name}
        </Typography>
        {/* 价格行 */}
        <Box
          sx={{
            mt: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: memberPrice ? 'text.secondary' : 'text.primary',
              textDecoration: memberPrice ? 'line-through' : 'none'
            }}
          >
            ${price}
          </Typography>
          {memberPrice && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                ml: 1
              }}
            >
              Member Price:${memberPrice}
            </Typography>
          )}
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
            onClick={handleFavorite}
            sx={{
              color: favorited ? '#1a73e8' : 'primary.main',
              bgcolor: favorited ? 'rgba(20,100,255,0.08)' : 'transparent',
              transition: 'background 0.2s, color 0.2s',
              p: '4px',
              '&:hover': {
                bgcolor: favorited ? '#1a73e8' : 'primary.light',
                color: 'primary.contrastText'
              }
            }}
          >
            {favorited ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
        </Box>
        {description && (
          <Typography variant="body2" color="text.secondary" noWrap mt={1}>
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}