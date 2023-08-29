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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ChromeIcon, GithubIcon, GoalIcon } from "lucide-react";

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
    <div className="flex items-center justify-center">
      {/* <div>
        <Label className="sr-only" htmlFor="email">
          Email
        </Label>

        <Button className="button" onClick={loginHandler}>
          Sign In with Google
        </Button>
      </div> */}

      <Card className="bg-background w-3/12">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in to MemeLord</CardTitle>
          <CardDescription>
            Enter your email below to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={loginHandler}>
            <ChromeIcon className="mr-2 h-4 w-4" />
            Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
