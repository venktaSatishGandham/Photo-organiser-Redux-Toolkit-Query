import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";

export default function UsersList() {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(null);

  const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      .unwrap()
      .then(() => {
        console.log("success");
      })
      .catch(() => {
        console.log("fail!!!");
      });
  }, [dispatch]);

  const handleUserAdd = () => {
    dispatch(addUser());
  };

  if (isLoadingUsers) {
    return (
      <div className="flex justify-center align-center">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }
  if (loadingUsersError) {
    return <div>Error fetching data...</div>;
  }

  const renderUsers = data.map((user) => (
    <div key={user.id} className="mb-2 border rounded">
      <div className="d-flex justify-content-between align-items-center p-3 cursor-pointer text-bold ">
        {user.user}
      </div>
    </div>
  ));

  return (
    <div>
      <div className="d-flex flex-row justify-content-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <button
          className="btn btn-outline-danger btn-m"
          onClick={handleUserAdd}
        >
          + Add User
        </button>
      </div>
      {renderUsers}
    </div>
  );
}
