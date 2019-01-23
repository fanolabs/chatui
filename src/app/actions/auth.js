import { auth } from '../core';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";


const login = (userId) => {
  auth.setUserId(userId);
  return {
    type: LOGIN_SUCCESS,
    user: {
      id: userId
    }
  }
}


export const actionCreators = {
  login
}