import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const Login = ()=>{

    const [username , setUsername] = useState();
    const [password , setPassword] = useState();

    const navigate = useNavigate();

      const loginBtn = ()=>{debugger
        var data = {
          userName : username,
          password : password
        }


        axios.post("http://127.0.0.1:8888/loginByUsername",data)
        .then(res=>{
           if(res.data === true){
            toast.success(`Mr..${data.userName} Your Account is Login Successfully `,
            {position:toast.POSITION.TOP_CENTER})

            navigate("/home")
           }
           else{
            toast.error(`Mr..${data.userName} Your Account Id & password is wrong `,
            {position:toast.POSITION.TOP_CENTER})
           }
          }
        )
      }

  

    return(
      <>    
      <div className="log_back">  
      <div className="main_content">
        <center>
          <img className="login_chai" src="chai1.png" alt="" />
          <h3 className="mt-4 mb-4 login_name">Chai Ke Nashedi</h3>
        </center>
          <div class="input-field">
            <input onChange={(e)=>setUsername(e.target.value)} type="text" id="name" required />
            <label for="name">Username:</label>
          </div>
          <br /><br />
          <div class="input-field">
            <input onChange={(e)=>setPassword(e.target.value)} type="password" id="password" required />
            <label for="password">Password:</label>
          </div><br ></br>
          <p>Forget Password</p><br />

        <button onClick={loginBtn} className="login_btn form-control">Login</button>
      </div>
      </div>
        <ToastContainer></ToastContainer>
       
       </>
    )
}

export default Login