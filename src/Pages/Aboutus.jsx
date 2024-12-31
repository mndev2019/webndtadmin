// import React from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import FormLabel from '../Layout/FormLabel'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Form } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../Api/Base_url';
import { EditOutlined } from '@ant-design/icons'
import { FaTrash } from 'react-icons/fa'

const Aboutus = () => {

    const [data, setdata] = useState([])
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [shortdescription, setshortdescription] = useState("");
    const [image, setimage] = useState("");
    const [year, setyear] = useState("");
    const [editid, seteditid] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("title", title);
        formdata.append("description", description);
        formdata.append("short_description", shortdescription);
        formdata.append("image", image);
        formdata.append("year", year);
        if (editid) {
            await axios.put(`${BASE_URL}about/${editid}`, formdata).then(resp => console.log(resp))
                .catch(err => console.log(err))
        } else {
            await axios.post(`${BASE_URL}about`, formdata).then(resp => console.log(resp))
                .catch(err => console.log(err))
        }
        handleget()
        settitle('')
        setdescription('')
        setshortdescription('')
        setimage('')
        setyear('')

    }
    const handleimage = (e) => {
        let selectfile = e.target.files[0]
        setimage(selectfile)
    }
    const handleshortdescription = (event, editor) => {
        const data = editor.getData();
        setshortdescription(data);
    };

    const handledescription = (event, editor) => {
        const data = editor.getData();
        setdescription(data);
    };
    const handleget = async () => {
        await axios.get(`${BASE_URL}about`).then(resp => {
            console.log(resp.data.data)
            setdata(resp.data.data)
        })
    }
    const handleedit = (id) => {
        seteditid(id);
        const found = data.find(itm => itm._id === id);

        if (found) {
            settitle(found.title || ""); // Use empty string as default
            setdescription(found.description || ""); // Use empty string as default
            setshortdescription(found.short_description || ""); // Use empty string as default
            setyear(found.year || ""); // Use empty string as default
        } else {
            console.error('Item not found');
        }
    };

    const handledelete = async (id) => {
        if (confirm('Are You Deleted ?')) {
            console.log(id)
            axios.delete(`${BASE_URL}about/${id}`).then(resp => {
                console.log("deleted successfully", resp.data)
                handleget();

            })
        }
    }
    useEffect(() => {
        handleget();
    }, [])
    return (
        <div>
            <section className='py-5'>
                <div className="container">
                    <Form onSubmit={handlesubmit}>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-1">
                                <div className="w-full">
                                    <FormLabel label=" Title" />
                                    <input
                                        placeholder='Enter Title'
                                        type="text"
                                        name="title"
                                        id="aboutustitle"
                                        value={title}
                                        onChange={(e) => settitle(e.target.value)}
                                        className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"

                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="w-full">
                                    <FormLabel label="year" />
                                    <input
                                        placeholder='Enter Title'
                                        type="text"
                                        name="title"
                                        id="year"
                                        value={year}
                                        onChange={(e) => setyear(e.target.value)}
                                        className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"

                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="w-full">
                                    <FormLabel label=" Image" />
                                    <input
                                        type="file"
                                        name="aboutusimage"
                                        id="aboutusimage"
                                        onChange={handleimage}
                                        className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"


                                    />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="w-full">
                                    <FormLabel label="Short Description" />
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={shortdescription}
                                        onChange={handleshortdescription}
                                        className="rounded w-full text-blue-gray-900 outline-none border border-blue-gray-200 text-sm p-2"
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
                                                Title
                                            </th>
                                            <th>
                                                Year
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
                                            data.map((itm) => (
                                                <>
                                                    <tr className="*:text-start *:p-2  *:text-xs *:border *:border-blue-gray-200">

                                                        <td>
                                                            {itm.title}
                                                        </td>
                                                        <td>
                                                            {itm.year}
                                                        </td>

                                                        <td>
                                                            <img src={`${BASE_URL}${itm.image}`} className='h-[40px] w-[40px] rounded-full' />
                                                        </td>

                                                        <td>
                                                            <div dangerouslySetInnerHTML={{ __html: itm.short_description }} />
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
                </div>
            </section>
        </div>
    )
}

export default Aboutus
