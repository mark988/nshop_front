'use client';
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Skeleton,
  IconButton,
  Rating
} from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import Image from 'next/image';

interface ProductCardProps {
  path: string;
  name: string;
  price: number;
  memberPrice?: number;
  description?: string;
  rating?: number;
}

export default function ProductCard({ 
  path, 
  name, 
  price, 
  memberPrice, 
  description,
  rating = 5
}: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          transform: 'scale(1.02)', // 轻微放大效果
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)', // 添加阴影
          '& .MuiIconButton-root': {
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
        {isLoading && (
          <Skeleton 
            variant="rectangular" 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '8px 8px 0 0'
            }} 
          />
        )}
        <Image
          src={path}
          alt={name}
          fill
          style={{
            objectFit: 'cover',
            borderRadius: '8px 8px 0 0'
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setIsError(true);
          }}
        />
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
        <Box sx={{ 
          mt: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: 'text.primary' // 改为默认文本颜色
            }}
          >
            ${price}
          </Typography>
          {memberPrice && memberPrice > price && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                textDecoration: 'line-through'
              }}
            >
              ${memberPrice}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
