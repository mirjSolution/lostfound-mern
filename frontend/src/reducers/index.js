import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import items from './items';
import contact from './contact';

export default combineReducers({
  alert,
  auth,
  items,
  contact,
});
