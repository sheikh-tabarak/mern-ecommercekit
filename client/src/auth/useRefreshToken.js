import axios from "axios";
import { useContext, useState } from "react";
import authContext from "./auth.context";

const useRefreshToken = () => {
  const url = process.env.REACT_APP_SERVER_BASE_LINK;
  const Token = localStorage.getItem("token");
//   const [user, setUser] = useContext(authContext);
//   const [context, setContext] = useContext(Context);


  console.log("This is Token " + Token);

//   const NewToken = "Bearer " + Token;

  const getRefreshToken = async (

    // setUsername,
    // setEmail,
    // setUserId
  ) => {
    await axios
      .get(`${url}/users/refresh/token`, {
        headers: {
          "x-header-token": Token,
        },
      })
      .then((response) => {
        console.log(response);
        const isAdmin = response.data.isAdmin;
        const uid = response.data.userId;
        const usernamee = response.data.userName;
        const emaill = response.data.userEmail;
        // Context.set
        // setUser(usernamee)
        // console.log(isAdmin+uid+emaill+usernamee)

        // props.setUser(usernamee);

        // console.log("Anser "+props.user);

        // context.setEmail(emaill);
        // context.setUserId(uid);
        // context.setUsername(usernamee);
        // context.setToken(Token);
        // context.setRole(isAdmin);

        // console.log(context.email+context.isAdmin)


      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return { getRefreshToken, Token };
};

export default useRefreshToken;
