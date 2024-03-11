import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import SingUpPage from "../../Pages/SignUpPage/SingUpPage";
import LogInPage from "../../Pages/LogInPage/LogInPage";


export const EmptyRouter = createBrowserRouter([
    {path: '/log-in', element: <LogInPage/>},
    {path: '/sign-up', element: <SingUpPage/>},
    {path: '/*', element: <LogInPage/>},
])
