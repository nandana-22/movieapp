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
    trailer:"https://youtu.be/7TavVZMewpY?feature=shared"
  },
 


  {
    title: 'Kung Fu Panda 4',
    date: '2024',
    image: 'https://i.pinimg.com/736x/01/f8/19/01f819bc06166eda181ae4c3d5f21368.jpg',
    shortdesc:'A panda trains his successor while fighting a new villain.',
    longdesc:'After achieving legendary status as the Dragon Warrior, Po is unexpectedly chosen to become the Spiritual Leader of the Valley of Peace — a role he\'s unsure he\'s ready for...',
    trailer:"https://youtu.be/d2OONzqh2jk?feature=shared"
  },
  {
    title: 'Padakalam',
    date: '2025',
    image: 'https://cdn.moviefone.com/image-assets/1251970/9m4lvnqvwppA4BIoxqcWsWna5is.jpg?d=360x540&q=60',
    shortdesc:'Four students uncover their professors secrets amid campus chaos.',
    longdesc:'A quirky, energetic blend of college comedy and supernatural fantasy, Padakkalam offers laughs, body‑swap confusion, and a playful twist on nerd culture...',
    trailer:"https://youtu.be/ubVjt3eIDqA?si=JoNRnLyrDQ2Bis_1"
  },
  {
    title: 'Rekhachithram',
    date: '2025',
    image : 'https://images.justwatch.com/poster/322825787/s718/rekhachithram.jpg',
    shortdesc:'A disgraced cop probes a cold case tied to a missing actress.',
    longdesc:'Rekhachithram (2025) is a Malayalam investigative thriller that follows CI Vivek Gopinath...',
    trailer:"https://youtu.be/VaoX72TNdWM?si=WXWlCRLLc_IaJvoL"
    
  },
  {
    title:'Gargi',
    date:'July 25, 2022',
    image:'https://tse4.mm.bing.net/th/id/OIP.k--DMy8Q-Zba2qBy6_vicQHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc:'A courageous woman fights to prove her father\'s innocence in a sensitive legal battle',
    longdesc:'Gargi is a powerful Tamil legal drama that follows a schoolteacher whose life is turned upside down...',
    trailer:"https://youtu.be/CMpWmbqUVNE?si=eRHNfRN6d7fi3oA5"
  },
  {
    title:'Premalu',
    date:'February 9, 2024',
    image:'https://tse4.mm.bing.net/th/id/OIP.3iH6vUVAmZz0YISuMlmO6wHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc:'A fun tale of love and laughter between two unlikely youngsters.',
    longdesc:'Premalu is a lighthearted romantic comedy that follows Sachin, a fun-loving youngster from Kerala...',
    trailer:"https://youtu.be/rR_2ti4l3nM?si=V_1xLMY0ERxXTUll"
  },
  {
    title:'Oppenheimer',
    date:'July 21, 2023',
    image:'https://tse2.mm.bing.net/th/id/OIP.HfmHx8gvutBDqmUzVLQ7iAHaK-?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc:'The story of the man who led the creation of the atomic bomb.',
    longdesc:'Oppenheimer is a gripping historical drama that follows J. Robert Oppenheimer, the physicist behind the atomic bomb...',
     trailer:"https://youtu.be/bK6ldnjE3Y0?si=TsGqP3m5JyH9a_Ah"
  },
  {
    title:'Suzume',
    date:'2022',
    image:'https://tse4.mm.bing.net/th/id/OIP.2q4E9kbnVbCjYpUVRDksLAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc:' A girl travels across Japan closing magical doors that bring disasters.',
    longdesc:'Suzume is a breathtaking fantasy adventure from Makoto Shinkai, the director of Your Name...',
    trailer:"https://youtu.be/F7nQ0VUAOXg?si=j2rzACdGW6Z3K4Bn"
  },
  {
    title:'The Pursuit of Happyness ',
    date:'2006',
    image:'https://miro.medium.com/max/548/1*Y8vXN1mJeEHyXWJtFICjiQ.jpeg',
    shortdesc:'A struggling single father chases his dream against all odds.',
    longdesc:'The Pursuit of Happyness tells the true story of Chris Gardner, a struggling salesman who becomes homeless...',
    trailer:"https://youtu.be/DMOBlEcRuw8?si=9FzA95DFsSOtbqGx"
    
  },
  {
    title:'Slumdog Millionaire ',
    date:'2008',
    image:'https://tse4.mm.bing.net/th/id/OIP.isg8m_cRaUPxigmEhZcBAQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc:'An underdog from the slums rises to fame through destiny and perseverance.',
    longdesc:'Slumdog Millionaire follows Jamal, a young man from the slums of Mumbai, who surprises everyone...',
     trailer:"https://youtu.be/AIzbwV7on6Q?si=DosvUYR6Be_fn7dp"
  },
  {
    title: 'The Godfather',
    date: '1972',
    image: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2023/05/the-godfather-poster.jpeg',
    shortdesc: 'A reluctant son takes over his familys powerful crime empire in 1940s America.',
    longdesc:'The Godfather is a gripping crime drama that follows the powerful Corleone family in post-war New York...',
    trailer:"https://youtu.be/sY1S34973zA?si=dqXVp2_yAOzlvlQm"
  },
  {
    title: 'Parasite',
    date: '2019',
    image: 'https://image.tmdb.org/t/p/original/w9mfthwD5j8PQEexWTRXY7f2H7K.jpg',
    shortdesc: 'A poor family schemes to infiltrate a wealthy household...',
    longdesc:'Parasite is a darkly comedic thriller that explores class divide, deception, and survival...',
    trailer:"https://youtu.be/PhPROyE0OaM?si=2hgn1wuxm_xhtUB8"
  },
 
  {
    title: 'The Sky Is Pink',
    date: '2019',
    image: 'https://tse4.mm.bing.net/th/id/OIP.6cFa9mXiAmyy_x080PIfVgHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc: 'A familys journey through love, hope, and heartbreak...',
    longdesc:'The Sky Is Pink is a heartfelt biographical drama based on the real-life story of motivational speaker Aisha Chaudhary...',
     trailer:"https://youtu.be/prwUFBsDRLk?si=xovUnu-SRT6JUq3K"
  },
  {
    title: 'Alappuzha Gymkhana',
    date: '2025',
    image: 'https://tse4.mm.bing.net/th/id/OIP.6wmFHEgXz_oiZUKWzUg8uwHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc: 'A group of passionate youngsters fights to revive the legacy of Alappuzha’s historic boxing club.',
    longdesc:'Alappuzha Gymkhana is an inspiring sports drama set in the heart of Kerala’s coastal town...',
     trailer:"https://youtu.be/acCVmR5RrN0?si=wYD5SOwd5iPpfTp8"
  },
  {
    title: 'Thudarum',
    date: '2025',
    image: 'https://tse1.mm.bing.net/th/id/OIP.tH_GVUTz46O7ZNieeCDKyQHaKl?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc: 'A man’s life takes a mysterious turn as he uncovers secrets after his wife’s unexpected death.',
    longdesc:'Thudarum is a poignant Malayalam drama that delves into grief, love, and the mysteries left behind by those we lose...',
     trailer:"https://youtu.be/HZrYlXuecRg?si=9Q0dqEKbCG-2UUl9"
  },
  {
    title: 'Bromance',
    date: '2025',
    image: 'https://tse2.mm.bing.net/th/id/OIP.XzhRVnD1pkGIfBtJM1LlSwHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc: 'A carefree bachelor’s life is turned upside down when his best friend falls in love.',
    longdesc:'Bromance is a lighthearted coming-of-age comedy that explores friendship, jealousy, and growing up...',
    trailer:"https://youtu.be/JOPuTZfDp0M?si=gEzvWzg52u2L6miH"
  },
  {
    title: 'Ponman',
    date: '2025',
    image: 'https://tse4.mm.bing.net/th/id/OIP.QkO8lYOuZ0DkcK5Wmv5gwQHaDf?w=1110&h=524&rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc: 'A quiet village is shaken when a mysterious boy with a golden touch appears.',
    longdesc:'Ponman is a mystical drama set in a serene village where life takes an unexpected turn...',
     trailer:"https://youtu.be/Hc7-zUmyGIU?si=fLbGvqC05j4U6qaW"
  },
  {
    title: 'Tourist Family',
    date: '2025',
    image: 'https://tse2.mm.bing.net/th/id/OIP._oGu-_2R5O5WJ7PwfvqTBAHaJL?rs=1&pid=ImgDetMain&o=7&rm=3',
    shortdesc: 'A family’s chaotic vacation turns into a journey of laughter and bonding.',
    longdesc:'Tourist Family is a heartwarming comedy-drama that follows a quirky family\'s chaotic vacation...',
     trailer:"https://youtu.be/9sH1PoGOydc?si=omHSgRzEbJ0e21gT"
  },
  {
    title: 'Abraham Ozler',
    date: '2024',
    image: 'https://www.filmibeat.com/img/190x100x237/popcorn/movie_posters/ozler-20230520093313-21802.jpg',
    shortdesc:'A seasoned cop reopens a cold case that leads him down a dark and personal path.',
    longdesc:'Abraham Ozler is a gripping psychological crime thriller centered around a veteran police officer haunted by a tragic past...',
    trailer:"https://youtu.be/txNRa0Qpu4A?si=r3oU4f043foHGRFX"
  },
];

const seedMovies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🗂 Connected to MongoDB');

    for (const movie of movies) {
      const existing = await Movie.findOne({ title: movie.title });
      if (existing) {
        // Update the existing movie
        await Movie.updateOne({ title: movie.title }, { $set: movie });
        console.log(`🔁 Updated: ${movie.title}`);
      } else {
        // Insert new movie
        await Movie.create(movie);
        console.log(`✅ Inserted: ${movie.title}`);
      }
    }

    console.log('🌱 Movie seeding complete!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedMovies();
