import { Box, BoxProps } from '@mui/material';

export default function ContentContainer({ children, sx, ...rest }: BoxProps) {
  return (
    <Box
      {...rest}
      sx={{
        px: { xs: 2, md: '1.5rem' }, // 这里将 md: '327px' 改为 md: '6rem'
        width: '100%',
        boxSizing: 'border-box',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}