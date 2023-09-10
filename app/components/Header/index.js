/* eslint-disable react/no-array-index-key */
/**
 * Avatar/index.js
 *
 * This is the Avatar Component File.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { MenuItems } from './constants';
import {
  StyledAppHeader,
  AvatarWrapper,
  StyledAppHeaderColored,
} from './StyledAppHeader';
import Avatar from '../Avatar';
import Heading from '../Heading';

const Header = props =>
  props.menuBackground ? (
    <StyledAppHeaderColored {...props}>
      <AvatarWrapper>
        <Heading />
        <Avatar menu={MenuItems} />
      </AvatarWrapper>
    </StyledAppHeaderColored>
  ) : (
    <StyledAppHeader {...props}>
      <AvatarWrapper>
        <Heading />
        <Avatar menu={MenuItems} />
      </AvatarWrapper>
    </StyledAppHeader>
  );

Header.propTypes = {
  menuBackground: PropTypes.bool,
};
export default Header;
