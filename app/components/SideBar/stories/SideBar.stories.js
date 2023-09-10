import React from 'react';
import SideBar from '../index';

export default {
  title: 'Components/SideBar',
  component: SideBar,
};

const Template = args => <SideBar {...args} />;

export const Sidebar = Template.bind({});
Sidebar.args = {
  collapsed: true,
};

Sidebar.storyName = 'Side Navigation of the App';
