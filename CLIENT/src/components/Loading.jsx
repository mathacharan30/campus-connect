import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export const Loading=()=> {
  return (
    <>
    <div className='flex items-center justify-center h-full w-full my-80 bg-slate-900'>
      <Box sx={{ width: '60%' }}>
      <LinearProgress sx={{ backgroundColor: '#475569', '& .MuiLinearProgress-bar': { backgroundColor: '#3b82f6' } }} />
    </Box>
    </div>
    </>
    
  );
}
