import React, { useContext, useState } from 'react'
import { authStyles as styles } from '../assets/dummystyle'
import { UserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper.js';
import axiosInstance from '../utils/axiosInstance.js';
import { API_PATHS } from '../utils/apiPaths.js';
import { Inputs as Input } from './Inputs.jsx';
import { toast } from 'react-hot-toast';

const SignUp = ({ setCurrentPage }) => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault()
    console.log("🚀 SignUp clicked")
    if(!fullName){
      setError("Please enter FullName !")
      return
    }

    if(!validateEmail(email)) {
      setError("Please enter a valid email address...")
      return
    }

    if(!password){
      setError("Password field is required !")
      return
    }
    setError('')

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER , {
        name: fullName,
        email,
        password
      })

      const {token} = response.data
      if(token) {
        localStorage.setItem('token', token)
        updateUser(response.data)
        toast.success("Signup successful! Welcome aboard.") 
        navigate('/dashboard')
      }

      
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.Please try again.")
      
    }
    
  }

  return (
    <div className={styles.signupContainer}>
      <div className={styles.headerWrapper}>
        <h3 className={`${styles.signupTitle} mb-0`}>Create Account</h3>
        <p className={`${styles.signupSubtitle} mt-0`}>Join thousands of professionals today</p>

        {/* FORM */}
        <form onSubmit={handleSignUp} className={styles.signupForm}>
          <Input 
          value={fullName}
          onChange = {({ target }) => setFullName(target.value)}
          label = "Full Name "
          placeholder = 'Example Name'
          type="text"
          />

          <Input 
          value={email}
          onChange = {({ target }) => setEmail(target.value)}
          label = "Email"
          placeholder = 'email@example.com'
          type="email"
          />

          <Input 
          value={password}
          onChange = {({ target }) => setPassword(target.value)}
          label = "Password"
          placeholder = 'Min 8 characters'
          type="password"
          />

          {error && <div className={styles.errorMessage}>{error}</div>}
          <button type='submit' className={styles.signupSubmit}> Create Account</button>

          {/* FOOTER */}
          <p className={styles.switchText}>
            Already have an account ? {' '}
            <button onClick={() => setCurrentPage('login')} type='button' className={styles.signupSwitchButton}>
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
