import axios from 'axios';
import { setAlert } from './alert';

import { GET_ITEMS, ITEMS_ERROR, REPORTS_LOADED } from './types';

// Get all lost and found perishable to be release
export const getPerishables = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/items/perishables');
    dispatch({
      type: REPORTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ITEMS_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};

// Get all lost and found nonvaluable to be release
export const getNonvaluable = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/items/nonvaluables');
    dispatch({
      type: REPORTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ITEMS_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};

// Get all lost and found valuable to be release
export const getValuables = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/items/valuables');
    dispatch({
      type: REPORTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ITEMS_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};

// Get all lost and found to be claim
export const getToBeClaimed = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/items/tobeclaimed');
    dispatch({
      type: REPORTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ITEMS_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};

// Get all lost and found claimed by employee
export const getClaimedEmp = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/items/claimedemp');
    dispatch({
      type: REPORTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ITEMS_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};

// Get all lost and found claimed by employee
export const getClaimedGuest = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/items/claimedguest');
    dispatch({
      type: REPORTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ITEMS_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};

// Get lost and found by ID
export const getItemById = (itemId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/items/${itemId}`);

    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ITEMS_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};

// Get lost and found items
export const getItems = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/items');
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ITEMS_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};

// Create or update profile
export const createItem = (formData, history, edit = false, itemId) => async (
  dispatch
) => {
  if (!edit) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post('/api/v1/items', formData, config);

      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      });

      dispatch(setAlert('Lost and Found item Created', 'success'));
      history.push('/items');
    } catch (err) {
      const errors = err.response.data.error;

      if (errors) {
        const arr = { errors: errors.split(',') };
        arr.errors.map((error) => dispatch(setAlert(error, 'danger')));
      }

      dispatch({
        type: ITEMS_ERROR,
        payload: {
          msg: err.message,
        },
      });
    }
  } else if (edit) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (formData.dateclaimed === '' && formData.status !== 'unclaimed') {
        return dispatch(
          setAlert(`Please enter ${formData.status} date`, 'danger')
        );
      }
      if (formData.claimedby === '' && formData.status !== 'unclaimed') {
        return dispatch(setAlert(`Please enter ${formData.status}`, 'danger'));
      }

      if (formData.dateclaimed1 === '' && formData.status1 !== 'unclaimed') {
        return dispatch(
          setAlert(`Please enter ${formData.status1} date`, 'danger')
        );
      }
      if (formData.claimedby1 === '' && formData.status1 !== 'unclaimed') {
        return dispatch(
          setAlert(`Please enter ${formData.status1} `, 'danger')
        );
      }

      if (formData.dateclaimed2 === '' && formData.status2 !== 'unclaimed') {
        return dispatch(
          setAlert(`Please enter ${formData.status2} date`, 'danger')
        );
      }
      if (formData.claimedby2 === '' && formData.status2 !== 'unclaimed') {
        return dispatch(setAlert(`Please enter ${formData.status2}`, 'danger'));
      }

      const res = await axios.put(`/api/v1/items/${itemId}`, formData, config);

      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      });

      dispatch(setAlert('Lost and Found item Updated', 'success'));
    } catch (err) {
      const errors = err.response.data.error;

      if (errors) {
        const arr = { errors: errors.split(',') };
        arr.errors.map((error) => dispatch(setAlert(error, 'danger')));
      }

      dispatch({
        type: ITEMS_ERROR,
        payload: {
          msg: err.message,
        },
      });
    }
  }
};

// Delete Item
export const deleteItem = (itemId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/items/${itemId}`);

    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    });
    dispatch(setAlert('Lost and Found item Deleted', 'danger'));
  } catch (err) {
    dispatch({
      type: ITEMS_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};
