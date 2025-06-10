import { Box, BoxProps } from '@mui/material';

// 建议maxWidth="lg"（1200px）或自定义，如maxWidth: '1280px'
export default function ContentContainer({ children, sx, ...rest }: BoxProps) {
  return (
    <Box
      {...rest}
      sx={{
        maxWidth: { xs: '100%', md: 1200 }, // 或 '1280px'
        mx: 'auto',                        // 水平居中
        px: { xs: 2, md: 3 },              // 左右内边距，2=16px, 3=24px
        width: '100%',
        boxSizing: 'border-box',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}