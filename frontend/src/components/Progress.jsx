import React from 'react'

const Progress = ({ progress=0, total=5, bgColor, color}) => {
  return (
    <div className='flex gap-1.5 '>
        {[...Array(total)].map((_, idx) => (
            <div key={idx} className={`w-2 h-2 rounded transition-all ${
                idx < progress ? 'bg-cyan-500' : 'bg-cyan-100'
            }`}
            style={{
                backgroundColor:
                idx < progress 
                ? color || 'rgba(1,1,1,1)'
                : bgColor || 'rgba(1,1,1,0.1)'
            }}> 

            </div>
        ))}
    </div>
  )
}

export default Progress