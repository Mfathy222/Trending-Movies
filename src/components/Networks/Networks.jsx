import axios from "axios";
import React, { useEffect, useState } from "react";
export default function Networks() {
  let [trendingNetwork, setTrendingNetwork] = useState([]);
  let baseImUrl = "https://image.tmdb.org/t/p/w500/";
  async function getTrendingItems(mediaType,id) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=4615411b3dc6b9e15d51326e386a434c`
    );
    setTrendingNetwork(data);
    console.log(data);

  }
  useEffect(() => {
    getTrendingItems('network');
  }, []);
  return (
    <>
     <div className="row ">
        <div className=" col-md-4">
          <div className="my-5">
            <h2>Trending</h2>
            <h2>network</h2>
            <h2>To watch now</h2>
            <p className=" text-muted">Most watched network by day</p>
          </div>
        </div>

        {trendingNetwork.map((network,id) => (
          <div key={network.i} className="col-md-2 my-2 ">
            <div className="network">
              <img
                className="w-100 mb-2"
                src={baseImUrl + network.logo_path
                }
                alt="network"
              />
              <h2 className="h6">{network.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
