import { createBrowserRouter } from "react-router-dom";
import RootView from "../Views/routing/RooTView";
import PublicView from "../Views/routing/PublicView";
import PrivateView from "../Views/routing/PrivateView";

import AboutUsView from "../Views/routing/AboutUsView";

import Welcome from "../Views/routing/Welcome";
import ContactView from "../Views/routing/ContactView";
import AdminView from "../Views/routing/AdminView";


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
                        element: <Welcome/>,
                    },
                    {
                        path: "menu",
                        element: <p>menu</p>,
                    },
                    {
                        path: "AboutUs",
                        element: <AboutUsView/>,
                    },
                    {
                        path: "Contact",
                        element: <ContactView/>,
                    },
                ],
            },
            {
                path: "admin",
                element: <PublicView />,
                children: [
                    {
                        path: "menu",
                        element: <p>menu</p>,
                    },
                    {
                        path: "AboutUs",
                        element: <AboutUsView/>,
                    },
                    {
                        path: "Contact",
                        element: <ContactView/>,
                    },
                ],
            },
            {
                path: "admin",
                element: <PublicView />,
                children: [
                ],
            },
            {
                path: "admin",
                element: <PrivateView />,
                children: [
                    {
                        path: "",
                        element: <AdminView />,
                    },
                ],
            },
        ],
    },
]);