var signupUserInput = document.getElementById("signupUsert");
var signupEmailInput = document.getElementById("signupEmail");
var signupPasswordInput = document.getElementById("signupPasswordInput");
var signinEmail = document.getElementById("signinEmail");
var signinPass = document.getElementById("signinPassword");
var emailRegex = /^[\w-\.]+@([\w-]{5,}\.)+[\w-]{2,4}$/;
var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
var nameRegex = /^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$/;
var userArr = [];
if (localStorage.getItem("users") !== null) {
    userArr = JSON.parse(localStorage.getItem("users"));
}


var signupBtn = document.getElementById("signupBtn");
if(signupBtn){
    signupBtn.addEventListener("click", () => {
        if (!emailRegex.test(signupEmailInput.value.trim())) {
            alert("Invalid email address");
            return;
        }
        if (!passRegex.test(signupPasswordInput.value.trim())) {
            alert("Invalid password. It must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.");
            return;
        }
        if (!nameRegex.test(signupUserInput.value.trim())) {
            alert("Invalid name format. It must contain at least 3 letters for each part of the full name.");
            return;
        }
        if (isEmailExist() == false){
            alert("wrong");
            return;
        }
        var userObject = {
            userName: signupUserInput.value.trim(),
            userEmail: signupEmailInput.value.trim(),
            userPass: signupPasswordInput.value.trim(),
        };
        alert("Signed up successfully")
        saveUserToLocalstorage(userObject);
        clearInputs();
    
        console.log(userArr);
    });
}   

var signinBtn = document.getElementById("signinBtn");
if (signinBtn) {
    signinBtn.addEventListener("click", () => {
        if (!emailRegex.test(signinEmail.value.trim())) {
            alert("Invalid email address");
            return;
        }
        if (!passRegex.test(signinPass.value.trim())) {
            alert("Invalid password. It must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.");
            return;
        }
        var authenticatedUser = authenticateUser(signinEmail.value.trim(), signinPass.value.trim());
        if (authenticatedUser) {
            localStorage.setItem("authenticatedUser", JSON.stringify(authenticatedUser));
            window.location.href = "home.html";
        } else {
            alert("Invalid email or password");
        }
    });
}

var userHome = document.getElementById("userHome")
var authenticatedUser = JSON.parse(localStorage.getItem("authenticatedUser")) || {};
userHome.innerHTML = "Hello, " + authenticatedUser.userName;

function authenticateUser(email, password) {
    for (var i = 0; i < userArr.length; i++) {
        if (userArr[i].userEmail.toLowerCase() === email.toLowerCase() && userArr[i].userPass === password) {
            return userArr[i]; 
        }
    }
    return null; 
}

function saveUserToLocalstorage(userObject) {
    var existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    existingUsers.push(userObject);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    userArr = existingUsers;
}

function clearInputs() {
    signupUserInput.value = "";
    signupEmailInput.value = "";
    signupPasswordInput.value = "";
}
function isEmailExist(){
    for(var i=0; i < userArr.length; i++){
        if (userArr[i].userEmail.toLowerCase() == signupEmailInput.value.toLowerCase()){
            return false;
        }
    }
}
