import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import SingUpPage from "../../pages/SignUpPage/SingUpPage";
import LogInPage from "../../pages/LogInPage/LogInPage";


export const EmptyRouter = createBrowserRouter([
    {path: '/log-in', element: <LogInPage/>},
    {path: '/sign-up', element: <SingUpPage/>},
    {path: '/*', element: <LogInPage/>},
])
