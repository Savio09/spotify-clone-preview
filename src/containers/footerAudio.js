import { useContext, useState, useEffect, useRef } from "react";
import SearchContext from "../SearchContext";
import Peru from "../images/peru.jpg";
const FooterAudio = () => {
  const { source } = useContext(SearchContext);
  const { music, artistAbout } = useContext(SearchContext);
  const { tracks } = music;
  let coverArt = tracks?.hits[0].track.images.coverart;
  let title = tracks?.hits[0].track.title;
  let subtitle = tracks?.hits[0].track.subtitle;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [endTime, setEndTime] = useState("0:29");
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const playBtn = useRef(null);
  // Create a ref for the audio element

  //   useEffect(() => {
  //     if (source) {
  //       setCurrentSong(source);
  //     }
  //   }, [source]);

  useEffect(() => {
    // Update isPlaying when audio play/pause events occur
    const audio = audioRef.current;
    const setAudioData = () => {
      setIsPlaying(!audio.paused);
    };
    audio.addEventListener("play", setAudioData);
    audio.addEventListener("pause", setAudioData);

    return () => {
      audio.removeEventListener("play", setAudioData);
      audio.removeEventListener("pause", setAudioData);
    };
  });

  useEffect(() => {
    const disablePlay = playBtn.current;
    if (source === null) {
      disablePlay.classList.add("disable");
    } else {
      disablePlay.classList.remove("disable");
    }
  }, [source]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (source) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const updateProgress = (e) => {
    //console.log(e);
    setCurrentTime(formatTime(e.target.currentTime));
    const { duration, currentTime } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    const progress = progressRef.current;
    progress.style.width = `${progressPercent}%`;
  };

  const setProgress = (e) => {
    const width = e.target.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = (clickX / width) * duration;
  };

  return (
    <div className="footerAudio">
      <div className="footer">
        <div className="music-info">
          <img src={coverArt ? coverArt : Peru} alt="" className="sm-img" />
          <div>
            <h3 className="title">{title ? title : "Peru"}</h3>
            <p>{subtitle ? subtitle : "Fireboy DML"}</p>
          </div>
        </div>
        <div className="music-controls">
          <div className="music-navigation">
            <button id="repeat">
              <span className="material-symbols-outlined">repeat</span>
            </button>
            <button id="prev">
              <span className="material-symbols-outlined">skip_previous</span>
            </button>
            <button
              className="play"
              onClick={togglePlayPause}
              ref={playBtn}
              disabled={!source}
            >
              <span className="material-symbols-outlined play-btn">
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
            <button id="next">
              <span className="material-symbols-outlined">skip_next</span>
            </button>
            <button id="shuffle">
              <span className="material-symbols-outlined">shuffle</span>
            </button>
          </div>
          <div className="music-progression">
            <span>{currentTime}</span>
            <div className="progress-container" onClick={setProgress}>
              <div className="progress" ref={progressRef}></div>
            </div>
            <span>{endTime}</span>
          </div>
        </div>
        <div className="other-controls music-navigation">
          <span className="material-symbols-outlined">lyrics</span>
          <span className="material-symbols-outlined">pan_zoom</span>
          <span className="material-symbols-outlined">speaker</span>
          <span className="material-symbols-outlined">pip</span>
        </div>
      </div>
      <audio
        src={source}
        ref={audioRef}
        id="music"
        onTimeUpdate={updateProgress}
        onLoadedData={(e) => {
          progressRef.current.style.width = `0%`;
          setEndTime(formatTime(e.target.duration));
        }}
        preload="auto"
      ></audio>
    </div>
  );
};

export default FooterAudio;
