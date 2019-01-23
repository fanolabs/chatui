import { audio } from '../core';

export const START_AUDIO_RECORDING = "START_AUDIO_RECORDING";
export const STOP_AUDIO_RECORDING = "STOP_AUDIO_RECORDING";


const startAudioRecording = () => {
  audio.startRecording();
  return {
    type: START_AUDIO_RECORDING
  }
}

const stopAudioRecording = () => {
  return dispatch => audio.stopRecording()
}


export const actionCreators = {
  startAudioRecording,
  stopAudioRecording
}