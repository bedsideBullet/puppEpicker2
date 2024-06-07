import { useContext } from "react";
import { DogsContext } from "../Providers/DogsProvider";
import { DogCard } from "./DogCard";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";

export const Dogs = () => {
  const { allDogs, isLoading, setIsLoading, refetchDogs, favoritedDogs, unFavoritedDogs, activeTab } =
    useContext(DogsContext);
    

    const favoriteClick = (dog: Dog) => {
      setIsLoading(true);
      const updatedDog = { ...dog, isFavorite: !dog.isFavorite };
  
      return Requests.patchFavoriteForDog(updatedDog)
        .then(() => {
          refetchDogs()
        })
        .finally(() => setIsLoading(false));
    };

  const deleteDog = (dogId: number) => {
    setIsLoading(true);
    return Requests.deleteDogRequest(dogId)
      .then(() => {
        refetchDogs()
      })
      .finally(() => setIsLoading(false));
  };

  const filteredDogs: Record<ActiveTab, Dog[]> = {
    "none": allDogs,
    favorited: favoritedDogs,
    unfavorited: unFavoritedDogs,
    "create": []
  };

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
            deleteDog(dog.id)
          }}
        />
      ))}
    </>
  );
};
