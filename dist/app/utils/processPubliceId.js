"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processPublicIds = void 0;
const processPublicIds = (rawId) => {
    const filteredId = rawId?.flatMap((item) => item?.split("/")?.slice(item?.split("/")?.length - 1));
    const proccessImageId = filteredId?.map((item) => `products/${item?.split(".")?.[0]}`);
    return proccessImageId;
};
exports.processPublicIds = processPublicIds;
//# sourceMappingURL=processPubliceId.js.map