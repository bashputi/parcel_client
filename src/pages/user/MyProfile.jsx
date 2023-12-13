import { useEffect, useRef, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import useProfile from "../../hooks/useProfile";
import useAuth from "../../hooks/useAuth";




// other imports...

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
    const form = useRef();
    const inputRef = useRef(null);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
    const [profile, refetch] = useProfile();
    const [uploadedImage, setUploadedImage] = useState('');

    useEffect(() => {
        if (profile.length > 0) {
            setUploadedImage(profile[0].image);
        }
    }, [profile]);

    const handleChange = async (e) => {
        const file = e.target.files[0];
        try {
            const formData = new FormData();
            formData.append('image', file);
            const headers = {
                'Content-Type': 'multipart/form-data'
            };
            const res = await axiosPublic.post(image_hosting_api, formData, { headers });
            if (res.data.success) {
              
                const profileimage = {
                    image: res.data.data.display_url,
                    email: user.email
                }
                const profileRes = await axiosSecure.post('/profiles', profileimage);
                if (profileRes.data.insertedId) {
                    Swal.fire({
                        position: "top-left",
                        icon: "success",
                        title: " Profile Picture Upload successful!!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                    setUploadedImage(res.data.data.display_url); 
                  
                }
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleUpdate = async (e) => {
        const file = e.target.files[0];
        try {
            const formData = new FormData();
            formData.append('image', file);
            const headers = {
                'Content-Type': 'multipart/form-data'
            };
            const res = await axiosPublic.post(image_hosting_api, formData, { headers });
            console.log(res)
            if (res.data.success) {
                const updateData = {
                    image: res.data.data.display_url,
                    email: user.email
                }
                console.log(updateData)
                axiosPublic.patch(`/profiles/${profile[0]._id}`, updateData)
                .then(res => {
                    console.log(res)
                    if(res.data.modifiedCount > 0){
                        Swal.fire({
                            position: "top-left",
                            icon: "success",
                            title: "Profile picture updated successfully!!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                        setUploadedImage(res.data.data.display_url); 
                      
                    }
                    
                })
                .catch(error => {
                    console.error("Error updating image:", error);
                });
              
            }
        } catch (error) {
            console.error("Error updating image:", error);
        }
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    // Email section 
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_eqd9bnn', 'template_pne1a3n', form.current, 'dhlxN7srrlbHV14-N')
            .then((result) => {
                console.log(result.text);
                console.log('message sent');
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }, (error) => {
                console.log(error.text);
            });
    };



    return (
        <div className="my-20 ">
            <SectionTitle heading={'My Profile'} subHeading={'Watch your history'}></SectionTitle>

            <div>
                <div data-aos="fade-down-right" data-aos-duration="2500" className="flex justify-center mb-20">
                    {uploadedImage ? (
                        <img src={uploadedImage} className="w-64 mt-10 rounded-full h-64" alt="user profile" />
                    ) : (
                        <div>
                            <div className="w-64 bg-lime-200 rounded-full h-64"></div>
                            <p className="mt-5 font-semibold text-lg">Upload your profile picture</p>
                        </div>
                    )}
                </div>

                <div>
                    {!uploadedImage && (
                        <div>
                            <button className="btn btn-outline btn-warning" onClick={handleClick}>
                                Upload Profile Picture
                            </button>
                            <input type="file" ref={inputRef} onChange={handleChange} className="hidden" />
                        </div>
                    )}

                    {uploadedImage && (
                        <div>
                            <button className="btn btn-outline btn-success" onClick={handleClick}>
                                Update Profile Picture
                            </button>
                            <input type="file" ref={inputRef} onChange={handleUpdate} className="hidden" />
                        </div>
                    )}
                </div>
            </div>
            <div data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="3000" className="my-12 text-center">
                <h1 className="mb-4 text-2xl font-bold text-gray-800">{user?.displayName}</h1>
                <p className="text-gray-600 text-lg">{user.email}</p> 
            </div>
            <div>
            <h1 data-aos="zoom-in" data-aos-duration="3000"  className="font-extrabold text-4xl text-[#d78131] text-center mb-20">Give us a service feedback</h1>
            <div>
            <div id='contact' className='shadow-2xl p-10 border-2 rounded-2xl border-[#E21B70] relative py-12 mx-auto container'>
                <div className='grid md:grid-cols-12 items-center '>
                    <div className='md:col-span-6'>
                        <img className='w-3/4' src="https://i.ibb.co/McqLNL3/gif.gif" alt="gif" />
                    </div>
                    <div className='md:col-span-6 md:px-0 px-6'>
                        <form className="mx-auto " ref={form} onSubmit={sendEmail}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#ABB2BF]">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="user_name"
                                    className="block w-full px-4 py-2 border text-[#282C33] border-gray-300 focus:outline-none focus:ring-[#E21B70] focus:border-[#E21B70] sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block  mb-2 text-sm font-medium text-[#ABB2BF]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="user_email"
                                    className="block w-full px-4 py-2 border text-[#282C33] border-gray-300  focus:outline-none focus:[#E21B70] focus:border-[#E21B70] sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-[#ABB2BF]">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="block w-full px-4 py-2 text-[#282C33] border border-gray-300 focus:outline-none focus:ring-[#E21B70] focus:border-[#E21B70]  sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className='bg-none border border-[#E21B70] px-3 py-2 mr-6 hover:border-b-4 duration-200'>
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

            </div>
        </div>
    );
};

export default MyProfile;