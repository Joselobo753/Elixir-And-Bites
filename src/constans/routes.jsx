import { createBrowserRouter } from "react-router-dom";
import RooTView from "../Views/routing/RooTView";
import PublicView from "../Views/routing/PublicView";
import PrivateView from "../Views/routing/PrivateView";
import ContactView from "../Views/routing/ContactView";
import AdminView from "../Views/routing/AdminView";

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
                        path: "Contact",
                        element: <ContactView/>,
                    },
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