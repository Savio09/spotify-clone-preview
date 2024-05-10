import Main from "./containers/main";
import Aside from "./containers/aside";
import RightNavigation from "./navigation/rightNavigation";
import { useState } from "react";
import ExpansionContext from "./ExpansionContext";

const MainContents = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="content">
      <ExpansionContext.Provider value={{ isExpanded, setIsExpanded }}>
        <RightNavigation />
        <Main />
      </ExpansionContext.Provider>
      <Aside />
    </div>
  );
};

export default MainContents;
