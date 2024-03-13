import BaseLayout from "../../commponnents/baseLayout/baseLayout";
import React, {useContext} from "react";
import {UserContext} from "../../contexts/userContexts";
import {UserContextTypes} from "../../contexts/types/userContextTypes";
import {PersonalProfile} from "./personalProfile/personalProfile";

const ProfilePage = () => {
    const {user} = useContext(UserContext) as UserContextTypes
    const randomImage = Math.floor(Math.random() * 90);

    return (
        <BaseLayout>
            <PersonalProfile user={user} index={randomImage} reload={() => {
            }}/>
        </BaseLayout>
    );

}



export default ProfilePage;