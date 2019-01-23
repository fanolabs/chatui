import { 
  APPEND_TEXT_MESSAGE,
  APPEND_OPTIONS_MESSAGE,
  APPEND_AUDIO_MESSAGE,
  APPEND_IMAGE_MESSAGE,
  APPEND_VIDEO_MESSAGE,
  APPEND_WEB_MESSAGE
} from "../actions/chat";

const initState = {
  messageList: []
}

const chat = (state = initState, action) => {
  const { type, message } = action;

  switch (type) {
    case APPEND_TEXT_MESSAGE:
    case APPEND_AUDIO_MESSAGE:
    case APPEND_OPTIONS_MESSAGE:
    case APPEND_IMAGE_MESSAGE:
    case APPEND_VIDEO_MESSAGE:
    case APPEND_WEB_MESSAGE:
      return {
        ...state,
        messageList: [
          ...state.messageList,
          message
        ]
      }
    default:
      return state;
  }

}

export default chat;
