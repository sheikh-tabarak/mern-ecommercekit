export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_USERNAME = "UPDATE_USERNAME";
export const UPDATE_USERID = "UPDATE_USERID";
export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const UPDATE_ISADMIN = "UPDATE_ISADMIN";
export const UPDATE_ISLOGGEDIN = "UPDATE_ISLOGGEDIN";

export const updateEmail = (newValue) => ({
  type: UPDATE_EMAIL,
  payload: newValue,
});

export const updateUsername = (newValue) => ({
  type: UPDATE_USERNAME,
  payload: newValue,
});

export const updateUserId = (newValue) => ({
  type: UPDATE_USERID,
  payload: newValue,
});

export const updateToken = (newValue) => ({
  type: UPDATE_TOKEN,
  payload: newValue,
});

export const updateIsAdmin = (newValue) => ({
  type: UPDATE_ISADMIN,
  payload: newValue,
});

export const updateIsLoggedin = (newValue) => ({
  type: UPDATE_ISLOGGEDIN,
  payload: newValue,
});

// appActions.js
// export const updateVariable1 = (newValue) => ({
//   type: "UPDATE_VARIABLE1",
//   payload: newValue,
// });

// export const updateVariable2 = (newValue) => ({
//   type: "UPDATE_VARIABLE2",
//   payload: newValue,
// });

// export const updateVariable3 = (newValue) => ({
//   type: "UPDATE_VARIABLE3",
//   payload: newValue,
// });
