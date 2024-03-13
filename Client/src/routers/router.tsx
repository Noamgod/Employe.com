import {UserContext} from "../contexts/userContexts";
import {useContext} from "react";
import {UserContextTypes} from "../contexts/types/userContextTypes";
import {UserRouter} from "./UserRouter/userRouter";
import {AdminRouter} from "./AdminRouter/adminRouter";
import {EmptyRouter} from "./EmptyRouter/emptyRouter";
import {RouterProvider} from "react-router-dom";

const Router = () => {
    const {user} = useContext(UserContext) as UserContextTypes
    if (!user) {
        return <RouterProvider router={EmptyRouter}/>
    } else if (user.role === 'user') {
        return <RouterProvider router={UserRouter}/>
    } else if (user.role === 'admin') {
        return <RouterProvider router={AdminRouter}/>
    }

}
export default Router;