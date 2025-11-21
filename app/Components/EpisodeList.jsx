"use client";
import React from "react";
import PlayButton from "./PlayButton";

const EpisodeList = ({ episodes, season }) => {
  if (!episodes || episodes.length === 0)
    return <p className="text-white/50">No episodes available.</p>;

  return (
    <div className="space-y-3">
      {episodes.map((ep) => (
        <div
          key={ep.id}
          className="flex gap-3 p-3 bg-black/30 rounded-lg border border-white/10"
        >
          {/* IMAGE */}
          <div className="relative w-28 h-20 overflow-hidden rounded">
            <img
              src={
                ep.still_path
                  ? `https://image.tmdb.org/t/p/w300${ep.still_path}`
                  : "/no-image.jpg"
              }
              alt={ep.name}
              className="object-cover w-full h-full"
            />
          </div>

          {/* DETAILS */}
          <div className="flex-1">
            <p className="font-semibold">
              {ep.episode_number}. {ep.name || "Untitled Episode"}
            </p>

            <p className="text-white/60 text-sm line-clamp-3 mt-1">
              {ep.overview || "No description available."}
            </p>

            {ep.runtime && (
              <p className="text-white/40 text-sm my-2">
                Runtime: {ep.runtime} minutes
              </p>
            )}
            <PlayButton season={season} episode={ep.episode_number}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;
