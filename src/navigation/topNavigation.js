import { useState, useRef } from "react";
import SearchContext from "../SearchContext";
import { useContext } from "react";

const TopNavigation = () => {
  //Implementing the search logic with the API
  const { setSearchResults } = useContext(SearchContext);
  const { setThumbnail } = useContext(SearchContext);
  const [search, setSearch] = useState("");

  const debounceTimeoutRef = useRef(null);

  const handleSearchChange = (event) => {
    let searchTerm = event.target.value;
    setSearch(event.target.value);

    if (!searchTerm) {
      setSearchResults(null);
      return;
    }

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      const url = new URL(
        "https://spotify-preview-d8e216a60434.herokuapp.com/api/shazam/autocomplete"
      );
      url.searchParams.append("term", searchTerm);
      url.searchParams.append("locale", "en-US");

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const { hints } = data;
        const item = hints[0].term;

        const imageUrl = new URL(
          "https://spotify-preview-d8e216a60434.herokuapp.com/api/shazam/image-search"
        );
        imageUrl.searchParams.append("term", item);
        console.log(imageUrl);

        const request = await fetch(imageUrl)
          .then((response) => response.json())
          .then((data) => {
            setThumbnail(data);
            console.log(data);
          });

        if (searchTerm === event.target.value) {
          setSearchResults(data);
        }
      } catch (error) {
        console.log(error);
      }
    }, 500);
  };

  return (
    <div className="navigation">
      <div className="left-nav">
        <span className="material-symbols-outlined" title="Go back">
          arrow_back_ios_new
        </span>
        <span className="material-symbols-outlined" title="Go forward">
          arrow_forward_ios
        </span>
        <span className="material-symbols-outlined home" title="Home">
          home
        </span>
      </div>
      <div className="mid-nav search">
        <div className="fake-search">
          <span className="material-symbols-outlined" title="Search">
            search
          </span>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="What do you want to play?"
            value={search}
            ref={debounceTimeoutRef}
            onChange={(event) => handleSearchChange(event)}
          />
          <span className="material-symbols-outlined" title="Browse">
            home_storage
          </span>
        </div>
      </div>
      <div className="right-nav avatar">
        <span className="material-symbols-outlined notification">
          notifications
        </span>
        <span className="material-symbols-outlined">account_circle</span>
      </div>
    </div>
  );
};

export default TopNavigation;
