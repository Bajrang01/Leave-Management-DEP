import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { userVerify } from "../../Services/APIs/AuthAPI"
import Header from "../../components/Headers/Header"

const Otp = () => {
  const [otp, setOtp] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();
    if (otp === "") {
      toast.error("Enter Your Otp")
    } else if (!/[^a-zA-Z]/.test(otp)) {
      toast.error("Enter Valid Otp")
    } else if (otp.length < 6) {
      toast.error("Otp Length minimum 6 digit")
    } else {
      const data = {
        otp, email: location.state
      }

      const response = await userVerify(data);
      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/user/Home")
        }, 1000)
      } else {
        toast.error(response.response.data.error)
      }
    }
  }
  const styles = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/pond.webp)`,
    overflow: "hidden",
  };
  return (
    <>
    <Header/>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Please Enter Your OTP Here</h1>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="otp">OTP</label>
              <input type="text" name="otp" id="" onChange={(e) => setOtp(e.target.value)} placeholder='Enter Your OTP' />
            </div>
            <button className='btn' onClick={LoginUser}>Submit</button>
          </form>
        </div>
        <Toaster position="top-right" reverseOrder={false}/>
      </section>
    </>
  )
}

export default Otp