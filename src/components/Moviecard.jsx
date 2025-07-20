import React, { useState } from 'react';
import {
  Typography, Card, CardHeader, CardMedia, CardContent,
  CardActions, Collapse, Avatar, IconButton, Button, Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { blue, pink, purple, green, orange, teal, grey,red} from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const genreColors = {
  Action: pink[500],
  Romance: red[400],
  Drama: purple[400],
  Comedy: orange[500],
  Thriller: blue[700],
  Family: green[600],
  Fantasy: teal[400],
  SciFi: grey[600],
  Other: grey[400]
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Moviecard = ({ title, date, image, shortdesc, longdesc, trailer, genre }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: 320,
        m: 2,
        borderRadius: 4,
        boxShadow: 8,
        transition: 'transform 0.3s, box-shadow 0.3s',
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(8px)',
        color: '#fff',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 12,
        },
      }}
    >
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: blue[700] }}>🎬</Avatar>}
        action={<IconButton><MoreVertIcon sx={{ color: 'white' }} /></IconButton>}
        title={<Typography fontWeight="bold" color="white">{title}</Typography>}
        subheader={
          <Typography variant="caption" color="#ccc">
            {date ? new Date(date).toLocaleDateString() : 'N/A'}
          </Typography>
        }
      />

      <CardMedia
        component="img"
        height="400"
        image={image}
        alt={title}
        sx={{
          objectFit: 'cover',
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          filter: 'brightness(0.9)',
        }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
        }}
      />

      <CardContent>
        {/* Genre Chip */}
        {genre && (
          <Chip
            label={genre}
            size="small"
            sx={{
              mb: 1,
              backgroundColor: genreColors[genre] || 'gray',
              color: '#fff',
              fontWeight: 'bold',
            }}
          />
        )}

        <Typography variant="body2" color="#eee">
          {shortdesc}
        </Typography>

        {trailer && (
          <Button
            href={trailer}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="error"
            size="small"
            sx={{ mt: 2 }}
            fullWidth
          >
            🎬 Watch Trailer
          </Button>
        )}
      </CardContent>

      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ color: 'white' }}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
            Description
          </Typography>
          <Typography variant="body2" color="#ddd">
            {longdesc}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Moviecard;
