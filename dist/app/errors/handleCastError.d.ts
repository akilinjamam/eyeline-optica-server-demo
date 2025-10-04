import mongoose from "mongoose";
import { TgenericErrorResponse } from "../interface/error";
declare const handleCastError: (err: mongoose.Error.CastError) => TgenericErrorResponse;
export default handleCastError;
//# sourceMappingURL=handleCastError.d.ts.map