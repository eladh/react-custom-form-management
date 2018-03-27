const VALID_EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const VALID_ALPHA_NUMERIC = /^[a-zA-Z0-9]+$/;
const VALID_NUMERIC = /^\d+$/;

export const required = (text) => {
    return text ? null : fieldName => `${fieldName} is required`;
};

export const email = (email) => {
    return VALID_EMAIL_REGEX.test(email) ? null :fieldName => `${fieldName} must be valid email address`;
};

export const alphaNumeric= (text) => {
    return VALID_ALPHA_NUMERIC.test(text) ? null : fieldName => `${fieldName} must be alpha-numeric`;
};

export const numeric= (text) => {
    return VALID_NUMERIC.test(text) ? null : fieldName => `${fieldName} must be numeric`;
};

export const minLength = (length) => {
    return (text) => {
        return text.length >= length ? null : (fieldName) => `${fieldName} must be at least ${length} characters`;
    };
};

export const exactLength = (length) => {
    return (text) => {
        return text.length === length ? null : (fieldName) => `${fieldName} must be at exact ${length} characters`;
    };
};


