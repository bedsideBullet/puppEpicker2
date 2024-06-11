import { useContext, useState } from "react";
import { dogPictures } from "../dog-pictures";
import { DogsContext } from "../Providers/DogsProvider";


const defaultSelectedImage = dogPictures.BlueHeeler;

export const CreateDogForm = () =>
  // no props allowed
  {
    
    const [selectedImage, setSelectedImage] = useState(defaultSelectedImage);
    const [dogName, setDogName] = useState<string>("");
    const [dogDescription, setDogDescription] = useState<string>("");

    const { isLoading, createDog } = useContext(DogsContext);

    const reset = () => {
      setDogName("");
      setDogDescription("");
      setSelectedImage(defaultSelectedImage);
    };

    

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      createDog({
        name: dogName,
        description: dogDescription,
        image: selectedImage,
        isFavorite: false,
      });
      reset();
    };

    return (
      <form action="" id="create-dog-form" onSubmit={handleSubmit}>
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          onChange={(e) => setDogName(e.target.value)}
          value={dogName}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          onChange={(e) => setDogDescription(e.target.value)}
          value={dogDescription}
          disabled={isLoading}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          onChange={(e) => {
            setSelectedImage(e.target.value);
          }}
          value={selectedImage}
          disabled={isLoading}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" />
      </form>
    );
  };
