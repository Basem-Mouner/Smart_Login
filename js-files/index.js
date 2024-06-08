//=================================================================================================
//======================login SYSTEM===============================================================
//=================================================================================================
//=====================smart=======================================================================
//====================Assignment[4]================================================================

'use strict'

//select inputs
const signInPage = document.getElementById('SignIn');
const signUpPage = document.getElementById('SignUP');
const mainPage = document.getElementById('MAINPAGE');
const signUp = document.querySelector('.signUpLink');
const signIn = document.querySelector('.signInLink');
const logOut = document.querySelector('#LOGOGOUTBtn');
//SIGN UP
const userName = document.getElementById('USERName');
const userEmail = document.getElementById('USEREMAIL');
const userPassword = document.getElementById('USERPASSWORD')
    //SIGN in
const signInEmail = document.getElementById('EMAIL_Signin');
const signInPassword = document.getElementById('PASSWORD_Signin')
    //select element to do some action and events
const formLogin = document.forms[0];
const formSignUp = document.forms[1];
const signUpComment = document.getElementById('commentSignUP');
const signInComment = document.getElementById('commentSignIN');
const wellcomUser = document.getElementById('WELLCOM_User');
//*********************************************************/
//usersDataContainer:Array to put anew object for user data 
let usersData;
let currentFetchEmailIndex;
//****************REFRESH CHEACK IF Sites CONTANIER ONTAIN Sites OR NOT*************** 
//AT REFRESH THE GLOBAL Sites CONTANIER WILL LOADED SO MUST CHECK ON IT 
if (localStorage.getItem('userDataLogin') !== null) {
    usersData = JSON.parse(localStorage.getItem('userDataLogin'));
} else {
    usersData = [];
}
//****************REFRESH CHEACK IF Sites CONTANIER ONTAIN Sites OR NOT*************** 
signUp.addEventListener('click', function(e) {
    e.preventDefault();
    signInPage.classList.replace('d-block', 'd-none');
    signUpPage.classList.replace('d-none', 'd-block');
    clearForm();
    signUpComment.innerHTML = '';
    userName.classList.remove('is-valid');
    userName.classList.remove('is-invalid');
    userEmail.classList.remove('is-valid');
    userEmail.classList.remove('is-invalid');
    userPassword.classList.remove('is-valid');
    userPassword.classList.remove('is-invalid');
});
signIn.addEventListener('click', function(e) {
    e.preventDefault();
    signUpPage.classList.replace('d-block', 'd-none');
    signInPage.classList.replace('d-none', 'd-block');
    clearForm();
    signInComment.innerHTML = '';
    signInEmail.classList.remove('is-valid');
    signInEmail.classList.remove('is-invalid');
    signInPassword.classList.remove('is-valid');
    signInPassword.classList.remove('is-invalid');
});
logOut.addEventListener('click', function(e) {

    mainPage.classList.replace('d-flex', 'd-none')
    signInPage.classList.replace('d-none', 'd-block');
    clearForm();
});


// ===========================ADD NEW User==========================
formSignUp.addEventListener('submit', function(e) {
    e.preventDefault();
    addUser();
});

function addUser() {
    var newUser = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value
        }
        //if{} to checkif inputs empty but else{} tocheck validation and added
    if (userName.value == '' | userEmail.value == '' | userPassword == '') {
        signUpComment.innerHTML = 'All inputs is required ';
        signUpComment.style.color = '#dc3545';
    } else {
        //if{} to checkif inputs valid  but else{} if inputs in-valid
        if (validateInputs(userName) & validateInputs(userEmail) & validateInputs(userPassword)) {
            if (usersData.length == 0) {
                usersData.push(newUser);
                console.log('new opject is : ');
                console.log(newUser);
                console.log('Array uswrs Data now  is :');
                console.log(usersData);
                //set add effect in local storage
                localStorage.setItem('userDataLogin', JSON.stringify(usersData));
                signUpComment.innerHTML = 'Success';
                signUpComment.style.color = '#28a745';

            } else {
                if (searchEmail(newUser.email)) {
                    signUpComment.innerHTML = 'this email already exists';
                    signUpComment.style.color = '#dc3545';

                } else {
                    usersData.push(newUser);
                    console.log('new opject is : ');
                    console.log(newUser);
                    console.log('Array uswrs Data now  is :');
                    console.log(usersData);
                    //set add effect in local storage
                    localStorage.setItem('userDataLogin', JSON.stringify(usersData));
                    signUpComment.innerHTML = 'Success';
                    signUpComment.style.color = '#28a745';
                }
            }
        } else {
            signUpComment.innerHTML = 'All inputs  must be valid';
            signUpComment.style.color = '#dc3545';
        }
    }
}
// ===========================End ADD NEW User===========================

// ===========================sign in User==========================
formLogin.addEventListener('submit', function(e) {
    e.preventDefault();
    signCheck();
});

function signCheck() {
    if (signInEmail.value == '' | signInPassword.value == '') {
        signInComment.innerHTML = 'All inputs is required';
        signInComment.style.color = '#dc3545';
    } else {
        if (searchEmail(signInEmail.value)) {
            if (matchedPass(signInPassword.value, currentFetchEmailIndex)) {
                signInComment.innerHTML = '';


                signInPage.classList.replace('d-block', 'd-none');
                mainPage.classList.replace('d-none', 'd-flex')
                wellcomUser.innerHTML = `${getName(currentFetchEmailIndex)}`
            } else {
                signInComment.innerHTML = 'password not matched try again';
                signInComment.style.color = '#dc3545';
            }
        } else {
            signInComment.innerHTML = 'incorrect Email you are not user please make signup ';
            signInComment.style.color = '#dc3545';
        }

    }

}
// ===========================End sign in checkUser===========================
function clearForm() {
    userName.value = null;
    userEmail.value = null;
    userPassword.value = null;
    signInEmail.value = null;
    signInPassword.value = null;
}
// ===========================CLEAR===========================

// ===========================validation DATA input====================================
function validateInputs(element) {

    var regex = {
        USERName: /^([0-9]|[A-Z]|[a-z]|[-_ ]){3,}$/gm,
        USEREMAIL: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
        USERPASSWORD: /^([0-9]|[A-Z]|[a-z]|[-_]){3,}$/gm,
    };
    if (regex[element.id].test(element.value)) {

        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        // element.nextElementSibling.classList.replace('d-block', 'd-none');
        return true;
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        // element.nextElementSibling.classList.replace('d-none', 'd-block');

        return false;
    }



}
// ==========================End validation DATA input===================================
// ==========================search for email if signed before or not====================
function searchEmail(emailCurrentValue) {
    for (let i = 0; i < usersData.length; i++) {
        if (emailCurrentValue == usersData[i].email) {

            currentFetchEmailIndex = i;
            return true;
        }
    }
}
// =================================End search===================================
// ==========================search forpassword matching or not======================================
function matchedPass(passwordCurrentValue, Index) {
    if (usersData[Index].password == passwordCurrentValue) {
        return true;
    }
}
// ==========================End matched password======================================
// ==========================get user name for activated account=======================================
function getName(index) {
    return usersData[index].name;
}
// ==========================end getting name======================================