import {
  MESSAGE_ERROR,
  MESSAGE_LOADED,
  MESSAGE_DELETED,
} from '../actions/types';

const initialState = {
  loading: true,
  messages: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MESSAGE_LOADED:
      return {
        ...state,
        messages: payload.data,
        loading: false,
      };
    case MESSAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case MESSAGE_DELETED:
      return {
        ...state,
        loading: false,
        lostFound: [],
        error: {},
      };
    default:
      return state;
  }
}
