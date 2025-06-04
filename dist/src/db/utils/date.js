"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDays = addDays;
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
}
//# sourceMappingURL=date.js.map