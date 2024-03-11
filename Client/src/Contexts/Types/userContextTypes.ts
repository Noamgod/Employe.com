import {User} from "../../API/type/user";

export interface UserContextTypes {
    user: User | null
    setUser: (user: User) => void;
}