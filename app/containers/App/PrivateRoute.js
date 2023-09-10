/* eslint-disable space-before-function-paren */
import React from 'react';
import { Outlet, Navigate } from 'react-router';
import { userExists } from 'utils/Helper';
import { ROUTES } from '../constants';

const PrivateRoute = () =>
  userExists() ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;

export default PrivateRoute;
