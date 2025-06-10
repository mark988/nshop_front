'use client';
import { useState } from 'react';
import { 
  Paper, 
  InputBase, 
  IconButton,
  Box 
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', query);
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 600, mx: 2 }}>
      <Paper
        component="form"
        onSubmit={handleSearch}
        sx={{
          p: 0,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          border: '1px solid #e0e0e0',        // 柔和细边
          boxShadow: 'none',                   // 无阴影
          borderRadius: 1,                     // 圆角
          backgroundColor: '#f5f6fa',          // 柔和浅色
          height: 42,                          // 高度更舒适
          transition: theme => theme.transitions.create(['border-color', 'background-color']),
          '&:hover': {
            borderColor: '#bdbdbd',
            backgroundColor: '#f0f2f5',
            boxShadow: 'none',
          },
          '&.Mui-focused': {
            borderColor: '#1976d2',
            backgroundColor: '#fff',
            boxShadow: 'none',
          },
        }}
        elevation={0}
      >
        <InputBase
          sx={{
            ml: 2,
            flex: 1,
            padding: 0,
            fontSize: 16,
            color: '#222',
            height: 42,
            backgroundColor: 'transparent',
            '& input': {
              padding: 0,
              height: 42,
              lineHeight: '42px',
            },
          }}
          placeholder="Search for products, brands, etc."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          inputProps={{ 'aria-label': '搜索商品、品牌等', style: { padding: 0 } }}
        />
        <IconButton 
          type="submit" 
          sx={{ 
            p: '8px',
            color: '#888',
            '&:hover': { color: '#1976d2', background: 'transparent' },
          }} 
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}