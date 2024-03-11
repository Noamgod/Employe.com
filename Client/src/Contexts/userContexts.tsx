import {Context, createContext, FC, ReactNode, useState} from "react";
import {UserContextTypes} from "./Types/userContextTypes";
import {User} from "../API/type/user";

export const UserContext: Context<UserContextTypes | null> = createContext<UserContextTypes | null>(null);
export const UserContextProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}