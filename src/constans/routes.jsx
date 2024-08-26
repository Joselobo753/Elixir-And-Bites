import { createBrowserRouter } from "react-router-dom";
import RootView from "../Views/routing/RooTView";
import PublicView from "../Views/routing/PublicView";
import PrivateView from "../Views/routing/PrivateView";

import AboutUsView from "../Views/routing/AboutUsView";

import Welcome from "../Views/routing/Welcome";
import ContactView from "../Views/routing/ContactView";
import AdminView from "../Views/routing/AdminView";
import MenuView from "../Views/routing/MenuView";


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
                        element: <MenuView/>,
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
                        element: <menu/>,
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
                path: "",
                element: <PrivateView />,
                children: [
                    {
                        path: "admin",
                        element: <AdminView />,
                    },
                ],
            },
        ],
    },
]);