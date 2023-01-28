import React from "react";
import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import { TailSpin, RotatingLines } from "react-loader-spinner";
import PhotosListItem from "./PhotosListItem";

function PhotosList({ album }) {
  const { data, isFetching, error } = useFetchPhotosQuery(album);

  const [addPhoto, addResults] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content;

  if (isFetching) {
    content = (
      <div
        style={{ minHeight: "200px" }}
        className="flex justify-center align-center"
      >
        <RotatingLines
          strokeColor="red"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  } else if (error) {
    content = (
      <div
        style={{ minHeight: "500px" }}
        className="text-danger font-weight-bold  d-flex justify-content-center align-items-center "
      >
        Error fetching data...
      </div>
    );
  } else {
    content = data.map((photo) => (
      <PhotosListItem key={photo.id} photo={photo} />
    ));
  }

  return (
    <div>
      <div className="m-2 d-flex flex-row items-center justify-between">
        <h3 className="text font-weight-bold">Photos in {album.title}</h3>
        <button
          className="btn btn-outline-primary btn-m h-10 w-30"
          onClick={handleAddPhoto}
        >
          {addResults.isLoading ? (
            <TailSpin
              height="20"
              width="20"
              color="white"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            "+ Add Photo"
          )}
        </button>
      </div>
      <div className="mx-8 d-flex flex-row flex-wrap justify-center"> {content}</div>
    </div>
  );
}
export default PhotosList;
