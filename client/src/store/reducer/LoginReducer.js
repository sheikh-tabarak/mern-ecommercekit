import { LOGIN_USER } from "../actions/LoginActions";

// userReducer.js
const initialState = {
  UserData: [
    {
      username: "This Is Value",
      email: "email",
      userId: "id",
      token: undefined,
      isAdmin: false,
      isLoggedIn: undefined,
    },
  ],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        UserData: [...state.UserData, action.payload],

        // UserData: [...state.UserData, action.payload],
      };
    default:
      return state;
  }
};

export default userReducer;
