//import React from 'react'

import { CKEditor } from "@ckeditor/ckeditor5-react"
import FormLabel from "../Layout/FormLabel"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { useState } from "react"
import { BASE_URL } from "../Api/Base_url"
import axios from "axios"
import { useEffect } from "react"
import { EditOutlined } from "@ant-design/icons"
import { FaTrash } from "react-icons/fa"
import { Form} from "react-router-dom"

const Sectordetails = () => {
    // const {url} = useParams();
    const [data, setdata] = useState([]);
    const [sectordata, setsectordata] = useState([]);
    const [sector, setsector] = useState("");
    const [title, settitle] = useState("");
    const [detail, setdetail] = useState("");
    const [editid, seteditid] = useState("");
    const handlesectordata = async () => {
        await axios.get(`${BASE_URL}sectors`).then(resp => {
            console.log(resp.data.data)
            setsectordata(resp.data.data)
        })
    }
    const handledetail = (event, editor) => {
        const data = editor.getData();
        setdetail(data);
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        let requestdata = {
            sector: sector,
            title: title,
            detail: detail,

        };
        if (editid) {
            await axios.put(`${BASE_URL}sector-details/${editid}`, requestdata).then(resp => console.log(resp))
                .catch(err => console.log(err))
        } else {
            await axios.post(`${BASE_URL}sector-details`, requestdata).then(resp => console.log(resp))
                .catch(err => console.log(err))
        }
        handleget()
        settitle('')
        setsector('')
        setdetail('')

    }
    const handleget = async () => {
        await axios.get(`${BASE_URL}sector-details`).then(resp => {
            console.log(resp.data.data)
            setdata(resp.data.data)
        })
    }

    const handleedit = (id) => {
        seteditid(id)
        const found = data.find(itm => itm._id == id);
        if (found) {
            settitle(found.title)
            setsector(found.sector)
            setdetail(found.detail)

        } else {
            console.error('Item not found');
        }
    }

    const handledelete = async (id) => {
        if (confirm('Are You Deleted ?')) {
            console.log(id)
            axios.delete(`${BASE_URL}sector-details/${id}`).then(resp => {
                console.log("deleted successfully", resp.data)
                handleget();

            })
        }
    }
    useEffect(() => {
        handlesectordata();
        handleget();
    }, [])
    return (
        <>
            <section className="py-5">
                <div className="container">
                    <Form onSubmit={handlesubmit}>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1">
                                <FormLabel label="select sector" />
                                <select
                                    name="title"
                                    id="selectsector"
                                    value={sector}
                                    onChange={(e) => setsector(e.target.value)}
                                    className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"
                                >
                                    <option value="" disabled selected hidden>
                                        Select Sector
                                    </option>
                                    {sectordata.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-1">
                                <FormLabel label="Sector Title" />
                                <input
                                    type="text"
                                    name="detailtitle"
                                    id="detailtitle"
                                    value={title}
                                    onChange={(e) => settitle(e.target.value)}
                                    className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"
                                    placeholder="Enter Sector Title"
                                    required
                                />
                            </div>
                            <div className="col-span-3 mt-2">
                                <div className="w-full">
                                    <FormLabel label="Sector description" />
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={detail}
                                        onChange={handledetail}
                                        className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"
                                    />
                                </div>
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
                                            Sector Title
                                        </th>
                                        <th>
                                            Detail Title
                                        </th>
                                        <th>
                                            Sector Detail
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
                                                        <td>{itm.sector.title}</td>
                                                    </td>
                                                    <td>
                                                        {itm.title}
                                                    </td>
                                                    <td>
                                                       <div   dangerouslySetInnerHTML={{ __html: itm.detail }}/>
                                                    </td>
                                                    <td>
                                                        <div className="flex gap-3">
                                                            <button onClick={() => handleedit(itm._id)} className="h-[40px] w-[40px] rounded-[5px] bg-primary flex items-center justify-center">
                                                                <EditOutlined className='text-white text-[20px] font-[900]' />
                                                            </button>
                                                            <button className="h-[40px] w-[40px] rounded-[5px] bg-primary flex items-center justify-center">
                                                                <FaTrash onClick={()=> handledelete(itm._id)} className='text-white text-[20px] font-[900]' />
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

export default Sectordetails