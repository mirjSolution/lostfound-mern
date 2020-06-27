import axios from 'axios';
import { setAlert } from './alert';
import { MESSAGE_LOADED, MESSAGE_ERROR, MESSAGE_DELETED } from './types.js';

// Get all messages
export const getMessages = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/contact');
    dispatch({
      type: MESSAGE_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};

// Create message
export const createMessage = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/v1/contact', formData, config);

    dispatch({
      type: MESSAGE_LOADED,
      payload: res.data,
    });

    dispatch(setAlert('Message Successfully Created', 'success'));
    history.push('/');
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      const arr = { errors: errors.split(',') };
      arr.errors.map((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: MESSAGE_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};

// Delete Item
export const deleteMessage = (itemId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/contact/${itemId}`);

    dispatch({
      type: MESSAGE_DELETED,
      payload: res.data,
    });
    dispatch(setAlert('Message Deleted', 'danger'));
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};
