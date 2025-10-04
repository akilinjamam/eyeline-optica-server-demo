import jwt from "jsonwebtoken";
export declare const generateToken: (payload: any, expiresIn?: string) => string;
export declare const verifyToken: (token: string) => string | jwt.JwtPayload;
//# sourceMappingURL=jwt.d.ts.map