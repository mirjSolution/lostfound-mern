import {
  GET_ITEMS,
  ITEMS_ERROR,
  CLEAR_ITEMS,
  REPORTS_LOADED,
} from '../actions/types';

const initialState = {
  loading: true,
  lostFound: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ITEMS:
    case REPORTS_LOADED:
      return {
        ...state,
        lostFound: payload.data,
        loading: false,
      };
    case ITEMS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        loading: true,
        lostFound: [],
        error: {},
      };
    default:
      return state;
  }
}
