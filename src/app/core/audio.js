import config from "config";
import WaveWorker from '../workers/waveEncoder.worker.js';

const {
  speech_endpoint
} = config.accobot;

const audio = {

  init() {
    this.config = {
      bufferLength: 4096,
      numChannels: 1
    };
    this.recording = false;

    this._initAudioContext();
    this.encoderWorker = this._initEncoderWorker();
  },

  isDeviceReady() {
    return (
      speech_endpoint &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    );
  },

  startRecording() {
    if (this.isDeviceReady()) {
      this.context = new AudioContext();
      this.processor = this._initAudioProcessor(this.context);
      this._getMediaSource(this.processor);
    }
  },

  stopRecording() {
    return new Promise((resolve, reject) => {
      if (this.recording) {
        this.recording = false;
        this.audioBlobCallback = blob => resolve(blob);
        this.encoderWorker.postMessage({
          command: 'export-wav',
        });
        this.clearStream();
      }
    });
  },

  clearStream() {
    this.encoderWorker.postMessage({
      command: 'clear'
    });

    if (this.stream.getTracks) {
      this.stream.getTracks().forEach(track => track.stop());
    } else {
      this.stream.stop();
    }
    this.source.disconnect();
    this.processor.disconnect();
    this.context.close();

    delete this.stream;
    delete this.context;
  },

  _getMediaSource(audioProcessor) {
    return navigator.mediaDevices.getUserMedia({
      audio: true
    }).then(stream => {
      this.recording = true;
      this.stream = stream;

      this.source = this.context.createMediaStreamSource(stream);
      this.source.connect(audioProcessor);
      audioProcessor.connect(this.context.destination);

      this.encoderWorker.postMessage({
        command: 'init',
        config: {
          sampleRate: this.source.context.sampleRate,
          numChannels: this.config.numChannels
        }
      })
    }).catch(e => {
      let reason = 'blocked';
      if (e.name && ['NotSupportedError', 'NotSupportedError', 'NotAllowedError'].indexOf(e.name) !== -1) {
        reason = 'insecure-not-allowed';
      }
      return Promise.reject(reason);
    })

  },

  _initAudioProcessor(audioContext) {
    const { bufferLength, numChannels } = this.config;
    const processor = audioContext.createScriptProcessor(bufferLength, numChannels, numChannels);
    processor.onaudioprocess = this._audioBufferHandler.bind(this);
    return processor;
  },

  _audioBufferHandler(e) {
    if (this.recording) {
      this.encoderWorker.postMessage({
        command: 'record',
        buffer: [e.inputBuffer.getChannelData(0)]
      });
    }
  },

  _initEncoderWorker() {
    const worker = new WaveWorker();
    worker.onmessage = message => {
      switch (message.data.command) {
        case 'wave_blob':
          if (this.audioBlobCallback) {
            this.audioBlobCallback(message.data.blob);
            this.audioBlobCallback = null;
          }
          break;
        default:
          break;
      }
    };
    return worker;
  },

  _initAudioContext() {
    window.AudioContext = (
      window.AudioContext ||
      window.webkitAudioContext
    );
  }

}

export default audio;
