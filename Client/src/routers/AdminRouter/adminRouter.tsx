import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from "../../Pages/HomePage/HomePage";
import ProfilePage from "../../Pages/ProfilePage/ProfilePage";
import UsersPage from "../../Pages/UsersPage/UsersPage";
import SingUpPage from "../../Pages/SignUpPage/SingUpPage";
import LogInPage from "../../Pages/LogInPage/LogInPage";

export const AdminRouter = createBrowserRouter([
    {path: '/home', element: <HomePage/>},
    {path: '/sign-up', element: <SingUpPage/>},
    {path: '/log-in', element: <LogInPage/>},
    {path:'/profile',element:<ProfilePage/>},
    {path: '/users',element:<UsersPage/>},
    {path: "/*", element: <LogInPage/>}

])
