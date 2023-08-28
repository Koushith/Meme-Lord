import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContainer } from "./auth.styles";
import { signupWithGoogle } from "@/utils";
import {
  useFetchProfileByIdQuery,
  useLoginMutation,
} from "@/slices/usersApiSlice";
import { setCredientials } from "@/slices/authSlice";

export const AuthScreen = () => {
  const { isAuthendicated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthendicated) {
      navigate("/");
    }
  }, [isAuthendicated]);

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  //const { isAuthendicated, userInfo } = useSelector((state) => state.auth);
  // const { data, isLoading: isUserIdLoading } = useFetchProfileByIdQuery(
  //   userInfo?.uid
  // );
  const loginHandler = async () => {
    let { user } = await signupWithGoogle();

    dispatch(setCredientials({ ...user }));
    const { displayName, email, photoURL, uid } = user;
    // here - it replaces whole -overrides

    const res = await login({ displayName, email, photoURL, uid }).unwrap();
    console.log("res---", res);
  };

  return (
    <AuthContainer>
      <div>
        <Label className="sr-only" htmlFor="email">
          Email
        </Label>

        <Button className="button" onClick={loginHandler}>
          Sign In with Google
        </Button>
      </div>
    </AuthContainer>
  );
};
