import express from 'express';
import { customerLoginController } from './customerLogin.controller';

const customerLoginRoute = express.Router();


customerLoginRoute.post('/create-customer-login', customerLoginController.getUserLoginController);


export default customerLoginRoute;