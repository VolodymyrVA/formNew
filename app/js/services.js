class Validator {
    constructor(objectCreateInput, form) {
        this.objectCreateInput = objectCreateInput;
        this.form = form;
    }

    validationForm(dataForm) {
        let valid = true;
        for(let key in dataForm) {
            if(this.objectCreateInput[key].required){
                if(!dataForm[key]) return false
            }
        }
        return valid;
    }
}

export default Validator

