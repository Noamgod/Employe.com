import {User} from "../../types/user";

export interface UserContextTypes {
    user: User | null
    setUser: (user: User) => void;
}