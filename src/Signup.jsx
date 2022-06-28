import React from "react";
import { useState } from "react";
import axios from "axios" 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";



const Signup = ()=>{

        const [username,setUsername] = useState();
        const [password,setPassword] = useState();
        const [firstname,setFirstname] = useState();
        const [lastname,setLastname] = useState();
        const [email,setEmail] = useState();
        const [mobilenumber,setMobile] = useState();
        const [dob,setDob] = useState();
        const [gender,setGender] = useState();
        const [role,setRole] = useState();

        const navigate = useNavigate();


    const submitBtn  = ()=>{
        var data = {
            userName : username,
            password : password,
            firstName : firstname,
            lastName : lastname,
            email : email,
            mobile : mobilenumber,
            dob : dob,
            gender:gender,
            role:role
        }
        axios.post("http://127.0.0.1:8888/usernameExist",data)
        .then(res=>{
            console.log(res.data)
            if(res.data === false){
                axios.post("http://127.0.0.1:8888/signup",data)
                .then(res=>{
                console.log(res.data)
                console.log("Signup Success full");
               
                toast.success(`Mr..${data.firstName} Your Account is Successfully Create `,
                {position:toast.POSITION.TOP_CENTER})
                
                navigate("/login")

            })
            }
            else{
                toast.error(`${data.userName} is allready taken please change username`,
                {position:toast.POSITION.TOP_CENTER})
            }
        })


    }

    return(
        <div className="signup_div">
 
           
            
           <ToastContainer></ToastContainer>

  <div className="signup_back">
  <div class="container">
    <div class="title_register">Register</div>
    <div class="content">
      <form action="#">
        <div class="user-details">
          <div class="input-box">
              <span class="details">First Name</span>
              <input onChange={(e)=>setFirstname(e.target.value)} className="input_place" type="text" placeholder="Enter your name" size="5" required/>
            </div>
          <div class="input-box">
            <span class="details">Last Name</span>
            <input onChange={(e)=>setLastname(e.target.value)}  className="input_place" type="text" placeholder="Enter your name" required/>
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input onChange={(e)=>setEmail(e.target.value)} className="input_place" type="text" placeholder="Enter your username" required/>
          </div>
          <div class="input-box">
            <span class="details">Username</span>
            <input onChange={(e)=>setUsername(e.target.value)}  className="input_place" type="text" placeholder="Enter your email" required/>
          </div>
          <div class="input-box">
            <span class="details">Phone Number</span>
            <input onChange={(e)=>setMobile(e.target.value)} className="input_place" type="text" placeholder="Enter your number" required/>
          </div>
          <div class="input-box">
            <span class="details">Password</span>
            <input onChange={(e)=>setPassword(e.target.value)} className="input_place" type="text" placeholder="Enter your password" required/>
          </div>
          <div class="input-box">
            <span class="details">Date Of Birth</span>
            <input onChange={(e)=>setDob(e.target.value)} className="input_place" type="calender" placeholder="Date Of Birth" required/>
          </div>
          <div class="input-box">
            <span class="details custom-file">Upload your photo</span>
            <input className="input_place custom-file-input" type="file" placeholder="Date Of Birth" required/>
          </div>
        <div className="input-box">
        <span class="details">Gender</span>
           <select  onChange={(e)=>setGender(e.target.value)} name="gender" className="form-control selc">
           <option value="Gender">Select Your Gender</option>
            <option className="opt" value="Male">Male</option>
            <option className="opt" value="Female">Female</option>
           </select>
        </div>
        <div className="input-box ">
        <span className="input_place details">Role</span>
        <select onChange={(e)=>setRole(e.target.value)} name="role" className="form-control selc">
            <option className="opt" value="Not Selcet Role">Select Your Role</option>
            <option className="opt" value="Cashier">Cashier</option>
            <option className="opt" value="Worker">Worker</option>
           </select>
        </div>
        </div>
       
        <div class="button">
          <center>
          <button className="reg_btn" type="button" onClick={submitBtn}> Register</button>
          </center>
        </div>
      </form>
    </div>
  </div>
  </div>



      
</div>
    )
}

export default Signup