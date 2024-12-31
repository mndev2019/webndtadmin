//import React from 'react'

import { EditOutlined } from "@ant-design/icons"
import { FaTrash } from "react-icons/fa"
import { BASE_URL } from "../Api/Base_url"
import FormLabel from "../Layout/FormLabel"
import { Form } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

const Socail = () => {
    const [data, setdata] = useState([]);
    const [name, setname] = useState("");
    const [value, setvalue] = useState("");
    const [image, setimage] = useState("");
    const [editid, seteditid] = useState("");
    const handlesubmit = async (e) => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("name", name);
        formdata.append("image", image);
        formdata.append("value", value);
        if (editid) {
            await axios.put(`${BASE_URL}socials/${editid}`, formdata).then(resp => console.log(resp))
                .catch(err => console.log(err))
        } else {
            await axios.post(`${BASE_URL}socials`, formdata).then(resp => console.log(resp))
                .catch(err => console.log(err))
        }
        handleget()
        setname('')
        setvalue('')
        setimage('')

    }
    const handleimage = (e) => {
        let selectfile = e.target.files[0]
        setimage(selectfile)
    }
    const handleget = async () => {
        await axios.get(`${BASE_URL}socials`).then(resp => {
            console.log(resp.data)
            setdata(resp.data)
        })
    }

    const handleedit = (id) => {
        seteditid(id)
        const found = data.find(itm => itm._id == id);
        if (found) {
            setname(found.name)
            setvalue(found.value)
            setimage(found.image)

        } else {
            console.error('Item not found');
        }
    }

    const handledelete = async (id) => {
        if (confirm('Are You Deleted ?')) {
            console.log(id)
            axios.delete(`${BASE_URL}socials/${id}`).then(resp => {
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
                                <FormLabel label="Social Title" />
                                <input
                                    type="text"
                                    name="socialtitle"
                                    id="socialtitle"
                                    value={name}
                                    onChange={(e) => setname(e.target.value)}
                                    className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"
                                    placeholder="Enter Sector Title"

                                />
                            </div>
                            <div className="col-span-1">

                                <FormLabel label="Social Image" />
                                <input
                                    type="file"
                                    name="socialImage"
                                    id="socialImage"
                                    accept="image/*"
                                    onChange={handleimage}
                                    className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"

                                />
                            </div>
                            <div className="col-span-2">
                                {/* Banner Description */}
                                <FormLabel label="Social Value" />
                                <textarea
                                    name="socialvalue"
                                    id="socialvalue"
                                    value={value}
                                    onChange={(e) => setvalue(e.target.value)}
                                    className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2 resize-none"
                                    rows="4"
                                    placeholder="Enter Banner Description"

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
                                            Name
                                        </th>
                                        <th>
                                            Image
                                        </th>
                                        <th>
                                            Value
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
                                                        <td>{itm.name}</td>
                                                    </td>
                                                    <td>
                                                        <img src={`${BASE_URL}${itm.image}`} className="h-[40px] w-[40px] rounded-full" />
                                                    </td>
                                                    <td>
                                                        {itm.value}
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

export default Socail