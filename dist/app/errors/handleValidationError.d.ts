import mongoose from "mongoose";
import { TgenericErrorResponse } from "../interface/error";
declare const handleValidationError: (err: mongoose.Error.ValidationError) => TgenericErrorResponse;
export default handleValidationError;
//# sourceMappingURL=handleValidationError.d.ts.map