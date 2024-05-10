import Peru from "../images/peru.jpg";
import Fireboy from "../images/fireboy.jpeg";
import { useContext, useState } from "react";
import SearchContext from "../SearchContext";
const Aside = () => {
  const { music, artistAbout } = useContext(SearchContext);
  const { tracks } = music;
  let coverArt = tracks?.hits[0].track.images.coverart;
  let artistImage = tracks?.hits[0].track.images.background;
  let title = tracks?.hits[0].track.title;
  let subtitle = tracks?.hits[0].track.subtitle;
  let artistSummary = artistAbout?.choices[0].message.content;
  return (
    <div className="aside">
      <div className="title-card">
        <h3 className="genre-title">Afrobeat Mix</h3>
        <img src={coverArt ? coverArt : Peru} alt="" className="image-card" />
      </div>
      <div className="song-artist">
        <div className="flex-items">
          <div className="left">
            <h1 className="song-details">{title ? title : "Peru"}</h1>
            <p>{subtitle ? subtitle : "Fireboy DML"}</p>
          </div>

          <div className="right">
            <span className="material-symbols-outlined">add_circle</span>
            <span className="material-symbols-outlined">more_horiz</span>
          </div>
        </div>
      </div>
      <div className="about-artist">
        <img src={artistImage ? artistImage : Fireboy} alt="" />
        <div className="text">
          <h3 className="song-details">{subtitle ? subtitle : "Fireboy"}</h3>
          <div className="artist-handle flex-items">
            <div className="left">
              <p>7, 890, 795 monthly listeners</p>
            </div>
            <div className=" filters right">
              <span>Follow</span>
            </div>
          </div>
          <p>
            {artistSummary
              ? artistSummary
              : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus officiis consequatur saepe, hic ea minima aliquam sit obcaecati est quos, totam doloremque earum, nesciunt temporibus doloribus provident fugiat perspiciatis. Officia."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Aside;
