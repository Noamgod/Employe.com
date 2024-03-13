import React, { useMemo } from 'react';
import BaseLayout from "../../commponnents/baseLayout/baseLayout";
import { UseQueryResult } from "react-query";
import { User } from "../../types/user";
import { AxiosError } from "axios";
import { useGetAllUsers } from "../../hooks/userHooks/userQuerys";
import UserCard from "../../commponnents/userCard/card";
import { Grid, CircularProgress, Paper } from '@mui/material';

export default function UsersPage() {
    const {
        isLoading,
        refetch,
        data
    }: UseQueryResult<User[], AxiosError> = useGetAllUsers()

    const reload = () => {
        refetch();
    };

    const memoizedUserCards = useMemo(() => {
        return (
            <Grid container spacing={2} justifyContent="center">
                {isLoading ? (
                    <Grid item>
                        <CircularProgress />
                    </Grid>
                ) : (
                    <>
                        {data?.map((user: User, index) => (
                            <Grid item key={index}>
                                <UserCard user={user} index={index} reload={reload} />
                            </Grid>
                        ))}
                    </>
                )}
            </Grid>
        );
    }, [isLoading, data, reload]);

    return (
        <BaseLayout>
            <Paper
                elevation={3}
                style={{
                    margin: '6em 20em',
                    padding: '20px',
                    width: '1300px',
                    backgroundColor: 'white',
                }}
            >
                {memoizedUserCards}
            </Paper>
        </BaseLayout>
    )
}
