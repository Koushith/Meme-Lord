import { useFetchProfileByIdQuery } from "@/slices/usersApiSlice";
import { useParams } from "react-router-dom";

export const UserDetailScreen = () => {
  const { id } = useParams();
  console.log("user id- ", id);
  const { data, isLoading } = useFetchProfileByIdQuery(id);
  const { displayName, avatar } = data?.data || {};
  return (
    <>
      {isLoading ? (
        <h1>Loadinh.....</h1>
      ) : (
        <>
          <div>
            <h1>{displayName}</h1>
            <img src={avatar} alt="avatar" />
          </div>
        </>
      )}
    </>
  );
};
