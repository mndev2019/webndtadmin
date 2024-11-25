import { IoIosMail } from 'react-icons/io'
import logincol from '../assets/loginpage.avif'
import { MdRemoveRedEye, MdVisibilityOff } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../Api/Base_url'

const Login = () => {
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handlesubmit = async (e) => {
        e.preventDefault();
        let requestdata = {
            email: email,
            password: password,
        };

        await axios.post(`${BASE_URL}login`, requestdata)
            .then(resp => {
                console.log(resp); // Log the entire response

                const res = resp.data; // Get the response data

                // Check for success and store the token and user ID
                if (res.token) {
                    localStorage.setItem("token", res.token);

                } else {
                    alert('Login failed: ' + (res.message || 'Unknown error'));
                }

            })
            .catch(err => {
                console.error(err); // Log the error for debugging
                alert('Login failed, please try again.'); // Show a generic error message
            });
        navigate('/banner');

    };
    useEffect(() => {
        localStorage.clear();
    }, [])
    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <section className="loginpage h-screen flex items-center justify-center">
                <div className="w-full max-w-3xl  bg-white rounded-[10px] flex items-center justify-center p-5 ">
                    <div className="w-full">
                        <div className="grid grid-cols-2 items-center">
                            <div className="col-span-1">
                                <Form className="space-y-5" onSubmit={handlesubmit}>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <div className="mt-1 px-3 flex border  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm items-center text-black">
                                            <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setemail(e.target.value)}
                                                className=" w-full  py-2 outline-none text-black"
                                                placeholder="Enter your email"
                                                required
                                            />
                                            <IoIosMail className="text-black text-lg" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <div className="mt-1 px-3 flex border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm items-center">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                value={password}
                                                onChange={(e) => setpassword(e.target.value)}
                                                className="w-full py-2 outline-none"
                                                placeholder="Enter your password"
                                                required
                                            />
                                            <button type="button" onClick={togglePasswordVisibility} className="text-black text-lg">
                                                {showPassword ? <MdVisibilityOff /> : <MdRemoveRedEye />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <button
                                            type="submit"
                                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            </div>
                            <div className="col-span-1">
                                <div className="w-full">
                                    <img src={logincol} alt='image' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login