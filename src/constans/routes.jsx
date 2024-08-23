import { createBrowserRouter } from "react-router-dom";
import RooTView from "../Views/routing/RooTView";
import PublicView from "../Views/routing/PublicView";
import PrivateView from "../Views/routing/PrivateView";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RooTView />,
        children: [
            {
                path: "",
                element: <PublicView />,
                children: [
                    {
                        path: "",
                        element: <p>Home</p>,
                    },
                    {
                        path: "menu",
                        element: <p>menu</p>,
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