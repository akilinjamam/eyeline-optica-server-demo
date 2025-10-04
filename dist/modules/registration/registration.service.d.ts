import { ILogin, IRegistration } from "./registration.type";
import mongoose from "mongoose";
export declare const registrationService: {
    createRegistrationService: (payload: IRegistration) => Promise<(mongoose.Document<unknown, {}, IRegistration, {}, {}> & IRegistration & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | (mongoose.Document<unknown, {}, IRegistration, {}, {}> & IRegistration & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createLoginService: (payload: ILogin) => Promise<{
        user: mongoose.Document<unknown, {}, IRegistration, {}, {}> & IRegistration & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        token: string;
    }>;
    getUserRegistrationService: () => Promise<(mongoose.Document<unknown, {}, IRegistration, {}, {}> & IRegistration & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getCheckRoleOfUser: (email: string, role: string) => Promise<"matched" | "not-matched">;
    updateUserService: (id: string, payload: Partial<IRegistration>) => Promise<(mongoose.Document<unknown, {}, IRegistration, {}, {}> & IRegistration & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteUsersService: (ids: string[]) => Promise<mongoose.mongo.DeleteResult>;
};
//# sourceMappingURL=registration.service.d.ts.map