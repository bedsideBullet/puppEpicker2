import { createContext, useEffect, useState, ReactNode } from "react";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type DogsContextType = {
  allDogs: Dog[];
  isLoading: boolean;
  favoriteClick: (dog: Dog) => Promise<void>;
  activeTab: ActiveTab;
  setTab: (tab: ActiveTab) => void;
  deleteDog: (dogId: number) => Promise<void>;
  createDog: (dog: Omit<Dog, "id">) => Promise<void>;
  filteredDogs: Record<ActiveTab, Dog[]>;
};

export const DogsContext = createContext<DogsContextType>(
  {} as DogsContextType
);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("none");

  const refetchDogs = () => {
    return Requests.getAllDogs().then(setAllDogs);
  };

  const setTab = (tabName: ActiveTab) => {
    activeTab !== tabName
      ? setActiveTab(tabName)
      : setActiveTab("none")
  }

  const favoritedDogs = allDogs.filter((dog) => dog.isFavorite)
  const unFavoritedDogs = allDogs.filter((dog) => !dog.isFavorite)

  const favoriteClick = (dog: Dog) => {
    const updatedDogs = allDogs.map((updatedDog) =>
      updatedDog.id === dog.id ? { ...updatedDog, isFavorite: !updatedDog.isFavorite } : updatedDog
    );
    setAllDogs(updatedDogs);

    return Requests.patchFavoriteForDog({ ...dog, isFavorite: !dog.isFavorite }).catch(
      () => {
        setAllDogs(allDogs);
      }
    );
  };

  const deleteDog = (dogId: number) => {
    const updatedDogs = allDogs.filter((dog) => dog.id !== dogId);
    setAllDogs(updatedDogs);

    return Requests.deleteDogRequest(dogId).catch(() => {
      setAllDogs(allDogs);
    });
  };

  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    return Requests.postDog(dog)
      .then(() => refetchDogs())
      .then(() => {
        toast.success("Whoa dog, you just created a new dog! 🐶");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const filteredDogs: Record<ActiveTab, Dog[]> = {
    none: allDogs,
    favorited: favoritedDogs,
    unfavorited: unFavoritedDogs,
    create: [],
  };

  useEffect(() => {
    refetchDogs();
  }, []);

  return (
    <DogsContext.Provider
      value={{
        allDogs,
        isLoading,
        activeTab,
        setTab,
        favoriteClick,
        deleteDog,
        createDog,
        filteredDogs
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};
