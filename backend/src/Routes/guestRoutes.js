import express from 'express';
import { CheckEmailExist, loginUser, NewUser ,checkUserNameExsits} from '../controllers/user/auth.js';

const Router = express.Router();


Router.post('/login', loginUser);
Router.post('/register', NewUser);
Router.get('/checkEmailExsits', CheckEmailExist);
Router.get('/checkUserNameExsits', checkUserNameExsits);


export default Router