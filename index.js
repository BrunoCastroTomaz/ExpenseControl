
/*
Validações:
1. Campos de email e senha são obrigatórios;
2. Campo de email deve conter um email válido;
3. Botão de Recuperar Senha fica habilitado caso o email seja válido;
4. Botão de Login fica habilitado se os campos de email e de senha forem válidos.
*/
function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordErrors();
}

function login() {
    showLoading();
    
    /*essa função retorna um promise, basicamente é uma promessa de que a requisição será respondida.
    quando a chamada for respondida então vocÊ poderá usar a resposta ou então receber o erro retornado pela requisição
    uma promisse informa que retornará um valor, mas nao diz QUANDO irá retornar (pode ser instantaneamente, pode demorar 10s etc)*/
    
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(response => {
        //console.log('success', response)
        hideLoading();
        window.location.href = "pages/home/home.html";
    }).catch(error => {
        //console.log('error', error)
        hideLoading();
        alert(getErrorMessage(error));
    });
    
    //atributo location representa a url atual onde o browser está
    //console.log('### window', window);
    //console.log('### window location', window.location);
}

function getErrorMessage(error) {
    if (error.code == "auth/invalid-credential") {
        return "Usuário não encontrado";
    }
    if (error.code == "auth/wrong-password"){
        return "Senha inválida!";
    }
    return error.message;
}

function register() {
    window.location.href = "pages/register/register.html";
}

function recoverPassword() {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading();
        alert('Email enviado com sucesso');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function isEmailValid() {
    const email = form.email().value;
    //const email = document.getElementById("email").value;
    if (!email){
        return false;
    }
    return validateEmail(email);
}

function toggleEmailErrors() { //alternar os erros de email
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
    // alternar botões desabilitados
    const emailValid = isEmailValid();
    form.recoverPassword().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function isPasswordValid() {
    const password = form.password().value;
    if (!password) { 
        return false;
    }
    return true;
}

const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    loginButton: () => document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverPassword: () => document.getElementById('recover-password-button')
}
