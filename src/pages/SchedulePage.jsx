'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchScheduleAnime } from '../lib/api';
import ScheduleSkeleton from '../components/loader/ScheduleSkeleton';

function SchedulePage() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState('');

  // English to Indonesian day mapping for display purposes
  const dayMapping = {
    Monday: 'Senin',
    Tuesday: 'Selasa',
    Wednesday: 'Rabu',
    Thursday: 'Kamis',
    Friday: 'Jumat',
    Saturday: 'Sabtu',
    Sunday: 'Minggu',
  };

  const reverseDayMapping = {
    Senin: 'Monday',
    Selasa: 'Tuesday',
    Rabu: 'Wednesday',
    Kamis: 'Thursday',
    Jumat: 'Friday',
    Sabtu: 'Saturday',
    Minggu: 'Sunday',
  };

  // Days to display in the UI
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const data = await fetchScheduleAnime();
        setSchedule(data);

        // Set active day to current day or first day with content
        const today = new Date().toLocaleDateString('en-US', {
          weekday: 'long',
        });

        // Find Indonesian equivalent of today
        const todayIndo = reverseDayMapping[today];

        // Find the day object that matches today
        const todaySchedule = data.find((day) => day.day === todayIndo);

        if (todaySchedule && todaySchedule.animeList.length > 0) {
          setActiveDay(today);
        } else {
          // Find first day with content
          const firstDayWithContent = data.find(
            (day) => day.animeList.length > 0
          );
          if (firstDayWithContent) {
            // Convert Indonesian day to English for UI
            setActiveDay(dayMapping[firstDayWithContent.day] || days[0]);
          } else {
            setActiveDay(days[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching anime schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  // Get anime list for the active day
  const getAnimeForActiveDay = () => {
    if (!schedule || schedule.length === 0) return [];

    // Find the Indonesian day that corresponds to the active English day
    const activeIndoDay = reverseDayMapping[activeDay];

    // Find the day object in the schedule
    const dayObj = schedule.find((day) => day.day === activeIndoDay);
    return dayObj ? dayObj.animeList : [];
  };

  // Get anime count for each day
  const getAnimeCount = (day) => {
    const indoDay = reverseDayMapping[day];
    const dayObj = schedule.find((d) => d.day === indoDay);
    return dayObj ? dayObj.animeList.length : 0;
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Jadwal Rilis Anime
        </h1>

        {loading ? (
          <ScheduleSkeleton />
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
                  <span className="ml-2 bg-gray-700 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {getAnimeCount(day)}
                  </span>
                </button>
              ))}
            </div>

            {/* Schedule Content */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">
                {activeDay}'s Releases
              </h2>

              {getAnimeForActiveDay().length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getAnimeForActiveDay().map((anime) => (
                    <Link
                      key={anime.animeId}
                      to={`/details/${anime.animeId}`}
                      className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex p-4">
                        <div className="relative w-20 h-28 flex-shrink-0">
                          <img
                            src={
                              anime.poster ||
                              '/placeholder.svg?height=450&width=300'
                            }
                            alt={anime.title}
                            className="absolute inset-0 w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-bold text-white">
                            {anime.title}
                          </h3>
                          <div className="flex items-center mt-1 text-sm text-gray-400">
                            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs">
                              {anime.status}
                            </span>
                            <span className="mx-2">•</span>
                            <span>{anime.duration}</span>
                          </div>
                          <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                            {Array.isArray(anime.synopsis)
                              ? anime.synopsis.join(' ')
                              : anime.synopsis}
                          </p>
                          <div className="mt-2 flex items-center">
                            <span className="bg-yellow-500 text-black text-xs font-bold px-1 py-0.5 rounded mr-2">
                              {anime.score}
                            </span>
                            <span className="text-xs text-gray-500">
                              {anime.genres
                                .map((genre) => genre.title)
                                .join(', ')}
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
