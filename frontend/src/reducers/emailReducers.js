import {
  EMAIL_LIST_SUCCESS,
  EMAIL_LIST_REQUEST
} from '../constants/emailConstants';

export const emailListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case EMAIL_LIST_REQUEST:
      return { loading: true };
    case EMAIL_LIST_SUCCESS:
      return { loading: false, emails: action.payload };
    default:
      return state;
  }
};
