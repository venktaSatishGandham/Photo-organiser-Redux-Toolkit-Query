import React from "react";
import ExpandablePanel from "./ExpandablePanel";
import { useRemoveAlbumMutation } from "../store";
import { GoTrashcan } from "react-icons/go";
import { TailSpin } from "react-loader-spinner";
import PhotosList from "./PhotosList";

function AlbumsListItem({ album }) {
  const [removeAlbum, removeAlbumResults] = useRemoveAlbumMutation();

  const handleDeleteAlbum = (album) => {
    removeAlbum(album);
  };

  const header = (
    <div>
      <button
        className="mr-3 px-2 py-1  border border-light rounded"
        onClick={() => handleDeleteAlbum(album)}
      >
        {removeAlbumResults.isLoading ? (
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
          <GoTrashcan />
        )}
      </button>
      {album.title}
    </div>
  );
  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
}
export default AlbumsListItem;
