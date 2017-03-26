class Drover {
    constructor(renderingData) {
        this.renderingData = renderingData;
        this.divWrapper;
        this.title;
        this.form;
        this.titleClose;
        this.formButton;

        this.updateHtml();
    }

    createElement(itemDescription) {
        let elem;
        for(let key in itemDescription) {
            if (key == 'element') elem = document.createElement(itemDescription[key]);
            if (key == 'class') elem.className = itemDescription[key];
            if (key == 'attr') {
                for (let keyAttr in itemDescription[key]) {
                    elem.setAttribute(keyAttr, itemDescription[key][keyAttr]);
                }
            }
            if (key == 'content') elem.innerHTML = itemDescription[key];
        }
        return elem;
    }

    createWrapper() {
        this.divWrapper = this.createElement({element: 'div', class: 'divWrapper hidden'});
        this.title = this.createElement({element: 'div', class: 'form-title'});
        let p = this.createElement({element: 'p', content: 'Login Form'});
        this.title.appendChild(p);
        this.titleClose = this.createElement({element: 'span', content: '&#215'});
        p.appendChild(this.titleClose);
        this.divWrapper.appendChild(this.title);
    }

    createInputForm(filde){
        for (let key in filde) {
            let input = this.createElement({element:'input', class:'input-form',attr: {type: filde[key].type, placeholder: key, name: key}});
            this.form.appendChild(input);
        }
    }

    createForm(filde) {
        this.form = this.createElement({element:'form', class: 'log-form', attr: {action: '#'}});
        this.createInputForm(filde);
        this.formButton = this.createElement({element:'button', class:'submit-button', attr: {
            type: 'submit',
            value: 'submit',
            //disabled: ""
        }, content:'Sing In'});
        this.form.appendChild(this.formButton);
        let batton = this.createElement({element:'button', class: 'lost-password', content: 'Lost Your Password ?'});
        this.form.appendChild(batton);
        return this.form;
    }

    updateHtml() {
        let body = document.body;
        this.createWrapper();
        this.createForm(this.renderingData);
        body.appendChild(this.divWrapper);
        this.divWrapper.appendChild(this.form);
    }

    show() {
        this.divWrapper.classList.remove('hidden');
    }

    hide() {
        this.divWrapper.classList.add('hidden');
    }

    validationButtonShow(isValid) {
        if (isValid) {
            this.formButton.classList.add('active');
            //this.formButton.removeAttribute('disabled');
        } else {
            this.formButton.classList.remove('active');
            //this.formButton.setAttribute('disabled', '');
        }
    }

    clearForm() {
        let inputsElem = this.form.querySelectorAll('input');
        inputsElem.forEach((input) => {
            input.value = '';
        })
    }

    fullForm(locStor) {
        if (locStor) {
            let dataLocalStorage = JSON.parse(locStor),
                inputsElem = this.form.querySelectorAll('input'),
                i = 0;
            inputsElem.forEach((elem) => {
                for (let key in dataLocalStorage) {
                    if(elem.getAttribute('name') == key) elem.value = dataLocalStorage[key];
                }
            })
        }
    }

    createHelpTextInput(){
        let input = this.form.querySelectorAll('input');
        input.forEach((elem, i) => {
            if(elem.value.length == 0){
                let span = this.createElement({element: 'span', class: 'helpInput', content: 'Fill in the field bro!  &#8595'});
                this.form.insertBefore(span, input[i]);
            }
        })
    }

    deleteHelpTextInput(){
        let span = this.form.querySelectorAll('span');
        span.forEach((elem, i) => {
            elem.remove(span);
        });
    }
}
export default Drover