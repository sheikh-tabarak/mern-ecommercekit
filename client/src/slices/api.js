
export const url = process.env.REACT_APP_SERVER_BASE_LINK;

export const setHeaders = () => {
    const headers = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
  
    return headers;
  };