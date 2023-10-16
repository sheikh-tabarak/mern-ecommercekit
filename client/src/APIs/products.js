import axios from "axios";
import {AxiosError} from 'axios';
const baseLink = process.env.REACT_APP_SERVER_BASE_LINK;


 async function fetchProjects(){
    
    try {
    await fetch(`${baseLink}/products`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => { 
        console.log(res);
      }).catch((error) => {
        if (!error?.response) {
          console.log("No Server Response!");
        } else if (error?.code === AxiosError.ERR_NETWORK) {
          console.log("Network Error");
        } else if (error.response?.status === 404) {
          console.log("404 - Not Found");
        } else if (error?.code) {
          console.log("Code: " + error.code);
        } else {
          console.log("Unknown Error");
        }
      });

       }
       catch(e){
         return console.log(e);
       }
  };



  export default fetchProjects;