//import React from 'react'

import axios from "axios";
import { BASE_URL } from "../Api/Base_url";
import { Form } from "react-router-dom";
import FormLabel from "../Layout/FormLabel";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { FaTrash } from "react-icons/fa";

const Banner = () => {
    const [data, setdata] = useState([]);
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [image, setimage] = useState("")
    const [editid, seteditid] = useState("");
    const handlesubmit = async (e) => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("title", title);
        formdata.append("image", image);
        formdata.append("description", description);
        if (editid) {
            await axios.put(`${BASE_URL}banners/${editid}`, formdata).then(resp => console.log(resp))
                .catch(err => console.log(err))
        } else {
            await axios.post(`${BASE_URL}banners`, formdata).then(resp => console.log(resp))
                .catch(err => console.log(err))
        }
        handleget()
        settitle('')
        setdescription('')
        setimage('')

    }
    const handleimage = (e) => {
        let selectfile = e.target.files[0]
        setimage(selectfile)
    }
    const handleget = async () => {
        await axios.get(`${BASE_URL}banners`).then(resp => {
            console.log(resp.data.data)
            setdata(resp.data.data)
        })
    }

    const handleedit = (id) => {
        seteditid(id)
        const found = data.find(itm => itm._id == id);
        if (found) {
            settitle(found.title)
            setdescription(found.description)
            setimage(found.image)

        } else {
            console.error('Item not found');
        }
    }

    const handledelete = async (id) => {
        if (confirm('Are You Deleted ?')) {
            console.log(id)
            axios.delete(`${BASE_URL}banners/${id}`).then(resp => {
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
                        <div className="grid grid-cols-2 gap-2">

                            <div className="col-span-1">
                                <FormLabel label="Banner Title" />
                                <input
                                    type="text"
                                    name="bannertitle"
                                    id="bannertitle"
                                    value={title}
                                    onChange={(e) => settitle(e.target.value)}
                                    className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"
                                    placeholder="Enter Sector Title"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                {/* Banner Image Input */}
                                <FormLabel label="Banner Image" />
                                <input
                                    type="file"
                                    name="bannerImage"
                                    id="bannerImage"
                                    accept="image/*"
                                    onChange={handleimage}
                                    className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"
                                    
                                />
                            </div>
                            <div className="col-span-2">
                                {/* Banner Description */}
                                <FormLabel label="Banner Description" />
                                <textarea
                                    name="bannerDescription"
                                    id="bannerDescription"
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}
                                    className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2 resize-none"
                                    rows="4"
                                    placeholder="Enter Banner Description"
                                    required
                                />
                            </div>
                            <div className="col-span-1 mt-2 ">
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
                        <div className="col-span-1 mt-2">
                            <table className="w-full">
                                <thead>
                                    <tr className='*:text-start *:text-sm *:p-2 *:border *:border-blue-gray-200 bg-black text-white tablehead'>
                                        <th>
                                            Sr no
                                        </th>
                                        <th>
                                            Title
                                        </th>
                                        <th>
                                            Image
                                        </th>
                                        <th>
                                            Description
                                        </th>
                                        <th>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((itm, index) => (
                                            <>
                                                <tr className="*:text-start *:p-2  *:text-xs *:border *:border-blue-gray-200">
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        <td>{itm.title}</td>
                                                    </td>
                                                    <td>
                                                        <img src={`${BASE_URL}${itm.image}`} className="h-[40px] w-[40px] rounded-full" />
                                                    </td>
                                                    <td>
                                                        {itm.description}
                                                    </td>
                                                    <td>
                                                        <div className="flex gap-3">
                                                            <button onClick={() => handleedit(itm._id)} className="h-[40px] w-[40px] rounded-[5px] bg-primary flex items-center justify-center">
                                                                <EditOutlined className='text-white text-[20px] font-[900]' />
                                                            </button>
                                                            <button className="h-[40px] w-[40px] rounded-[5px] bg-primary flex items-center justify-center">
                                                                <FaTrash onClick={() => handledelete(itm._id)} className='text-white text-[20px] font-[900]' />
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

export default Banner