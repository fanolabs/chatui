import React from "react";
import "./chatMessageList.less";
import ChatMessage from "./chatMessage";

class ChatMessageList extends React.Component {

  componentDidUpdate() {
    const dom = this.refs.list;
    if (dom.scrollTop < dom.scrollHeight) {
      dom.scrollTop = dom.scrollHeight;
    }
  }

  render() {
    const { messageList, sendTextMessage } = this.props;
    return (
      <div ref="list" className="chat-message-list">
        {messageList.map((message, idx) => 
          <ChatMessage key={idx} {...message} sendTextMessage={sendTextMessage}/>
        )}
      </div>
    )
  }

}

export default ChatMessageList;
