/**
 * WAP to check if the given contact number is valid or invalid using regular expressions-
 */

const isValidContactNumber = (number) => {
    // Regular expression to match common phone number formats
    const regex = /^(?:\+?\d{1,3})?[ -]?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/;

    return regex.test(number);
};

const contactArray = [
    '2124567890',
    '212-456-7890',
    '(212)456-7890',
    '(212)-456-7890',
    '212.456.7890',
    '212 456 7890',
    '+12124567890',
    '+12124567890',
    '+1 212.456.7890',
    '+212-456-7890',
    '1-212-456-7890'

];
for (const phoneNumber of contactArray) {
    if (isValidContactNumber(phoneNumber)) {
        console.log("Valid contact number");
    } else {
        console.log("Invalid contact number");
    }
}
