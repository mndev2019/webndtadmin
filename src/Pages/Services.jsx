//import React from 'react'
import { useEffect, useState } from 'react'
import FormLabel from '../Layout/FormLabel'
import { Form } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../Api/Base_url';
import { EditOutlined } from '@ant-design/icons';
import { FaTrash } from 'react-icons/fa';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Services = () => {
    const [data, setdata] = useState([])
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [short_description, setshort_description] = useState("");
    const [image, setimage] = useState("");
    const [icon, seticon] = useState("");
    const [editid, seteditid] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("title", title);
        formdata.append("description", description);
        formdata.append("short_description", short_description);
        formdata.append("image", image);
        formdata.append("icon", icon);
        if (editid) {
            await axios.put(`${BASE_URL}services/${editid}`, formdata).then(resp => console.log(resp))
                .catch(err => console.log(err))
        } else {
            await axios.post(`${BASE_URL}services`, formdata).then(resp => console.log(resp))
                .catch(err => console.log(err))
        }
        handleget()
        settitle('')
        setdescription('')
        setshort_description('')
        setimage('')
        seticon('')

    }
    const handleimage = (e) => {
        let selectfile = e.target.files[0]
        setimage(selectfile)
    }
    const handleicon = (e) => {
        let selectedfile = e.target.files[0]
        seticon(selectedfile)
    }
    const handledescription = (event, editor) => {
        const data = editor.getData();
        setdescription(data);
    };
    const handleget = async () => {
        await axios.get(`${BASE_URL}services`).then(resp => {
            console.log(resp.data.data)
            setdata(resp.data.data)
        })
    }
    const handleedit = (id) => {
        seteditid(id)
        const found = data.find(itm => itm.url == id);
        if (found) {
            settitle(found.title)
            setdescription(found.description)
            setshort_description(found.short_description)
            setimage(found.image)
            seticon(found.icon)

        } else {
            console.error('Item not found');
        }
    }

    const handledelete = async (id) => {
        if (confirm('Are You Deleted ?')) {
            console.log(id)
            axios.delete(`${BASE_URL}services/${id}`).then(resp => {
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
            <section className='py-5'>
                <div className="container">
                    <Form onSubmit={handlesubmit}>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-1">
                                <div className="w-full">
                                    <FormLabel label="Service Title" />
                                    <input
                                        placeholder='Enter Title'
                                        type="text"
                                        name="title"
                                        id="servicetitle"
                                        className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"
                                        onChange={(e) => settitle(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="w-full">
                                    <FormLabel label="Service Icon" />
                                    <input
                                        type="file"
                                        name="serviceicon"
                                        id="serviceicon"
                                        className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"
                                        onChange={handleicon}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="w-full">
                                    <FormLabel label="Service Image" />
                                    <input
                                        type="file"
                                        name="serviceimage"
                                        id="serviceimage"
                                        className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"
                                        onChange={handleimage}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="w-full">
                                    <FormLabel label="Short Description" />
                                    <input
                                        placeholder='Enter description'
                                        type="text"
                                        name="servicedescription"
                                        id="servicedescription"
                                        className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"
                                        onChange={(e) => setshort_description(e.target.value)}
                                    />
                                </div>

                            </div>
                            <div className="col-span-3">
                                <div className="w-full">
                                    <FormLabel label="Description" />
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={description}
                                        onChange={handledescription}
                                        className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"
                                    />

                                </div>
                            </div>
                            <div className="col-span-1 ">
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
                            <div className="w-full">
                                <table className='w-full'>
                                    <thead className=''>
                                        <tr className='*:text-start *:text-sm *:p-2 *:border *:border-blue-gray-200 bg-black text-white tablehead'>
                                            <th>
                                                Sr no
                                            </th>
                                            <th>
                                                Title
                                            </th>
                                            <th>
                                                Icon
                                            </th>
                                            <th>
                                                Image
                                            </th>
                                            <th>
                                                Short Description
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
                                                            <img src={`${BASE_URL}${itm.icon}`} className='h-[40px] w-[40px] rounded-full' />
                                                        </td>
                                                        <td>
                                                            <img src={`${BASE_URL}${itm.image}`} className='h-[40px] w-[40px] rounded-full' />
                                                        </td>

                                                        <td>
                                                            {itm.short_description}
                                                        </td>
                                                       
                                                        <td>
                                                            <div className="flex gap-3">
                                                                <button onClick={() => handleedit(itm.url)} className="h-[40px] w-[40px] rounded-[5px] bg-primary flex items-center justify-center">
                                                                    <EditOutlined className='text-white text-[20px] font-[900]' />
                                                                </button>
                                                                <button className="h-[40px] w-[40px] rounded-[5px] bg-primary flex items-center justify-center">
                                                                    <FaTrash onClick={() => handledelete(itm.url)} className='text-white text-[20px] font-[900]' />
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

export default Services