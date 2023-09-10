import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { makeSelectAppLoading } from 'containers/App/selectors';
import App from 'containers/App';
import Emitter from 'utils/events';
import { userExists } from 'utils/Helper';
import { EMITTER_EVENTS } from 'utils/constants';
import { LAYOUT_CONFIG } from '../constants';
import { StyledMainLayout } from './StyledMainLayout';
import Layouts from './Layout';

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    const urlParams = new URLSearchParams(props.location.search);
    const layoutVariant = urlParams.get('layout')
      ? +urlParams.get('layout')
      : props.defaultLayout;
    this.state = {
      collapsed: ![LAYOUT_CONFIG.VERTICAL_OPTION_1].includes(layoutVariant),
      layoutVariant,
    };
  }

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  componentDidMount() {
    Emitter.on(EMITTER_EVENTS.LOG_IN, () => {
      this.setState({});
    });
    Emitter.on(EMITTER_EVENTS.LOG_OUT, () => {
      this.setState({});
    });
  }

  componentWillUnmount() {
    Emitter.off(EMITTER_EVENTS.LOG_IN);
    Emitter.off(EMITTER_EVENTS.LOG_OUT);
  }

  render() {
    const { appLoading } = this.props;
    const { layoutVariant, collapsed } = this.state;

    if (userExists()) {
      return (
        <Spin spinning={appLoading} size="default">
          <StyledMainLayout className="main-layout">
            <Layouts
              collapsed={collapsed}
              layoutVariant={layoutVariant}
              toggle={this.toggle}
            />
          </StyledMainLayout>
        </Spin>
      );
    }

    return <App />;
  }
}

MainLayout.propTypes = {
  appLoading: PropTypes.bool,
  defaultLayout: PropTypes.number,
  location: PropTypes.object,
};

MainLayout.defaultProps = {
  defaultLayout: 1,
};

const mapStateToProps = createStructuredSelector({
  appLoading: makeSelectAppLoading(),
});

const withConnect = connect(mapStateToProps);

const MainLayoutWithConnect = withConnect(MainLayout);

const MainLayoutWrapper = () => {
  const location = useLocation();

  return <MainLayoutWithConnect location={location} />;
};

export default MainLayoutWrapper;
