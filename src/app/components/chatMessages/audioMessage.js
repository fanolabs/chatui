import React from "react";

const AudioMessage = ({ src }) => <audio src={
  src.startsWith('blob') ? src : `data:audio/mp3;base64,${src}`
} controls={true} />

export default AudioMessage;
