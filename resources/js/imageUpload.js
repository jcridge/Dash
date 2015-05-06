// Source: https://www.parse.com/questions/uploading-files-to-parse-using-javascript-and-the-rest-api
// Majority of code took from this post. Have editted and changed where appropiate.

var imgdata;
var cameraimg;

$(function() {
    var file;
    $('#getCameraImage').bind("change", function(e) {
        var files = e.target.files || e.dataTransfer.files;
        file = files[0];
    });
    var input = document.querySelector('input[type=file]');
    input.onchange = function() {
        file = input.files[0];
    };
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
                imgdata = data.url;
                imgdata = JSON.stringify(imgdata);
                var User = Parse.Object.extend("User");
                var query = new Parse.Query(User);
                var currentUser = Parse.User.current().id;
                query.equalTo("objectId", currentUser);
                    query.first({
                        success: function(User) {
                            User.save(null, {
                                success: function(user) {
                                    Materialize.toast('Sucessfully uploaded profile picture', 3000);
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
