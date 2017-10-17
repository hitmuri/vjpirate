var port = new osc.WebSocketPort({
    url: "ws://127.0.0.1:8211"
});

port.on("message", function(oscMessage) {
    console.log(oscMessage);
});

port.on("ready", function() {
    console.log("Websocket ready");
});

port.open();

