import './index.css'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter, RouteObject} from 'react-router-dom'
import {Login} from "./pages/Login.tsx";
import {Register} from "./pages/Register.tsx";
import {BookManage} from "./pages/BookManage.tsx";

const routes: RouteObject[] = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/',
        element: <BookManage/>
    },
]

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(<RouterProvider router={router}/>)