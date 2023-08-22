import { useFetchProfileByIdQuery } from "@/slices/usersApiSlice";
import { useSelector } from "react-redux";

export const ProfileScreen = () => {
  const { uid } = useSelector((state) => state?.auth.userInfo);
  console.log("state---", uid);

  const { isError, isLoading, data } = useFetchProfileByIdQuery(uid);
  const { displayName, avatar } = data?.data || {}; // Destructure data for cleaner usage

  return (
    <>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <h1>{displayName}</h1>
          <img src={avatar} alt="avatar" />
        </div>
      )}
    </>
  );
};
