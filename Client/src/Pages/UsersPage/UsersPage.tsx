import BaseLayout from "../../Commponnents/BaseLayout/BaseLayput";
import {UseQueryResult} from "react-query";
import {User} from "../../API/type/user";
import {AxiosError} from "axios";
import {useGetAllUsers} from "../../Hooks/userQuerys";
import UserCard from "../../Commponnents/Card/card";

export default function UsersPage() {
    const {
        isLoading,
        refetch,
        data
    }: UseQueryResult<User[], AxiosError> = useGetAllUsers()
    const reload = () => {
        refetch();
    };

    return (
        <>
            <BaseLayout>
                <div
                    style={{
                        margin: '6em 20em',
                        padding: '20px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                        width: 'fit-content',
                        height: 'fit-content',
                        backgroundColor: 'white',
                    }}
                >
                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                        {isLoading ? <div>Loading...</div> : <>{data?.map((user: User, index) => (
                            <UserCard user={user} reload={reload} key={index} />
                        ))}</>}
                    </div>
                </div>
            </BaseLayout>
        </>
    )
}