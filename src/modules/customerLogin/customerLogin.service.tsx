import { StatusCodes } from "http-status-codes";
import { AppError } from "../../app/errors/AppError";
import { Cart } from "../cart/cart.model"
import { generateToken } from "../../app/utils/jwt";

const createCustomerLogin = async (payload: {phoneNumber:string}) => {
    const findUserCart = await Cart.findOne({phoneNumber: payload.phoneNumber});
    if(!findUserCart) throw new AppError(StatusCodes.NOT_FOUND, "user not found, please add product to cart");


    const tokenData = {
            id: findUserCart?._id,
            customerId:findUserCart?.customerId,
            email: findUserCart?.email,
            name: findUserCart?.customerName,
            phoneNumber: findUserCart?.phoneNumber,
        };
    
        const token = generateToken(tokenData);
    
        const resultWithtoken = { token: `Bearer ${token}` };
    
        return resultWithtoken;
}


export const customerLoginService = {
    createCustomerLogin
}