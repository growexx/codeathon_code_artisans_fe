import React from 'react';
import { MessageOutlined } from '@ant-design/icons';
import {
  ROUTES,
  ROLE_BASED_SIDEBAR_MENU,
  ROLES,
  RESTRICTED_ROUTES,
} from 'containers/constants';
import { Skeleton } from 'antd';
import { isArray } from 'lodash';

export const ADD_SIDEBAR_ITEM = 'llm/Sidebar/ADD_SIDEBAR_ITEM';
export const REMOVE_SIDEBAR_ITEM = 'llm/Sidebar/REMOVE_SIDEBAR_ITEM';
export const LOAD_SIDEBAR_ITEMS = 'llm/Sidebar/LOAD_SIDEBAR_ITEMS';
export const LOAD_SIDEBAR_ITEMS_SUCCESS =
  'llm/Sidebar/LOAD_SIDEBAR_ITEMS_SUCCESS';

export const GET_FILTERED_MENU_ITEM = (role, data) => {
  let menuItems;
  if (isArray(data)) {
    menuItems = data?.map(item => ({
      id: item.chatId,
      to: `/chat/${item.chatId}`,
      tabName: item.name,
      icon: <MessageOutlined />,
    }));
  } else {
    menuItems = ['a', 'b', 'c', 'd'];
    menuItems = menuItems.map((item, index) => ({
      id: item,
      to: '',
      tabName: <Skeleton active title paragraph={false} />,
      icon: null,
    }));
  }
  return menuItems;
};
export const GA_LABEL_SIDEBAR = 'SideBar';
