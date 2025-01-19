import React from "react";
import { useRoutes } from "react-router-dom";
import CommonLayout from "./components/commonLayout/CommonLayout";
import Main from "./components/main/Main";
import Auth from "./components/auth/auth";
import Hackathon from "./components/hackathons/Hackathon";
import Profile from "./components/profile/Profile";
import Dashboard from "./components/dashboard/Dashboard";

const Routes = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <CommonLayout />,
      children: [
        {
          path: "",
          element: (
            <Auth>
              <Main />
            </Auth>
          ),
        },
        {
          path: "/hackathons/:id",
          element: <Hackathon />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return element;
};

const App = () => {
  return <Routes />;
};

export default App;
