export const LOGIN_USER = 'LOGIN_USER';
export const UPDATE_LOGIN_STATUS = "UPDATE_LOGIN_STATUS";


// Action creators
export const loginUser = (user) => ({
    type: LOGIN_USER,
    payload: user,
  });


  export const updateLoginStatus = (user) => ({
    type: UPDATE_LOGIN_STATUS,
    payload: user,
  });