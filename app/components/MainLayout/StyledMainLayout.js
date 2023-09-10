import styled from 'styled-components';
export const StyledMainLayout = styled.div`
  .ant-layout-sider {
    background: @sidebar-bg;
    transition: width 3s ease;
  }
  .ant-menu .ant-menu-item,
  .ant-menu-submenu-title,
  .ant-menu {
    transition: none;
    margin: 10px 0px;
  }
  .ant-menu.ant-menu-dark,
  .ant-menu-dark .ant-menu-sub,
  .ant-menu.ant-menu-dark .ant-menu-sub {
    background-color: @sidebar-bg;
    color: @secondary-color;
    padding: 0rem 0.5rem;
    font-size: 14px;
    height: 91vh;
    overflow-y: auto;
  }
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item-selected {
    background-color: @sidebar-select-bg;
    color: @white;
    border-radius: 0.375rem;
  }
  .ant-menu-dark .ant-menu-item,
  .ant-menu-dark .ant-menu-item-group-title,
  .ant-menu-dark .ant-menu-item > a,
  .ant-menu-dark .ant-menu-item > span > a {
    color: @white;
  }
  .ant-menu-item-selected > span > a {
    color: @white !important;
  }
  .sideBarTrigger {
    padding: 0 @padding-lg;
    font-size: @font-size-base+4px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
    outline: none;
    color: @white;
  }
  .sideBarTrigger:hover {
    color: @white;
  }
  #components-layout-demo-custom-trigger .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin: @margin-md;
    }
  }
  .site-layout .site-layout-background {
    background: #fff;
  }
  .headerLayout {
    display: flex;
    padding: 0;
    background-color: @header-bg;
    border-bottom: 1px solid rgba(32, 33, 35, 0.5);
  }
  .new-chat-wrapper {
    margin: 10px;
    height: 50px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }
  .new-chat-wrapper .sidebar-btn {
    height: 100%;
    width: 60px;
    background-color: transparent;
    border: 1px solid hsla(0, 0%, 100%, 0.2);
    border-radius: 0.375rem;
  }
  .new-chat-wrapper .new-chat-btn {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: 1px solid hsla(0, 0%, 100%, 0.2);
    border-radius: 0.375rem;
    text-align: left;
  }
  .new-chat-wrapper .new-chat-btn:hover,
  .new-chat-wrapper .sidebar-btn:hover {
    background-color: hsla(240, 9%, 59%, 0.1);
  }
  .new-chat-wrapper .new-chat-btn span svg {
    shape-rendering: auto;
  }
  .not-collapsed-remove {
    display: none;
  }
  .extra-content {
    display: none;
  }

  @media only screen and (max-width: 576px) {
    .inside {
      display: block;
      padding: 0px;
    }
    .not-collapsed-sider {
      position: absolute;
      z-index: 2;
      height: 100%;
    }
  }
`;

export const ToggleBreadCrumb = styled.div`
  display: flex;
`;
