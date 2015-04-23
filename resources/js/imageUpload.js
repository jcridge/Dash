var imgdata;
var cameraimg;

$(function() {
    var file;
    // Set an event listener on the Choose File field.
    $('#getCameraImage').bind("change", function(e) {
        var files = e.target.files || e.dataTransfer.files;
        // Our file var now holds the selected file
        file = files[0];
    });
    // Set an event listener on the Choose File field.
    var input = document.querySelector('input[type=file]');
    input.onchange = function() {
        file = input.files[0];
    };
    // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
    $('#sendCameraImage').click(function() {
        var serverUrl = 'https://api.parse.com/1/files/' + file.name;
        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("X-Parse-Application-Id",'KH2Z0F7TbXcXLADVqg7knUaKdt9RPU9GPUOzCI2q');
                request.setRequestHeader(
                    "X-Parse-REST-API-Key",'9bhzuhnzS11H52vgwQhVagNFmnAruRpO6D6G1FA6');
                request.setRequestHeader("Content-Type", file.type);
            },
            
            url: serverUrl,
            data: file,
            processData: false,
            contentType: false,
            
            success: function(data) {
                console.log("File available at: " + data.url);
                imgdata = data.url;
                imgdata = JSON.stringify(imgdata);
                console.log(imgdata + "Is the Link");
                //sendProfilePicture();
                var User = Parse.Object.extend("User");
                var query = new Parse.Query(User);
                var currentUser = Parse.User.current().id;
                query.equalTo("objectId", currentUser);
                    query.first({
                        success: function(User) {
                            User.save(null, {
                                success: function(user) {
                                    Materialize.toast('Sucessfully uploaded profile picture', 4000);
                                    user.set("ProfilePic", imgdata);
                                    user.save();
                                }
                            });

                        }
                    });                              
            },
            error: function(data) {
                var obj = jQuery.parseJSON(data);
                alert(obj.error);
            }
        });
    });
});

function sendProfilePicture() {
    var user = Parse.User.current();
    var ProfilePic = Parse.Object.extend("Images");
    var profilepic = new ProfilePic();
    profilepic.set("User", user);
    profilepic.save(null, {
        success: function(profilepic) {
            profilepic.set("Link", imgdata);
            profilepic.save();
            displayProfilePicture();
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function displayProfilePicture() {
        var user = Parse.User.current();
        var profilepic = Parse.Object.extend("Images");
        var query = new Parse.Query(profilepic);
        query.equalTo("User", user);
        query.find({
            success: querySuccess,
            error: error
        });

        function querySuccess(profilepic) {
            for (var i = 0; i < profilepic.length; i++) {
                $('#imageContainer').html("<img id='image' src=" + profilepic[i].get('Link') + ">");
            }
        }

        function error(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    }