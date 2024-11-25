//import React from 'react'
import logoimg from '../assets/logo.png'

const Header = () => {
  return (
    <>
      <div className="w-full  shadow shadow-primary  flex items-center justify-normal px-5 py-1 bg-white">
        <img src={logoimg} alt="" className=" h-[46px] w-[70px]" />
        {/* <input title='search' placeholder='Search bar' type="text" name="" id="" className="outline-none px-4 py-2 text-sm rounded-lg max-w-96 ms-auto inline-block" /> */}
      </div>
    </>
  )
}

export default Header