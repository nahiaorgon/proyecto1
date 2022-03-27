import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className="text-center my-4 bg-red-400 text-white font-bold p-0.5 rounded-sm uppercase md:w-2/4 mx-auto">
        {children}
    </div>
  )
}

export default Alerta