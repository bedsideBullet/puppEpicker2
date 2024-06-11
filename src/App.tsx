import { useContext } from "react";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { DogsContext } from "./Providers/DogsProvider";

export function App() {

  const {activeTab} = useContext(DogsContext)

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
      {(activeTab !== "create" && <Dogs />)}
      {(activeTab === "create" && <CreateDogForm />)}
      </Section>
    </div>
  );
}
