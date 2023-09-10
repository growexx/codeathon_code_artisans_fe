import React from 'react';
import StorageService from 'utils/StorageService';
import { EMITTER_EVENTS } from '../../../utils/constants';
import Emitter from '../../../utils/events';

const Logout = () => {
  StorageService.clear();
  Emitter.emit(EMITTER_EVENTS.LOG_OUT);
  return <React.Fragment />;
};

export default Logout;
