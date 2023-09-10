import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
/* import { Spin } from 'antd'; */
import {
  RESTRICTED_ROUTES,
  ROLE_BASED_ROUTE_ACCESS,
  ROLE_BASED_DEFAULT_ROUTE,
  ROUTES,
} from '../constants';
import { USER_DATA_KEY } from '../../utils/constants';
import StorageService from '../../utils/StorageService';
import { loginSuccessResponse } from '../Auth/Login/stub/login.stub';
import { withRouter } from './withRouter';

class RoleMiddleWare extends React.Component {
  /**
   * NOTE: for actual implementation of the component, remove comments with following note  "ACTUAL API INTEGRATION CODE" and remove demo code
   */
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      userData: {},
      isRestrictedRoute: true,
    };
  }

  // Get role routes
  doesRoleHaveRouteAccess = (role, route) =>
    (ROLE_BASED_ROUTE_ACCESS[role || 'user'] || []).includes(route);

  static getDerivedStateFromProps(props, state) {
    // Only check if route is restricted or not
    // Only Reset isRestrictedRoute if userData is not fetched
    if (!state.userData || !Object.keys(state.userData).length) {
      const isRestrictedRoute = RESTRICTED_ROUTES.includes(props.path);

      return {
        ...state,
        isRestrictedRoute,
        loader: isRestrictedRoute,
      };
    }
    return state;
  }

  /**
   * Fetch user data and store in local state
   */
  /**
    /* ACTUAL API INTEGRATION CODE
  fetchUserRole = () => {
  
     const data = {
        method: 'GET',
      };
      const requestURL = `${API_ENDPOINTS.USER_DETAILS_API}`;
      request(requestURL, data).then(response => {
        if (response.status) {
          // Save in local storage
          StorageService.set(USER_DATA_KEY, response.data);
          this.setState({ userData: response.data }, () => {
            this.takeDecision((response.data && response.data.role) || '');
          });
        } else {
          logout();
          this.props.navigate('/login');
        }
      });
    }
  };
       */

  /**
   * Takes decision and stop the loader
   */
  takeDecision = role => {
    this.setState({ loader: false });
    /**
     * doesRoleHaveRouteAccess (role, path)
     * Check which path do you need to pass based on paths defined in constant file
     */

    if (!this.doesRoleHaveRouteAccess(role, this.props.path)) {
      if (this.props.showError) {
        this.props.navigate(ROUTES.UNAUTHORIZED);
      } else {
        this.props.navigate(ROLE_BASED_DEFAULT_ROUTE[role]);
      }
    }
  };

  // On component load get user data
  componentDidMount() {
    /**
     * ACTUAL API INTEGRATION CODE
    if (this.state.isRestrictedRoute) {
      this.fetchUserRole();
    }
    */
    // -------------Demo--------------------
    const response = loginSuccessResponse;
    // Save in local storage
    StorageService.set(USER_DATA_KEY, response.data);
    this.setState({ userData: response.data }, () => {
      this.takeDecision((response.data && response.data.role) || '');
    });
    // -------------Demo--------------------
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return <Outlet {...rest} Component={null} userData={this.state.userData} />;
    // Note: Remove in actual Code
    // -------------Demo--------------------

    /**
     * ACTUAL API INTEGRATION CODE
    return this.state.loader ? (
      <Spin spinning={this.state.loader} size="large" />
    ) : (
      <Outlet {...rest} Component={null} userData={this.state.userData} />
    );
    */
  }
}

RoleMiddleWare.propTypes = {
  history: PropTypes.any,
  childProps: PropTypes.any,
  component: PropTypes.any,
  path: PropTypes.string,
  navigate: PropTypes.func,
  showError: PropTypes.bool,
};

export default withRouter(RoleMiddleWare);
