//import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa"
import { BASE_URL } from "../Api/Base_url";
import { IoDocumentText } from "react-icons/io5";

const Contact = () => {
    const [data, setdata] = useState([]);
    const handleget = async () => {
        await axios.get(`${BASE_URL}contact`).then(resp => {
            console.log(resp.data)
            setdata(resp.data)
        })
    }
    useEffect(() => {
        handleget();
    }, [])

    const handledelete = async (id) => {
        if (confirm('Are You Deleted ?')) {
            console.log(id)
            axios.delete(`${BASE_URL}contact/${id}`).then(resp => {
                console.log("deleted successfully", resp.data)
                handleget();

            })
        }
    }
    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="grid grid-cols-1">

                        <div className="col-span-1">
                            <div className="w-full">
                                <table className='w-full'>
                                    <thead>
                                        <tr className="*:text-start *:text-sm *:p-2 *:border *:border-blue-gray-200 bg-black text-white">
                                            <th>
                                                Sr no
                                            </th>
                                            <th>
                                                Name
                                            </th>
                                            <th>
                                                Email
                                            </th>
                                            <th>
                                                Mobile no
                                            </th>
                                            <th>
                                                CV
                                            </th>
                                            <th>
                                                Message
                                            </th>
                                            <th>
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((item, index) => (
                                                <>
                                                    <tr className='*:text-start *:p-2  *:text-xs *:border *:border-blue-gray-200 '>
                                                        <td>
                                                            {index + 1}
                                                        </td>
                                                        <td>
                                                            {item.name}
                                                        </td>

                                                        <td>
                                                            {item.email}
                                                        </td>
                                                        <td>
                                                            <td>
                                                                <button
                                                                    onClick={() => window.open(`${BASE_URL}${item.image}`, "_blank")}
                                                                    className="h-[40px] w-[40px] rounded-[5px] bg-primary flex items-center justify-center"
                                                                >
                                                                    <IoDocumentText className="text-white text-[20px] font-[900]" />
                                                                </button>
                                                            </td>
                                                        </td>
                                                        <td>
                                                            {item.phone}
                                                        </td>
                                                        <td>
                                                            {item.message}
                                                        </td>
                                                        <td>
                                                            <div className="flex gap-3">

                                                                <button onClick={() => handledelete(item._id)} className="h-[40px] w-[40px] rounded-[5px] bg-primary flex items-center justify-center">
                                                                    <FaTrash className='text-white text-[20px] font-[900]' />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))
                                        }






                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact