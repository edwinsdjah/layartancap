'use client'
import React, { useState } from 'react';
import EpisodeList from './EpisodeList';

const SeriesEpisodeSwitcher = ({id,seasons}) => {
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSelectSeason = async (seasonNumber) => {
    setSelectedSeason(seasonNumber);
    setLoading(true);

    try {
      const res = await fetch(`/api/tmdb/tv/${id}/season/${seasonNumber}`);
      const data = await res.json();
      setEpisodes(data.episodes || []);
    } catch (error) {
      console.error("Failed to fetch episodes:", error);
      setEpisodes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white space-y-5">

      {/* SEASON SELECT */}
      <div>
        <label className="font-semibold text-sm">Select Season</label>

        <select
          className="w-full mt-1 p-2 bg-black/40 rounded border border-white/20"
          onChange={(e) => handleSelectSeason(Number(e.target.value))}
          defaultValue=""
        >
          <option value="" disabled>Select Season</option>

          {seasons.map((season) => (
            <option key={season.id} value={season.season_number}>
              {season.name}
            </option>
          ))}
        </select>
      </div>

      {/* EPISODES */}
      {selectedSeason && (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">
            Episodes — Season {selectedSeason}
          </h3>

          {loading ? (
            <div className="text-white/60 p-5 text-center">
              Loading episodes…
            </div>
          ) : (
            <EpisodeList episodes={episodes} season={selectedSeason} />
          )}
        </div>
      )}
    </div>
  );
}

export default SeriesEpisodeSwitcher