import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { ROUTES } from 'containers/constants';

export const MenuItems = [
  {
    to: ROUTES.LOGOUT,
    tabName: 'Logout',
    icon: <LockOutlined />,
  },
];
