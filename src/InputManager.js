
function InputManager() {

    this.mappings = new Map();
    this.audioOn=false;

    navigator.mediaDevices.getUserMedia({audio:true})
    .then(function(stream) {
        this.audioCtx = new AudioContext();
        this.source = this.audioCtx.createMediaStreamSource(stream);
        this.analyser = this.audioCtx.createAnalyser();
        this.source.connect(this.analyser);
        this.analyser.fftSize = 1024;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Float32Array(this.analyser.frequencyBinCount)
        this.audioOn=true;
    }.bind(this))
    .catch(function(err) {
      /* handle the error */
    });


    this.process = function() {
        if(this.audioOn==true) {
            this.analyser.getFloatFrequencyData(this.dataArray);
            /*
            console.log(this.dataArray.reduce(function(sum, value) {
                        return sum + value;
                        }, 1));
                        */
        }
    };

}
