import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Form, Input, Button, notification } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectEmail,
  makeSelectLoading,
  makeSelectError,
  makeSelectPassword,
  makeSelectSuccess,
} from 'containers/Auth/Login/selectors';
import messages from './messages';
import { StyledLogin } from './StyledLogin';
import { changeEmail, changePassword, fireLogin } from './actions';
import reducer from './reducer';
import saga from './saga';
import { StyledAuthContainer } from '../StyledAuthContainer';
import GrowexxLogo from '../../../images/Growexx-Triangle.svg';

const key = 'login';

const showNotification = () => {
  notification.error({
    message: <FormattedMessage {...messages.notificationToast} />,
  });
};
export function Login({
  loading,
  onSignIn,
  email,
  password,
  error,
  onChangeEmail,
  onChangePassword,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  return (
    <Form onFinish={onSignIn}>
      <StyledAuthContainer>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Description of Login" />
        </Helmet>
        <StyledLogin>
          <div className="LoginSubContainer">
            <div className="logo">
              <img src={GrowexxLogo} alt="logo" />
            </div>
            <p className="createAccount">
              <FormattedMessage {...messages.accountDetails} />
            </p>
            <p className="emailLogin">
              <FormattedMessage {...messages.emailLogin} />
            </p>
            <div className="accountData">
              <Form.Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: <FormattedMessage {...messages.validEmail} />,
                  },
                  {
                    required: true,
                    message: (
                      <FormattedMessage {...messages.emailRequiredMessage} />
                    ),
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  onChange={onChangeEmail}
                  type="email"
                  value={email}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage {...messages.passwordRequiredMessage} />
                    ),
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  value={password}
                  placeholder="Password"
                  onChange={onChangePassword}
                  type="password"
                />
              </Form.Item>
            </div>
            <Form.Item>
              <Button loading={loading} htmlType="submit">
                <FormattedMessage {...messages.signIn} />
              </Button>
            </Form.Item>
          </div>
        </StyledLogin>
        {error === true && showNotification()}
      </StyledAuthContainer>
    </Form>
  );
}

Login.propTypes = {
  history: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  success: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onSignIn: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string,
  onChangePassword: PropTypes.func,
  onChangeEmail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  password: makeSelectPassword(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),
    onChangePassword: evt => dispatch(changePassword(evt.target.value)),
    onSignIn: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(fireLogin());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Login);
