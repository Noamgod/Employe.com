import * as React from 'react';
import {useContext, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {UseMutationResult} from 'react-query';
import {AxiosError} from 'axios';
import {User} from "../../API/type/user";
import {LinearProgress, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {useLogIn} from "../../Hooks/userQuerys";
import {useNavigate} from "react-router-dom";
import {ErrorResponse} from "../Types/ErrorResponse";
import {UserContext} from "../../Contexts/userContexts";
import {UserContextTypes} from "../../Contexts/Types/userContextTypes";


const defaultTheme = createTheme();


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Employee.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export interface logIn {
    email: string;
    password: string;
}

const LogInPage = () => {
    const {
        isLoading,
        mutate,
    }: UseMutationResult<User, AxiosError, logIn> = useLogIn()
    const [errorMessage, setErrorMessage] = useState('');
    const {setUser} = useContext(UserContext) as UserContextTypes
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        mutate({email, password}, {
            onSuccess: (user) => {
                setUser(user);
                navigate('/home')
            },
            onError: (error: AxiosError<ErrorResponse> | AxiosError) => {
                const errorMessage = error?.response?.data
                if (typeof errorMessage === 'string') {
                    setErrorMessage(errorMessage);
                } else {
                    setErrorMessage('An error occurred while processing your request.');
                }
            }
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <span style={{
                        color: errorMessage ? 'red' : 'inherit',
                        fontWeight: errorMessage ? 'bold' : 'inherit'
                    }}>
                        {errorMessage}
                    </span>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={() => setErrorMessage('')}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={() => setErrorMessage('')}
                        />
                        <FormControlLabel control={<Checkbox value="remember" color="primary"/>} label="Remember me"/>
                        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </Button>
                        {isLoading ? <Box sx={{width: '100%'}}>
                            <LinearProgress/>
                        </Box> : null}
                        <Grid container>
                            <Grid item>
                                <Link href="/sign-up" variant="body2">
                                    {'Don\'t have an account? Sign Up'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright/>
            </ThemeProvider>
        </Container>

    );
};
export default LogInPage;
