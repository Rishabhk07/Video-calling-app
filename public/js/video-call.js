/**
 * Created by rishabhkhanna on 05/12/16.
 */

var peer = new Peer({host: location.hostname,
    port: location.port || (location.protocol === 'https:' ? 443 : 80),
    path: '/peer'
});
peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
    $('#peer-id').html(id);
});
var erroCallback = function (e) {
    console.log("media rejected" , e);
};


function callPeer () {
    console.log("call");
    // var nav = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    navigator.getUserMedia({ video:true},
        function (localMediaStream) {
            var dest = $('#dest-id').val();
            console.log(dest);
            var call =  peer.call(dest , localMediaStream);
            callback(call);
        } , erroCallback);
}



peer.on('call' , function (call) {
    //  var nav = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    navigator.getUserMedia({ video:true},
        function (localMediaStream) {
            call.answer(localMediaStream);
            callback(call);
        } , erroCallback);

});




function callback(call) {
    console.log("hi");
    console.log(call);
    call.on('stream' , function (stream) {
        console.log("below");
        var video = document.querySelector('video');
        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
        video.src = window.URL.createObjectURL(stream);
    })
}

