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

const patchFavoriteForDog = (dog: Dog) => {
  return fetch(`${baseUrl}/dogs/${dog.id}`, {
    body: JSON.stringify(dog),
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    response.json;
  });
}

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
