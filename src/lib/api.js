// Mock data for the API
const mockShows = [
  {
    id: '1',
    title: 'Test',
    description:
      'A powerful fairy accidentally awakens a sleeping devil, leading to an unexpected romance that transcends realms.',
    posterUrl: '/placeholder.svg?height=450&width=300',
    backdropUrl: '/placeholder.svg?height=800&width=1600',
    releaseYear: 2022,
    genres: ['Fantasy', 'Romance', 'Drama'],
    cast: ['Esther Yu', 'Dylan Wang', 'Xu Haiqiao'],
    director: 'Yi Zheng',
    rating: '9.2/10',
    duration: '40 min/ep',
    country: 'China',
    type: 'drama',
    isVip: true,
    isNew: false,
    popularity: 9.5,
  },
  {
    id: '2',
    title: 'The Glory',
    description:
      'A woman who was brutally bullied in high school meticulously plots revenge against her former tormentors years later.',
    posterUrl: '/placeholder.svg?height=450&width=300',
    backdropUrl: '/placeholder.svg?height=800&width=1600',
    releaseYear: 2022,
    genres: ['Thriller', 'Drama', 'Revenge'],
    cast: ['Song Hye-kyo', 'Lee Do-hyun', 'Lim Ji-yeon'],
    director: 'Ahn Gil-ho',
    rating: '8.9/10',
    duration: '50 min/ep',
    country: 'Korea',
    type: 'drama',
    isVip: false,
    isNew: true,
    popularity: 9.2,
  },
  {
    id: '3',
    title: 'Street Dance of China S5',
    description:
      'Top dancers from around the world compete in this high-energy street dance competition.',
    posterUrl: '/placeholder.svg?height=450&width=300',
    backdropUrl: '/placeholder.svg?height=800&width=1600',
    releaseYear: 2022,
    genres: ['Reality', 'Dance', 'Competition'],
    cast: ['Wang Yibo', 'Han Geng', 'Lay Zhang', 'Liu Yuxin'],
    director: 'Jin Lei',
    rating: '9.0/10',
    duration: '90 min/ep',
    country: 'China',
    type: 'variety',
    isVip: false,
    isNew: true,
    popularity: 8.9,
  },
  {
    id: '4',
    title: 'Bad Buddy',
    description:
      "Two boys who grew up as rivals due to their families' feud discover their feelings for each other.",
    posterUrl: '/placeholder.svg?height=450&width=300',
    backdropUrl: '/placeholder.svg?height=800&width=1600',
    releaseYear: 2021,
    genres: ['Romance', 'Drama', 'BL'],
    cast: ['Ohm Pawat', 'Nanon Korapat', 'Phuwin Tangsakyuen'],
    director: "P'Aof Noppharnach",
    rating: '9.3/10',
    duration: '45 min/ep',
    country: 'Thailand',
    type: 'drama',
    isVip: false,
    isNew: false,
    popularity: 9.0,
  },
  {
    id: '5',
    title: 'Demon Slayer: Kimetsu no Yaiba',
    description:
      'A young boy becomes a demon slayer after his family is slaughtered and his sister is turned into a demon.',
    posterUrl: '/placeholder.svg?height=450&width=300',
    backdropUrl: '/placeholder.svg?height=800&width=1600',
    releaseYear: 2019,
    genres: ['Anime', 'Action', 'Fantasy'],
    cast: ['Natsuki Hanae', 'Akari Kitō', 'Hiro Shimono'],
    director: 'Haruo Sotozaki',
    rating: '9.5/10',
    duration: '25 min/ep',
    country: 'Japan',
    type: 'anime',
    isVip: true,
    isNew: false,
    popularity: 9.7,
  },
];

const mockEpisodes = [
  {
    id: '101',
    showId: '1',
    title: 'The Encounter',
    description:
      'Orchid, a powerful fairy, accidentally awakens Moon Supreme, a sleeping devil, leading to an unexpected connection.',
    episodeNumber: 'EP01',
    thumbnailUrl: '/placeholder.svg?height=180&width=320',
    videoUrl: '',
    duration: '45:22',
    releaseDate: '2022-08-07',
  },
  {
    id: '102',
    showId: '1',
    title: 'The Bond',
    description:
      'Moon Supreme and Orchid form an unexpected bond as they navigate the complexities of their different worlds.',
    episodeNumber: 'EP02',
    thumbnailUrl: '/placeholder.svg?height=180&width=320',
    videoUrl: '',
    duration: '42:15',
    releaseDate: '2022-08-08',
  },
  {
    id: '103',
    showId: '1',
    title: 'The Promise',
    description:
      'As dangers approach, Moon Supreme makes a promise to protect Orchid, revealing a softer side to his character.',
    episodeNumber: 'EP03',
    thumbnailUrl: '/placeholder.svg?height=180&width=320',
    videoUrl: '',
    duration: '43:50',
    releaseDate: '2022-08-09',
  },
  {
    id: '201',
    showId: '2',
    title: 'The Plan',
    description:
      'Moon Dong-eun begins her meticulously planned revenge against those who tormented her in high school.',
    episodeNumber: 'EP01',
    thumbnailUrl: '/placeholder.svg?height=180&width=320',
    videoUrl: '',
    duration: '52:10',
    releaseDate: '2022-12-30',
  },
  {
    id: '202',
    showId: '2',
    title: 'The Approach',
    description:
      'Dong-eun gets closer to her targets, slowly infiltrating their lives as she prepares to execute her revenge.',
    episodeNumber: 'EP02',
    thumbnailUrl: '/placeholder.svg?height=180&width=320',
    videoUrl: '',
    duration: '54:25',
    releaseDate: '2022-12-30',
  },
];

// Mock anime news data
const mockAnimeNews = [
  {
    id: 'n1',
    title: 'Demon Slayer Season 4 Announced for 2024',
    excerpt:
      'The hit anime series Demon Slayer will return for a fourth season, covering the Hashira Training Arc.',
    content: [
      "Aniplex and Ufotable have officially announced that Demon Slayer: Kimetsu no Yaiba will return for a fourth season in 2024, adapting the Hashira Training Arc from Koyoharu Gotouge's original manga.",
      'The announcement came during a special event in Tokyo, where a teaser trailer was shown to excited fans. The new season will follow Tanjiro and the other Demon Slayers as they undergo intense training with the Hashira to prepare for the final battle against Muzan Kibutsuji.',
      'Season 3, which covered the Swordsmith Village Arc, concluded earlier this year to critical acclaim. The series continues to be one of the most popular anime worldwide, with the Demon Slayer: Mugen Train movie becoming the highest-grossing Japanese film of all time.',
      'Voice actors Natsuki Hanae (Tanjiro), Akari Kitō (Nezuko), and other main cast members are confirmed to return for the new season.',
    ],
    coverImage: '/placeholder.svg?height=720&width=1280',
    images: [
      '/placeholder.svg?height=360&width=640',
      '/placeholder.svg?height=360&width=640',
    ],
    category: 'updates',
    date: '2023-12-10',
    author: 'Anime News Network',
    relatedShows: [
      {
        id: 'a2',
        title: 'Demon Slayer',
        posterUrl: '/placeholder.svg?height=450&width=300',
      },
    ],
  },
  {
    id: 'n2',
    title: 'Jujutsu Kaisen Manga Enters Final Arc',
    excerpt:
      'Creator Gege Akutami confirms that the popular manga series is heading toward its conclusion.',
    content: [
      'Jujutsu Kaisen creator Gege Akutami has confirmed that the manga has entered its final arc, signaling that the story is approaching its conclusion after a successful run in Weekly Shonen Jump.',
      "The announcement came in the author's note of the latest chapter, where Akutami thanked fans for their continued support and promised an exciting finale to the series that has captivated readers worldwide.",
      'The manga, which began serialization in 2018, follows the story of Yuji Itadori, a high school student who joins a secret organization of Jujutsu Sorcerers to kill a powerful Curse named Ryomen Sukuna, of whom Yuji becomes the host.',
      'The anime adaptation by MAPPA has also been incredibly successful, with its second season currently airing to critical acclaim. Fans are speculating that the final arc could take 1-2 years to complete, depending on the pacing.',
    ],
    coverImage: '/placeholder.svg?height=720&width=1280',
    category: 'updates',
    date: '2023-11-28',
    author: 'Manga Plus',
    relatedShows: [
      {
        id: 'a3',
        title: 'Jujutsu Kaisen',
        posterUrl: '/placeholder.svg?height=450&width=300',
      },
    ],
  },
  {
    id: 'n3',
    title: 'Chainsaw Man Part 2 Anime Adaptation Confirmed',
    excerpt:
      "MAPPA announces they will adapt the second part of Tatsuki Fujimoto's popular manga series.",
    content: [
      'Animation studio MAPPA has officially announced that they will be producing an anime adaptation of Chainsaw Man Part 2: School Arc, following the success of the first season which covered the Public Safety Arc.',
      'The announcement was made during Jump Festa 2023, where a brief teaser visual was revealed showing the new protagonist, Asa Mitaka, alongside Denji. No release date has been confirmed yet, but production is said to be already underway.',
      'Chainsaw Man Part 2 began serialization in July 2022 and follows a new storyline set after the events of Part 1, with Denji now attending high school while still working as a Devil Hunter.',
      'The first season of Chainsaw Man was praised for its high-quality animation, faithful adaptation of the source material, and unique opening sequences for each episode. Fans are eagerly anticipating how MAPPA will handle the new arc, which introduces several new characters and explores different themes.',
    ],
    coverImage: '/placeholder.svg?height=720&width=1280',
    category: 'releases',
    date: '2023-12-05',
    author: 'Crunchyroll News',
    relatedShows: [
      {
        id: 'a11',
        title: 'Chainsaw Man',
        posterUrl: '/placeholder.svg?height=450&width=300',
      },
    ],
  },
  {
    id: 'n4',
    title: 'One Piece Film: Red Breaks Box Office Records',
    excerpt:
      "The 15th One Piece film becomes the franchise's highest-grossing movie to date.",
    content: [
      'One Piece Film: Red has officially become the highest-grossing film in the One Piece franchise, surpassing 15 billion yen (approximately $103 million) at the Japanese box office alone.',
      'The film, which focuses on the character Shanks and introduces his daughter Uta, has been a massive success worldwide, with strong performances in North America, France, and other international markets.',
      'Directed by Goro Taniguchi and written by Tsutomu Kuroiwa, the film features original character designs by One Piece creator Eiichiro Oda and music by Yasutaka Nakata.',
      'The success of Film: Red demonstrates the continued popularity of the One Piece franchise, which recently celebrated its 25th anniversary and is approaching its 1000th episode in the anime series.',
    ],
    coverImage: '/placeholder.svg?height=720&width=1280',
    category: 'releases',
    date: '2023-10-15',
    author: 'Box Office Mojo',
    relatedShows: [
      {
        id: 'a5',
        title: 'One Piece',
        posterUrl: '/placeholder.svg?height=450&width=300',
      },
    ],
  },
  {
    id: 'n5',
    title: 'Attack on Titan Creator Launches New Manga Series',
    excerpt:
      'Hajime Isayama returns with a new project after concluding his hit series Attack on Titan.',
    content: [
      'Hajime Isayama, the creator of the globally successful manga and anime series Attack on Titan, has announced his return to the manga world with a brand new series set to begin serialization next spring.',
      "The new project, which remains untitled, will be a departure from the dark fantasy themes of Attack on Titan, with Isayama describing it as a 'science fiction story with elements of mystery' in a recent interview.",
      'Attack on Titan concluded in April 2021 after an 11-year run, with the final season of the anime adaptation finishing earlier this year. The series was a massive success, selling over 100 million copies worldwide and receiving critical acclaim for its complex narrative and themes.',
      "Fans have expressed excitement about Isayama's return, with social media buzzing about what the new series might entail. The author has stated that he took time off after completing Attack on Titan to rest and gather new ideas before embarking on his next project.",
    ],
    coverImage: '/placeholder.svg?height=720&width=1280',
    category: 'interviews',
    date: '2023-11-03',
    author: 'Kodansha Comics',
    relatedShows: [
      {
        id: 'a1',
        title: 'Attack on Titan',
        posterUrl: '/placeholder.svg?height=450&width=300',
      },
    ],
  },
  {
    id: 'n6',
    title: 'Anime Japan 2024 Announces Dates and Featured Studios',
    excerpt:
      "The largest anime convention in Japan reveals its lineup for next year's event.",
    content: [
      'Anime Japan has announced the dates and participating studios for its 2024 event, which will be held at Tokyo Big Sight from March 23-26, 2024.',
      'Major studios including MAPPA, Ufotable, Kyoto Animation, Wit Studio, and Production I.G have confirmed their attendance, with special stage events and exclusive announcements planned throughout the four-day convention.',
      "This year's theme is 'Connecting Through Animation,' focusing on how anime brings people together across cultural and language barriers. The event will feature exhibition booths, stage performances, voice actor appearances, and exclusive merchandise.",
      'After reduced attendance during the pandemic years, Anime Japan 2024 is expected to return to full capacity, with organizers preparing for over 150,000 attendees. International fans unable to attend in person will be able to watch selected stage events via official livestreams.',
    ],
    coverImage: '/placeholder.svg?height=720&width=1280',
    category: 'events',
    date: '2023-12-01',
    author: 'Anime Japan Official',
  },
];

// export async function fetchOngoingAnime() {
//   try {
//     // Log untuk debugging di hosting
//     // console.log('Memulai fetch data ongoing anime');

//     const apiUrl = 'https://wenime-api.vercel.app/samehadaku/ongoing';
//     // console.log('Fetching dari URL:', apiUrl);

//     const response = await fetch(apiUrl, {
//       // Tambahkan opsi untuk CORS jika diperlukan
//       mode: 'cors',
//       headers: {
//         Accept: 'application/json',
//       },
//     });

//     if (!response.ok) {
//       console.error('Response tidak OK:', response.status, response.statusText);
//       return [];
//     }

//     const data = await response.json();
//     // console.log('Data yang diterima:', data);

//     if (!data?.data?.animeList || !Array.isArray(data.data.animeList)) {
//       console.error('Format data tidak valid:', data);
//       return [];
//     }

//     const animeList = data.data.animeList;
//     // console.log(`Berhasil mendapatkan ${animeList.length} anime`);

//     // Batasi jumlah permintaan bersamaan untuk menghindari rate limiting
//     const detailedAnimeList = await Promise.all(
//       animeList.slice(0, 10).map(async (anime) => {
//         // Batasi ke 10 item saja dulu
//         try {
//           const detailUrl = `https://wenime-api.vercel.app/samehadaku/anime/${anime.animeId}`;
//           // console.log(`Fetching detail untuk ${anime.title} dari ${detailUrl}`);

//           const detailsResponse = await fetch(detailUrl, {
//             mode: 'cors',
//             headers: {
//               Accept: 'application/json',
//             },
//           });

//           if (!detailsResponse.ok) {
//             console.error(
//               `Gagal mengambil detail untuk ${anime.animeId}:`,
//               detailsResponse.status
//             );
//             // Return data minimal daripada null
//             return {
//               animeId: anime.animeId,
//               title: anime.title,
//               poster: anime.poster || '',
//               href: anime.href || '',
//               score: 'N/A',
//               status: 'Unknown',
//               genres: [],
//             };
//           }

//           const details = await detailsResponse.json();

//           // Pastikan ada data yang valid
//           if (!details || !details.data) {
//             console.error(
//               `Data detail tidak valid untuk ${anime.animeId}:`,
//               details
//             );
//             return {
//               animeId: anime.animeId,
//               title: anime.title,
//               poster: anime.poster || '',
//               href: anime.href || '',
//               score: 'N/A',
//               status: 'Unknown',
//               genres: [],
//             };
//           }

//           const animeDetails = details.data;

//           return {
//             animeId: anime.animeId,
//             title: anime.title,
//             poster: anime.poster || '',
//             href: anime.href || '',
//             score: animeDetails?.score ? animeDetails.score.toString() : 'N/A',
//             status: animeDetails?.status ?? 'Unknown',
//             japanese: animeDetails?.japanese ?? '',
//             duration: animeDetails?.duration ?? '',
//             aired: animeDetails?.aired ?? '',
//             synopsis: animeDetails?.synopsis?.paragraphs ?? '',
//             genres: Array.isArray(animeDetails?.genreList)
//               ? animeDetails.genreList.map((genre) => ({
//                   title: genre.title || 'Unknown',
//                   genreId: genre.genreId || '',
//                 }))
//               : [],
//           };
//         } catch (error) {
//           console.error(`Error fetching details for ${anime.animeId}:`, error);
//           // Return data minimal daripada null
//           return {
//             animeId: anime.animeId,
//             title: anime.title,
//             poster: anime.poster || '',
//             href: anime.href || '',
//             score: 'N/A',
//             status: 'Unknown',
//             genres: [],
//           };
//         }
//       })
//     );

//     // Filter null value dan kembalikan hasilnya
//     const filteredList = detailedAnimeList.filter(Boolean);
//     console.log(`Berhasil mendapatkan ${filteredList.length} detail anime`);
//     return filteredList;
//   } catch (error) {
//     console.error('Error utama fetchOngoingAnime:', error);
//     return [];
//   }
// }

export async function fetchOngoingAnime() {
  try {
    const response = await fetch(
      'https://wenime-api.vercel.app/samehadaku/ongoing'
    );
    const data = await response.json();
    // console.log('Result dari lib:', data);

    if (
      !response.ok ||
      !data?.data?.animeList ||
      !Array.isArray(data.data.animeList)
    ) {
      return [];
    }

    const animeList = data.data.animeList;

    const detailedAnimeList = await Promise.all(
      animeList.map(async (anime) => {
        try {
          const detailsResponse = await fetch(
            `https://wenime-api.vercel.app/samehadaku/anime/${anime.animeId}`
          );
          console.log('Details dari lib:', detailsResponse);

          if (!detailsResponse.ok) {
            throw new Error(`Gagal mengambil data untuk ${anime.animeId}`);
          }

          const details = await detailsResponse.json();
          // console.log('Details dari lib:', details);

          // Akses data melalui properti 'data' terlebih dahulu
          const animeDetails = details.data;

          // Fix untuk score - periksa struktur objek dan akses nilai yang benar
          let scoreValue = 'N/A';
          if (animeDetails?.score) {
            // Jika score adalah objek dengan property value atau score
            if (typeof animeDetails.score === 'object') {
              scoreValue =
                animeDetails.score.value ||
                animeDetails.score.score ||
                JSON.stringify(animeDetails.score);
            }
            // Jika score langsung berupa string atau number
            else {
              scoreValue = animeDetails.score.toString();
            }
          }

          return {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            href: anime.href,
            score: scoreValue,
            status: animeDetails?.status ?? 'Unknown',
            japanese: animeDetails?.japanese ?? '',
            duration: animeDetails?.duration ?? '',
            aired: animeDetails?.aired ?? '',
            synopsis: animeDetails?.synopsis.paragraphs ?? '',
            genres: Array.isArray(animeDetails?.genreList)
              ? animeDetails.genreList.map((genre) => ({
                  title: genre.title || 'Unknown',
                  genreId: genre.genreId || '',
                }))
              : [],
          };
        } catch (error) {
          console.error(`Error fetching details for ${anime.animeId}:`, error);
          return null;
        }
      })
    );

    return detailedAnimeList.filter(Boolean);
  } catch (error) {
    console.error('Error fetching ongoing anime:', error);
    return [];
  }
}

export async function fetchCompleteAnime() {
  try {
    const response = await fetch(
      'https://wenime-api.vercel.app/samehadaku/completed'
    );
    const data = await response.json();
    // console.log('Result dari lib:', data);

    if (
      !response.ok ||
      !data?.data?.animeList ||
      !Array.isArray(data.data.animeList)
    ) {
      return [];
    }

    const animeList = data.data.animeList;

    const detailedAnimeList = await Promise.all(
      animeList.map(async (anime) => {
        try {
          const detailsResponse = await fetch(
            `https://wenime-api.vercel.app/samehadaku/anime/${anime.animeId}`
          );

          if (!detailsResponse.ok) {
            throw new Error(`Gagal mengambil data untuk ${anime.animeId}`);
          }

          const details = await detailsResponse.json();
          // console.log('Details dari lib:', details);

          // Akses data melalui properti 'data' terlebih dahulu
          const animeDetails = details.data;

          // Fix untuk score - periksa struktur objek dan akses nilai yang benar
          let scoreValue = 'N/A';
          if (animeDetails?.score) {
            // Jika score adalah objek dengan property value atau score
            if (typeof animeDetails.score === 'object') {
              scoreValue =
                animeDetails.score.value ||
                animeDetails.score.score ||
                JSON.stringify(animeDetails.score);
            }
            // Jika score langsung berupa string atau number
            else {
              scoreValue = animeDetails.score.toString();
            }
          }

          return {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            href: anime.href,
            score: scoreValue,
            status: animeDetails?.status ?? 'Unknown',
            japanese: animeDetails?.japanese ?? '',
            duration: animeDetails?.duration ?? '',
            aired: animeDetails?.aired ?? '',
            genres: Array.isArray(animeDetails?.genreList)
              ? animeDetails.genreList.map((genre) => ({
                  title: genre.title || 'Unknown',
                  genreId: genre.genreId || '',
                }))
              : [],
          };
        } catch (error) {
          console.error(`Error fetching details for ${anime.animeId}:`, error);
          return null;
        }
      })
    );

    return detailedAnimeList.filter(Boolean);
  } catch (error) {
    console.error('Error fetching ongoing anime:', error);
    return [];
  }
}

export async function fetchGenresWithPosters() {
  try {
    const response = await fetch(
      'https://wenime-api.vercel.app/samehadaku/genres'
    );
    const data = await response.json();

    if (!data.ok || !data.data.genreList) {
      return [];
    }

    // Ambil genre list
    const genreList = data.data.genreList;

    // Ambil poster dari anime pertama untuk setiap genre
    const updatedGenres = await Promise.all(
      genreList.map(async (genre) => {
        try {
          const genreResponse = await fetch(
            `https://wenime-api.vercel.app/samehadaku/genres/${genre.genreId}`
          );
          const genreData = await genreResponse.json();

          // Jika ada anime, gunakan poster pertama
          const poster =
            genreData.ok && genreData.data.animeList.length > 0
              ? genreData.data.animeList[4].poster
              : '/placeholder.svg?height=300&width=600';

          return {
            id: genre.genreId,
            title: genre.title,
            href: genre.href,
            image: poster,
          };
        } catch (error) {
          console.error(
            `Error fetching anime for genre ${genre.genreId}:`,
            error
          );
          return {
            id: genre.genreId,
            title: genre.title,
            href: genre.href,
            image: '/placeholder.svg?height=300&width=600',
          };
        }
      })
    );

    return updatedGenres;
  } catch (error) {
    console.error('Error fetching genres with posters:', error);
    return [];
  }
}

export async function fetchPopularAnime() {
  try {
    const response = await fetch(
      'https://wenime-api.vercel.app/samehadaku/popular'
    );
    const data = await response.json();

    if (data.ok && data.data.animeList) {
      return data.data.animeList;
    }

    return [];
  } catch (error) {
    console.error('Error fetching ongoing anime:', error);
    return [];
  }
}

export async function fetchMovieAnime() {
  try {
    const response = await fetch(
      'https://wenime-api.vercel.app/samehadaku/movies'
    );
    const data = await response.json();

    if (data.ok && data.data.animeList) {
      return data.data.animeList;
    }

    return [];
  } catch (error) {
    console.error('Error fetching ongoing anime:', error);
    return [];
  }
}

export async function fetchDetailAnime(id) {
  try {
    const response = await fetch(
      `https://wenime-api.vercel.app/samehadaku/anime/${id}`
    );
    const result = await response.json();

    if (!result.ok || !result.data) {
      return {
        animeData: null,
        episodes: [],
        batchDetails: null,
        moreThanTwenty: false,
        groupedEpisodes: {},
      };
    }

    const animeData = result.data;
    let episodeList = animeData.episodeList || [];
    const moreThanTwenty = episodeList.length > 25;

    // Fix episode numbering and titles
    episodeList = episodeList.map((episode, index) => {
      // Extract the correct episode number from the episodeId if possible
      const epNumFromId =
        episode.episodeId.match(/-episode-(\d+)/)?.[1] ||
        episode.episodeId.match(/-ep(\d+)/)?.[1] ||
        (index + 1).toString();

      // Use the most reliable source for episode number
      const episodeNumber = episode.episodeNumber || epNumFromId;

      // Fix title to match episode number if it's clearly wrong
      let title = episode.title;
      if (title && /^\d+$/.test(title) && title !== episodeNumber) {
        title = episodeNumber;
      } else if (!title) {
        title = `Episode ${episodeNumber}`;
      }

      return {
        ...episode,
        episodeNumber,
        title,
        releaseTime: episode.releaseTime || 'Unknown',
        duration: '24 min',
        description: 'Episode description will be available when watching',
        genreList: animeData.info?.genreList || [],
      };
    });

    // Get batch download information if available
    const batchId =
      animeData.batchList?.[0]?.batchId ||
      (animeData.batch && animeData.batch.batchId) ||
      null;

    let batchDetails = null;
    if (batchId) {
      try {
        const batchResponse = await fetch(
          `https://wenime-api.vercel.app/samehadaku/batch/${batchId}`
        );
        const batchData = await batchResponse.json();

        if (batchData.ok && batchData.data) {
          batchDetails = {
            downloadUrl: batchData.data?.downloadUrl?.formats || [],
          };
        }
      } catch (error) {
        console.error('Error fetching batch details:', error);
      }
    }

    if (moreThanTwenty) {
      const groupedEpisodes = {};
      const groupSize = 25;

      for (let i = 0; i < episodeList.length; i++) {
        const groupIndex = Math.floor(i / groupSize);
        const startEp = episodeList[groupIndex * groupSize].episodeNumber;
        const endEp =
          episodeList[
            Math.min((groupIndex + 1) * groupSize - 1, episodeList.length - 1)
          ].episodeNumber;
        const groupName = `Episode ${endEp}-${startEp}`;

        if (!groupedEpisodes[groupName]) {
          groupedEpisodes[groupName] = [];
        }

        groupedEpisodes[groupName].push(episodeList[i]);
      }

      return {
        animeData: animeData,
        episodes: episodeList,
        batchDetails: batchDetails,
        moreThanTwenty: true,
        groupedEpisodes: groupedEpisodes,
      };
    } else {
      const episodes = await Promise.all(
        episodeList.map(async (episode) => {
          try {
            const episodeResponse = await fetch(
              `https://wenime-api.vercel.app/samehadaku/episode/${episode.episodeId}`
            );

            if (!episodeResponse.ok) {
              throw new Error(`Failed to fetch data for ${episode.episodeId}`);
            }

            const episodeData = await episodeResponse.json();

            return {
              episodeId: episode.episodeId,
              title:
                episodeData.data?.title || `Episode ${episode.episodeNumber}`,
              releaseTime: episodeData.data?.releasedOn || 'Unknown',
              duration: episodeData.data?.info?.duration || 'Unknown',
              genreList: episodeData.data?.info?.genreList || [],
              episodeNumber: episode.episodeNumber, // Keep our corrected episode number
            };
          } catch (error) {
            console.error(
              `Error fetching data for episode ${episode.episodeId}:`,
              error
            );
            return null;
          }
        })
      );

      return {
        animeData: animeData,
        episodes: episodes.filter(Boolean),
        batchDetails: batchDetails,
        moreThanTwenty: false,
        groupedEpisodes: {},
      };
    }
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return {
      animeData: null,
      episodes: [],
      batchDetails: null,
      moreThanTwenty: false,
      groupedEpisodes: {},
    };
  }
}

export async function fetchDetailMovie(id) {
  try {
    const response = await fetch(
      `https://wenime-api.vercel.app/samehadaku/anime/${id}`
    );
    const result = await response.json();

    const animeData = result.data;
    // console.log('resul dari Movie lib', animeData);

    if (result.ok && result.data.episodeList) {
      const episodes = result.data.episodeList;
      const moreThanTwenty = episodes.length > 25; // Menentukan apakah lebih dari 50 episode
      console.log('MorethanTwenty', moreThanTwenty);

      if (episodes.length > 25) {
        // Jika lebih dari 25, hanya ambil satu episode dari setiap kelompok 25 episode
        const selectedEpisodes = [];
        const groupSize = 25;

        for (let i = 0; i < episodes.length; i += groupSize) {
          selectedEpisodes.push(episodes[i]); // Ambil episode pertama dari setiap kelompok
        }

        return { episodes: selectedEpisodes, animeData, moreThanTwenty };
      } else {
        // Jika 25 atau kurang, ambil recommendedEpisodeList dari API kedua
        const episodeId = episodes[0].episodeId; // Ambil episodeId dari episode pertama
        const episodeResponse = await fetch(
          `https://wenime-api.vercel.app/samehadaku/episode/${episodeId}`
        );
        const episodeData = await episodeResponse.json();
        // console.log('episodeData dari lib', episodeData);

        if (episodeData.ok && episodeData.data.recommendedEpisodeList) {
          const groupedEpisodes = episodeData.data.recommendedEpisodeList;
          return { episodes: groupedEpisodes, animeData, moreThanTwenty };
        }

        return { episodes: [], animeData, moreThanTwenty };
      }
    }

    return { episodes: [], animeData: null, moreThanTwenty: false };
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return { episodes: [], animeData: null, moreThanTwenty: false };
  }
}

export async function fetchMoreAnime(episodeId) {
  try {
    const response = await fetch(
      `https://wenime-api.vercel.app/samehadaku/episode/${episodeId}`
    );
    const data = await response.json();
    // console.log(data);

    if (data.ok && data.data.recommendedEpisodeList) {
      return data.data.recommendedEpisodeList;
    }

    return [];
  } catch (error) {
    console.error('Error fetching ongoing anime:', error);
    return [];
  }
}

export async function fetchEpisodeAnime(episodeId) {
  try {
    // First API call to get the main episode data
    const response = await fetch(
      `https://wenime-api.vercel.app/samehadaku/episode/${episodeId}`
    );
    const data = await response.json();
    // console.log('data dari lib', data);

    // Check if we have valid data
    if (!data.ok || !data.data) {
      return {
        originalData: null,
        episodesInfo: [],
        animeDetails: null,
      };
    }

    const originalData = data.data;

    // Get animeId from originalData to fetch anime details
    const animeId = originalData.animeId;

    // Fetch anime details using animeId
    let animeDetails = null;
    if (animeId) {
      try {
        const animeResponse = await fetch(
          `https://wenime-api.vercel.app/samehadaku/anime/${animeId}`
        );
        const animeData = await animeResponse.json();

        if (animeData.ok && animeData.data) {
          // Extract only synopsis paragraphs and poster
          animeDetails = {
            synopsis: animeData.data.synopsis?.paragraphs || [],
            poster: animeData.data.poster || null,
          };
        }
      } catch (error) {
        console.error('Error fetching anime details:', error);
      }
    }

    // Get the episode list from the first API call
    const episodeList = originalData.info?.episodeList || [];

    // Loop through each episode to fetch detailed information
    const episodesInfo = await Promise.all(
      episodeList.map(async (episode) => {
        try {
          const episodeResponse = await fetch(
            `https://wenime-api.vercel.app/samehadaku/episode/${episode.episodeId}`
          );

          if (!episodeResponse.ok) {
            throw new Error(`Failed to fetch data for ${episode.episodeId}`);
          }

          const episodeData = await episodeResponse.json();

          // Extract only the title and genreList
          const result = {
            episodeId: episode.episodeId,
            title: episodeData.data?.title || 'Unknown',
            releaseTime: episodeData.data?.releaseTime || 'Unknown',
            duration: episodeData.data?.info?.duration || 'Unknown',
            genreList: episodeData.data?.info?.genreList || [],
          };
          // console.log('result dari lib', result);

          return result;
        } catch (error) {
          console.error(
            `Error fetching data for episode ${episode.episodeId}:`,
            error
          );
          return null;
        }
      })
    );

    // console.log('originalData dari lib', originalData);
    // console.log('episodesInfo dari lib', episodesInfo);
    // console.log('animeDetails dari lib', animeDetails);

    return {
      originalData: originalData,
      episodesInfo: episodesInfo.filter(Boolean),
      animeDetails: animeDetails,
    };
  } catch (error) {
    console.error('Error fetching anime episode:', error);
    return {
      originalData: null,
      episodesInfo: [],
      animeDetails: null,
    };
  }
}

export async function fetchEpisodeMovie(episodeId) {
  try {
    const response = await fetch(
      `https://wenime-api.vercel.app/samehadaku/episode/${episodeId}`
    );
    const data = await response.json();
    // console.log('result dari lib', data);

    if (data.ok && data.data) {
      return data.data; // This returns the data directly
    }

    return null;
  } catch (error) {
    console.error('Error fetching anime episode:', error);
    return null;
  }
}

// Di fetchStreamAnime
export async function fetchStreamAnime(serverId) {
  try {
    const response = await fetch(
      `https://wenime-api.vercel.app/samehadaku/server/${serverId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Jika memerlukan cookies/session
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Jika URL adalah encoded, tambahkan parameter referer jika diperlukan
    if (data.data?.url?.includes('desustream.info')) {
      return {
        ...data.data,
        url: `${data.data.url}&referer=${encodeURIComponent(
          window.location.href
        )}`,
      };
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching stream:', error);
    return null;
  }
}

export async function fetchStreamMovie(serverId) {
  try {
    const response = await fetch(
      `https://wenime-api.vercel.app/samehadaku/server/${serverId}`
    );
    const data = await response.json();
    // console.log('result dari lib', data);
    if (data.ok && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching anime episode:', error);
    return null;
  }
}

// Function to fetch server data
export async function fetchServerData(serverId) {
  try {
    const response = await fetch(
      `https://wenime-api.vercel.app/samehadaku/server/${serverId}`
    );
    const data = await response.json();

    if (data.ok && data.data) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error('Error fetching server data:', error);
    return null;
  }
}

export async function fetchAllOngoingAnime() {
  try {
    // Ambil halaman pertama untuk mendapatkan informasi total pages
    const firstResponse = await fetch(
      'https://wenime-api.vercel.app/samehadaku/ongoing'
    );
    const firstData = await firstResponse.json();

    if (
      !firstResponse.ok ||
      !firstData?.data?.animeList ||
      !Array.isArray(firstData.data.animeList)
    ) {
      return [];
    }

    // Mendapatkan total halaman dari pagination
    const totalPages = firstData.pagination.totalPages || 1;
    let allAnimeList = [...firstData.data.animeList];

    // Ambil semua halaman lainnya (2 sampai totalPages)
    const pagePromises = [];
    for (let page = 2; page <= totalPages; page++) {
      pagePromises.push(
        fetch(`https://wenime-api.vercel.app/samehadaku/ongoing?page=${page}`)
          .then((res) => res.json())
          .then((data) => data?.data?.animeList || [])
      );
    }

    // Tunggu semua request pagination selesai
    const pagesData = await Promise.all(pagePromises);

    // Gabungkan semua data anime dari semua halaman
    pagesData.forEach((pageAnimeList) => {
      if (Array.isArray(pageAnimeList)) {
        allAnimeList = [...allAnimeList, ...pageAnimeList];
      }
    });

    // Proses untuk mendapatkan detail dari setiap anime
    const detailedAnimeList = await Promise.all(
      allAnimeList.map(async (anime) => {
        try {
          const detailsResponse = await fetch(
            `https://wenime-api.vercel.app/samehadaku/anime/${anime.animeId}`
          );

          if (!detailsResponse.ok) {
            throw new Error(`Gagal mengambil data untuk ${anime.animeId}`);
          }

          const details = await detailsResponse.json();
          // Akses data melalui properti 'data' terlebih dahulu
          const animeDetails = details.data;

          // Fix untuk score - periksa struktur objek dan akses nilai yang benar
          let scoreValue = 'N/A';
          if (animeDetails?.score) {
            // Jika score adalah objek dengan property value atau score
            if (typeof animeDetails.score === 'object') {
              scoreValue =
                animeDetails.score.value ||
                animeDetails.score.score ||
                JSON.stringify(animeDetails.score);
            }
            // Jika score langsung berupa string atau number
            else {
              scoreValue = animeDetails.score.toString();
            }
          }

          return {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            href: anime.href,
            episodes: anime.episodes,
            releaseDay: anime.releaseDay,
            latestReleaseDate: anime.latestReleaseDate,
            score: scoreValue,
            status: animeDetails?.status ?? 'Ongoing',
            japanese: animeDetails?.japanese ?? '',
            duration: animeDetails?.duration ?? '',
            aired: animeDetails?.aired ?? '',
            synopsis: animeDetails?.synopsis?.paragraphs ?? '',
            genres: Array.isArray(animeDetails?.genreList)
              ? animeDetails.genreList.map((genre) => ({
                  title: genre.title || 'Unknown',
                  genreId: genre.genreId || '',
                }))
              : [],
          };
        } catch (error) {
          console.error(`Error fetching details for ${anime.animeId}:`, error);
          // Return basic anime info tanpa detail jika gagal fetch detail
          return {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            href: anime.href,
            episodes: anime.episodes,
            releaseDay: anime.releaseDay,
            latestReleaseDate: anime.latestReleaseDate,
            score: 'N/A',
            status: 'Ongoing',
            genres: [],
          };
        }
      })
    );

    return detailedAnimeList.filter(Boolean);
  } catch (error) {
    console.error('Error fetching all ongoing anime:', error);
    return [];
  }
}

export async function fetchAllCompleteAnime(pageLimit = 3) {
  try {
    // Ambil halaman pertama untuk mendapatkan informasi total pages
    const firstResponse = await fetch(
      'https://wenime-api.vercel.app/samehadaku/completed'
    );
    const firstData = await firstResponse.json();

    if (
      !firstResponse.ok ||
      !firstData?.data?.animeList ||
      !Array.isArray(firstData.data.animeList)
    ) {
      return { animeList: [], totalPages: 0, currentPage: 1 };
    }

    // Mendapatkan total halaman dari pagination
    const totalPages = firstData.pagination.totalPages || 1;
    const actualPageLimit = Math.min(pageLimit, totalPages);

    let allAnimeList = [...firstData.data.animeList];

    // Ambil halaman 2 sampai actualPageLimit (batas 3 halaman)
    const pagePromises = [];
    for (let page = 2; page <= actualPageLimit; page++) {
      pagePromises.push(
        fetch(`https://wenime-api.vercel.app/samehadaku/completed?page=${page}`)
          .then((res) => res.json())
          .then((data) => data?.data?.animeList || [])
      );
    }

    // Tunggu semua request pagination selesai
    const pagesData = await Promise.all(pagePromises);

    // Gabungkan semua data anime dari halaman yang diambil
    pagesData.forEach((pageAnimeList) => {
      if (Array.isArray(pageAnimeList)) {
        allAnimeList = [...allAnimeList, ...pageAnimeList];
      }
    });

    // Proses untuk mendapatkan detail dari setiap anime
    const detailedAnimeList = await Promise.all(
      allAnimeList.map(async (anime) => {
        try {
          const detailsResponse = await fetch(
            `https://wenime-api.vercel.app/samehadaku/anime/${anime.animeId}`
          );

          if (!detailsResponse.ok) {
            throw new Error(`Gagal mengambil data untuk ${anime.animeId}`);
          }

          const details = await detailsResponse.json();
          // Akses data melalui properti 'data' terlebih dahulu
          const animeDetails = details.data;

          // Fix untuk score - periksa struktur objek dan akses nilai yang benar
          let scoreValue = 'N/A';
          if (animeDetails?.score) {
            // Jika score adalah objek dengan property value atau score
            if (typeof animeDetails.score === 'object') {
              scoreValue =
                animeDetails.score.value ||
                animeDetails.score.score ||
                JSON.stringify(animeDetails.score);
            }
            // Jika score langsung berupa string atau number
            else {
              scoreValue = animeDetails.score.toString();
            }
          }

          return {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            href: anime.href,
            episodes: anime.episodes,
            releaseDay: anime.releaseDay,
            latestReleaseDate: anime.latestReleaseDate,
            score: scoreValue,
            status: animeDetails?.status ?? 'Complete',
            japanese: animeDetails?.japanese ?? '',
            duration: animeDetails?.duration ?? '',
            aired: animeDetails?.aired ?? '',
            synopsis: animeDetails?.synopsis?.paragraphs ?? '',
            genres: Array.isArray(animeDetails?.genreList)
              ? animeDetails.genreList.map((genre) => ({
                  title: genre.title || 'Unknown',
                  genreId: genre.genreId || '',
                }))
              : [],
          };
        } catch (error) {
          console.error(`Error fetching details for ${anime.animeId}:`, error);
          // Return basic anime info tanpa detail jika gagal fetch detail
          return {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            href: anime.href,
            episodes: anime.episodes,
            releaseDay: anime.releaseDay,
            latestReleaseDate: anime.latestReleaseDate,
            score: 'N/A',
            status: 'Complete',
            genres: [],
          };
        }
      })
    );

    return {
      animeList: detailedAnimeList.filter(Boolean),
      totalPages: totalPages,
      currentPage: actualPageLimit,
    };
  } catch (error) {
    console.error('Error fetching complete anime:', error);
    return { animeList: [], totalPages: 0, currentPage: 1 };
  }
}

export async function fetchAllMovie(pageLimit = 3) {
  try {
    // Ambil halaman pertama untuk mendapatkan informasi total pages
    const firstResponse = await fetch(
      'https://wenime-api.vercel.app/samehadaku/movies'
    );
    const firstData = await firstResponse.json();

    if (
      !firstResponse.ok ||
      !firstData?.data?.animeList ||
      !Array.isArray(firstData.data.animeList)
    ) {
      return { animeList: [], totalPages: 0, currentPage: 1 };
    }

    // Mendapatkan total halaman dari pagination
    const totalPages = firstData.pagination.totalPages || 1;
    const actualPageLimit = Math.min(pageLimit, totalPages);

    let allAnimeList = [...firstData.data.animeList];

    // Ambil halaman 2 sampai actualPageLimit (batas 3 halaman)
    const pagePromises = [];
    for (let page = 2; page <= actualPageLimit; page++) {
      pagePromises.push(
        fetch(`https://wenime-api.vercel.app/samehadaku/movies?page=${page}`)
          .then((res) => res.json())
          .then((data) => data?.data?.animeList || [])
      );
    }

    // Tunggu semua request pagination selesai
    const pagesData = await Promise.all(pagePromises);

    // Gabungkan semua data anime dari halaman yang diambil
    pagesData.forEach((pageAnimeList) => {
      if (Array.isArray(pageAnimeList)) {
        allAnimeList = [...allAnimeList, ...pageAnimeList];
      }
    });

    // Proses untuk mendapatkan detail dari setiap anime
    const detailedAnimeList = await Promise.all(
      allAnimeList.map(async (anime) => {
        try {
          const detailsResponse = await fetch(
            `https://wenime-api.vercel.app/samehadaku/anime/${anime.animeId}`
          );

          if (!detailsResponse.ok) {
            throw new Error(`Gagal mengambil data untuk ${anime.animeId}`);
          }

          const details = await detailsResponse.json();
          // Akses data melalui properti 'data' terlebih dahulu
          const animeDetails = details.data;
          console.log('animeDetails dari lib', animeDetails);

          return {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            href: anime.href,
            episodes: anime.episodes,
            releaseDay: anime.releaseDay,
            latestReleaseDate: anime.latestReleaseDate,
            score: animeDetails?.score?.value ?? 'N/A',
            status: animeDetails?.status ?? 'Complete',
            japanese: animeDetails?.japanese ?? '',
            duration: animeDetails?.duration ?? '',
            aired: animeDetails?.aired ?? '',
            synopsis: animeDetails?.synopsis?.paragraphs ?? '',
            genres: Array.isArray(animeDetails?.genreList)
              ? animeDetails.genreList.map((genre) => ({
                  title: genre.title || 'Unknown',
                  genreId: genre.genreId || '',
                }))
              : [],
          };
        } catch (error) {
          console.error(`Error fetching details for ${anime.animeId}:`, error);
          // Return basic anime info tanpa detail jika gagal fetch detail
          return {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            href: anime.href,
            episodes: anime.episodes,
            releaseDay: anime.releaseDay,
            latestReleaseDate: anime.latestReleaseDate,
            score: 'N/A',
            status: 'Complete',
            genres: [],
          };
        }
      })
    );

    return {
      animeList: detailedAnimeList.filter(Boolean),
      totalPages: totalPages,
      currentPage: actualPageLimit,
    };
  } catch (error) {
    console.error('Error fetching complete anime:', error);
    return { animeList: [], totalPages: 0, currentPage: 1 };
  }
}

export async function fetchMoreCompleteAnime(startPage, endPage) {
  try {
    const pagePromises = [];
    for (let page = startPage; page <= endPage; page++) {
      pagePromises.push(
        fetch(`https://wenime-api.vercel.app/samehadaku/completed?page=${page}`)
          .then((res) => res.json())
          .then((data) => data?.data?.animeList || [])
      );
    }

    // Get all anime from the requested pages
    const pagesData = await Promise.all(pagePromises);
    let newAnimeList = [];

    // Combine all anime data
    pagesData.forEach((pageAnimeList) => {
      if (Array.isArray(pageAnimeList)) {
        newAnimeList = [...newAnimeList, ...pageAnimeList];
      }
    });

    // Get details for each anime
    const detailedAnimeList = await Promise.all(
      newAnimeList.map(async (anime) => {
        try {
          const detailsResponse = await fetch(
            `https://wenime-api.vercel.app/samehadaku/anime/${anime.animeId}`
          );

          if (!detailsResponse.ok) {
            throw new Error(`Gagal mengambil data untuk ${anime.animeId}`);
          }

          const details = await detailsResponse.json();
          const animeDetails = details.data;

          // Fix untuk score - periksa struktur objek dan akses nilai yang benar
          let scoreValue = 'N/A';
          if (animeDetails?.score) {
            // Jika score adalah objek dengan property value atau score
            if (typeof animeDetails.score === 'object') {
              scoreValue =
                animeDetails.score.value ||
                animeDetails.score.score ||
                JSON.stringify(animeDetails.score);
            }
            // Jika score langsung berupa string atau number
            else {
              scoreValue = animeDetails.score.toString();
            }
          }

          return {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            href: anime.href,
            episodes: anime.episodes,
            releaseDay: anime.releaseDay,
            latestReleaseDate: anime.latestReleaseDate,
            score: scoreValue,
            status: animeDetails?.status ?? 'Complete',
            japanese: animeDetails?.japanese ?? '',
            duration: animeDetails?.duration ?? '',
            aired: animeDetails?.aired ?? '',
            synopsis: animeDetails?.synopsis?.paragraphs ?? '',
            genres: Array.isArray(animeDetails?.genreList)
              ? animeDetails.genreList.map((genre) => ({
                  title: genre.title || 'Unknown',
                  genreId: genre.genreId || '',
                }))
              : [],
          };
        } catch (error) {
          console.error(`Error fetching details for ${anime.animeId}:`, error);
          return {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            href: anime.href,
            episodes: anime.episodes,
            releaseDay: anime.releaseDay,
            latestReleaseDate: anime.latestReleaseDate,
            score: 'N/A',
            status: 'Complete',
            genres: [],
          };
        }
      })
    );

    return detailedAnimeList.filter(Boolean);
  } catch (error) {
    console.error('Error fetching more anime:', error);
    return [];
  }
}

export async function fetchAllAnime() {
  try {
    const response = await fetch(
      'https://wenime-api.vercel.app/samehadaku/anime'
    );
    const data = await response.json();
    // console.log('Result dari lib:', data);

    if (
      !response.ok ||
      !data?.data?.list?.animeList ||
      !Array.isArray(data.data.list.animeList)
    ) {
      return [];
    }

    const animeList = data.data.list.animeList;
    // console.log('animeList dari lib:', animeList);

    const detailedAnimeList = await Promise.all(
      animeList.map(async (anime) => {
        try {
          const detailsResponse = await fetch(
            `https://wenime-api.vercel.app/samehadaku/anime/${anime.animeId}`
          );

          if (!detailsResponse.ok) {
            throw new Error(`Gagal mengambil data untuk ${anime.animeId}`);
          }

          const details = await detailsResponse.json();
          // console.log('Details dari lib:', details);

          // Akses data melalui properti 'data' terlebih dahulu
          const animeDetails = details.data;

          // Fix untuk score - periksa struktur objek dan akses nilai yang benar
          let scoreValue = 'N/A';
          if (animeDetails?.score) {
            // Jika score adalah objek dengan property value atau score
            if (typeof animeDetails.score === 'object') {
              scoreValue =
                animeDetails.score.value ||
                animeDetails.score.score ||
                JSON.stringify(animeDetails.score);
            }
            // Jika score langsung berupa string atau number
            else {
              scoreValue = animeDetails.score.toString();
            }
          }

          return {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            href: anime.href,
            score: scoreValue,
            status: animeDetails?.status ?? 'Unknown',
            japanese: animeDetails?.japanese ?? '',
            duration: animeDetails?.duration ?? '',
            aired: animeDetails?.aired ?? '',
            synopsis: animeDetails?.synopsis.paragraphs ?? '',
            genres: Array.isArray(animeDetails?.genreList)
              ? animeDetails.genreList.map((genre) => ({
                  title: genre.title || 'Unknown',
                  genreId: genre.genreId || '',
                }))
              : [],
          };
        } catch (error) {
          console.error(`Error fetching details for ${anime.animeId}:`, error);
          return null;
        }
      })
    );

    return detailedAnimeList.filter(Boolean);
  } catch (error) {
    console.error('Error fetching ongoing anime:', error);
    return [];
  }
}

export async function fetchScheduleAnime() {
  try {
    const response = await fetch(
      'https://wenime-api.vercel.app/samehadaku/schedule'
    );
    const data = await response.json();
    // console.log('Result dari lib:', data);

    if (!response.ok || !data?.data?.days || !Array.isArray(data.data.days)) {
      return [];
    }

    const scheduleAnime = data.data.days;
    // console.log('scheduleAnime dari lib:', scheduleAnime);

    // Create an array to hold all anime with details across all days
    const allDetailedAnime = [];

    // Process each day
    for (const day of scheduleAnime) {
      // Process each anime in the day's animeList
      const detailedAnimeForDay = await Promise.all(
        day.animeList.map(async (anime) => {
          try {
            const detailsResponse = await fetch(
              `https://wenime-api.vercel.app/samehadaku/anime/${anime.animeId}`
            );

            if (!detailsResponse.ok) {
              throw new Error(`Gagal mengambil data untuk ${anime.animeId}`);
            }

            const details = await detailsResponse.json();
            const animeDetails = details.data;
            // console.log('animeDetails dari lib:', animeDetails);

            let scoreValue = 'N/A';
            if (animeDetails?.score) {
              // Jika score adalah objek dengan property value atau score
              if (typeof animeDetails.score === 'object') {
                scoreValue =
                  animeDetails.score.value ||
                  animeDetails.score.score ||
                  JSON.stringify(animeDetails.score);
              }
              // Jika score langsung berupa string atau number
              else {
                scoreValue = animeDetails.score.toString();
              }
            }

            return {
              animeId: anime.animeId,
              title: anime.title,
              href: anime.href,
              day: day.day, // Add the day information
              poster: animeDetails?.poster || '',
              score: scoreValue,
              status: animeDetails?.status || 'Unknown',
              japanese: animeDetails?.japanese || '',
              duration: animeDetails?.duration || '',
              aired: animeDetails?.aired || '',
              synopsis: animeDetails?.synopsis?.paragraphs || [],
              genres: Array.isArray(animeDetails?.genreList)
                ? animeDetails.genreList.map((genre) => ({
                    title: genre.title || 'Unknown',
                    genreId: genre.genreId || '',
                  }))
                : [],
            };
          } catch (error) {
            console.error(
              `Error fetching details for ${anime.animeId}:`,
              error
            );
            return null;
          }
        })
      );

      // Add the detailed anime for this day to the overall list
      allDetailedAnime.push({
        day: day.day,
        animeList: detailedAnimeForDay.filter(Boolean),
      });
    }

    return allDetailedAnime;
  } catch (error) {
    console.error('Error fetching schedule anime:', error);
    return [];
  }
}

export async function fetchAnimebyCategory(genreId, pageLimit = 3) {
  try {
    // Ambil halaman pertama untuk mendapatkan informasi total pages
    const firstResponse = await fetch(
      `https://wenime-api.vercel.app/samehadaku/genres/${genreId}`
    );
    const firstData = await firstResponse.json();

    if (
      !firstResponse.ok ||
      !firstData?.data?.animeList ||
      !Array.isArray(firstData.data.animeList)
    ) {
      return { animeList: [], totalPages: 0, currentPage: 1 };
    }

    // Mendapatkan total halaman dari pagination
    const totalPages = firstData.pagination.totalPages || 1;
    const actualPageLimit = Math.min(pageLimit, totalPages);

    let allAnimeList = [...firstData.data.animeList];

    // Ambil halaman 2 sampai actualPageLimit (batas pageLimit)
    const pagePromises = [];
    for (let page = 2; page <= actualPageLimit; page++) {
      pagePromises.push(
        fetch(
          `https://wenime-api.vercel.app/samehadaku/genres/${genreId}?page=${page}`
        )
          .then((res) => res.json())
          .then((data) => data?.data?.animeList || [])
      );
    }

    // Tunggu semua request pagination selesai
    const pagesData = await Promise.all(pagePromises);

    // Gabungkan semua data anime dari halaman yang diambil
    pagesData.forEach((pageAnimeList) => {
      if (Array.isArray(pageAnimeList)) {
        allAnimeList = [...allAnimeList, ...pageAnimeList];
      }
    });

    // Proses untuk mendapatkan detail dari setiap anime
    const detailedAnimeList = await Promise.all(
      allAnimeList.map(async (anime) => {
        try {
          const detailsResponse = await fetch(
            `https://wenime-api.vercel.app/samehadaku/anime/${anime.animeId}`
          );

          if (!detailsResponse.ok) {
            throw new Error(`Gagal mengambil data untuk ${anime.animeId}`);
          }

          const details = await detailsResponse.json();
          // Akses data melalui properti 'data' terlebih dahulu
          const animeDetails = details.data;

          // Fix untuk score - periksa struktur objek dan akses nilai yang benar
          let scoreValue = 'N/A';
          if (animeDetails?.score) {
            // Jika score adalah objek dengan property value atau score
            if (typeof animeDetails.score === 'object') {
              scoreValue =
                animeDetails.score.value ||
                animeDetails.score.score ||
                JSON.stringify(animeDetails.score);
            }
            // Jika score langsung berupa string atau number
            else {
              scoreValue = animeDetails.score.toString();
            }
          }

          return {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            href: anime.href,
            episodes: anime.episodes,
            releaseDay: anime.releaseDay || null,
            latestReleaseDate: anime.latestReleaseDate || null,
            score: scoreValue,
            status: animeDetails?.status ?? 'Complete',
            japanese: animeDetails?.japanese ?? '',
            duration: animeDetails?.duration ?? '',
            aired: animeDetails?.aired ?? '',
            synopsis: animeDetails?.synopsis?.paragraphs ?? '',
            genres: Array.isArray(animeDetails?.genreList)
              ? animeDetails.genreList
              : Array.isArray(anime.genreList)
              ? anime.genreList
              : [],
          };
        } catch (error) {
          console.error(`Error fetching details for ${anime.animeId}:`, error);
          // Return basic anime info tanpa detail jika gagal fetch detail
          return {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            href: anime.href,
            episodes: anime.episodes,
            releaseDay: anime.releaseDay || null,
            latestReleaseDate: anime.latestReleaseDate || null,
            score: anime.score ? anime.score.toString() : 'N/A',
            status: 'Complete',
            genres: Array.isArray(anime.genreList) ? anime.genreList : [],
            synopsis: anime.synopsis?.paragraphs || '',
          };
        }
      })
    );
    console.log('detailedAnimeList dari lib', detailedAnimeList);

    return {
      animeList: detailedAnimeList.filter(Boolean),
      totalPages: totalPages,
      currentPage: actualPageLimit,
    };
  } catch (error) {
    console.error('Error fetching complete anime:', error);
    return { animeList: [], totalPages: 0, currentPage: 1 };
  }
}

export async function fetchMoreAnimebyCategory(genreId, startPage, endPage) {
  try {
    const pagePromises = [];
    for (let page = startPage; page <= endPage; page++) {
      pagePromises.push(
        fetch(
          `https://wenime-api.vercel.app/samehadaku/genres/${genreId}?page=${page}`
        )
          .then((res) => res.json())
          .then((data) => data?.data?.animeList || [])
      );
    }

    // Get all anime from the requested pages
    const pagesData = await Promise.all(pagePromises);
    let newAnimeList = [];

    // Combine all anime data
    pagesData.forEach((pageAnimeList) => {
      if (Array.isArray(pageAnimeList)) {
        newAnimeList = [...newAnimeList, ...pageAnimeList];
      }
    });

    // Get details for each anime
    const detailedAnimeList = await Promise.all(
      newAnimeList.map(async (anime) => {
        try {
          const detailsResponse = await fetch(
            `https://wenime-api.vercel.app/samehadaku/anime/${anime.animeId}`
          );

          if (!detailsResponse.ok) {
            throw new Error(`Gagal mengambil data untuk ${anime.animeId}`);
          }

          const details = await detailsResponse.json();
          const animeDetails = details.data;

          // Fix untuk score - periksa struktur objek dan akses nilai yang benar
          let scoreValue = 'N/A';
          if (animeDetails?.score) {
            // Jika score adalah objek dengan property value atau score
            if (typeof animeDetails.score === 'object') {
              scoreValue =
                animeDetails.score.value ||
                animeDetails.score.score ||
                JSON.stringify(animeDetails.score);
            }
            // Jika score langsung berupa string atau number
            else {
              scoreValue = animeDetails.score.toString();
            }
          }

          return {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            href: anime.href,
            episodes: anime.episodes,
            releaseDay: anime.releaseDay || null,
            latestReleaseDate: anime.latestReleaseDate || null,
            score: scoreValue,
            status: animeDetails?.status ?? 'Complete',
            japanese: animeDetails?.japanese ?? '',
            duration: animeDetails?.duration ?? '',
            aired: animeDetails?.aired ?? '',
            synopsis: animeDetails?.synopsis?.paragraphs ?? '',
            genres: Array.isArray(animeDetails?.genreList)
              ? animeDetails.genreList
              : Array.isArray(anime.genreList)
              ? anime.genreList
              : [],
          };
        } catch (error) {
          console.error(`Error fetching details for ${anime.animeId}:`, error);
          return {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            href: anime.href,
            episodes: anime.episodes,
            releaseDay: anime.releaseDay || null,
            latestReleaseDate: anime.latestReleaseDate || null,
            score: anime.score ? anime.score.toString() : 'N/A',
            status: 'Complete',
            genres: Array.isArray(anime.genreList) ? anime.genreList : [],
            synopsis: anime.synopsis?.paragraphs || '',
          };
        }
      })
    );
    // console.log('detailedAnimeList dari lib', detailedAnimeList);

    return detailedAnimeList.filter(Boolean);
  } catch (error) {
    console.error('Error fetching more anime:', error);
    return [];
  }
}

// API functions
export async function getFeaturedShow() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockShows[0];
}

export async function getFeaturedShows() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockShows.slice(0, 5);
}

export async function getTrendingShows() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...mockShows].sort((a, b) => b.popularity - a.popularity);
}

export async function getRecommendedShows() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockShows.filter((show) => show.popularity > 9.0);
}

export async function getNewReleases() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockShows.filter((show) => show.isNew);
}

export async function getShowDetails(id) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const show = mockShows.find((show) => show.id === id);
  if (!show) throw new Error('Show not found');
  return show;
}

export async function getEpisodes(showId) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockEpisodes.filter((episode) => episode.showId === showId);
}

export async function getRelatedShows(id) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const show = mockShows.find((show) => show.id === id);
  if (!show) return [];

  // Return shows with similar genres
  return mockShows
    .filter((s) => s.id !== id && s.genres.some((g) => show.genres.includes(g)))
    .slice(0, 5);
}

export async function searchShows(query) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const lowerQuery = query.toLowerCase();

  return mockShows.filter(
    (show) =>
      show.title.toLowerCase().includes(lowerQuery) ||
      show.description.toLowerCase().includes(lowerQuery) ||
      show.genres.some((g) => g.toLowerCase().includes(lowerQuery)) ||
      show.cast.some((c) => c.toLowerCase().includes(lowerQuery))
  );
}

// API functions for new pages
export async function getAnimeNews() {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockAnimeNews;
}

export async function getNewsDetail(id) {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const news = mockAnimeNews.find((item) => item.id === id);
  if (!news) throw new Error('News article not found');
  return news;
}
