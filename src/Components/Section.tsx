import { ReactNode, useContext } from "react";
import { DogsContext } from "../Providers/DogsProvider";
import { ActiveTab } from "../types";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {

  const {favoritedDogs, unFavoritedDogs, activeTab, setActiveTab} = useContext(DogsContext)

  const setTab = (tabName: ActiveTab) => {
    activeTab !== tabName
      ? setActiveTab(tabName)
      : setActiveTab("none")
  }

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === "favorited" ? "active" : ""}`}
            onClick={() => {
              setTab("favorited");
            }}
          >
            favorited ( {favoritedDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${activeTab === "unfavorited" ? "active" : ""}`}
            onClick={() => {
              setTab("unfavorited");
            }}
          >
            unfavorited ( {unFavoritedDogs.length} )
          </div>
          <div
            className={`selector ${activeTab === "create" ? "active" : ""}`}
            onClick={() => {
              setTab("create");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
