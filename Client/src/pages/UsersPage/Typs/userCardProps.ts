import {User} from "../../../types/user";

export default interface UserCardProps {
    user: User | null;
    reload: () => void;
    index: number;
}
