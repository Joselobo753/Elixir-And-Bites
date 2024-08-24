import { createBrowserRouter } from "react-router-dom";
import PublicView from "../Views/routing/PublicView";
import PrivateView from "../Views/routing/PrivateView";
import Welcome from "../Views/routing/Welcome";
import RootView from "../Views/routing/RootView";
import MenuView from "../Views/routing/MenuView";





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
                        element: <MenuView/>,
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

        ],
    },
]);