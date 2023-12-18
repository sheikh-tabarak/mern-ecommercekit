import {
  UPDATE_EMAIL,
  UPDATE_ISADMIN,
  UPDATE_ISLOGGEDIN,
  UPDATE_TOKEN,
  UPDATE_USERID,
  UPDATE_USERNAME,
} from "../actions/loginStatusAction";

// appReducer.js
const initialState = {
  // variable1: 0,
  // variable2: 0,
  // variable3: 0,

  username: "This Is Value",
  email: "email",
  userId: "id",
  token: "",
  isAdmin: false,
  isLoggedIn: false,
};


const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };

    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload,
      };

    case UPDATE_USERID:
      return {
        ...state,
        userId: action.payload,
      };

    case UPDATE_ISADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };

    case UPDATE_ISLOGGEDIN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };

    case UPDATE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    //   case 'UPDATE_VARIABLE1':
    //     return {
    //       ...state,
    //       variable1: action.payload,
    //     };
    //   case 'UPDATE_VARIABLE2':
    //     return {
    //       ...state,
    //       variable2: action.payload,
    //     };
    //   case 'UPDATE_VARIABLE3':
    //     return {
    //       ...state,
    //       variable3: action.payload,
    //     };
    default:
      return state;
  }
};

export default appReducer;
