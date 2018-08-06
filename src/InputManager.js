
function InputManager() {

    this.mappings = new Map();
    this.mappings.set("loudness", []);
    this.audioOn=false;

    navigator.mediaDevices.getUserMedia({audio:true})
    .then(function(stream) {
        this.audioCtx = new AudioContext();
        this.source = this.audioCtx.createMediaStreamSource(stream);
        this.analyser = this.audioCtx.createAnalyser();
        this.source.connect(this.analyser);
        this.analyser.fftSize = 32;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Float32Array(this.analyser.frequencyBinCount)
        this.audioOn=true;
    }.bind(this))
    .catch(function(err) {
      /* handle the error */
    });

    this.addMapping = function(feature, cb) {
        if(this.mappings.has(feature)) {
            this.mappings.get(feature).push(cb)
            console.log("added mapping for "+feature);
        }
    }

    this.process = function() {
        if(this.audioOn==true) {
            this.analyser.getFloatFrequencyData(this.dataArray);
            this.meanVal = 1 - this.dataArray.reduce(function(sum, value) {
                                return sum + value/32;
                                }, 1)/-50;
           for(cb=0; cb<this.mappings.get("loudness").length; cb++) {
                this.mappings.get("loudness")[cb](this.meanVal);
           }
        }
    };

}
