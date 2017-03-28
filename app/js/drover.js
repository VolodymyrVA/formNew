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
        let elem = document.createElement(itemDescription.element),
            descriptionMap = {
                classes: (classes) => elem.className = classes,
                content: (content) => elem.innerHTML =content,
                attr: (attrMap) => {
                    for(let attribut in attrMap) {
                        elem.setAttribute(attribut, attrMap[attribut])
                    }
                }
            };

        for(let item in itemDescription){
            if(item != 'element'){
                let funktion = descriptionMap[item];
                funktion(itemDescription[item]);
            }

        }
        return elem;
    }

    createWrapper() {
        this.divWrapper = this.createElement({element: 'div', classes: 'divWrapper hidden'});
        this.title = this.createElement({element: 'div', classes: 'form-title'});
        let p = this.createElement({element: 'p', content: 'Login Form'});
        this.title.appendChild(p);
        this.titleClose = this.createElement({element: 'span', content: '&#215'});
        p.appendChild(this.titleClose);
        this.divWrapper.appendChild(this.title);
    }

    createInputForm(filde){
        for (let key in filde) {
            let input = this.createElement({element:'input', classes:'input-form',attr: {type: key.type, placeholder: key, name: key}});
            this.form.appendChild(input);
        }
    }

    createForm(filde) {
        this.form = this.createElement({element:'form', classes: 'log-form', attr: {action: '#'}});
        this.createInputForm(filde);
        this.formButton = this.createElement({element:'button', classes:'submit-button', attr: {
            type: 'submit',
            value: 'submit',
        }, content:'Sing In'});
        this.form.appendChild(this.formButton);
        let batton = this.createElement({element:'button', classes: 'lost-password', content: 'Lost Your Password ?'});
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
        } else {
            this.formButton.classList.remove('active');
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

    errorMassage(text, place){
        let tempText = '';
        text.forEach((textArray, i ) => {
            tempText += `${textArray}  `
        })
        let span = this.createElement({element: 'span', class: 'helpInput', content: tempText });
        this.form.insertBefore(span, place);

    }

    createHelpTextInput(arrayError){
        let input = this.form.querySelectorAll('input');

        input.forEach((element, i) => {
            for(let key in arrayError){
                if(element.name == key){
                    this.errorMassage(arrayError[key],element)
                }
            }
        })
    }

    deleteHelpTextInput(arrayError){
        let span = this.form.querySelectorAll('span');
        span.forEach((elem, i) => {
            elem.remove(span);
        });
    }
}
export default Drover