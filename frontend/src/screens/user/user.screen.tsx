import { useFetchAllUsersQuery } from "@/slices/usersApiSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UsersScreen = () => {
  const { data, isLoading } = useFetchAllUsersQuery("");
  const navigate = useNavigate();

  const navigateToDetails = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  return (
    <>
      <h1>All OG Memers</h1>
      {isLoading ? (
        <h1>Loading.....</h1>
      ) : (
        <div>
          {data.data.map((user) => (
            <div key={user._id} onClick={() => navigateToDetails(user.uid)}>
              <h2>{user.displayName}</h2>
              <p>{user.email}</p>
              {user.avatar && <img src={user.avatar} alt="avatar" />}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
