"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneSerialize = void 0;
const phoneSerialize = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const countryCode = '55';
    let phoneWithoutCountryCode = cleanPhone;
    if (cleanPhone.startsWith('55')) {
        phoneWithoutCountryCode = cleanPhone.substring(2);
    }
    if (phoneWithoutCountryCode.length === 10 || phoneWithoutCountryCode.length === 11) {
        const ddd = phoneWithoutCountryCode.substring(0, 2);
        let number = phoneWithoutCountryCode.substring(2);
        if (phoneWithoutCountryCode.length === 11) {
            if (phoneWithoutCountryCode[2] !== '9') {
                number = '9' + number.substring(0, number.length - 1);
            }
        }
        else {
            number = '9' + number;
        }
        return countryCode + ddd + number;
    }
    if (phoneWithoutCountryCode.length > 11) {
        throw new Error('Phone number must not exceed 11 digits (excluding country code)');
    }
    return countryCode + phoneWithoutCountryCode;
};
exports.phoneSerialize = phoneSerialize;
//# sourceMappingURL=utils.js.map