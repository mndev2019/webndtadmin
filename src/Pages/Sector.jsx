//import React from 'react'
import FormLabel from "../Layout/FormLabel"
import { useEffect, useState } from "react"
import { Form } from "react-router-dom"
import { BASE_URL } from "../Api/Base_url"
import axios from "axios"
import { EditOutlined } from "@ant-design/icons"
import { FaTrash } from "react-icons/fa"

const Sector = () => {
    const [data, setdata] = useState([]);
    const [title, settitle] = useState("");
    const [editid, seteditid] = useState("");
    const handlesubmit = async (e) => {
        e.preventDefault();
        let requestdata = {
            title: title,
        }
        if (editid) {
            await axios.put(`${BASE_URL}sectors/${editid}`, requestdata).then(resp => console.log(resp))
                .catch(err => console.log(err))
            handleget();
            seteditid("");
        } else {
            await axios.post(`${BASE_URL}sectors`, requestdata).then(resp => console.log(resp))
                .catch(err => console.log(err))
        }
        handleget()
        settitle('')
    }

    const handleget = async () => {
        await axios.get(`${BASE_URL}sectors`).then(resp => {
            console.log(resp.data.data)
            setdata(resp.data.data)
        })
    }
    const handleedit = (id) => {
        seteditid(id)
        const found = data.find(itm => itm.url == id);
        if (found) {
            settitle(found.title)

        } else {
            console.error('Item not found');
        }
    }
    const handledelete = async (id) => {
        if (confirm('Are You Deleted ?')) {
            console.log(id)
            axios.delete(`${BASE_URL}sectors/${id}`).then(resp => {
                console.log("deleted successfully", resp.data)
                handleget();

            })
        }
    }

    useEffect(() => {
        handleget();
    }, [])
    return (
        <>
            <section className="py-5">
                <div className="container">
                    <Form onSubmit={handlesubmit}>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-1">
                                <div className="w-full">
                                    <FormLabel label="Sector Title" />
                                    <input
                                        placeholder='Enter Title'
                                        type="text"
                                        name="title"
                                        id="sectortitle"
                                        value={title}
                                        onChange={(e) => settitle(e.target.value)}
                                        className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 mt-5 ">
                                <button
                                    type="submit"
                                    className="bg-primary text-xs uppercase font-y tracking-wider text-white px-5 rounded py-3 shadow-sm shadow-light"

                                >
                                    SUBMIT
                                </button>
                            </div>

                        </div>
                    </Form>
                    <div className="grid grid-cols-1">
                        <div className="col-span-1 mt-3">
                            <table className="w-full">
                                <thead>
                                    <tr className='*:text-start *:text-sm *:p-2 *:border *:border-blue-gray-200 bg-black text-white tablehead'>
                                        <th>
                                            Title
                                        </th>
                                        <th>
                                            URL
                                        </th>
                                        <th>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item) => (
                                            <>
                                                <tr className='*:text-start *:p-2  *:text-xs *:border *:border-blue-gray-200'>
                                                    <td>
                                                        {item.title}
                                                    </td>
                                                    <td>
                                                        {item.url}
                                                    </td>
                                                    <td>
                                                        <div className="flex gap-3">
                                                            <button onClick={() => handleedit(item.url)} className="h-[40px] w-[40px] rounded-[5px] bg-primary flex items-center justify-center">
                                                                <EditOutlined className='text-white text-[20px] font-[900]' />
                                                            </button>
                                                            <button className="h-[40px] w-[40px] rounded-[5px] bg-primary flex items-center justify-center">
                                                                <FaTrash onClick={() => handledelete(item.url)} className='text-white text-[20px] font-[900]' />
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
            </section>
        </>
    )
}

export default Sector