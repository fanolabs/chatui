import { api } from '../core';

export const SEND_TEXT_MESSAGE = "SEND_TEXT_MESSAGE";
export const SEND_AUDIO_MESSAGE = "SEND_AUDIO_MESSAGE";

export const APPEND_TEXT_MESSAGE = "APPEND_TEXT_MESSAGE";
export const APPEND_AUDIO_MESSAGE = "APPEND_AUDIO_MESSAGE";
export const APPEND_VIDEO_MESSAGE = "APPEND_VIDEO_MESSAGE";
export const APPEND_OPTIONS_MESSAGE = "APPEND_OPTIONS_MESSAGE";
export const APPEND_IMAGE_MESSAGE = "APPEND_IMAGE_MESSAGE";
export const APPEND_WEB_MESSAGE = "APPEND_WEB_MESSAGE";

const ERROR_MESSAGE = "Oops, something went wrong..."


const sendTextMessage = (text) => {
  return dispatch => {
    // Message of the user
    dispatch(appendTextMessage(text));

    return api.talk(text)
      .then(res => {
        if (res && res.content) {
          // Message of the bot
          const messages = res.content;
          messages.forEach(m => dispatch(appendBotMessage(m)))
        }
      })
      .catch(e => dispatch(
        appendBotMessage({ text: ERROR_MESSAGE })
      ))
  }
}

const appendBotMessage = (message) => {
  const type = Object.keys(message)[0];
  switch (type) {
    case 'text':
      const text = message[type];
      return appendTextMessage(text, true);
    case 'audio':
      const { content: src } = message[type];
      return appendAudioMessage(src, true);
    case 'options':
      const options = message[type];
      return appendOptionsMessage(options, true);
    case 'image':
      const { 
        title: imgTitle, 
        url: imgUrl, 
        description: imgDescription 
      } = message[type];
      return appendImageMessage(imgTitle, imgUrl, imgDescription, true);
    case 'video':
      const {
        title: videoTitle,
        url: videoUrl,
        description: videoDescription
      } = message[type];
      return appendVideoMessage(videoTitle, videoUrl, videoDescription, true);
    case 'web':
      const { 
        title: webTitle, 
        url: webUrl, 
        description: webDescription, 
        target 
      } = message[type];
      return appendWebMessage(webTitle, webUrl, webDescription, target, true);
  }
}

const appendTextMessage = (text, isBot) => {
  return {
    type: APPEND_TEXT_MESSAGE,
    message: {
      type: "text", text,
      isBot: !!isBot
    }
  }
}

const appendAudioMessage = (src, isBot) => {
  return {
    type: APPEND_AUDIO_MESSAGE,
    message: {
      type: "audio", src,
      isBot: !!isBot
    }
  }
}

const appendOptionsMessage = (options, isBot) => {
  return {
    type: APPEND_OPTIONS_MESSAGE,
    message: {
      type: "options", options,
      isBot: !!isBot
    }
  }
}

const appendImageMessage = (title, url, description, isBot) => {
  return {
    type: APPEND_IMAGE_MESSAGE,
    message: {
      type: "image",
      url, description,
      isBot: !!isBot
    }
  }
}

const appendVideoMessage = (title, url, description, isBot) => {
  return {
    type: APPEND_VIDEO_MESSAGE,
    message: {
      type: "video",
      url, description,
      isBot: !!isBot
    }
  }
}

const appendWebMessage = (title, url, description, target, isBot) => {
  return {
    type: APPEND_WEB_MESSAGE,
    message: {
      type: "web",
      title, url, description, target,
      isBot: !!isBot
    }
  }
}



const sendAudioMessage = (blob) => {
  return dispatch => {
    const url = URL.createObjectURL(blob);
    dispatch(appendAudioMessage(url));

    const data = new FormData();
    data.append('data', blob);
    return api.recognize(data)
      .then(res => {
        if (res && res.content) {
          // Message of the bot
          const messages = res.content;
          messages.forEach(m => dispatch(appendBotMessage(m)));
        }
      })
      .catch(e => dispatch(
        appendBotMessage({ text: ERROR_MESSAGE })
      ))
  }
}


export const actionCreators = {
  sendTextMessage,
  sendAudioMessage,
  appendTextMessage,
  appendAudioMessage,
  appendVideoMessage,
  appendOptionsMessage,
  appendImageMessage,
  appendWebMessage
}