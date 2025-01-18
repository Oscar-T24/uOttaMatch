import React from "react";
import { useRoutes } from "react-router-dom";
import CommonLayout from "./components/commonLayout/CommonLayout";
import Main from "./components/main/Main";
import Auth from "./components/auth/auth";
import Map from "./components/maps/Map";
import TestAPIConnection from "./components/TestAPIConnection";

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
      ],
    },
      {
      path: "/testing",
      element: <CommonLayout />,
      children: [
        {
          path: "",
          element: (
            <TestAPIConnection />
          ),
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
