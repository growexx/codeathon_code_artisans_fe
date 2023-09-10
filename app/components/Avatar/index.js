/* eslint-disable react/no-array-index-key */
/**
 * Avatar/index.js
 *
 * This is the Avatar Component file.
 */
import React from 'react';
import { Dropdown, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AvatarWrapper } from './StyledAvatar';

export const returnItems = itemArr => ({
  items: getNewMenu(itemArr),
});

export const getNewMenu = MenuItems =>
  MenuItems.map((menuItem, index) => ({
    key: index,
    label: <Link to={menuItem.to}>{menuItem.tabName}</Link>,
    icon: menuItem.icon,
  }));

const Avatar = props => (
  <AvatarWrapper>
    <Dropdown menu={returnItems(props.menu)} placement="bottom">
      <Button type="primary" shape="circle">
        <UserOutlined />
      </Button>
    </Dropdown>
  </AvatarWrapper>
);

export default Avatar;

Avatar.propTypes = {
  menu: PropTypes.any,
};
