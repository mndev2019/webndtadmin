//import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { GrServices } from "react-icons/gr";
import { FaChartArea } from "react-icons/fa";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { ImUser } from "react-icons/im";
import { MdLogout, MdOutlineSocialDistance } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";
const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear local storage
        localStorage.clear();

        // Redirect to login
        navigate('/login');
    };
    return (
        <>
            <div className="w-full  h-[100%] overflow-x-hidden overflow-y-auto relative bg-primary  ">
                <ul className="*:py-1 px-3 *:text-sm *:font-light *:text-primary">
                    <li>
                        <Link to={'/banner'} className='w-full py-1 ps-3 text-start block rounded-lg'>
                            <div className="w-full flex gap-3 items-center hover:bg-[#d8a28980] rounded-md">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center rounded-md ${location.pathname === '/banner' ? 'bg-black' : 'bg-[#faebd7b5] '}`}>
                                    <PiSlidersHorizontalBold className={`text-xl  ${location.pathname === '/banner' ? 'text-white' : 'text-black '}`} />

                                </div>
                                <div className={`font-bold text-[15px] text-white ${location.pathname === '/banner' ? 'text-primary' : 'text-black'}`}>
                                    <p className={`font-bold text-[15px]  ${location.pathname === '/banner' ? 'text-white' : 'text-black'}`}>  Banner</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/client'} className='w-full py-1 ps-3 text-start block rounded-lg'>
                            <div className="w-full flex gap-3 items-center hover:bg-[#d8a28980] rounded-md">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center rounded-md ${location.pathname === '/client' ? 'bg-black' : 'bg-[#faebd7b5] '}`}>
                                    <ImUser className={`text-xl  ${location.pathname === '/client' ? 'text-white' : 'text-black '}`} />

                                </div>
                                <div className={`font-bold text-[15px] text-white ${location.pathname === '/client' ? 'text-primary' : 'text-black'}`}>
                                    <p className={`font-bold text-[15px]  ${location.pathname === '/client' ? 'text-white' : 'text-black'}`}>  Clients</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/services'} className='w-full py-1 ps-3 text-start block rounded-lg'>
                            <div className="w-full flex gap-3 items-center hover:bg-[#d8a28980] rounded-md">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center rounded-md ${location.pathname === '/services' ? 'bg-black' : 'bg-[#faebd7b5] '}`}>
                                    <GrServices className={`text-xl  ${location.pathname === '/services' ? 'text-white' : 'text-black '}`} />

                                </div>
                                <div className={`font-bold text-[15px] text-white ${location.pathname === '/services' ? 'text-primary' : 'text-black'}`}>
                                    <p className={`font-bold text-[15px]  ${location.pathname === '/services' ? 'text-white' : 'text-black'}`}>  Services</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/sector'} className='w-full py-1 ps-3 text-start block rounded-lg'>
                            <div className="w-full flex gap-3 items-center hover:bg-[#d8a28980] rounded-md">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center rounded-md ${location.pathname === '/sector' ? 'bg-black' : 'bg-[#faebd7b5] '}`}>
                                    <FaChartArea className={`text-xl  ${location.pathname === '/sector' ? 'text-white' : 'text-black '}`} />

                                </div>
                                <div className={`font-bold text-[15px] text-white ${location.pathname === '/sector' ? 'text-primary' : 'text-black'}`}>
                                    <p className={`font-bold text-[15px]  ${location.pathname === '/sector' ? 'text-white' : 'text-black'}`}>  Sector</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/sector-details'} className='w-full py-1 ps-3 text-start block rounded-lg'>
                            <div className="w-full flex gap-3 items-center hover:bg-[#d8a28980] rounded-md">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center rounded-md ${location.pathname === '/sector-details' ? 'bg-black' : 'bg-[#faebd7b5] '}`}>
                                    <TbListDetails className={`text-xl  ${location.pathname === '/sector-details' ? 'text-white' : 'text-black '}`} />

                                </div>
                                <div className={`font-bold text-[15px] text-white ${location.pathname === '/sector-details' ? 'text-primary' : 'text-black'}`}>
                                    <p className={`font-bold text-[15px]  ${location.pathname === '/sector-details' ? 'text-white' : 'text-black'}`}>  Sector Details</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/social'} className='w-full py-1 ps-3 text-start block rounded-lg'>
                            <div className="w-full flex gap-3 items-center hover:bg-[#d8a28980] rounded-md">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center rounded-md ${location.pathname === '/social' ? 'bg-black' : 'bg-[#faebd7b5] '}`}>
                                    <MdOutlineSocialDistance className={`text-xl  ${location.pathname === '/social' ? 'text-white' : 'text-black '}`} />

                                </div>
                                <div className={`font-bold text-[15px] text-white ${location.pathname === '/social' ? 'text-primary' : 'text-black'}`}>
                                    <p className={`font-bold text-[15px]  ${location.pathname === '/social' ? 'text-white' : 'text-black'}`}>Social</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/contact'} className='w-full py-1 ps-3 text-start block rounded-lg'>
                            <div className="w-full flex gap-3 items-center hover:bg-[#d8a28980] rounded-md">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center rounded-md ${location.pathname === '/contact' ? 'bg-black' : 'bg-[#faebd7b5] '}`}>
                                    <BiSolidContact className={`text-xl  ${location.pathname === '/contact' ? 'text-white' : 'text-black '}`} />

                                </div>
                                <div className={`font-bold text-[15px] text-white ${location.pathname === '/contact' ? 'text-primary' : 'text-black'}`}>
                                    <p className={`font-bold text-[15px]  ${location.pathname === '/contact' ? 'text-white' : 'text-black'}`}>Contact</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/login'} className='w-full py-1 ps-3 text-start block rounded-lg ' onClick={handleLogout}>
                            <div className="w-full flex gap-3 items-center hover:bg-[#d8a28980] rounded-md">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center rounded-md ${location.pathname === '/logout' ? 'bg-black' : 'bg-[#faebd7b5] '}`}>
                                    <MdLogout className={`text-xl  ${location.pathname === '/logout' ? 'text-white' : 'text-black '}`} />
                                </div>
                                <div className={`font-bold text-[15px] ${location.pathname === '/logout' ? 'text-white' : 'text-black'}`}>
                                    Logout
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar