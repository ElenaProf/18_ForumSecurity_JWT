import {ExpressMiddlewareInterface} from "routing-controllers";


export class AdminMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err?: any) => any): any {
        console.log(request.user)
        const userRoles: string[] = request.user.roles;
        if (userRoles.length < 1) {
            return response.status(401).send({message: "User does not exist"});
        }
        const hasAdmin = userRoles.some(value => value.includes("Administrator"))
        if (!hasAdmin) {
            return response.status(401).send({message: "forbidden"});
        }
        next();
    }


}