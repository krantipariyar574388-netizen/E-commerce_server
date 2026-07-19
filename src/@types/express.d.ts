import  { IJwtPayload } from '../utils/jwt.util';

declare global {
    namespace Express {
        interface Request{
            user : IJwtPayload;
        }
    }
}

export {};