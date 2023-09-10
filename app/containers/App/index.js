/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import UnauthorizedPage from 'containers/UnauthorizedPage/Loadable';
import Login from 'containers/Auth/Login/Loadable';
import Logout from 'containers/Auth/Logout/Loadable';
import { FAV_ICONS } from './constants';
import PrivateRoute from './PrivateRoute';
import AuthRoute from './AuthRoute';
import GlobalStyle from '../../global-styles';
import { ROUTES } from '../constants';
import { manageSession } from '../../utils/Helper';
import { initGA, recordPageViewGA } from '../../utils/googleAnalytics';
import Chat from '../Chat';

const AppWrapper = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  flex-direction: column;
`;

export default function App() {
  const uniqueId = uuid().slice(0, 6);

  useEffect(() => {
    // google analytics init
    initGA();
    // first time page render
    recordPageViewGA(window.location.pathname);
    window.addEventListener('storage', manageSession, []);
    return () => {
      window.removeEventListener('storage', window);
    };
  }, []);

  useEffect(() => {
    // record page view on every route change
    recordPageViewGA(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <AppWrapper data-testid="AppRoutes">
      <Helmet titleTemplate="%s - LLM Bot" defaultTitle="LLM Bot">
        <meta name="description" content="A LLM Bot Application" />
        {FAV_ICONS.map((favIcon, index) => (
          <link {...favIcon} key={index} />
        ))}
      </Helmet>
      <Routes>
        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route
            exact
            path={ROUTES.BASE}
            element={<Navigate to={`/new-chat/${uniqueId}`} />}
          />
          <Route path={ROUTES.CHAT} element={<Chat isNew={false} />} />
          <Route path={ROUTES.NEW_CHAT} element={<Chat isNew />} />
          <Route path={ROUTES.LOGOUT} element={<Logout />} />
        </Route>
        {/* Auth Routes */}
        <Route element={<AuthRoute />}>
          <Route exact path={ROUTES.LOGIN} element={<Login />} />
        </Route>
        <Route exact path={ROUTES.UNAUTHORIZED} component={UnauthorizedPage} />
        <Route path="" component={NotFoundPage} />
      </Routes>
      <GlobalStyle />
    </AppWrapper>
  );
}
