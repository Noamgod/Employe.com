import {User} from "../../../API/type/user";

export default interface UserCardProps {
    user: User;
    reload: () => void;
}
