import React, {useState} from 'react';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    LinearProgress,
    Typography
} from '@mui/material';
import {styled} from '@mui/system';

import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import {UseMutationResult} from "react-query";
import {AxiosError} from "axios";
import {useDeleteUser} from "../../Hooks/userQuerys";
import Box from "@mui/material/Box";
import UserCardProps from "../../Pages/UsersPage/Typs/userCardProps";
import EditDialog from "../EditDialog/editDialog";

const cardSize = {
    width: 220,
    height: 450,
};

const StyledCard = styled(Card)(({theme}) => ({
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    margin: theme.spacing(2),
    width: cardSize.width,
    height: cardSize.height,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        borderColor: `#6caec659 !important`,
    },
}));

const StyledAvatar = styled(Avatar)(({theme}) => ({
    backgroundColor: theme.palette.primary.secondary,
}));


const UserCard = ({user, reload}: UserCardProps) => {
    const {firstName, lastName, email, phone, role, jobTitle, description} = user;
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
    const {
        isLoading,
        mutate,
    }: UseMutationResult<number, AxiosError, string> = useDeleteUser()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await mutate(email, {
                onSuccess: () => {
                    reload();
                }
            });
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    return (
        <StyledCard style={{border: `0.5em ${isLoading ? 'red' : 'white'} solid`}}>
            <CardHeader
                avatar={
                    <StyledAvatar aria-label="user-avatar">
                        {initials}
                    </StyledAvatar>
                }
                title={`${firstName} ${lastName}`}
                subheader={jobTitle}
            />
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            <EmailIcon/> <strong>Email:</strong> {email}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            <PhoneIcon/> <strong>Phone:</strong> {phone}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            <WorkIcon/> <strong>Role:</strong> {role}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            <DescriptionIcon/> <strong>Description:</strong> {description}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <Grid container justifyContent="space-around" style={{padding: '16px'}}>
                <Button variant="contained" color="info" onClick={handleEdit}>Edit</Button>
                <Button variant="contained" color="error" onClick={handleDelete}>Delete </Button>
                {isLoading ? <Box sx={{width: '100%', marginTop: '0.25em'}}>
                    <LinearProgress color={"success"}/>
                </Box> : null}
            </Grid>
            <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <EditDialog user={user} reload={reload}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal} color="primary">Cancel</Button>
                    <Button onClick={handleCloseEditModal} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </StyledCard>
    );
};

export default UserCard;
