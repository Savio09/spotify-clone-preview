import { useContext, useEffect, useState } from "react";
import SearchContext from "../SearchContext";
import ExpansionContext from "../ExpansionContext";

const Main = () => {
  const { searchResults } = useContext(SearchContext);
  const { setMusic } = useContext(SearchContext);
  const { setArtistAbout } = useContext(SearchContext);
  const { thumbnail } = useContext(SearchContext);
  const { setSrc } = useContext(SearchContext);
  const thumbnailPhoto = thumbnail?.tracks?.hits[0].track.images.background;
  const hints = searchResults?.hints;
  const [searchResult, setSearchResult] = useState(null);
  const other = document.querySelector(".other");
  const [cardData, setCardData] = useState([]);
  const { isExpanded } = useContext(ExpansionContext);

  useEffect(() => {
    setCardData([
      {
        title: "What A Beautiful Name (Live)",
        name: "Hilsong Worship",
        image:
          "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/68/67/a0/6867a015-5026-6659-17da-72d926d7b1f2/pr_source.png/800x800bb.jpg",
      },
      {
        title: "Beautiful Things",
        name: "Benson Boone",
        image:
          "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages221/v4/d8/51/7e/d8517ee1-4883-be8f-b1e1-e93923bb0876/1078d2d6-5916-42ba-ad3d-4e1d43a8617c_ami-identity-09df2b561fdce3fcf0037a9e066fb973-2024-04-02T22-14-24.958Z_cropped.png/800x800bb.jpg",
      },
      {
        title: "Set Fire to the Rain",
        name: "Adele",
        image:
          "https://is1-ssl.mzstatic.com/image/thumb/Features125/v4/a2/2d/df/a22ddf71-9254-043c-c162-11fbc25c5ff3/mzl.ilbjswky.jpg/800x800bb.jpg",
      },
      {
        title: "Set Fire to the Rain",
        name: "Billie Eilish",
        image:
          "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages211/v4/e1/f3/6a/e1f36a60-9897-162d-3697-7501eeafbc3b/a1d41336-49bd-4212-8787-57547ca3f87e_ami-identity-ef10a72d4764d04743b17fa13520b756-2024-04-08T15-24-54.609Z_cropped.png/800x800bb.jpg",
      },
      {
        title:
          "Bad Habits (Fumez The Engineer Remix) [feat. Tion Wayne & Central Cee]",
        name: "Tion Wayne Mix",
        image:
          "https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/2c/c4/1f/2cc41f5e-6a83-c009-995b-1e6378fcc960/pr_source.png/800x800bb.jpg",
      },
      {
        title: "Someone You Loved",
        name: "Moody Mix",
        image:
          "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages113/v4/fd/de/46/fdde467c-c035-bee4-2ada-874a64dd82c4/a233b0ce-4154-4146-a927-3d9614c0e5a9_ami-identity-0695df847f31eee237f30b0199060c4b-2023-01-19T17-15-55.224Z_cropped.png/800x800bb.jpg",
      },
      {
        title: "Egwu",
        name: "Afrobeat Mix",
        image:
          "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages112/v4/60/0b/9a/600b9aa9-4bba-7e0b-2936-a6f854a7e4e3/044a40d1-2e70-401f-b64a-e8d2ddf59e94_file_cropped.png/800x800bb.jpg",
      },
      {
        title: "Worthy",
        name: "Elevation Worship",
        image:
          "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages126/v4/8d/62/0b/8d620b9e-792c-fd52-5585-b653c0c78d9d/f86657f0-34dd-4c86-9bc4-24c80fff60ad_ami-identity-af1b3ff0c71dfb505effbb3b3eb9a9ab-2023-05-26T17-09-11.971Z_cropped.png/800x800bb.jpg",
      },
    ]);
  }, []);

  async function getArtistSummary(artistName) {
    const prompt = `Write a one-paragraph summary of the music artist ${artistName}.`;
    try {
      const response = await fetch(
        "https://spotify-preview-d8e216a60434.herokuapp.com/api",
        {
          // make request to your backend server
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await response.json();
      console.log(data);
      setArtistAbout(data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchAudio = async (audioName) => {
    let dataReceived;
    const url = new URL(
      "https://spotify-preview-d8e216a60434.herokuapp.com/api/deezer/search"
    );
    url.searchParams.append("q", audioName);
    console.log(url);
    const response = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dataReceived = data.data[0].preview;
        setSrc(dataReceived);
      })
      .catch((err) => {
        console.log("There was an error", err);
        setSrc(null);
      });
    return dataReceived;
  };

  const handleClick = async (event, title) => {
    console.log(event);
    event.preventDefault();
    let searchTerm;
    if (event.target.nodeName != "SPAN") {
      searchTerm = event.target.innerHTML;
    } else {
      searchTerm = title;
    }

    const url = new URL(
      "https://spotify-preview-d8e216a60434.herokuapp.com/api/shazam/search"
    );
    url.searchParams.append("term", searchTerm);
    console.log(url);
    const request = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let title = data.tracks?.hits[0].track.subtitle;
        console.log([title, "fun"]);
        console.log(data);
        getArtistSummary(title);
        setMusic(data);
        fetchAudio(searchTerm);
      });
  };

  const setAudio = async (audioName) => {
    const stored = await fetchAudio(audioName);
    setSrc(stored);
  };

  const renderSearchResults = () => {
    // setSearchResult(hints);
    console.log("It worked!");
    return (
      // Replace this with your actual search results rendering logic
      <div className="list">
        <div className="thumbnail left">
          <h3>Top result</h3>
          <div className="wrapper">
            {
              //To be filled dynamically
              console.log(thumbnail?.tracks?.hits[0].track.images.background)
            }
            <img
              src={
                thumbnailPhoto
                  ? thumbnailPhoto
                  : "https://is4-ssl.mzstatic.com/image/thumb/Features115/v4/3f/84/4e/3f844e97-8c23-b64d-87f1-d536e99f80e9/mzl.rsxdpqqq.jpg/800x800cc.jpg"
              }
              alt=""
            />
            <h1 className="artist-name">
              {hints ? hints[0].term : "The Weekend"}
            </h1>
            <p>Artist</p>
          </div>
        </div>
        <div className="right">
          <h3>Songs</h3>
          {[0, 1, 2, 3].map((number, index) => (
            <div
              className="name"
              key={index}
              onClick={(event) => {
                console.log(event);
              }}
            >
              <div className="song-list">
                <span className="material-symbols-outlined play-btn">
                  play_arrow
                </span>
                <button onClick={handleClick}>
                  {hints[number].term ? hints[number].term : "Not found"}
                </button>
              </div>

              <div className="play">
                <span className="material-symbols-outlined">add_circle</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  //console.log(searchResult);
  return (
    <div className={`container ${isExpanded ? "shrink" : ""}`}>
      <div className="filters">
        <span className="active">All</span>
        <span>Music</span>
        <span>Podcasts</span>
        <span>Audiobooks</span>
      </div>
      {searchResults && hints && hints.length > 0 ? (
        renderSearchResults()
      ) : (
        <div className="other">
          <div className="playlists">
            {cardData.map((data, index) => (
              <div className="cards" key={index}>
                <img src={data.image} alt={data.name} />
                <p>{data.name}</p>
                <button
                  className="play-button"
                  onClick={(event) => {
                    setAudio(data.title);
                    handleClick(event, data.title);
                  }}
                >
                  <span className="material-symbols-outlined play-btn">
                    play_arrow
                  </span>
                </button>
              </div>
            ))}
          </div>

          <div className="music-card-section">
            <div className="title">
              <h2>Made for Fortune Declan</h2>
            </div>

            {
              //This should be rendered dynamically, eiter by redering 20 of the cards at the came time or at one
            }
            <div className="music-cards">
              {
                //This cover photo is going to change dynamically.
              }
              <img src="" alt="" className="cover-photo" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
