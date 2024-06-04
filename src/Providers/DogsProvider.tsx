import { createContext, useEffect, useState, ReactNode } from "react";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";


type DogsContextType = {
    allDogs: Dog[];
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    activeTab: ActiveTab;
    setActiveTab: (tab: ActiveTab) => void;
    setAllDogs: (dogs: Dog[]) => void;
}

  export const DogsContext = createContext<DogsContextType>({} as DogsContextType)


export const DogsProvider = ({ children }: {children: ReactNode}) => {
    const [allDogs, setAllDogs] = useState<Dog[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<ActiveTab>("none")

    const refetchDogs = () => {
        return Requests.getAllDogs().then(setAllDogs)
      } 

    useEffect(() => {
        refetchDogs();
    }, []);

    return (
        <DogsContext.Provider value={{allDogs, isLoading, activeTab, setActiveTab, setIsLoading, setAllDogs }}>
            {children}
        </DogsContext.Provider>
    );
};