('use client');

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAnimeSchedule } from '../lib/api';

function SchedulePage() {
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState('');

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const data = await getAnimeSchedule();
        setSchedule(data);

        // Set active day to current day or first day with content
        const today = new Date().toLocaleDateString('en-US', {
          weekday: 'long',
        });
        if (data[today] && data[today].length > 0) {
          setActiveDay(today);
        } else {
          const firstDayWithContent =
            days.find((day) => data[day] && data[day].length > 0) || days[0];
          setActiveDay(firstDayWithContent);
        }
      } catch (error) {
        console.error('Error fetching anime schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Secondary Navigation */}
      <div className="bg-black/90 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6 text-sm overflow-x-auto py-3">
            <Link
              to="/"
              className="text-gray-400 hover:text-white whitespace-nowrap"
            >
              Untukmu
            </Link>
            <Link to="/schedule" className="text-white whitespace-nowrap">
              Jadwal Rilis
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Jadwal Rilis Anime</h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            {/* Day Tabs */}
            <div className="flex overflow-x-auto space-x-2 mb-8 pb-2">
              {days.map((day) => (
                <button
                  key={day}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                      ${
                        activeDay === day
                          ? 'bg-primary text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                  onClick={() => setActiveDay(day)}
                >
                  {day}
                  {schedule[day] && (
                    <span className="ml-2 bg-gray-700 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {schedule[day].length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Schedule Content */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {activeDay}'s Releases
              </h2>

              {schedule[activeDay] && schedule[activeDay].length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {schedule[activeDay].map((anime) => (
                    <Link
                      key={anime.id}
                      to={`/details/${anime.id}`}
                      className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex p-4">
                        <div className="relative w-20 h-28 flex-shrink-0">
                          <img
                            src={
                              anime.posterUrl ||
                              '/placeholder.svg?height=450&width=300'
                            }
                            alt={anime.title}
                            className="absolute inset-0 w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-bold">{anime.title}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-400">
                            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs">
                              {anime.releaseTime}
                            </span>
                            <span className="mx-2">•</span>
                            <span>Episode {anime.nextEpisode}</span>
                          </div>
                          <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                            {anime.description}
                          </p>
                          <div className="mt-2 flex items-center">
                            {anime.isVip && (
                              <span className="bg-yellow-500 text-black text-xs font-bold px-1 py-0.5 rounded mr-2">
                                VIP
                              </span>
                            )}
                            <span className="text-xs text-gray-500">
                              {anime.genres.join(', ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  No anime releases scheduled for {activeDay}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SchedulePage;
