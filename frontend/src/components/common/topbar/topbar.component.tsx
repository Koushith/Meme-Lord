import { Button } from "@/components/ui/button";
import { logout, setCredientials } from "@/slices/authSlice";
import {
  useFetchProfileByIdQuery,
  useLoginMutation,
} from "@/slices/usersApiSlice";
import { signupWithGoogle } from "@/utils";
import { ButtonIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const TopBar = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const { isAuthendicated, userInfo } = useSelector((state) => state.auth);
  const { data, isLoading: isUserIdLoading } = useFetchProfileByIdQuery(
    userInfo?.uid
  );
  // console.log("outside effecttttttt-mongo id", data?.data?._id);
  // useEffect(() => {
  //   console.log("inside effecttttttt", data.data._id);
  //   setCredientials({ mongoUserId: data.data._id });
  // }, [data, isUserIdLoading]);

  const fetchMongoId = () => {
    console.log("mongo---", data?.data?._id);
    dispatch(setCredientials({ hello: "hello" }));
    console.log("is data there?", data?.data?._id);
    const mongoId = data?.data?._id;
    dispatch(setCredientials({ mongoUserId: mongoId }));
  };

  useEffect(() => {
    if (data) {
      fetchMongoId();
    }
  }, [data]);

  //const mongoId = data?.data?._id;
  const loginHandler = async () => {
    let { user } = await signupWithGoogle();

    dispatch(setCredientials({ ...user }));
    const { displayName, email, photoURL, uid } = user;
    // here - it replaces whole -overrides

    const res = await login({ displayName, email, photoURL, uid }).unwrap();
    console.log("res---", res);
  };

  const logoutHandler = () => {
    dispatch(logout(""));
  };

  return (
    <>
      <h1>Logo</h1>
      {isAuthendicated ? (
        <Button onClick={logoutHandler}>logout</Button>
      ) : (
        <Button onClick={loginHandler}>Sign up</Button>
      )}
    </>
  );
};
