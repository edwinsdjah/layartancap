import {
  getMoviesByGenre,
  getMovieVideo,
  getNowPlayingMovies,
  getTopRatedMovies,
  getTrendingMovieThisWeek,
} from "../lib/tmdb/movies";
import SectionCarousel from "./Components/SectionCarousel";
import Hero from "./Components/Hero";
import { getTrendingSeries } from "../lib/tmdb/series";
import { getTrendingMixed } from "@/lib/tmdb/mixed";
import MainWrapper from "./Components/MainWrapper";

export default async function Home() {
  const dataTrendingMixed = await getTrendingMixed(10);
  const dataResultThisWeek = await getTrendingMovieThisWeek();
  const dataNowPlaying = await getNowPlayingMovies();
  const dataTopRated = await getTopRatedMovies();
  const dataActionMovies = await getMoviesByGenre(28);
  const dataTrendingSeries = await getTrendingSeries();
  const randomIndex = Math.floor(Math.random() * dataResultThisWeek.length);
  const heroMovie = dataResultThisWeek[randomIndex];
  const video = await getMovieVideo(heroMovie.id);
  const trailer = video.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <>
      <Hero movie={heroMovie} trailerKey={trailer?.key} type="movie" />
      <MainWrapper>
        <SectionCarousel
          title="Trending This Week"
          data={dataTrendingMixed.map((item) => ({
            ...item,
            type: item.media_type === "tv" ? "series" : "movie",
          }))}
          variant="trending"
        />

        <SectionCarousel
          title="Now Playing"
          data={dataNowPlaying}
          variant="portrait"
          type="movie"
        />
        <SectionCarousel
          title="Top Rated Movies"
          data={dataTopRated}
          variant="landscape"
          type="movie"
        />
        <SectionCarousel
          title="Action Movies"
          data={dataActionMovies}
          variant="landscape"
          type="movie"
        />
        <SectionCarousel
          title="Recommended TV Series"
          data={dataTrendingSeries}
          variant="landscape"
          type="series"
        />
      </MainWrapper>
    </>
  );
}
