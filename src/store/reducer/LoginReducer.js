import { LOGIN_USER } from '../actions/LoginActions';
import {UPDATE_LOGIN_STATUS} from '../actions/LoginActions';


const initialState = {
    LoginUserData: [
        {
            uid:"0",
            img:"https://lms.wimbiz.org/wp-content/themes/cera/assets/images/avatars/user-avatar.png",
            name:"Testing User",
            email:"demouser@testing.com",
            username: "demo",
            password: "demo",
          },
          {
            uid:"1",
            img:"https://avatars.githubusercontent.com/u/70756527?v=4",
            name:"Muhammad Tabarak",
            email:"admin@sheikhtabarak.me",
            username: "sheikhtabarak",
            password: "sheikhtabarak",
          },
    ],
  };



  const LoginReducer = (state = initialState, action) => {

    switch (action.type) {
      case LOGIN_USER:
        return {
          ...state,
        LoginUserData: [...state.LoginUserData, action.payload],
        };


        case UPDATE_LOGIN_STATUS:
            return {
              ...state,
              LoginUserData: state.LoginUserData.map((user) =>
                user.id === action.payload.id ? action.payload : user
              ),
            };
  
      default:
        return state;
    }
  
  };
  
  export default LoginReducer;