import {ExpressMiddlewareInterface} from "routing-controllers";


export class ModeratorMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err?: any) => any): any {

        const userRoles: string[] = request.user.roles;
        if (userRoles.length < 1) {
            return response.status(401).send({message: "User does not exist"});
        }
        const hasModerator = userRoles.some(value => value.includes("Moderator"))
        if (!hasModerator) {
            return response.status(401).send({message: "forbidden"});
        }
        next();
    }


}