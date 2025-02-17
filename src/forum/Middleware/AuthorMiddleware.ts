import {ExpressMiddlewareInterface} from "routing-controllers";

export class AuthorMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err?: any) => any): any {
        const login = request.user.login;
        if (!login) {
            return response.status(401).send({message: "login not found"});
        }
        const author = request.param("author");
        if  (login!=author){
            return response.status(401).send({message: "Login you not author"});
        }

        next()

    }


}