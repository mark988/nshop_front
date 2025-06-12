'use client';
import { Box, Container, Stack, Typography, Link, IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: { xs: 3, sm: 4 },
        px: 2,
        minHeight: '120px',
        borderRadius: { xs: 0, md: '0 0 24px 24px' },
        boxShadow: '0 4px 32px 0 rgba(0,0,0,0.04) inset',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 0, sm: 2 } }}>
        {/* 顶部菜单栏 */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            mb: 1,
            gap: { xs: 2, sm: '10rem' }, // 10rem间距
            flexWrap: 'wrap'
          }}
        >
          <Link
            href="/about"
            underline="none"
            color="text.secondary"
            sx={{
              fontSize: '1rem',
              fontWeight: 400,
              textAlign: 'center',
              letterSpacing: 0.1,
              '&:hover': { color: 'primary.main' },
            }}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            underline="none"
            color="text.secondary"
            sx={{
              fontSize: '1rem',
              fontWeight: 400,
              textAlign: 'center',
              letterSpacing: 0.1,
              '&:hover': { color: 'primary.main' },
            }}
          >
            Contact
          </Link>
          <Link
            href="/faq"
            underline="none"
            color="text.secondary"
            sx={{
              fontSize: '1rem',
              fontWeight: 400,
              textAlign: 'center',
              letterSpacing: 0.1,
              '&:hover': { color: 'primary.main' },
            }}
          >
            FAQ
          </Link>
          <Link
            href="/shipping"
            underline="none"
            color="text.secondary"
            sx={{
              fontSize: '1rem',
              fontWeight: 400,
              textAlign: 'center',
              letterSpacing: 0.1,
              '&:hover': { color: 'primary.main' },
            }}
          >
            Shipping & Returns
          </Link>
          <Link
            href="/privacy"
            underline="none"
            color="text.secondary"
            sx={{
              fontSize: '1rem',
              fontWeight: 400,
              textAlign: 'center',
              letterSpacing: 0.1,
              '&:hover': { color: 'primary.main' },
            }}
          >
            Privacy Policy
          </Link>
        </Stack>
        {/* 社交账号 */}
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
          <IconButton
            component="a"
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#4285f4',
              fontSize: '0.9rem',
              '&:hover': { color: 'primary.main' },
              p: '6px',
            }}
            aria-label="Twitter"
          >
            <TwitterIcon sx={{ fontSize: '1.4rem' }} />
          </IconButton>
          <IconButton
            component="a"
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#4285f4',
              fontSize: '0.9rem',
              '&:hover': { color: 'primary.main' },
              p: '6px',
            }}
            aria-label="Instagram"
          >
            <InstagramIcon sx={{ fontSize: '1.4rem' }} />
          </IconButton>
          <IconButton
            component="a"
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#4285f4',
              fontSize: '0.9rem',
              '&:hover': { color: 'primary.main' },
              p: '6px',
            }}
            aria-label="Facebook"
          >
            <FacebookIcon sx={{ fontSize: '1.4rem' }} />
          </IconButton>
        </Stack>
        {/* 版权信息 */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            fontSize: '0.8rem', // 设置为0.8rem
            letterSpacing: 0.1,
            mt: 1,
            mb: 0,
            fontWeight: 400,
            opacity: 0.92,
            '&::before': { content: '"@"', mr: 0.5, color: 'inherit' },
          }}
        >
          {new Date().getFullYear()} ShopSmart. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}