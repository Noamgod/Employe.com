import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import * as Yup from 'yup';
import {useMutation, UseMutationResult} from "react-query";
import {AxiosError} from "axios";
import {createUser} from "../../API/userAPI";
import {User, UserClient} from "../../API/type/user";
import {useNavigate} from "react-router-dom";
import {LinearProgress} from "@mui/material";
import {useState} from "react";

const defaultTheme = createTheme();

interface ValidationErrors {
    [key: string]: string;
}

const SingUpPage = () => {
    const navigate = useNavigate();
    const {
        isLoading, error, isError,
        mutate
    }: UseMutationResult<void, AxiosError, UserClient> = useMutation(['sign-up'], async (user) => createUser(user), {
        onSuccess: () => navigate('/log-in'),
    });
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const userSchema = Yup.object().shape({
        email: Yup.string().email().required("שדה זה הוא חובה").max(30),
        password: Yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
            'הסיסמה חייבת לכלול לפחות אות גדולה אחת (A-Z), אות קטנה אחת (a-z), מספר אחד (0-9), ותו מיוחד אחד (!@#$%^&*) ולהיות באורך של לפחות 8 תווים').required(),
        firstName: Yup.string().required("שדה זה הוא חובה").max(30).min(3),
        lastName: Yup.string().required("שדה זה הוא חובה").max(30).min(3),
        phone: Yup.string().required("שדה זה הוא חובה").max(11).min(10).matches(/^[0-9]/)
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {
            email: data.get('email') as string,
            password: data.get('password') as string,
            firstName: data.get('firstName') as string,
            lastName: data.get('lastName') as string,
            phone: data.get('phone') as string
        };

        try {
            await userSchema.validate(formData, {abortEarly: false});
            mutate(formData)
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors: ValidationErrors = {};
                error.inner.forEach(err => {
                    if (err.path) {
                        errors[err.path] = err.message;
                    }
                });
                setValidationErrors(errors);
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name} = event.target;

        setValidationErrors(prevErrors => {
            return {
                ...prevErrors,
                [name]: '',
            };
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
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
                        Sign up
                    </Typography>
                    {isError ? <Typography color="error">{error?.message}</Typography> : null}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="given-name"
                                    error={!!validationErrors.firstName}
                                    helperText={validationErrors.firstName}
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    error={!!validationErrors.lastName}
                                    helperText={validationErrors.lastName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="email Address"
                                    name="email"
                                    autoComplete="email"
                                    error={!!validationErrors.email}
                                    helperText={validationErrors.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={!!validationErrors.password}
                                    helperText={validationErrors.password}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="phone"
                                    label="Phone number"
                                    type="tel"
                                    id="phone"
                                    autoComplete="tel"
                                    error={!!validationErrors.phone}
                                    helperText={validationErrors.phone}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        {isLoading ? <Box sx={{width: '100%'}}>
                            <LinearProgress/>
                        </Box> : null}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/log-in" variant="body2">
                                    Already have an account? Log in
                                </Link>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SingUpPage;
