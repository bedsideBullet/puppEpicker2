import { useContext } from "react";
import { DogsContext } from "../Providers/DogsProvider";
import { DogCard } from "./DogCard";
import {  Dog } from "../types";


export const Dogs = () => {
  const { filteredDogs, activeTab, isLoading, favoriteClick, deleteDog } = useContext(DogsContext);

  return (
    <>
      {filteredDogs[activeTab].map((dog: Dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          isLoading={isLoading}
          onEmptyHeartClick={() => {
            favoriteClick(dog);
          }}
          onHeartClick={() => {
            favoriteClick(dog);
          }}
          onTrashIconClick={() => {
            deleteDog(dog.id);
          }}
        />
      ))}
    </>
  );
};
