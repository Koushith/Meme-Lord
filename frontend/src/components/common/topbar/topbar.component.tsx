import { Button } from "@/components/ui/button";
import { setCredientials } from "@/slices/authSlice";
import { useLoginMutation } from "@/slices/usersApiSlice";
import { signupWithGoogle } from "@/utils";
import { ButtonIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";

export const TopBar = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const loginHandler = async () => {
    let { user } = await signupWithGoogle();
    dispatch(setCredientials(user));
    const { displayName, email, photoURL, uid } = user;
    console.log("uid", uid);
    const res = await login({ displayName, email, photoURL, uid }).unwrap();
    console.log("res---", res);
  };

  return (
    <>
      <h1>Logo</h1>

      <Button onClick={loginHandler}>Sign up</Button>
    </>
  );
};
