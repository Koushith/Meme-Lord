import { Button } from "@/components/ui/button";
import { signupWithGoogle } from "@/utils";
import { ButtonIcon } from "@radix-ui/react-icons";

export const TopBar = () => {
  const loginHandler = async () => {
    let res = await signupWithGoogle();
    console.log("resssssssssssss", res);
  };

  return (
    <>
      <h1>Logo</h1>

      <Button onClick={loginHandler}>Sign up</Button>
    </>
  );
};
