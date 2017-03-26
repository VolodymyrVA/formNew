import Drover from './drover'
import Validator from './services'
import LocalStorage from './localStorage'
import '../styles/show.css'

var LoginForm = class LoginForm {
    constructor(objectCreateInput, callback) {
        this.cb = callback;
        this.objectCreateInput = objectCreateInput;
        this.loginData = {};
        this.resultSubmit;
        this.callbackArray = [];
        this.descriptionEvent = [];

        this.drover = new Drover(this.objectCreateInput);
        this.validator = new Validator(this.objectCreateInput, this.drover.form);
        this.localStor = new LocalStorage();
        this.init();
    }


    init() {
        this.callback();
        this.onListeres();
    }

    show() {
        let storageData = this.localStor.getStorage();
        this.drover.fullForm(storageData);
        this.onListeres();
        this.drover.show();
    }

    callback() {
        let divWrapper = (e) => {
                this.drover.clearForm();
                this.ofListeners();
                this.drover.hide();
            },
            formStopPropogation = (e) => {
                e.stopPropagation();
            },
            titleClose = (e) => {
                e.preventDefault();
                this.drover.clearForm();
                this.ofListeners();
                this.drover.hide();
            },
            form = (e) => {
                let isValid = this.validator.validationForm(this.collectionDateForm());
                this.drover.validationButtonShow(isValid);
            },
            formButton = (e) => {
                let isValid = this.validator.validationForm(this.collectionDateForm());
                e.preventDefault();
                if(isValid){
                    this.drover.deleteHelpTextInput();
                    this.resultSubmit = this.collectionDateForm();
                    this.localStor.createStorage(this.loginData);
                    this.cb(this.resultSubmit);
                } else{
                    this.drover.deleteHelpTextInput();
                    this.drover.createHelpTextInput();
                }
            },
            titleStopPropagation = (e) => {
                e.stopPropagation();
            };
        
        this.callbackArray.push(divWrapper, formStopPropogation, titleClose, form, formButton, titleStopPropagation);
    }


    onListeres() {
        this.descriptionEvent.push(
            {selector: 'divWrapper', event: 'click'},
            {selector: 'form', event: 'click'},
            {selector: 'titleClose', event: 'click'},
            {selector: 'form', event: 'keydown'},
            {selector: 'formButton', event: 'click'},
            {selector: 'title', event: 'click'}
        );

        this.descriptionEvent.forEach((opt, i) => {
            this.drover[opt.selector]
                .addEventListener(opt.event, this.callbackArray[i])
        });
    }

    ofListeners(eventForm) {
        this.descriptionEvent.forEach((opt, i) => {
            this.drover[opt.selector]
                .removeEventListener(opt.event, this.callbackArray[i]);
        });
    }

    collectionDateForm() {
        let inputsElem = this.drover.form.querySelectorAll('input');
        inputsElem.forEach((input) => {
            this.loginData[input.name] = input.value;
        });
        return this.loginData;
    }
};

window.LoginFrom = LoginForm;

