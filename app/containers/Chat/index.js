import React, { useState, useEffect, useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Input,
  Skeleton,
  notification,
  Modal,
  Upload,
  Form,
} from 'antd';
import { SendOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
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
import docLoading from '../../images/docLoading.gif';

const key = 'chat';
const tempAns =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quod dolore, accusantium harum eaque natus veniam facilis. Odio ipsam accusamus fugiat natus omnis illum unde quae corrupti amet est. Iusto!';

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
  const [uploadForm] = Form.useForm();

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
      const response = await request(API_ENDPOINTS.TEXT, {
        method: 'POST',
        body: { text: message.trim() },
      });
      if (response.status === 1) {
        const answer = response.data.answer;
        addChatAns(chatId, answer, []);
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
        // const response = await request(`${API_ENDPOINTS.CHAT}?id=${chatId}`, {
        //   method: 'GET',
        // });
        const response = {
          data: {
            question: 'This is a test question',
            answer: tempAns,
            chat_history: {
              question: 'This is a test question',
              answer: tempAns,
            },
          },
        };
        const chatHistory = [];
        if (response?.status === 1) {
          chatHistory.push({
            question: response?.data?.question,
            answer: response?.data?.answer,
          });
          response?.data?.chat_history?.map((chat, index) => {
            chatHistory.push({
              question: chat.question,
              answer: chat.answer,
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

  const handleOk = async () => {
    setLoading(true);
    const data = new FormData();
    const uploadValue = uploadForm.getFieldValue('upload');
    uploadValue.forEach(x => {
      if (x.originFileObj !== undefined) {
        addChatQue(chatId, x.name);
        data.append('pdf', x.originFileObj);
      }
    });
    const response = await fetch('http://localhost:3002/user/pdf', {
      method: 'POST',
      body: data,
    });
    const json = await response.json();
    if (json.status === 1) {
      const answer = json.data.answer;
      addChatAns(chatId, answer, []);
    }
    setLoading(false);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    uploadForm.resetFields();
    setIsModalOpen(false);
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
                {chat?.answer && (
                  <ChatItem
                    content={chat.answer}
                    bot
                    typing={shouldShowTyping(index)}
                    scrollToBottom={scrollToBottom}
                    setLoading={setLoading}
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
        {/* {isNew && firstRender && (
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
        )} */}
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
        title="Upload PDF"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form role="form" form={uploadForm}>
          <Form.Item
            // label="Upload pdf"
            valuePropName="fileList"
            name="upload"
            getValueFromEvent={uploadedFiles =>
              uploadedFiles && uploadedFiles.fileList
            }
          >
            <Upload
              beforeUpload={() => false}
              listType="picture-card"
              data-testid="upload"
              maxCount={1}
            >
              <div>
                <PlusOutlined />

                <div
                  style={{
                    marginTop: 4,
                  }}
                >
                  Upload
                </div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
        {loading ? (
          <>
            <img
              src={docLoading}
              style={{
                margin: '0 auto',
              }}
            />
          </>
        ) : null}
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

export function mapDispatchToProps (dispatch) {
  return {
    addChatQue: (chatId, question) =>
      dispatch(addChatQuestion(chatId, question)),
    addChatAns: (chatId, answer, []) =>
      dispatch(addChatAnswer(chatId, answer, [])),
    setHistory: (chatId, history) => dispatch(setChatHistory(chatId, history)),
    addNewSidebar: data => dispatch(addSidebarItem(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Chat);
