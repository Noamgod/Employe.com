import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import {UseMutationResult} from "react-query";
import {AxiosError} from "axios";
import {UpdateUser, User} from "../../API/type/user";
import {LinearProgress} from "@mui/material";
import UserCardProps from "../../Pages/UsersPage/Typs/userCardProps";
import {useUpdateUser} from "../../Hooks/userQuerys";


interface ValidationErrors {
    [key: string]: string;
}

const EditDialog = ({user, reload}: UserCardProps) => {
    const {
        isLoading,
        mutate
    }: UseMutationResult<User, AxiosError, UpdateUser> = useUpdateUser()

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
        const formData: UpdateUser = {
            email: data.get('email') ? data.get('email') as string : user.email,
            password: data.get('password') ? data.get('password') as string : 'Aa123456',
            firstName: data.get('firstName') ? data.get('firstName') as string : user.firstName,
            lastName: data.get('lastName') ? data.get('lastName') as string : user.lastName,
            phone: data.get('phone') ? data.get('phone') as string : user.phone,
            description: data.get('description') ? data.get('description') as string : user.description,
            jobTitle: data.get('jobTitle') ? data.get('jobTitle') as string : user.jobTitle,
            role: data.get('role') ? data.get('role') as string : user.role,
            directManager: data.get('directManager') ? data.get('directManager') as string : user.directManager,
        };

        try {
            await userSchema.validate(formData, {abortEarly: false});
            mutate(formData, {
                onSuccess: () => {
                    reload();
                }
            })
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
                        placeholder={user.firstName}
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
                        placeholder={user.lastName}
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
                        placeholder={user.email}
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
                        placeholder={'********'}
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
                        placeholder={user.phone}
                        error={!!validationErrors.phone}
                        helperText={validationErrors.phone}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        type="text"
                        id="description"
                        autoComplete="description"
                        placeholder={user.description}
                    />
                </Grid>
            </Grid>
            <Button
                color={"warning"}
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                Save
            </Button> <Button
            type="button"
            color={"error"}
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
        >
            cancel
        </Button>
            {isLoading ? <Box sx={{width: '100%'}}>
                <LinearProgress/>
            </Box> : null}

        </Box>
    );
}

export default EditDialog;
