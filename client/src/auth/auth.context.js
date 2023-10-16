const { createContext } = require("react");

const authContext = createContext(
  {
  username: "name",
  email: "email",
  userId: "id",
  token: undefined,
  isAdmin:false,
  isLoggedin:false
}
);

export default authContext;
