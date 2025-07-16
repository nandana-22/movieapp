// seedMovies.js

const mongoose = require('mongoose');
const Movie = require('./adminmodel');
 // Adjust path if needed
require('dotenv').config(); // Make sure your MongoDB URI is in .env

const movies = [
  {
    title: 'The Lion King',
    date: '19 July 2019',
    image: 'https://image.tmdb.org/t/p/w500/7e2XWBtDPZJwIDxHU3bV9OGlYod.jpg',
    shortdesc: 'A young lion must reclaim his throne after fleeing in guilt.',
    longdesc: 'When Simba is blamed for his father’s death, he runs away. But with the kingdom in ruin under Scar’s rule, Simba must return to face his destiny and restore balance.',
  },
  {
  "title": "Interstellar",
  "date": "2014",
  "image": "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
  "shortdesc": "A team travels through a wormhole in search of a new home for humanity.",
  "longdesc": "Interstellar is a sci-fi epic where Earth is dying, and explorers must travel beyond our galaxy to find a planet suitable for human survival. Directed by Christopher Nolan, starring Matthew McConaughey and Anne Hathaway."
},



  {
    title: 'Kung Fu Panda 4',
    date: '2024',
    image: 'https://i.pinimg.com/736x/01/f8/19/01f819bc06166eda181ae4c3d5f21368.jpg',
    shortdesc:'A panda trains his successor while fighting a new villain.',
    longdesc:'After achieving legendary status as the Dragon Warrior, Po is unexpectedly chosen to become the Spiritual Leader of the Valley of Peace — a role he\'s unsure he\'s ready for...',
  },
  {
    title: 'Padakalam',
    date: '2025',
    image: 'https://cdn.moviefone.com/image-assets/1251970/9m4lvnqvwppA4BIoxqcWsWna5is.jpg?d=360x540&q=60',
    shortdesc:'Four students uncover their professors secrets amid campus chaos.',
    longdesc:'A quirky, energetic blend of college comedy and supernatural fantasy, Padakkalam offers laughs, body‑swap confusion, and a playful twist on nerd culture...',
  },
  {
    title: 'Rekhachithram',
    date: '2025',
    image : 'https://images.justwatch.com/poster/322825787/s718/rekhachithram.jpg',
    shortdesc:'A disgraced cop probes a cold case tied to a missing actress.',
    longdesc:'Rekhachithram (2025) is a Malayalam investigative thriller that follows CI Vivek Gopinath...'
  },
  {
    title:'Gargi',
    date:'July 25, 2022',
    image:'https://tse4.mm.bing.net/th/id/OIP.k--DMy8Q-Zba2qBy6_vicQHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc:'A courageous woman fights to prove her father\'s innocence in a sensitive legal battle',
    longdesc:'Gargi is a powerful Tamil legal drama that follows a schoolteacher whose life is turned upside down...'
  },
  {
    title:'Premalu',
    date:'February 9, 2024',
    image:'https://tse4.mm.bing.net/th/id/OIP.3iH6vUVAmZz0YISuMlmO6wHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc:'A fun tale of love and laughter between two unlikely youngsters.',
    longdesc:'Premalu is a lighthearted romantic comedy that follows Sachin, a fun-loving youngster from Kerala...'
  },
  {
    title:'Oppenheimer',
    date:'July 21, 2023',
    image:'https://tse2.mm.bing.net/th/id/OIP.HfmHx8gvutBDqmUzVLQ7iAHaK-?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc:'The story of the man who led the creation of the atomic bomb.',
    longdesc:'Oppenheimer is a gripping historical drama that follows J. Robert Oppenheimer, the physicist behind the atomic bomb...'
  },
  {
    title:'Suzume',
    date:'2022',
    image:'https://tse4.mm.bing.net/th/id/OIP.2q4E9kbnVbCjYpUVRDksLAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc:' A girl travels across Japan closing magical doors that bring disasters.',
    longdesc:'Suzume is a breathtaking fantasy adventure from Makoto Shinkai, the director of Your Name...'
  },
  {
    title:'The Pursuit of Happyness ',
    date:'2006',
    image:'https://miro.medium.com/max/548/1*Y8vXN1mJeEHyXWJtFICjiQ.jpeg',
    shortdesc:'A struggling single father chases his dream against all odds.',
    longdesc:'The Pursuit of Happyness tells the true story of Chris Gardner, a struggling salesman who becomes homeless...'
  },
  {
    title:'Slumdog Millionaire ',
    date:'2008',
    image:'https://tse4.mm.bing.net/th/id/OIP.isg8m_cRaUPxigmEhZcBAQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc:'An underdog from the slums rises to fame through destiny and perseverance.',
    longdesc:'Slumdog Millionaire follows Jamal, a young man from the slums of Mumbai, who surprises everyone...'
  },
  {
    title: 'The Godfather',
    date: '1972',
    image: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2023/05/the-godfather-poster.jpeg',
    shortdesc: 'A reluctant son takes over his familys powerful crime empire in 1940s America.',
    longdesc:'The Godfather is a gripping crime drama that follows the powerful Corleone family in post-war New York...'
  },
  {
    title: 'Parasite',
    date: '2019',
    image: 'https://image.tmdb.org/t/p/original/w9mfthwD5j8PQEexWTRXY7f2H7K.jpg',
    shortdesc: 'A poor family schemes to infiltrate a wealthy household...',
    longdesc:'Parasite is a darkly comedic thriller that explores class divide, deception, and survival...'
  },
 
  {
    title: 'The Sky Is Pink',
    date: '2019',
    image: 'https://tse4.mm.bing.net/th/id/OIP.6cFa9mXiAmyy_x080PIfVgHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc: 'A familys journey through love, hope, and heartbreak...',
    longdesc:'The Sky Is Pink is a heartfelt biographical drama based on the real-life story of motivational speaker Aisha Chaudhary...'
  },
  {
    title: 'Alappuzha Gymkhana',
    date: '2025',
    image: 'https://tse4.mm.bing.net/th/id/OIP.6wmFHEgXz_oiZUKWzUg8uwHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc: 'A group of passionate youngsters fights to revive the legacy of Alappuzha’s historic boxing club.',
    longdesc:'Alappuzha Gymkhana is an inspiring sports drama set in the heart of Kerala’s coastal town...'
  },
  {
    title: 'Thudarum',
    date: '2025',
    image: 'https://tse1.mm.bing.net/th/id/OIP.tH_GVUTz46O7ZNieeCDKyQHaKl?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc: 'A man’s life takes a mysterious turn as he uncovers secrets after his wife’s unexpected death.',
    longdesc:'Thudarum is a poignant Malayalam drama that delves into grief, love, and the mysteries left behind by those we lose...'
  },
  {
    title: 'Bromance',
    date: '2025',
    image: 'https://tse2.mm.bing.net/th/id/OIP.XzhRVnD1pkGIfBtJM1LlSwHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc: 'A carefree bachelor’s life is turned upside down when his best friend falls in love.',
    longdesc:'Bromance is a lighthearted coming-of-age comedy that explores friendship, jealousy, and growing up...'
  },
  {
    title: 'Ponman',
    date: '2025',
    image: 'https://tse4.mm.bing.net/th/id/OIP.QkO8lYOuZ0DkcK5Wmv5gwQHaDf?w=1110&h=524&rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc: 'A quiet village is shaken when a mysterious boy with a golden touch appears.',
    longdesc:'Ponman is a mystical drama set in a serene village where life takes an unexpected turn...'
  },
  {
    title: 'Tourist Family',
    date: '2025',
    image: 'https://tse2.mm.bing.net/th/id/OIP._oGu-_2R5O5WJ7PwfvqTBAHaJL?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc: 'A family’s chaotic vacation turns into a journey of laughter and bonding.',
    longdesc:'Tourist Family is a heartwarming comedy-drama that follows a quirky family\'s chaotic vacation...'
  },
  {
    title: 'Abraham Ozler',
    date: '2024',
    image: 'https://www.filmibeat.com/img/190x100x237/popcorn/movie_posters/ozler-20230520093313-21802.jpg',
    shortdesc:'A seasoned cop reopens a cold case that leads him down a dark and personal path.',
    longdesc:'Abraham Ozler is a gripping psychological crime thriller centered around a veteran police officer haunted by a tragic past...'
  },
];

const seedMovies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Movie.deleteMany({});
    await Movie.insertMany(movies);
    console.log('🌱 Movies seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Failed to seed movies:', error);
    process.exit(1);
  }
};

seedMovies();
