export class ValidationManger {

    constructor() {
        this.validations = new Map();
    }

    addValidation(field, name, ...validations) {
        var validFunc = (state) => {
            for (let v  of validations) {
                let errorMessageFunc = v(state[field], state);
                if (errorMessageFunc) {
                    return errorMessageFunc(name);
                }
            }
            return null;
        };

        this.validations.set(field ,validFunc);
    }

    validate(field ,state) {
        let validFunc  =  this.validations.get(field);
        let result = validFunc(state);
        if (result) {
            state.validationErrors[field]  = result;
            state.showErrors = true;
        } else {
           delete state.validationErrors[field];
        }
    }

    validateForm(state) {
        for (const entry of this.validations.entries()) {
            this.validate(entry[0] ,state);
        }

    }
}