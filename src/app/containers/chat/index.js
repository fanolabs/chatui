import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  ChatHeader,
  ChatInput,
  ChatMessageList
} from "../../components";
import { actionCreators } from "../../actions";

import "./chat.less";

export class ChatComponent extends React.Component {

  render() {
    const { messageList, actions } = this.props;
    const { sendTextMessage } = actions;

    return (
      <div className="chat-container">
        <ChatHeader/>
        <ChatMessageList
          {...{ messageList, sendTextMessage }}
        />
        <ChatInput {...actions}/>
      </div>
    )
  }

}

const mapStateToProps = ({ chat }) => {
  const { messageList } = chat;
  return {
    messageList
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

const Chat = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatComponent)

export default Chat;
