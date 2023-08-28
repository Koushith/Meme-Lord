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
import { NavbarContainer } from "./topbar.styles";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/theme";
import { Moon, Sun } from "lucide-react";

export const TopBar = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { setTheme } = useTheme();

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
    <NavbarContainer className="border-b">
      <h1>Meme Lord</h1>
      <div className="flex">
        {isAuthendicated ? (
          <Button onClick={logoutHandler}>logout</Button>
        ) : (
          <Button onClick={loginHandler}>Sign up</Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="ml-2">
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </NavbarContainer>
  );
};
