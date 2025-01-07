import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import { Layout, RequiredAuthLayout } from "./layout/Layout";
import ListPage from "./pages/list/List";
import SignupPage from "./pages/signup/Signup";
import LoginPage from "./pages/login/Login";
import SinglePage from "./pages/single/Single";
import ProfilePage from "./pages/profile/Profile";
import ProfileUpdatePage from "./pages/profileUpdatePage/ProfileUpdatePage";
import NewPostPage from "./pages/newPost/NewPostPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/list",
          element: <ListPage />,
        },

        {
          path: "/register",
          element: <SignupPage />,
        },

        {
          path: "/:id",
          element: <SinglePage />,
        },

        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
    },

    {
      path: "/",
      element: <RequiredAuthLayout />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
        },

        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },

        {
          path: "/profile/create",
          element: <NewPostPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
