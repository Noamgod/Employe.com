import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from "../../pages/HomePage/HomePage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import UsersPage from "../../pages/UsersPage/UsersPage";
import SingUpPage from "../../pages/SignUpPage/SingUpPage";
import LogInPage from "../../pages/LogInPage/LogInPage";

export const AdminRouter = createBrowserRouter([
    {path: '/home', element: <HomePage/>},
    {path: '/sign-up', element: <SingUpPage/>},
    {path: '/log-in', element: <LogInPage/>},
    {path:'/profile',element:<ProfilePage/>},
    {path: '/users',element:<UsersPage/>},
    {path: "/*", element: <LogInPage/>}

])
