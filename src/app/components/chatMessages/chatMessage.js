import React, { Component } from "react";
import cx from "classnames";
import "./chatMessage.less";

import TextMessage from "./textMessage";
import OptionsMessage from "./optionsMessage";
import AudioMessage from "./audioMessage";
import ImageMessage from "./imageMessage";
import VideoMessage from "./videoMessage";
import WebMessage from "./webMessage";


const ChatMessage = ({ 
  type, isBot, 
  text, options, src,
  title, url, description, target,
  sendTextMessage 
}) => {
  const contentClass = cx({
    content: true,
    isBot: !!isBot
  });

  return (
    <div className="chat-message">
      <div className={contentClass}>
        {(type === 'text' ? <TextMessage {...{ text }}/> : null)}
        {(type === 'options' && options.length ? 
          <OptionsMessage {...{ options, sendTextMessage }}/> : null
        )}
        {(type === 'audio' ? <AudioMessage {...{ src }}/> : null)}
        {(type === 'image' ? <ImageMessage {...{ title, url, description }}/> : null)}
        {(type === 'video' ? <VideoMessage {...{ title, url, description }}/> : null)}
        {(type === 'web' ?
          <WebMessage {...{ title, url, description, target }}/> : null
        )}
      </div>
    </div>
  )
}

export default ChatMessage;
