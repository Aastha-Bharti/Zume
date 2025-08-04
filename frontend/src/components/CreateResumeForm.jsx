import React, { useState } from 'react'
import { Inputs } from './Inputs.jsx'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance.js'
import { API_PATHS } from '../utils/apiPaths.js'

const CreateResumeForm = () => {

  const [title, setTitle] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleCreateResume = async(e) => {
    e.preventDefault()

    if(!title){
      setError("Please enter Resume Title")
      return
    }

    setError("")

    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE,{
        title,
      })
      if(response.data?._id){
        navigate(`/resume/${response.data?._id}`)
      }
    } catch (error) {
      if(error.response && error.data.response.message){
        setError(error.data.response.message)
      }else{
        setError("Something went wrong.Please try again later.")
      }
    }
}

  return (
    <div className='w-full max-w-md p-8 bg-white rounded-2xl border border-gray-100 shadow-lg'>
      <h3 className='text-2xl font-bold text-gray-900 mb-2'>Create New Resume</h3>
      <p className='text-gray-600 mb-8'>Give your resume a title to get started. You can customize everything later.</p>

      <form onSubmit={handleCreateResume}>
         <Inputs value={title}
        onChange={({ target }) => setTitle(target.value)}
        label='Resume Title'
        placeholder='e.g., John Doe - Software Engineer'
        type='text'/> 
        
        {error && (
          <p className='text-red-500 text-sm mb-4'> {error} </p>
        )}

        <button type='submit' className='w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-rose-200 transition-all'>
          Create Resume 
        </button>


      </form>

    </div>
  )
}

export default CreateResumeForm