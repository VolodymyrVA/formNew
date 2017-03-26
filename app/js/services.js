class Validator {
    constructor(date) {
        this.date = date;
    }

    validationForm(dataForm) {
        let valid = true;
        for(let key in dataForm) {
            if(this.date[key].required){
                if(!dataForm[key]) return false
            }
        }

        return valid;

    }
}

export default Validator

