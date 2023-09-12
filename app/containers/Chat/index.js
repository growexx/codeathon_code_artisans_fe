import React, { useState, useEffect, useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Input, Skeleton, notification, Modal, Upload } from 'antd';
import { SendOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { useInjectReducer } from 'utils/injectReducer';
import request from 'utils/request';
import { StyledChat } from './StyledChat';
import ChatItem from '../../components/ChatItem';
import reducer from './reducer';
import { selectChatHistory } from './selectors';
import { addChatAnswer, addChatQuestion, setChatHistory } from './actions';
import { addSidebarItem } from '../../components/SideBar/actions';
import { suggesstions } from './constants';
import { API_ENDPOINTS, ROUTES } from '../constants';
const { Dragger } = Upload;

const key = 'chat';

export const getSources = sources => {
  const sourcesSet = new Set();
  sources.forEach(source => {
    const sourceArr = source.split('/');
    sourcesSet.add(sourceArr[sourceArr.length - 1]);
  });
  return Array.from(sourcesSet);
};

const Chat = ({
  isNew,
  chatHistory,
  addChatQue,
  setHistory,
  addChatAns,
  addNewSidebar,
}) => {
  useInjectReducer({ key, reducer });

  const { chatId } = useParams();
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [userScrolling, setUserScrolling] = useState(false);
  const chatSectionRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname.split('/')[1];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChatMessage(searchValue);
    }
  };

  const handleChatMessage = async message => {
    if (message.trim() === '') {
      return;
    }
    setLoading(true);
    setUserScrolling(false);
    try {
      if (firstRender && isNew) {
        window.history.pushState(null, '', `/chat/${chatId}`);
        addNewSidebar({ chatId, name: message.trim() });
        setFirstRender(false);
      }
      addChatQue(chatId, message.trim());
      setSearchValue('');
      const response = await request(API_ENDPOINTS.CHAT, {
        method: 'POST',
        body: { key: chatId, question: message.trim() },
      });
      if (response.status === 1) {
        const answer = response.data.answer;
        const sources = getSources(response.data.sources);
        addChatAns(chatId, answer, sources);
      }
    } catch (error) {
      notification.error({ message: error.message });
    }
    setTyping(true);
  };

  const loadChatHistory = async () => {
    setLoading(true);
    try {
      if (chatHistory[chatId] === undefined) {
        const response = await request(`${API_ENDPOINTS.CHAT}?id=${chatId}`, {
          method: 'GET',
        });
        const chatHistory = [];
        if (response?.status === 1) {
          chatHistory.push({
            question: response?.data?.question,
            answer: response?.data?.answer,
            sources: getSources(response?.data?.sources),
          });
          response?.data?.chat_history?.map((chat, index) => {
            chatHistory.push({
              question: chat.question,
              answer: chat.answer,
              sources: getSources(chat.sources),
            });
          });
        } else {
          navigate(ROUTES.HOME);
        }
        setHistory(chatId, chatHistory);
      }
    } catch (error) {
      notification.error({ message: error.message });
    }
    setLoading(false);
  };

  const shouldShowTyping = index => {
    if (typing && index === chatHistory[chatId].length - 1) {
      return true;
    }
    return false;
  };

  const scrollToBottom = () => {
    const element = document.getElementById('chat');
    if (!userScrolling) {
      element.scrollTop = element.scrollHeight;
    }
  };

  const handleScroll = () => {
    const element = document.getElementById('chat');
    const isScrolledToBottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;
    setUserScrolling(!isScrolledToBottom);
  };

  const handleUploadModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  useEffect(() => {
    if (!isNew) {
      loadChatHistory();
    }
    document.getElementById('chat').addEventListener('scroll', handleScroll);

    return () => {
      document
        .getElementById('chat')
        ?.removeEventListener('scroll', handleScroll);
      setTyping(false);
      setFirstRender(true);
      setSearchValue('');
      setLoading(false);
    };
  }, [chatId]);

  return (
    <StyledChat>
      <div className="chat-section-wrapper" id="chat" ref={chatSectionRef}>
        {chatHistory[chatId] !== undefined || pathname === 'new-chat'
          ? chatHistory[chatId]?.map((chat, index) => (
              <div key={`${chatId}${index.toString()}`}>
                <ChatItem content={chat.question} />
                {chat?.answer ? (
                  <ChatItem
                    content={chat.answer}
                    bot
                    typing={shouldShowTyping(index)}
                    sources={chat.sources}
                    scrollToBottom={scrollToBottom}
                    setLoading={setLoading}
                  />
                ) : (
                  <ChatItem
                    skeleton
                    content={<Skeleton active />}
                    bot
                    scrollToBottom={scrollToBottom}
                  />
                )}
                {scrollToBottom()}
              </div>
            ))
          : [1].map((chat, index) => (
              <div key={`index${index.toString()}`}>
                <ChatItem
                  skeleton
                  content={<Skeleton active title paragraph={false} />}
                />
                <ChatItem skeleton content={<Skeleton active />} bot />
              </div>
            ))}
      </div>
      <div className="input-section-wrapper">
        {isNew && firstRender && (
          <div className="default-option-container">
            <div className="default-options options-1">
              {suggesstions.map((suggestion, index) => {
                if (index < 2) {
                  return (
                    <Button
                      key={`option-btn-${index.toString()}`}
                      data-testid="SUGG_BTN"
                      className="option-card"
                      onClick={() => {
                        handleChatMessage(suggestion.title);
                      }}
                    >
                      <div>{suggestion.titlePart1}</div>
                      <div className="card-content">
                        {suggestion.titlePart2}
                      </div>
                    </Button>
                  );
                }
              })}
            </div>
            <div className="default-options">
              {suggesstions.map((suggestion, index) => {
                if (index > 1) {
                  return (
                    <Button
                      key={`option-btn-${index.toString()}`}
                      data-testid="SUGG_BTN"
                      className="option-card"
                      onClick={() => {
                        handleChatMessage(suggestion.title);
                      }}
                    >
                      <div>{suggestion.titlePart1}</div>
                      <div className="card-content">
                        {suggestion.titlePart2}
                      </div>
                    </Button>
                  );
                }
              })}
            </div>
          </div>
        )}
        <div className="input-wrapper">
          <Button className="upload-btn" onClick={() => handleUploadModal()}>
            <UploadOutlined />
          </Button>
          <Input.TextArea
            onPressEnter={handleSubmit}
            autoSize={{ minRows: 1, maxRows: 8 }}
            placeholder="Send a message"
            className="chat-input"
            value={searchValue}
            disabled={loading}
            onChange={e => setSearchValue(e.target.value)}
          />
          {
            <Button
              className="send-btn"
              data-testid="SEND_CHAT_BTN"
              onClick={() => handleChatMessage(searchValue)}
            >
              <SendOutlined />
            </Button>
          }
        </div>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
      </Modal>
    </StyledChat>
  );
};

Chat.propTypes = {
  chatHistory: PropTypes.object,
  addChatQue: PropTypes.func,
  setHistory: PropTypes.func,
  addNewSidebar: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  chatHistory: selectChatHistory(),
});

export function mapDispatchToProps(dispatch) {
  return {
    addChatQue: (chatId, question) =>
      dispatch(addChatQuestion(chatId, question)),
    addChatAns: (chatId, answer, sources) =>
      dispatch(addChatAnswer(chatId, answer, sources)),
    setHistory: (chatId, history) => dispatch(setChatHistory(chatId, history)),
    addNewSidebar: data => dispatch(addSidebarItem(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Chat);
