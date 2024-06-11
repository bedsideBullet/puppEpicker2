import { ReactNode, useContext } from "react";
import { DogsContext } from "../Providers/DogsProvider";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {

  const { activeTab, setTab, filteredDogs} = useContext(DogsContext)

  

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
            favorited ( {filteredDogs["favorited"].length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${activeTab === "unfavorited" ? "active" : ""}`}
            onClick={() => {
              setTab("unfavorited");
            }}
          >
            unfavorited ( {filteredDogs["unfavorited"].length} )
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
