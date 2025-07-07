import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MovieIcon from '@mui/icons-material/Movie';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
const stats = [
  { label: 'Movies', count: 124, icon: <MovieIcon fontSize="large" color="primary " />, bgColor: '#6A1B9A' },
  { label: 'Users', count: 587, icon: <PeopleIcon fontSize="large" color="secondary" /> ,bgColor: '#43A047'},
  { label: 'Reviews', count: 1432, icon: <RateReviewIcon fontSize="large" color="error" />, bgColor: '#E53935'  },
   { label: 'Likes', count: 2000, icon: <ThumbUpIcon fontSize="large" color="primary" />, bgColor: '#FB8C00' },
   { label: 'Comments', count: 900, icon: <CommentIcon fontSize="large" color="info" /> ,bgColor: '#3949AB'},
];

const Admin = () => {
  return (
    <div>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          mt: 4,
          gap: 3,
          flexWrap: 'wrap',
        }}
      >
        {stats.map(({ label, count, icon, bgColor}) => (
          <Card key={label} sx={{ minWidth: 150, textAlign: 'center', p: 2,backgroundColor: bgColor}}>
            <CardContent>
              {icon}
              <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                {count}
              </Typography>
              <Typography color="text.secondary">{label}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  )
}

export default Admin;