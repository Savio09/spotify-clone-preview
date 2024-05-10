import { useRef, useContext } from "react";
import ExpansionContext from "../ExpansionContext";
const RightNavigation = () => {
  const sideNavRef = useRef(null);
  const { setIsExpanded } = useContext(ExpansionContext);
  //Implementing the search Logic
  const handleExpansion = (e) => {
    sideNavRef.current.classList.toggle("open");
    setIsExpanded(sideNavRef.current.classList.contains("open"));
  };

  return (
    <div className="side-nav-right" ref={sideNavRef}>
      <div
        className="expand"
        title="Expand your Library"
        onClick={handleExpansion}
        data-label="Your library"
      >
        <span className="material-symbols-outlined">home_storage</span>
      </div>
      <div className="favorites" title="Liked songs" data-label="Liked songs">
        <span className="material-symbols-outlined">favorite</span>
      </div>
      <div
        className="bookmarks"
        title="Your Episodes"
        data-label="Your Episodes"
      >
        <span className="material-symbols-outlined">bookmark</span>
      </div>
    </div>
  );
};

export default RightNavigation;
