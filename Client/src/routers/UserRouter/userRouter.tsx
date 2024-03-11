import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from "../../Pages/HomePage/HomePage";
import ProfilePage from "../../Pages/ProfilePage/ProfilePage";
import SingUpPage from "../../Pages/SignUpPage/SingUpPage";
import LogInPage from "../../Pages/LogInPage/LogInPage";


export const UserRouter = createBrowserRouter([
    {path: '/home', element: <HomePage/>},
    {path: '/profile', element: <ProfilePage/>},
    {path: '/log-in', element: <LogInPage/>},
    {path: '/sign-up', element: <SingUpPage/>},
    {path: '/*', element: <LogInPage/>},
])
