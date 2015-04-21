Parse.initialize("KH2Z0F7TbXcXLADVqg7knUaKdt9RPU9GPUOzCI2q",
    "Mxny1YkaogT7lquNdxrADJ9VATbkXNFHjlc5XKnF");

function registerUser() {
    var username = $('#signUpName').val();
    var password = $('#signUpPass').val();
    var email = $('#email').val();
    var forename = $('#signUpForename').val();
    var surname = $('#signUpSurname').val();
    var age = $('#signUpAge').val();
    var gender = $('#signUpSex').val();
    var weight = $('#signUpWeight').val();
    var height = $('#signUpHeight').val();
    var userinfo = $('#signUpBio').val();
    var tenkready = $('#signUprevRunHistory').val();
    var medcon = $('#medcondition').val();
    var capecol = $('#capechoice').val();
    var setage = Number(age);
    var setheight = Number(height);
    var setweight = Number(weight);
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    user.set("forename", forename);
    user.set("surname", surname);
    user.set("age", setage);
    user.set("Gender", gender);
    user.set("weight", setweight);
    user.set("height", setheight);
    user.set("userInfo", userinfo);
    user.set("tenk_ready", tenkready);
    user.set("medcon", medcon);
    user.set("capeCol", capecol);
    user.signUp(null, {
        success: function(user) {
            alert("User has been registered.");
            window.location.hash = "cape";
        },
        error: function(user, error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function loginUser() {
    var username = $('#usernameInput').val();
    var password = $('#passwordInput').val();
    console.log("took username and pass");
    Parse.User.logIn(username, password, {
        success: function(user) {
            console.log("logged in");
            alert("Welcome " + username +
                " you have successfully logged in.");
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

function logout() {
    Parse.User.logOut();
    alert("User has been logged out");
    // DOES NOT LOG USER OUT. USERNAME STILL SHOWS
}
var currentUser = Parse.User.current();
var joindate = currentUser.get('createdAt');
$(".parseuserdate").html(joindate);
var user = currentUser.get("username");
$(".parseuser").html(user);
var usercape = currentUser.get("capeCol");
$(".parseusercape").html(usercape);
var fname = currentUser.get("forename");
$(".parseuserfname").html(fname);
var sname = currentUser.get("surname");
$(".parseusersname").html(sname);
var age = currentUser.get("age");
$(".parseage").html(age);
var gender = currentUser.get("Gender");
$(".parseusergender").html(gender);
var height = currentUser.get("height");
$(".parseuserheight").html(height);
var weight = currentUser.get("weight");
$(".parseuserweight").html(weight);