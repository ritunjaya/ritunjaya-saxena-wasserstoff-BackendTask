import React, { useState } from "react";
import Cover_Image from '../assets/back.jpeg';
import { useNavigate } from "react-router";



const Register = () => {

  const user = JSON.stringify(localStorage.getItem("user"));
  if (user.role == "user") {
    window.location.href = "/dashboard";
  }

  if (user.role == "admin") {
    window.location.href = "/admin/dashboard";
  }
  const [action, setAction] = useState("Sign Up")
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = () => {
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      console.log(formData);
      return;
    }



    const savedUSer = fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    navigate("/login")

  }

  return (
    <div className='w-full h-screen flex items-start'>
      <div className='relative w-1/2 h-full flex flex-col'>

        <img src={Cover_Image} className='w-full h-full object-cover' alt="Cover Image" />
      </div>
      <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 top-[] justify-between items-center'>


        <div className='w-full flex flex-col max-w-[500px]  pb-12 mt-14'>
          <div className='w-full flex flex-col mb-2 top-1'>
            <h3 className='text-3xl text-black font-semibold mb-2 pb-4'>Registration</h3>

          </div>


          <div className='w-full flex flex-col'>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' />
          </div>

          <div className='w-full flex items-center justify-between pb-4'>
            <div className='w-full flex items-center'>
              <input type='checkbox' className="w-4 h-4 mr-2" />
              <p className='text-sm text-black pb-2'>Remember Me</p>
            </div>
            <p className='text-sm text-black font-medium whitespace-nowwrap cursor-pointer underline underline-offset-2'>Forget Password ? </p>
          </div>

          <div onClick={handleFormSubmit} className='w-full flex flex-col'>
            <div className='w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
              Sign UP
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;