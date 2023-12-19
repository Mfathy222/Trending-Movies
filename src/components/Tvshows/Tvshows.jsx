import axios from "axios";
import React, { useEffect, useState } from "react";
export default function Tvshows() {
  let [trendingTvshows, setTrendingTvshows] = useState([]);
  let baseImUrl = "https://image.tmdb.org/t/p/original/";
  async function getTrendingItems(mediaType) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=4615411b3dc6b9e15d51326e386a434c`
    );
    setTrendingTvshows(data.results);
  }
  useEffect(() => {
    getTrendingItems("tv");
  }, []);

  return (
    <>
     <div className="row ">
        <div className=" col-md-4">
          <div className="my-5">
            <h2>Trending</h2>
            <h2>Tv shows</h2>
            <h2>To watch now</h2>
            <p className=" text-muted">Most watched Tv shows by day</p>
          </div>
        </div>

        {trendingTvshows.map((tv) => (
          <div key={tv.id} className="col-md-2 my-2 ">
            <div className="tv">
              <img
                className="w-100 mb-2"
                src={baseImUrl + tv.poster_path}
                alt="movies"
                srcset=""
              />
              <h2 className="h6">{tv.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
