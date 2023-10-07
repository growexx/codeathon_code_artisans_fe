/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, message } from 'antd';
import Typist from 'react-typist';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import GrowExxLogo from '../../images/Growexx-Triangle.svg';
import ProfileLogo from '../../images/Profile.svg';
import { StyledChatItem } from './ChatItemStyled';
function ChatItem({
  bot,
  content,
  typing,
  skeleton = false,
  sources = [],
  scrollToBottom = () => {},
  setLoading = () => {},
}) {
  const [showButton, setShowButton] = useState(!typing);
  const [showPdfs, setShowPdfs] = useState(false);
  const [render, setRender] = useState(true);

  useEffect(() => {
    return () => {
      setShowButton(!typing);
      setShowPdfs(false);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [render]);

  const renderMarkdown = newContent => {
    console.log(newContent);
    return (
      <Markdown
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                {...rest}
                style={atomDark}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {newContent}
      </Markdown>
    );
  };
  return (
    <StyledChatItem>
      <div className={`chat-history-wrapper ${bot && 'bot'}`}>
        <div className={`chat-wrapper ${!bot && 'not-bot'}`}>
          <div className="avatar-wrapper">
            {bot ? (
              <img src={GrowExxLogo} alt="avatar" />
            ) : (
              <img src={ProfileLogo} alt="avatar" />
            )}
          </div>
          <div className={`chat-content-wrapper ${!bot && 'not-bot'}`}>
            {typing ? (
              <Typist
                avgTypingDelay={-20}
                cursor={{ show: false, hideWhenDone: true }}
                onCharacterTyped={() => {
                  scrollToBottom();
                }}
                onTypingDone={() => {
                  setShowButton(true);
                  setLoading(false);
                }}
              >
                <div className="chat-Md-container">
                  {/* {!skeleton ? (
                      content
                        .split('\n')
                        .map((line, index) => (
                          <p key={`${line[0]}${index.toString()}`}>{line}</p>
                        ))
                    ) : (
                      <>{content}</>
                    )} */}
                  {renderMarkdown(content)}
                </div>
              </Typist>
            ) : (
              <div className="content-wrapper">
                {renderMarkdown(content)}
                {/* {!skeleton ? (
                  content
                    ?.toString()
                    .split('\n')
                    .map((line, index) => (
                      <p key={`${line[0]}${index.toString()}`}>{line}</p>
                    ))
                ) : (
                  <>
                    {content}
                    {() => setRender(!render)}
                  </>
                )} */}
              </div>
            )}
            {bot && (
              <div className="source-wrapper">
                <Button
                  className="source-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(content);
                    message.info('Answer copied!');
                  }}
                >
                  Copy
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </StyledChatItem>
  );
}

export default ChatItem;

ChatItem.propTypes = {
  bot: PropTypes.bool,
  content: PropTypes.any,
  typing: PropTypes.bool,
  sources: PropTypes.array,
};
