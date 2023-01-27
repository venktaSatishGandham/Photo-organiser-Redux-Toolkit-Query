import React from "react";
import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import { RotatingLines, TailSpin } from "react-loader-spinner";
import AlbumsListItem from "./AlbumsListItem";

export default function AlbumsList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
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
    content = data.map((album) => (
      <AlbumsListItem key={album.id} album={album} />
    ));
  }
  return (
    <div className="bg-dark rounded p-3 text-white">
      <div className="m-2 d-flex flex-row items-center justify-content-between">
        <h3 className="text-xl font-weight-bold">Albums for {user.name}</h3>
        <button
          className="btn btn-outline-primary btn-m h-10 w-30"
          onClick={handleAddAlbum}
        >
          {results.isLoading ? (
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
            "+ Add User"
          )}
        </button>
      </div>
      <div>{content}</div>
    </div>
  );
}
