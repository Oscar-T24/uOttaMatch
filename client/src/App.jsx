import React from "react";
import { useRoutes } from "react-router-dom";
import CommonLayout from "./components/commonLayout/CommonLayout";
import Main from "./components/main/Main";
import Auth from "./components/auth/auth";
import Map from "./components/map/Map";
import Hackathon from "./components/hackathons/Hackathon";
import Profile from "./components/profile/Profile";

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
              <Map />
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
      ],
    },
  ]);

  return element;
};

const App = () => {
  return <Routes />;
};

export default App;
