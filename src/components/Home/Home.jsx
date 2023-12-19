import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom';

export default function Home() {
  let [trendingmovies, setTrendingMovies] = useState([]);
  let [trendingTvshows, setTrendingTvshows] = useState([]);
  let [trendingPeople, setTrendingPeople] = useState([]);


  let baseImUrl = "https://image.tmdb.org/t/p/original/";
  async function getTrendingItems(mediaType,callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=4615411b3dc6b9e15d51326e386a434c`
    );
    callback(data.results);
    // console.log(data.results);
  }

  let navigate=useNavigate()
  function gotoDetails(id){
    navigate({
      pathname:'/Details',
      search:`?id=${id}`
    })
   
  }
  useEffect(() => {
    getTrendingItems("movie",setTrendingMovies);

    getTrendingItems("tv",setTrendingTvshows);
    getTrendingItems("person",setTrendingPeople);

  }, []); 
  // trendingmovies.splice(1,4);
  trendingTvshows.splice(1,4);
  trendingPeople.splice(1,4);

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
          <div onClick={()=>gotoDetails(movie.id)} key={movie.id} className="col-md-2 my-2 ">
            <div className="movie">
              <img
                className="w-100 mb-2"
                src={baseImUrl + movie.poster_path}
                alt="movies"
              />
              <h2 className="h6">{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>
<hr />
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
          <div onClick={()=>gotoDetails(tv.id)} key={tv.id} className="col-md-2 my-2 ">
            <div className="tv">
              <img
                className="w-100 mb-2"
                src={baseImUrl + tv.poster_path
                }
                alt="tv"
              />
              <h2 className="h6">{tv.name}</h2>
            </div>
          </div>
        ))}
      </div>
<hr />
      <div className="row ">
        <div className=" col-md-4">
          <div className="my-5">
            <h2>Trending</h2>
            <h2>person</h2>
            <h2>To watch now</h2>
            <p className=" text-muted">Most Trending person by day</p>
          </div>
        </div>

        {trendingPeople.map((person) => (
          <div onClick={()=>gotoDetails(person.id)} key={person.id} className="col-md-2 my-2 ">
            <div className="person">
              <img
                className="w-100 mb-2"
                src={baseImUrl + person.profile_path}
                alt="person"
              />
              <h2 className="h6">{person.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
