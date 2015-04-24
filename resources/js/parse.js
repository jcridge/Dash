Parse.initialize("KH2Z0F7TbXcXLADVqg7knUaKdt9RPU9GPUOzCI2q","Mxny1YkaogT7lquNdxrADJ9VATbkXNFHjlc5XKnF");

function registerUser() {
    var username = $('#username').val();
    var password = $('#password').val();
    var email = $('#emailaddress').val();
    var nameofuser = $('#fullname').val();
    var age = $('#age').val();
    var gender = $('#gender').val();
    var weight = $('#weight').val();
    var height = $('#height').val();

    var setage = Number(age);
    var setheight = Number(height);
    var setweight = Number(weight);
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    user.set("nameofuser", nameofuser);
    user.set("age", setage);
    user.set("Gender", gender);
    user.set("weight", setweight);
    user.set("height", setheight);
    user.signUp(null, {
        success: function(user) {
            Materialize.toast('You have been sucessfully registered', 3000);
            window.location.assign("index.html");
        },
        error: function(user, error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function loginUser(){
    var username = $('#usernameInput').val();
    var password = $('#passwordInput').val();

    Parse.User.logIn(username, password, {
        success: function(user) {
            Materialize.toast('Sucessfully logged in!', 3000);
            window.location.assign("profile.html");
                    },
        error: function(user, error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function resetPass() {
    var email = $('#resetPassInput').val();
    Parse.User.requestPasswordReset(email, {
        success: function() {
            alert(
                "Your password has been reset. You will have an email sent your address to re-enter your password."
            );
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

var currentUser = Parse.User.current();
var joindate = currentUser.get("createdAt");
$(".parseuserdate").html(joindate);
var user = currentUser.get("username");
$(".parseuser").html(user);
var usercape = currentUser.get("capeCol");
$(".parseusercape").html(usercape);
var actualname = currentUser.get("nameofuser");
$(".parseactualname").html(actualname);
var height = currentUser.get("height");
$(".parseuserheight").html(height);
var weight = currentUser.get("weight");
$(".parseuserweight").html(weight);
var metre = height * 0.01;
var kg = weight * 0.453592;
var division = kg / metre;
var BMI = division / metre;
var BMIrounded = Math.round(BMI * 100) / 100;

$(".parseuserBMI").html(BMIrounded);
var age = currentUser.get("age");
$(".parseage").html(age);
var gender = currentUser.get("Gender");
$(".parseusergender").html(gender);

var bio = currentUser.get("userInfo");
$(".parseuserbio").html(bio);
var profilePicture = currentUser.get("ProfilePic");
$("#profilePicHolder").html("<img id='profilePicture' height='90' width='90' src=" + profilePicture + ">");

$('#logoutBtn').click(function(){
    Materialize.toast('Sucessfully logged out!', 3000);
    Parse.User.logOut();
    window.location.assign("index.html");
});