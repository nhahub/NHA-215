import React from 'react'

const Aboutcard = ({text, icon}) => {
  return (
    <div className=' w-[350px] h-[380px] bg-[#0e898e] rounded-3xl px-12 py-20 hover:translate-y-[-8px] transition-all'>
        <i className={icon}></i>
        <h3 className=' px-2 py-6 text-white text-[28px] font-bold'>{text}</h3>

    </div>
  )
}
export default Aboutcard
