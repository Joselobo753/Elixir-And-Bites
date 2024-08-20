import { createBrowserRouter } from "react-router-dom";
import RootView from "../Views/routing/RooTView";
import PublicView from "../Views/routing/PublicView";
import PrivateView from "../Views/routing/PrivateView";

import AboutUsView from "../Views/routing/AboutUsView";

import Welcome from "../Views/routing/Welcome";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Welcome />,
        children: [
            {
                path: "",
                element: <RootView />,
                children: [
                    {
                        path: "",
                        element: <p>Home</p>,
                    },
                    {
                        path: "AboutUs",
                        element: <AboutUsView/>,
                    },
                ],
            },
            {
                path: "admin",
                element: <PublicView />,
                children: [
                    {
                        path: "",
                        element: <p>admin</p>,
                    },
                ],
            },
            {
                path: "admin",
                element: <PrivateView />,
                children: [
                    {
                        path: "",
                        element: <p>admin</p>,
                    },
                ],
            },
        ],
    },
]);