import UserCardProps from "../../UsersPage/Typs/userCardProps";
import React, {useState} from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import EditDialog from "../../../commponnents/editUserDialog/editDialog";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function PersonalProfile(user: UserCardProps) {
    if (user.user === null) return (<div>user is null</div>)
    const sex = user.index % 2 == 0 ? 'men' : 'women'
    const {firstName, lastName, email, phone, role, jobTitle, description} = user.user;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEdit = () => {
        setIsEditModalOpen(true);
    }

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    }
    return (
        <Container>
            <Grid container justifyContent="center" alignItems="center" marginTop={10}>
                <Grid item>
                    <Card sx={{borderRadius: '8px', display: 'flex', boxShadow: 3}}>
                        <Grid container>
                            <Grid item md={3} id={'noam'} style={{
                                background: 'linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1)) ',
                                borderTopLeftRadius: '8px',
                                borderBottomLeftRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1rem'
                            }}>
                                <Avatar
                                    src={`https://randomuser.me/api/portraits/${sex}/${user.index}.jpg`}
                                    alt="Avatar" sx={{width: '80px', height: '80px'}}/>
                                <Typography variant="h5" m={2}>{firstName} {lastName}</Typography>
                                <Typography variant="subtitle1">Web Designer</Typography>
                                <IconButton onClick={handleEdit}><EditIcon/></IconButton>
                            </Grid>
                            <Grid item md={8} mt={2}>
                                <CardContent sx={{padding: '1rem'}}>
                                    <Typography variant="h4" fontFamily={'cursive'}>Information</Typography>
                                    <Divider/>
                                    <Grid container mt={5} mb={5}>
                                        <Grid item xs={6} mt={1}>
                                            <Typography variant="h6">Email</Typography>
                                            <Typography variant="body2"
                                                        color="textSecondary">{email}</Typography>
                                        </Grid>
                                        <Grid item xs={6} mt={1}>
                                            <Typography variant="h6">Phone</Typography>
                                            <Typography variant="body2"
                                                        color="textSecondary">{phone}</Typography>
                                        </Grid>
                                        <Grid item xs={6} mt={1}>
                                            <Typography variant="h6">Role</Typography>
                                            <Typography variant="body2"
                                                        color="textSecondary">{role}</Typography>
                                        </Grid>
                                        <Grid item xs={6} mt={1}>
                                            <Typography variant="h6">Description</Typography>
                                            <Typography variant="body2"
                                                        color="textSecondary">{description}</Typography>
                                        </Grid>

                                    </Grid>
                                    <Typography variant="h4" fontFamily={'cursive'}>Social</Typography>
                                    <Divider/>
                                    <div style={{display: 'flex', justifyContent: 'start'}}>
                                        <IconButton href="#!"><FacebookIcon/></IconButton>
                                        <IconButton href="#!"><TwitterIcon/></IconButton>
                                        <IconButton href="#!"><InstagramIcon/></IconButton>
                                    </div>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
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
                            <EditDialog user={user.user} index={4} reload={() => {
                            }}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseEditModal} color="primary">Cancel</Button>
                            <Button onClick={handleCloseEditModal} color="primary">Save</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        </Container>
    );
}
