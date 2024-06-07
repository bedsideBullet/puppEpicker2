import { useContext } from "react";
import { DogsContext } from "../Providers/DogsProvider";
import { DogCard } from "./DogCard";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";

export const Dogs = () => {
  const {
    allDogs,
    setAllDogs,
    isLoading,
    favoritedDogs,
    unFavoritedDogs,
    activeTab,
  } = useContext(DogsContext);

  const favoriteClick = (dog: Dog) => {
    const updatedDogs = allDogs.map((d) =>
      d.id === dog.id ? { ...d, isFavorite: !d.isFavorite } : d
    );
    setAllDogs(updatedDogs);

    Requests.patchFavoriteForDog({ ...dog, isFavorite: !dog.isFavorite }).catch(
      () => {
        setAllDogs(allDogs);
      }
    );
  };

  const deleteDog = (dogId: number) => {
    const updatedDogs = allDogs.filter((dog) => dog.id !== dogId);
    setAllDogs(updatedDogs);

    Requests.deleteDogRequest(dogId).catch(() => {
      setAllDogs(allDogs);
    });
  };

  const filteredDogs: Record<ActiveTab, Dog[]> = {
    none: allDogs,
    favorited: favoritedDogs,
    unfavorited: unFavoritedDogs,
    create: [],
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
            deleteDog(dog.id);
          }}
        />
      ))}
    </>
  );
};
