import Axios from 'axios';
import {
  EMAIL_LIST_SUCCESS,
  EMAIL_LIST_REQUEST
} from '../constants/emailConstants';

export const listEmails = () => async (dispatch, getState) => {
  dispatch({ type: EMAIL_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get('/api/emails', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: EMAIL_LIST_SUCCESS, payload: data });
  } catch (error) {
  }
};


