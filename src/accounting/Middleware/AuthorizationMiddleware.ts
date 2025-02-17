import {ExpressMiddlewareInterface, useExpressServer} from "routing-controllers";

import {User} from "../model/User";


export class AuthorizationMiddleware implements ExpressMiddlewareInterface {
   //request.user = {login, roles}
    async use(request: any, response: any, next: (err?: any) => any): Promise<any> {
    if( request.method == "POST" && request.url.includes('/register') ) {
        const {login} =request.body;
        if(!login) {
            return response.status(400).send({message:"Login is required"});
        }
       try{
            const existingUser = await User.findOne({login}).exec();
            if(existingUser) {
                return response.status(400).send({message:"User already exist"});
            }

            return next();
       }
        catch(error){
            return response.status(500).send({message:"Database error",error});
        }
    }
    return next();
    }

}