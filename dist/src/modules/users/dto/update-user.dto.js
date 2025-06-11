"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = void 0;
const v4_1 = require("zod/v4");
exports.updateUserSchema = v4_1.z.object({
    name: v4_1.z.string().optional(),
    email: v4_1.z.email().optional(),
});
//# sourceMappingURL=update-user.dto.js.map