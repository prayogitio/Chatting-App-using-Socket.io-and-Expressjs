//make connection
var socket = io.connect('http://localhost:3000');

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var output = document.getElementById('output');
var btnSend = document.getElementById('send');
var feedback = document.getElementById('feedback');

btnSend.addEventListener("click", function() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener("keypress", function(){
    socket.emit('typing', handle.value);
});

socket.on('chat', function(data) {
    feedback.innerHTML = '';
    message.value = '';
    output.innerHTML += '<strong>'+ data.handle + ': </strong>' + data.message + '<hr>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<em>' + data + ' is typing a message...</em>';
});