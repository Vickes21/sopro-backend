/**
 * Serializes a phone number to ensure it has the 9 digit after the DDD (area code).
 */
export const phoneSerialize = (phone: string): string => {
    // Remove any non-numeric characters
    const cleanPhone = phone.replace(/\D/g, '');
    const countryCode = '55';
    
    // Check if the number already has the country code
    let phoneWithoutCountryCode = cleanPhone;
    if (cleanPhone.startsWith(countryCode)) {
        phoneWithoutCountryCode = cleanPhone.substring(countryCode.length);
    }
    
    // Now handle the phone number without country code
    if (phoneWithoutCountryCode.length === 10 || phoneWithoutCountryCode.length === 11) {
        const ddd = phoneWithoutCountryCode.substring(0, 2);
        let number = phoneWithoutCountryCode.substring(2);
        
        // If it's already 11 digits, check if the 9 is in the right position
        if (phoneWithoutCountryCode.length === 11) {
            // If the digit after DDD is not 9, it's in the wrong format
            if (phoneWithoutCountryCode[2] !== '9') {
                // Remove the last digit and add 9 at the beginning of the number part
                number = '9' + number.substring(0, number.length - 1);
            }
        } else {
            // If it's 10 digits, add the 9 prefix to the number part
            number = '9' + number;
        }
        
        return countryCode + ddd + number;
    }
    
    // For international or other formats, ensure we don't exceed 13 digits (55 + 11 digits)
    if (phoneWithoutCountryCode.length > 11) {
        throw new Error('Phone number must not exceed 11 digits (excluding country code)');
    }
    
    // If the number is too short or doesn't match expected patterns, just add country code
    return countryCode + phoneWithoutCountryCode;
}