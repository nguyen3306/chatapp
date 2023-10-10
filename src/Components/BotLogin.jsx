import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import "../Components/CSS/botLogin.css";
import axios, { Axios } from 'axios';


function BotLogin() {
  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  const [email,setEmail] = useState('')
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  useEffect(
    () => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                  var email = res.data.email
                  axios.post('https://students.trungthanhweb.com/api/checkLoginhtml1',{
                    email:email,
                  }).then((res)=>{
                    if (res.data.check === true) {
                      localStorage.setItem('id',res.data.id)
                      window.location.replace('/Chat')
                    }
                  })
                })
                .catch((err) => console.log(err));
        }
    },
    [ user ]
);
  return (
    <div className="login-modul">
      <h2>Hãy đăng nhập</h2>
      
        <button  className="btn" onClick={() => login()}>Sign in with Google 🚀 </button>
      
    </div>
  );
}
export default BotLogin;
