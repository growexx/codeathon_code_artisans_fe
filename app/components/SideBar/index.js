/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, Layout, Menu, Modal } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import request from 'utils/request';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { GA_LABEL_SIDEBAR, GET_FILTERED_MENU_ITEM } from './constants';
import { eventGA } from '../../utils/googleAnalytics';
import { GA_CATEGORY_MENU_CLICKS } from '../../utils/constants';
import { selectError, selectMenuItems } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadSidebarItems, removeSidebarItem } from './actions';
import { API_ENDPOINTS } from '../../containers/constants';

const { Sider } = Layout;
const key = 'sidebar';

const SideBar = ({
  collapsed,
  user,
  menuItems,
  getSidebarItems,
  removeItem,
  toggle,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const location = useLocation();
  const navigate = useNavigate();
  const uniqueId = uuid().slice(0, 6);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    location.pathname.split('/')[2],
  );

  const handleOptionClick = option => {
    setSelectedOption(option);
    navigate(`/chat/${option}`);
  };

  const handleDeleteClick = () => {
    setModalVisible(true);
  };

  const handleModalConfirm = async () => {
    setLoading(true);
    await request(`${API_ENDPOINTS.DELETE_CHAT}?id=${selectedOption}`, {
      method: 'GET',
    });
    removeItem(selectedOption);
    setModalVisible(false);
    setLoading(false);
    navigate(`/new-chat/${uniqueId}`);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleNewChatClick = () => {
    navigate(`/new-chat/${uniqueId}`);
  };

  useEffect(() => {
    getSidebarItems();
  }, []);

  useEffect(() => {
    setSelectedOption(location.pathname.split('/')[2]);
  }, [location.pathname.split('/')[2]]);

  return (
    <>
      <div className={!collapsed ? 'extra-content' : ''} />
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        width={244}
        id="components-layout-demo-custom-trigger"
        className={!collapsed ? 'not-collapsed-sider' : ''}
      >
        <div className="new-chat-wrapper">
          <Button
            type="primary"
            className="new-chat-btn"
            icon={<PlusOutlined />}
            onClick={handleNewChatClick}
          >
            New Chat
          </Button>
          <Button
            type="primary"
            className="sidebar-btn"
            data-testid="SIDEBAR_TOGGLE"
            icon={<MenuFoldOutlined />}
            onClick={toggle}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname.split('/')[2]]}
          selectedKeys={[location.pathname.split('/')[2]]}
        >
          {GET_FILTERED_MENU_ITEM(user && user.role, menuItems).map(menu => (
            <Menu.Item
              key={menu.id}
              icon={menu.icon}
              onClick={() => {
                eventGA(
                  GA_CATEGORY_MENU_CLICKS,
                  `${menu.to} clicked from sidebar`,
                  GA_LABEL_SIDEBAR,
                );
                handleOptionClick(menu.id);
              }}
            >
              <span onClick={() => handleOptionClick(menu.id)}>
                {menu.tabName}
              </span>
              {selectedOption === menu?.id.toString() && (
                <DeleteOutlined
                  onClick={handleDeleteClick}
                  data-testid="DELETE_SIDEBAR"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '13px',
                  }}
                />
              )}
            </Menu.Item>
          ))}
        </Menu>
        <Modal
          centered
          title="Delete chat?"
          okText="Delete"
          visible={modalVisible}
          onOk={handleModalConfirm}
          onCancel={handleModalCancel}
          closeIcon={false}
          width={448}
          confirmLoading={loading}
        >
          Are you sure you want to delete this chat history?
        </Modal>
      </Sider>
    </>
  );
};

SideBar.propTypes = {
  collapsed: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  menuItems: PropTypes.any,
  getSidebarItems: PropTypes.func,
  removeItem: PropTypes.func,
  toggle: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  menuItems: selectMenuItems(),
  error: selectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getSidebarItems: () => dispatch(loadSidebarItems()),
    removeItem: id => dispatch(removeSidebarItem(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SideBar);
