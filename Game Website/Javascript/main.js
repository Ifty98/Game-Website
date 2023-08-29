//Registration page functionality
function register_data(){
    //Get the items inseted inside the registration form
    let name = document.getElementById("name").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    //Creates an empty array to store registration data 
    let user_details = {};
    user_details.username = document.getElementById('username').value;
    user_details.password = document.getElementById('password').value;
    user_details.name = document.getElementById('name').value;
    user_details.email = document.getElementById('email').value;
    user_details.score = 0; 

    let details = JSON.parse(localStorage.getItem(username));
    //if any field in the registration form is empty then display an alert
    if (!username || !password || !name || !email){
        alert ("Missing details");
        return false;
    }
    //if an account with the introduced username already is registered then display an alert
    if (details) {
        alert ("Account with this username already exist!");
        return false;
    }
    /*if all the details are correct store these inside local storage
    using the username as a key*/
    else {
        alert('Your account has been created!');
        localStorage[user_details.username] = JSON.stringify(user_details);
    }
}
//Log In page functionality
function validate_data(){
    //Get the items inseted inside the log in form
    let username = document.getElementById("login_name").value;
    let password = document.getElementById("login_passw").value;
    /*access the local storage item using the username as a key
    and creates an empty array to store the key and the score*/
    let details = JSON.parse(localStorage.getItem(username));
    let session_details = {};
    session_details.username = document.getElementById('login_name').value;
    session_details.score = 0;
    //if the log in details introduced does not exist the display an alert 
    if (!details){
        alert ("Wrong details!!");
        return false;
    }
    /*if the log in details are correct then display alert with welcome message,
    clean the session storage and push the details of the current user logged in*/
    if (details.username == username && details.password == password){
        alert ("Welcome back " + username);
        sessionStorage.clear();
        sessionStorage[session_details.username] = JSON.stringify(session_details);
    }
     
}
