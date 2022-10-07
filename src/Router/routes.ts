import Controlling from "../Pages/Controlling/Controlling";
import Viewing from "../Pages/Viewing/Viewing";

export const routes = [
    {
        path: '/controlling',
        Component: Controlling
    },
    {
        path: '/',
        Component: Viewing
    },
]