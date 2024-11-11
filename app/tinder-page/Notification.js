import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const Notification = ({name, onClose}) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000); 
        return () => clearTimeout(timer); 
      }, []);
      
    return (
      <Box
                         sx={{
                           borderRadius: 2,
                           marginTop : 3,
                           bottom: 0,
                           left: 0,
                           right: 0,
                           bgcolor: 'rgba(76, 175, 80)',
                           color: 'white',
                           padding: '8px 16px',
                           animation: 'fadeIn 0.3s ease-out, fadeOut 0.3s ease 2.7s'
                         }}
                       >
                         <Typography variant="subtitle1" component="span"
                          transition= 'opacity 0.2s ease'
                         >
                           {name} was saved to your liked pets.
                         </Typography>
  
                         <style>
                        {`
                          @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(20px); }
                            to { opacity: 1; transform: translateY(0); }
                          }
                          @keyframes fadeOut {
                            from { opacity: 1; }
                            to { opacity: 0; }
                          }
                        `}
        </style>
                       </Box>
    )
  }

export default Notification