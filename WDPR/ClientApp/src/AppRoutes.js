import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Reserveren from "./components/Reserveren";
import ReserveerForm from "./components/ReserveerForm";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/reserveren',
        element: <Reserveren />
    },
    {
        path: '/reserveren/zaal',
        element: <ReserveerForm />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    }
];

export default AppRoutes;
