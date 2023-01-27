import { useState } from "react";
import { RotatingLines, TailSpin } from "react-loader-spinner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import UsersListItem from "./UsersListItem";

// import {useThunk} from "../hooks/useThunk";

function UsersList() {
  // const [doFetchUsers,isLoadingUsers,loadingUsersError]=useThunk(fetchUsers)
  // const [doCreateUsers,isCretingUser,creatingUserError]=useThunk(addUser)

  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [creatingUserError, setCreatingUserError] = useState(null);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    // doFetchUsers(),[doFetchUsers]
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      .unwrap()
      // .then(() => {
      //   setIsLoadingUsers(false); //.finally() used instead of that
      // })
      .catch((err) => {
        setLoadingUsersError(err);
        // setIsLoadingUsers(false);  //.finally() used instead of that
      })
      .finally(() => {
        setIsLoadingUsers(false);
      });
  }, [dispatch]);

  const handleUserAdd = () => {
    //doCreateUsers()
    setIsCreatingUser(true);
    dispatch(addUser())
      .unwrap()
      .then()
      .catch((error) => setCreatingUserError(error))
      .finally(() => setIsCreatingUser(false));
  };

  let content;

  if (isLoadingUsers) {
    content = (
      <div
        style={{ minHeight: "500px" }}
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
  } else if (loadingUsersError) {
    content = (
      <div
        style={{ minHeight: "500px" }}
        className="text-danger font-weight-bold  d-flex justify-content-center align-items-center "
      >
        Error fetching data...
      </div>
    );
  } else {
    content = data.map((user) => <UsersListItem key={user.id} user={user} />);
  }

  return (
    <div>
      <div className="d-flex flex-row justify-content-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <div>
          <button
            className="btn btn-outline-danger btn-m h-10 w-30"
            onClick={handleUserAdd}
          >
            {isCreatingUser ? (
              <TailSpin
                height="20"
                width="20"
                color="blue"
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
          {creatingUserError && (
            <div className="text-light font-weight-bold bg-dark text-bold mt-1 p-2 rounded text-uppercase">
              {" "}
              Error fetching user...
            </div>
          )}
        </div>
      </div>
      {content}
    </div>
  );
}

export default UsersList;
