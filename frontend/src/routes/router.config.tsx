import App from "@/App";
import {
  AuthScreen,
  HomeScreen,
  ManageScreen,
  NotificationScreen,
  ProfileScreen,
  TransactionsScreen,
  UserDetailScreen,
  UsersScreen,
} from "@/screens";
import { createBrowserRouter } from "react-router-dom";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/auth",
        element: <AuthScreen />,
      },
      {
        path: "/manage",
        element: <ManageScreen />,
      },
      {
        path: "/notifications",
        element: <NotificationScreen />,
      },
      {
        path: "/users",
        element: <UsersScreen />,
      },
      {
        path: "/user/:id",
        element: <UserDetailScreen />,
      },
      {
        path: "/profile",
        element: <ProfileScreen />,
      },
    ],
  },
]);
