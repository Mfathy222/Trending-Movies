import axios from "axios";
import React, { useEffect, useState } from "react";
export default function Movies() {
  let [trendingmovies, setTrendingMovies] = useState([]);
  let baseImUrl = "https://image.tmdb.org/t/p/original/";
  async function getTrendingItems(mediaType) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3//trending/${mediaType}/day?api_key=4615411b3dc6b9e15d51326e386a434c`
    );
    setTrendingMovies(data.results);
  }
  useEffect(() => {
    getTrendingItems("movie");
  }, []);

  return (
    <>
      <div className="row ">
        <div className=" col-md-4">
          <div className="my-5">
            <h2>Trending</h2>
            <h2>Movies</h2>
            <h2>To watch now</h2>
            <p className=" text-muted">Most watched Movies by day</p>
          </div>
        </div>

        {trendingmovies.map((movie) => (
          <div key={movie.id} className="col-md-2 my-2 ">
            <div className="movie">
              <img
                className="w-100 mb-2"
                src={baseImUrl + movie.poster_path}
                alt="movies"
                srcset=""
              />
              <h2 className="h6">{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
