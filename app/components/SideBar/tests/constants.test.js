import React from 'react';
import { Skeleton } from 'antd';
import { GET_FILTERED_MENU_ITEM } from '../constants';

describe('sidebar constants', () => {
  it('should return sketeton menuItems', () => {
    expect(GET_FILTERED_MENU_ITEM(10, '')).toStrictEqual([
      {
        icon: null,
        id: 'a',
        tabName: <Skeleton active paragraph={false} title />,
        to: '',
      },
      {
        icon: null,
        id: 'b',
        tabName: <Skeleton active paragraph={false} title />,
        to: '',
      },
      {
        icon: null,
        id: 'c',
        tabName: <Skeleton active paragraph={false} title />,
        to: '',
      },
      {
        icon: null,
        id: 'd',
        tabName: <Skeleton active paragraph={false} title />,
        to: '',
      },
    ]);
  });
});
