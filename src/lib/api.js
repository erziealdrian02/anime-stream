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

export async function fetchOngoingAnime() {
  try {
    const response = await fetch('http://localhost:3001/otakudesu/ongoing');
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
            `http://localhost:3001/otakudesu/anime/${anime.animeId}`
          );

          if (!detailsResponse.ok) {
            throw new Error(`Gagal mengambil data untuk ${anime.animeId}`);
          }

          const details = await detailsResponse.json();
          // console.log('Details dari lib:', details);

          // Akses data melalui properti 'data' terlebih dahulu
          const animeDetails = details.data;

          return {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            href: anime.href,
            score: animeDetails?.score ? animeDetails.score.toString() : 'N/A',
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
    const response = await fetch('http://localhost:3001/otakudesu/completed');
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
            `http://localhost:3001/otakudesu/anime/${anime.animeId}`
          );

          if (!detailsResponse.ok) {
            throw new Error(`Gagal mengambil data untuk ${anime.animeId}`);
          }

          const details = await detailsResponse.json();
          // console.log('Details dari lib:', details);

          // Akses data melalui properti 'data' terlebih dahulu
          const animeDetails = details.data;

          return {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            href: anime.href,
            score: animeDetails?.score ? animeDetails.score.toString() : 'N/A',
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
    const response = await fetch('http://localhost:3001/otakudesu/genres');
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
            `http://localhost:3001/otakudesu/genres/${genre.genreId}`
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
    const response = await fetch('http://localhost:3001/samehadaku/popular');
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
    const response = await fetch('http://localhost:3001/samehadaku/movies');
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
    // First API call to get the main episode data
    const response = await fetch(`http://localhost:3001/otakudesu/anime/${id}`);
    const result = await response.json();
    // console.log('result dari lib', result);

    // Check if we have valid result
    if (!result.ok || !result.data) {
      return {
        animeData: null,
        episodesInfo: [],
        batchDetails: null,
      };
    }

    const animeData = result.data;
    // console.log('animeData dari lib', animeData);

    // Get the episode list from the first API call
    const episodeList = animeData.episodeList || [];
    // console.log('episodeList dari lib', episodeList);

    const batchId =
      animeData.batch && animeData.batch.batchId
        ? animeData.batch.batchId
        : null;
    console.log('batchId dari lib', batchId);

    // Fetch anime details using batchId
    let batchDetails = null;
    if (batchId) {
      try {
        const animeResponse = await fetch(
          `http://localhost:3001/otakudesu/batch/${batchId}`
        );
        const batchData = await animeResponse.json();

        if (batchData.ok && batchData.data) {
          // Extract only synopsis paragraphs and poster
          batchDetails = {
            downloadUrl: batchData.data?.downloadUrl?.formats || [],
          };
        }
      } catch (error) {
        console.error('Error fetching anime details:', error);
      }
    }

    // Loop through each episode to fetch detailed information
    const episodes = await Promise.all(
      episodeList.map(async (episode) => {
        try {
          const episodeResponse = await fetch(
            `http://localhost:3001/otakudesu/episode/${episode.episodeId}`
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

    // console.log('animeData dari lib', animeData);
    // console.log('episodes dari lib', episodes);
    // console.log('batchDetails dari lib', batchDetails);

    return {
      animeData: animeData,
      episodes: episodes.filter(Boolean),
      batchDetails: batchDetails,
    };
  } catch (error) {
    console.error('Error fetching anime episode:', error);
    return {
      originalData: null,
      episodes: [],
    };
  }
}

export async function fetchDetailMovie(id) {
  try {
    const response = await fetch(
      `http://localhost:3001/samehadaku/anime/${id}`
    );
    const result = await response.json();

    const animeData = result.data;
    console.log('resul dari Movie lib', animeData);

    if (result.ok && result.data.episodeList) {
      const episodes = result.data.episodeList;
      const moreThanTwenty = episodes.length > 25; // Menentukan apakah lebih dari 50 episode

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
          `http://localhost:3001/samehadaku/episode/${episodeId}`
        );
        const episodeData = await episodeResponse.json();
        console.log('episodeData dari lib', episodeData);

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
      `http://localhost:3001/samehadaku/episode/${episodeId}`
    );
    const data = await response.json();
    console.log(data);

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
      `http://localhost:3001/otakudesu/episode/${episodeId}`
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
          `http://localhost:3001/otakudesu/anime/${animeId}`
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
            `http://localhost:3001/otakudesu/episode/${episode.episodeId}`
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
      `http://localhost:3001/samehadaku/episode/${episodeId}`
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
      `http://localhost:3001/otakudesu/server/${serverId}`,
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
      `http://localhost:3001/samehadaku/server/${serverId}`
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
      `http://localhost:3001/samehadaku/server/${serverId}`
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

export async function getCategoryShows(category) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Handle different category types
  if (category === 'korean-dramas') {
    return mockShows.filter(
      (show) => show.country === 'Korea' && show.type === 'drama'
    );
  } else if (category === 'chinese-dramas') {
    return mockShows.filter(
      (show) => show.country === 'China' && show.type === 'drama'
    );
  } else if (category === 'thai-dramas') {
    return mockShows.filter((show) => show.country === 'Thailand');
  } else if (category === 'variety-shows') {
    return mockShows.filter((show) => show.type === 'variety');
  } else if (category === 'anime') {
    return mockShows.filter((show) => show.type === 'anime');
  } else if (category === 'movies') {
    return mockShows.filter((show) => show.type === 'movie');
  } else if (category === 'new-releases') {
    return mockShows.filter((show) => show.isNew);
  } else if (category === 'trending') {
    return [...mockShows].sort((a, b) => b.popularity - a.popularity);
  }

  // Default: return all shows
  return mockShows;
}
