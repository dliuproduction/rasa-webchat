import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import './styles.scss';

const scrollToBottom = () => {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

class Messages extends Component {
  componentDidMount() {
    scrollToBottom();
  }

  componentDidUpdate() {
    scrollToBottom();
  }

  getComponentToRender = (message, index, isLast) => {
    const { params } = this.props;
    const ComponentToRender = message.get('component');
    if (message.get('type') === 'component') {
      return <ComponentToRender id={index} {...message.get('props')} isLast={isLast}/>;
    }
    return <ComponentToRender id={index} params={params} message={message} isLast={isLast} />;
  };

  render() {
    return (
      <div id="messages" className="messages-container">
        {
          this.props.messages.map((message, index) =>
            <div className="message" key={index}>
              {
                this.props.profileAvatar &&
                message.get('showAvatar') &&
                <img src={this.props.profileAvatar} className="avatar" alt="profile" />
              }
              {

                this.getComponentToRender(message, index, index === this.props.messages.size - 1)
              }
            </div>
          )
        }
      </div>
    );
  }
}

Messages.propTypes = {
  messages: ImmutablePropTypes.listOf(ImmutablePropTypes.map),
  profileAvatar: PropTypes.string
};

export default connect(store => ({
  messages: store.messages
}))(Messages);
