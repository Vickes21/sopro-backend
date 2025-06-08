"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const v4_1 = require("zod/v4");
exports.registerSchema = v4_1.z.object({
    name: v4_1.z.string().min(3),
    email: v4_1.z.email(),
    phone: v4_1.z.string().min(11),
    password: v4_1.z.string().min(6),
});
//# sourceMappingURL=register.dto.js.map