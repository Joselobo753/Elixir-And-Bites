import { createBrowserRouter } from "react-router-dom";
import PublicView from "../Views/routing/PublicView";
import PrivateView from "../Views/routing/PrivateView";
import Welcome from "../Views/routing/Welcome";
import RootView from "../Views/routing/RooTView";
import MenuView from "../Views/routing/MenuView";
import AboutUsView from "../Views/routing/AboutUsView";
import ContactView from "../Views/routing/ContactView";
import Error404View from "../Views/routing/Error404View";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootView />,
    children: [
      {
        path: "/",
        element: <PublicView />,
        children: [
          {
            path: "/",
            element: <Welcome />,
          },

          {
            path: "menu",
            element: <MenuView />,
          },
          {
            path: "AboutUs",
            element: <AboutUsView/>,
          },
          {
            path: "Contact",
            element: <ContactView />,
          },
        ],
      },

      {
        path: "",
        element: <PrivateView />,
        children: [
          {
            path: "",
            element: <p></p>,
          },
        ],
      },
      {
        path: '*',
        element: <Error404View />,
      },
    ],
  },
]);
