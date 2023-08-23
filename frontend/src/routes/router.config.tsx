import App from "@/App";
import { Private } from "@/components";
import {
  AuthScreen,
  HomeScreen,
  ManageScreen,
  NotificationScreen,
  ProfileScreen,
  UserDetailScreen,
  UsersScreen,
} from "@/screens";
import { createBrowserRouter } from "react-router-dom";

// export const routerConfig = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <HomeScreen />,
//       },
//       {
//         path: "/auth",
//         element: <AuthScreen />,
//       },
//       {
//         path: "/manage",
//         element: <ManageScreen />,
//       },
//       {
//         path: "/notifications",
//         element: <NotificationScreen />,
//       },
//       {
//         path: "/users",
//         element: <UsersScreen />,
//       },
//       {
//         path: "/user/:id",
//         element: <UserDetailScreen />,
//       },
//       {
//         path: "/profile",
//         element: <ProfileScreen />,
//       },
//     ],
//   },
// ]);

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Private>
            <HomeScreen />
          </Private>
        ), // Wrap with Private component
      },
      {
        path: "/auth",
        element: <AuthScreen />, // Wrap with Private component
      },
      {
        path: "/manage",
        element: (
          <Private>
            <ManageScreen />
          </Private>
        ), // Wrap with Private component
      },
      {
        path: "/notifications",
        element: (
          <Private>
            <NotificationScreen />
          </Private>
        ), // Wrap with Private component
      },
      {
        path: "/users",
        element: (
          <Private>
            <UsersScreen />
          </Private>
        ), // Wrap with Private component
      },
      {
        path: "/user/:id",
        element: (
          <Private>
            <UserDetailScreen />
          </Private>
        ), // Wrap with Private component
      },
      {
        path: "/profile",
        element: (
          <Private>
            <ProfileScreen />
          </Private>
        ), // Wrap with Private component
      },
    ],
  },
]);
