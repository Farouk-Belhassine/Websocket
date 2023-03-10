document.addEventListener("DOMContentLoaded", function() {
  let socket = new WebSocket("ws://localhost:8080");

  const log = document.getElementById("log");
  const msg = document.getElementById("msg");
  const sendBtn = document.getElementById("send-btn");

  function writeToLog(text) {
    log.value += text+"\n";
  }

  socket.onopen = function(e) {
    writeToLog("[open] Connection established");
  };

  socket.onmessage = function(event) {
    writeToLog(`[message] Data received from server: ${event.data}`);
  };

  socket.onclose = function(event) {
    if (event.wasClean) {
      writeToLog(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      writeToLog('[close] Connection died!');
    }
  };

  socket.onerror = function(error) {
    writeToLog(`[error]`);
  };

  sendBtn.addEventListener("click", function() {
    sendToServer(msg.value);
  });

  function sendToServer(text){
    writeToLog(`Sending to server: ${text}`);
    socket.send(text);
  }
});