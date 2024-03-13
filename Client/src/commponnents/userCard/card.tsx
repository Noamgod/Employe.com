import React, {useState} from 'react';
import {
    Button,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    LinearProgress,
    Typography
} from '@mui/material';

import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import {UseMutationResult} from "react-query";
import {AxiosError} from "axios";
import {useDeleteUser} from "../../hooks/userHooks/userQuerys";
import Box from "@mui/material/Box";
import UserCardProps from "../../pages/UsersPage/Typs/userCardProps";
import EditDialog from "../editUserDialog/editDialog";
import {StyledAvatar, StyledCard} from "./const";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';

const UserCard = ({user, reload, index}: UserCardProps) => {
    const {
        isLoading,
        mutate,
    }: UseMutationResult<number, AxiosError, string> = useDeleteUser()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    if (user === null) return (<div>user is null</div>)
    const {firstName, lastName, email, phone, role, jobTitle, description} = user;
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
    const sex = index % 2 == 0 ? 'men' : 'women'
    const handleWhatsApp = () => {
        //open whatsapp with user phone number

    }
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
            <CardMedia
                component="img"
                height="180"
                image={`https://randomuser.me/api/portraits/${sex}/${index}.jpg`}
                alt="Paella dish"
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
            <Grid container justifyContent="end" style={{padding: '0 0.25erm '}}>
                <CardActions disableSpacing>
                    <IconButton aria-label={"whatsapp"}>
                        <WhatsAppIcon/>
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={handleDelete}>
                        <DeleteForeverIcon/>
                    </IconButton>
                    <IconButton aria-label="Edit" onClick={handleEdit}>
                        <ModeEditIcon/>
                    </IconButton>
                </CardActions>
                {isLoading ? <Box sx={{width: '100%', marginTop: '0.25em'}}>
                    <LinearProgress color={"success"}/>
                </Box> : null}
            </Grid>
            <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
                <DialogTitle sx={{m: 0, p: 2, fontFamily: 'cursive'}}>
                    Edit User
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseEditModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent dividers>
                    <EditDialog user={user} index={4} reload={reload}/>
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
