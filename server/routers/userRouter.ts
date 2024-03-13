import express from 'express';
import {loginEnePoint, singUpEnePoint,updateUserEnePoint,deleteUserEnePoint,getAllUsersEnePoint,deleteAllUsersEnePoint} from "../controller/userController/userAPI";
const router = express.Router();
router.post('/singUp', singUpEnePoint)
router.post('/login', loginEnePoint)
router.get('/allUsers', getAllUsersEnePoint)
router.put('/updateUser', updateUserEnePoint)
router.delete('/deleteUser', deleteUserEnePoint)
router.delete('/deleteAllUsers', deleteAllUsersEnePoint)
export default router;