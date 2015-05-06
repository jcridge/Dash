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
    var setRun = Number(0);
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    user.set("nameofuser", nameofuser);
    user.set("age", setage);
    user.set("Gender", gender);
    user.set("weight", setweight);
    user.set("height", setheight);
    user.set("runsCompleted", setRun);
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
            getInfo();
            window.location.assign("profile.html");
                    },
        error: function(user, error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

$('#resetPassword').click(function(){
    resetPassword();
});

function resetPassword() {
    var email = $('#forgottenEmailInput').val();
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

$('#startRun').click(function(){
    incrementRun();
});

$('#stopRun').click(function(){
    console.log(time);
    afterRun(time);
});

function incrementRun() {
    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    var currentUser = Parse.User.current().id;
    query.equalTo("objectId", currentUser);
        query.first({
            success: function(User) {
                User.save(null, {
                    success: function(user) {
                        user.increment("runsCompleted");
                        user.save();
                    }
                });
            }
        });              
}

function afterRun(time){
    var Data = Parse.Object.extend("Data");
    var data = new Data();
    var User = Parse.User.current();
    data.set("User", User);
    
    //http://stackoverflow.com/questions/9640266/convert-hhmmss-string-to-seconds-only-in-javascript
    var runSeconds = time.split(':'); 
    var seconds = (+runSeconds[0]) * 60 * 60 + (+runSeconds[1]) * 60 + (+runSeconds[2]); 
    // End of copied code

    var minutes = seconds / 60;
    minutes = Math.round(minutes * 100) / 100;

    var hours = minutes / 60;
    // http://en.wikipedia.org/wiki/Metabolic_equivalent
    // Running is equivelent to 7
    var met = 7;
    var calories = 7 * weight * hours;
    calories = Math.round(calories);
  
    data.set("Time", minutes);
    data.set("caloriesBurnt", calories);
    data.save(null, {
        success: function(data){
            console.log("Sucessful");
        },
        error: function(data, error){
            console.log(error.message);
        }
    })
}

function getInfo(){
    var user = Parse.User.current();
    var data = Parse.Object.extend("Data");
    var query = new Parse.Query(data);
    query.equalTo("User", user);
    query.descending("createdAt");
    query.limit(1);
    query.find({
        success: function(result){
            console.log(result.get("Time"));
            $('#banter').html(result.Time);
        },
        error: function(result, error){
            alert(error.message);
        }
    })
}

function getTrainingPlan(){
    var User = Parse.User.current();
    var user = Parse.Object.extend("User");
}

function setTrainingPlan(){
    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    var currentUser = Parse.User.current().id;
    var plan = $('#Plan').val();
    console.log(plan);
    query.equalTo("objectId", currentUser);
        query.first({
            success: function(User) {
                User.save(null, {
                    success: function(user) {
                        user.set("trainingplan", plan);
                        user.save();
                    }
                });
            }
        });     
}

$('#setPlan').click(function(){
    setTrainingPlan();
});

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
if(currentUser.get("ProfilePic") == undefined){
    $("#profilePicHolder").html("<img id='profilePicture' height='90' width='90' src='resources/img/default.jpg'>");
}
var runs = currentUser.get("runsCompleted");
$('#runsCompleted').html(runs);

$('#logoutBtn').click(function(){
    Parse.User.logOut();
    Materialize.toast('Sucessfully logged out!', 3000);
    window.location.assign("index.html");
});