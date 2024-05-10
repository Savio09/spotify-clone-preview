import "./App.css";
import MainContents from "./content";
import SearchContext from "./SearchContext";
import TopNavigation from "./navigation/topNavigation";
import { useState } from "react";
import FooterAudio from "./containers/footerAudio";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [music, setMusic] = useState({});
  const [artistAbout, setArtistAbout] = useState(null);
  const [thumbnail, setThumbnail] = useState("");
  const [source, setSrc] = useState(
    "https://cdns-preview-5.dzcdn.net/stream/c-5b6f0c0073709ad9fff872a07110aaea-3.mp3"
  );
  return (
    <SearchContext.Provider
      value={{
        searchResults,
        setSearchResults,
        music,
        setMusic,
        artistAbout,
        setArtistAbout,
        thumbnail,
        setThumbnail,
        source,
        setSrc,
      }}
    >
      <TopNavigation />
      <MainContents />
      <FooterAudio />
    </SearchContext.Provider>
  );
}

export default App;
