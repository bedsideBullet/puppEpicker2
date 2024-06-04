import { useContext } from "react";
import { DogsContext } from "../Providers/DogsProvider";
import { DogCard } from "./DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

export const Dogs = () => {
  const { allDogs, isLoading, setIsLoading, setAllDogs } =
    useContext(DogsContext);
    

  const favoriteClick = (dog: Dog) => {
    setIsLoading(true);
    const updatedDog = { ...dog, isFavorite: !dog.isFavorite };

    return Requests.patchFavoriteForDog(updatedDog)
      .then(() => {
        Requests.getAllDogs().then(setAllDogs);
      }).catch(() => alert("Failed"))
      .finally(() => setIsLoading(false));
  };

  // const deleteDog = (dogId: number) => {
  //   setIsLoading(true);
  //   return Requests.deleteDog(dogId)
  //     .then(() => {
  //       refetchDogs()
  //     })
  //     .finally(() => setIsLoading(false));
  // };

  return (
    <>
      {allDogs.map((dog: Dog) => (
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
          onTrashIconClick={() => {}}
        />
      ))}
    </>
  );
};
