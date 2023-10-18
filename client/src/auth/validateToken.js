import { useDispatch } from "react-redux";
import axios from "axios";
import {
    updateEmail,
    updateIsAdmin,
    updateIsLoggedin,
    updateUserId,
    updateUsername,
  } from "../store/actions/loginStatusAction";


const Token = localStorage.getItem("token");
const url = process.env.REACT_APP_SERVER_BASE_LINK;



const validatetoken = async (dispatch) => {

        await axios
            .get(`${url}/users/refresh/token`, {
              headers: {
                "x-header-token": Token,
              },
            })
            .then((response) => {
              console.log(response.data.auth);
              const isAdmin = response.data.isAdmin?response.data.isAdmin:false;
              const uid = response.data.userId?response.data.userId:"";
              const usernamee = response.data.userName?response.data.userName:"";
              const emaill = response.data.userEmail?response.data.userEmail:"";
              const auth = response.data.auth?response.data.auth:false;
              dispatch(updateUsername(usernamee));
              dispatch(updateEmail(emaill));
              dispatch(updateIsLoggedin(auth));
              dispatch(updateUserId(uid));
              dispatch(updateIsAdmin(isAdmin));
            })
            .catch((error) => {
              console.log(error.response);
            });
    // } catch (error) {
      // console.log(error)
    // }
        
        };

        export default validatetoken;