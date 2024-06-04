import { Dog } from "./types";

const baseUrl = "http://localhost:3000"

const getAllDogs = (): Promise<Dog[]> => {
  return fetch(`${baseUrl}/dogs`).then((response) => response.json())
};

const postDog = () => {
  // fill out method
};
const deleteDogRequest = () => {
  // fill out method
};

const patchFavoriteForDog = () => {
  // fill out method
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
