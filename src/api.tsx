import { Dog } from "./types";

const baseUrl = "http://localhost:3000";

const getAllDogs = (): Promise<Dog[]> => {
  return fetch(`${baseUrl}/dogs`).then((response) => response.json());
};

const postDog = (dog: Omit<Dog, "id">): Promise<Dog> => {
  return fetch(`${baseUrl}/dogs`, {
    body: JSON.stringify(dog),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};
const deleteDogRequest = (dogId: number): Promise<void> => {
  return fetch(`${baseUrl}/dogs/${dogId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    response.json();
  });
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
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
