"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const v4_1 = require("zod/v4");
exports.loginSchema = v4_1.z.object({
    email: v4_1.z.email(),
    password: v4_1.z.string().min(6),
});
//# sourceMappingURL=login.dto.js.map