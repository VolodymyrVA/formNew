class Validator {
    constructor(objectCreateInput, form) {
        this.objectCreateInput = objectCreateInput;
        this.form = form;
    }

    validate(formData){
        let errors = {};

        for (let field in formData) {
            let validateMap = this.objectCreateInput[field].validations;
            let validatorResult = [];
            if(validateMap){

                for (let validator in validateMap) {
                    let validFn =  this[validator],
                        error = validFn(formData[field], validateMap[validator]);

                    console.log(error);
                    if(error) validatorResult.push(error);
                }

                if(validatorResult.length) errors[field] = validatorResult;
            }
        }

        return Object.keys(errors).length ? errors : null;

    }



    required(value) {
        return value ? null : `Required error.`;
    }

    minlength(value, requirement){
        return value.length > (requirement - 1) ? null : `Minlength error least ${requirement} chars.`
    }

    pattern(value, requirement){
        let reg = new RegExp(requirement.pattern);
        return reg.test(value) ? null: `Pattern error need type chars ${requirement.requier}`;
    }
}

export default Validator

