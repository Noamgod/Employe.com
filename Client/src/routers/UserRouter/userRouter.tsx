import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from "../../pages/HomePage/HomePage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import SingUpPage from "../../pages/SignUpPage/SingUpPage";
import LogInPage from "../../pages/LogInPage/LogInPage";


export const UserRouter = createBrowserRouter([
    {path: '/home', element: <HomePage/>},
    {path: '/profile', element: <ProfilePage/>},
    {path: '/log-in', element: <LogInPage/>},
    {path: '/sign-up', element: <SingUpPage/>},
    {path: '/*', element: <LogInPage/>},
])
