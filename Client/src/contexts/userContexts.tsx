import {Context, createContext, FC, ReactNode, useState} from "react";
import {UserContextTypes} from "./types/userContextTypes";
import {User} from "../types/user";

export const UserContext: Context<UserContextTypes | null> = createContext<UserContextTypes | null>(null);
export const UserContextProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}