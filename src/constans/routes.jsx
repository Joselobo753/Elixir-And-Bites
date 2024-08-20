import { createBrowserRouter } from "react-router-dom";
import PublicView from "../Views/routing/PublicView";
import PrivateView from "../Views/routing/PrivateView";
import Welcome from "../Views/routing/Welcome";
import RootView from "../Views/routing/RootView";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootView />,
        children: [
            {
                path: "/",
                element: <Welcome />,
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