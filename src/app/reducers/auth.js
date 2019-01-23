import {
  LOGIN_SUCCESS
} from "../actions/auth";

const initState = {
  user: {}
}

const auth = (state = initState, action) => {
  const { type, user } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...user
        }
      }
    default:
      return state;
  }

}

export default auth;
