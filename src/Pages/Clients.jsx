//import React from 'react'

import { EditOutlined } from "@ant-design/icons"
import { FaTrash } from "react-icons/fa"
import { Form } from "react-router-dom"
import FormLabel from "../Layout/FormLabel"
import { BASE_URL } from "../Api/Base_url"
import { useEffect, useState } from "react"
import axios from "axios"

const Clients = () => {
    const [data, setdata] = useState([]);
    const [editimage, seteditimage] = useState("")
    const [image, setimage] = useState("")
    const [editid, seteditid] = useState("");
    const handlesubmit = async (e) => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("image", image);
        if (editid) {
            await axios.put(`${BASE_URL}cleints/${editid}`, formdata).then(resp => console.log(resp))
                .catch(err => console.log(err))
        } else {
            await axios.post(`${BASE_URL}cleints`, formdata).then(resp => console.log(resp))
                .catch(err => console.log(err))
        }
        handleget()
        setimage('')

    }
    const handleimage = (e) => {
        let selectfile = e.target.files[0]
        setimage(selectfile)
    }
    const handleget = async () => {
        await axios.get(`${BASE_URL}cleints`).then(resp => {
            console.log(resp.data.data)
            setdata(resp.data.data)
        })
    }

    const handleedit = (id) => {
        seteditid(id)
        const found = data.find(itm => itm._id == id);
        if (found) {
            seteditimage(found.image)

        } else {
            console.error('Item not found');
        }
    }

    const handledelete = async (id) => {
        if (confirm('Are You Deleted ?')) {
            console.log(id)
            axios.delete(`${BASE_URL}cleints/${id}`).then(resp => {
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
                        <div className="grid grid-cols-3 gap-2">
                            {
                                editid &&
                                <div className="col-span-1">
                                    <img src={`${BASE_URL}${editimage}`} className="h-[80px] w-[80px]" />
                                </div>
                            }
                            <div className="col-span-1">
                                {/* Banner Image Input */}
                                <FormLabel label="Client Image" />

                                <input
                                    type="file"
                                    name="clientImage"
                                    id="clientImage"
                                    accept="image/*"
                                    onChange={handleimage}
                                    className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"
                                    required
                                />
                            </div>

                            <div className="col-span-1 mt-5">
                                <button
                                    type="submit"
                                    className="bg-primary text-xs uppercase font-y tracking-wider text-white px-5 rounded py-3 shadow-sm shadow-light"

                                >
                                    {editid ? "Update" : "Submit"}
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
                                            Image
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
                                                        <img src={`${BASE_URL}${itm.image}`} className="h-[40px] w-[40px] rounded-full" />
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

export default Clients