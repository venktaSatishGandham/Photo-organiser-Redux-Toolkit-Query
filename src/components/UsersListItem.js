import React from "react";
import { GoTrashcan } from "react-icons/go";
import { useThunk } from "../hooks/useThunk";
import { removeUser } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

function UsersListItem({ user }) {
  const [doRemoveUser, isDeletingUser, deletingUserError] =
    useThunk(removeUser);

  console.log(isDeletingUser);

  const handleDeleteUser = (user) => {
    doRemoveUser(user);
  };

  const header = (
    <>
      <button
        className="mr-3 px-2 py-1  border border-dark rounded"
        onClick={() => handleDeleteUser(user)}
      >
        <GoTrashcan />
      </button>
      {deletingUserError && <div>Error deleteing Message</div>}
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}
export default UsersListItem;
