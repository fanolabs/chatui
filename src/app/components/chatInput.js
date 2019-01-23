import React from "react";

import { audio } from "../core";
import "./chatInput.less";


class ChatInput extends React.Component {
  
  constructor(args) {
    super(args);
    this.onTextChange = this.onTextChange.bind(this);
    this.onSend = this.onSend.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onHold = this.onHold.bind(this);
    this.onRelease = this.onRelease.bind(this);

    this.placeHolderText = "Type a message...";
    this.maxHoldingTime = 5000;
    this.holdingTimeoutHandle = -1;
    this.recording = false;

    this.state = {
      text: ""
    }
  }

  onTextChange(e) {
    const text = e.target.value;
    this.setState({
      text
    })
  }

  onSend() {
    const { text } = this.state;
    const { sendTextMessage } = this.props;

    if (text.length) {
      sendTextMessage(text);
      this.setState({
        text: ""
      })
    }
  }

  onKeyPress(e) {
    (e.key === 'Enter') && this.onSend();
  }

  onHold() {
    clearTimeout(this.holdingTimeoutHandle);
    const { startAudioRecording } = this.props;

    this.recording = true;
    startAudioRecording();

    this.holdingTimeoutHandle = setTimeout(this.onRelease, this.maxHoldingTime);
  }

  onRelease() {
    clearTimeout(this.holdingTimeoutHandle);
    const { stopAudioRecording, sendAudioMessage } = this.props;

    if (this.recording) {
      stopAudioRecording()
        .then(blob => sendAudioMessage(blob))
      this.recording = false;
    }
  }

  render() {
    const { placeHolderText } = this;
    const { 
      onTextChange,
      onSend,
      onKeyPress,
      onHold,
      onRelease
    } = this;
    const { text } = this.state;

    return (
      <div className="chat-input">
        <input className="text-input" 
          value={text} placeholder={placeHolderText}
          onChange={onTextChange} onKeyPress={onKeyPress}
        />
        {
          audio.isDeviceReady() ?
            <span className="record-btn"
              onMouseDown={onHold} onTouchStart={onHold}
              onMouseUp={onRelease} onMouseLeave={onRelease}
              onTouchEnd={onRelease} onTouchCancel={onRelease}
            ></span> : null
        }
      </div>
    )
  }

}

export default ChatInput;