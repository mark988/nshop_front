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
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}
