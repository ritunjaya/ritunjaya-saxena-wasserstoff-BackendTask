import React, { useState } from "react";
import Cover_Image from '../assets/back.jpeg';
import GOOGLE_ICON from '../assets/g.png';
import { Link } from "react-router-dom";
import {BASE_URL} from "../constants/env"


const Login = () => {
  const user = JSON.stringify(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  if (user && token) {
    window.location.href = "/dashboard";
  }
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };



  const handleSubmit = async () => {
    const { email, password } = formData
    if (!email || !password) {
      alert("email or password not found");
    }

    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });


    const res = await response.json();


    if (response.status == 200) {
      const token = res.token;
      const user = res.user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        window.location.href = "/admin/dashboard";
        return;
      }
      window.location.href = "/dashboard";

    }

  }

  return (
    <div className='w-full h-screen flex items-start'>
      <div className='relative w-1/2 h-full flex flex-col'>

        <img src={Cover_Image} className='w-full h-full object-cover' alt="Cover Image" />
      </div>
      <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 top-[] justify-between items-center'>


        <div className='w-full flex flex-col max-w-[500px] mt-4'>
          <div className='w-full flex flex-col mb-2 top-4  '>
            <h3 className='text-3xl text-black font-semibold mb-2 pb-4'>Login</h3>
            <p className='text-base text-black mb-2'>Welcome ! Please enter your details</p>
          </div>


          <div className='w-full flex flex-col'>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' />

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' />
          </div>

          <div className='w-full flex items-center justify-between'>
            <div className='w-full flex items-center'>
              <input type='checkbox' className="w-4 h-4 mr-2" />
              <p className='text-sm text-black'>Remember Me</p>
            </div>
            <p className='text-sm text-black font-medium whitespace-nowwrap cursor-pointer underline underline-offset-2'>Forget Password ? </p>
          </div>

          <div className='w-full flex flex-col'>
            <button onClick={handleSubmit} className='w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
              Log in
            </button>
            <Link to="/registration">
              <button className='w-full text-[#060606] my-2 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center'>
                Register
              </button>
            </Link>

          </div>

          <div className='w-full flex items-center justify-center relative py-2'>
            <div className='w-full h-[1px] bg-black'></div>
            <p className=' text-lg absolute text-black/80 bg-[#f5f5f5]'>OR</p>
          </div>
          <button type="submit" className='w-full text-[#060606] my-2 font-semibold bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer '>
            <img src={GOOGLE_ICON} className='h-6 mr-2' />
            Sign In With Google
          </button>
        </div>


      </div>
    </div>
  );
}

export default Login;


// login ho rha hai