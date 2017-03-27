//todo: this code should be replaced from app folder to the 'script' section in idex.html
//your app folder, should include just library code, but this code, it's a usage example
//as result, index.js should be removed from this folder, or here should be main library module




var filds = {
    username: {
        type: 'text',
        validations: {
            required: true,
            minlength: 5
        }
    },
    password: {
        type: "password",
        validations: {
            required: true,
            minlength: 5
        }
    },
    age: {
        type: 'number',
        validations: {
            required: true,
            pattern:{
                pattern: '^[0-9]+$',
                requier: 'number'
            },
            minlength: 5
        }
    }
};

var loginForm = new LoginFrom(filds, (data) => {
    console.log(data);
});


document.querySelector('#log')
    .addEventListener('click', () =>{
        loginForm.show();
    });

